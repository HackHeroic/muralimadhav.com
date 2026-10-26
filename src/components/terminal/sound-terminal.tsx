"use client";

import { JetBrains_Mono } from "next/font/google";
import React from "react";
import { RotateCcw, Volume2, VolumeX } from "lucide-react";
import { KeyboardSounds, SWITCHES, type KeyKind, type SwitchName } from "./keyboard-sounds";
import { BOOT, COLORS, COMPLETIONS, promptLine, runCommand, type Line } from "./terminal-content";

const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "700"] });

const TYPE_MS = 90; // base delay per typed character
const SOUND_KEY = "terminal-sound";
const SWITCH_KEY = "terminal-switch";

type Props = { compact?: boolean };
type State = {
  lines: Line[];
  typed: string;
  typing: boolean;
  ready: boolean;
  busy: boolean;
  input: string;
  history: string[];
  histIdx: number;
  sound: boolean;
  sw: SwitchName;
  cursorOn: boolean;
};

function readPref(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writePref(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // private mode or blocked storage: the preference just isn't remembered
  }
}

function kindOf(key: string): KeyKind | null {
  if (key === "Enter") return "enter";
  if (key === " ") return "space";
  if (key === "Backspace") return "backspace";
  if (key.length === 1 || key === "ArrowUp" || key === "ArrowDown" || key === "Tab") return "key";
  return null;
}

export class SoundTerminal extends React.Component<Props, State> {
  state: State = {
    lines: [],
    typed: "",
    typing: false,
    ready: false,
    busy: true,
    input: "",
    history: [],
    histIdx: -1,
    sound: false,
    sw: "holypanda",
    cursorOn: true,
  };

  private timers: ReturnType<typeof setTimeout>[] = [];
  private blink: ReturnType<typeof setInterval> | null = null;
  private reduced = false;
  private sounds = new KeyboardSounds();
  private body: HTMLDivElement | null = null;
  private inputEl: HTMLInputElement | null = null;

  componentDidMount() {
    this.reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const sw = readPref(SWITCH_KEY);
    const sound = readPref(SOUND_KEY) === "on";
    this.setState({ sw: SWITCHES.includes(sw as SwitchName) ? (sw as SwitchName) : "holypanda" }, () => {
      // The dialog opens from a click, so the browser lets audio start here.
      if (sound) this.setSound(true, false);
    });
    if (!this.reduced) this.blink = setInterval(() => this.setState((s) => ({ cursorOn: !s.cursorOn })), 530);
    this.boot();
  }

  componentWillUnmount() {
    this.clearTimers();
    if (this.blink) clearInterval(this.blink);
    this.sounds.close();
  }

  componentDidUpdate(_: Props, prev: State) {
    if (this.body && (prev.lines.length !== this.state.lines.length || prev.typed !== this.state.typed)) {
      this.body.scrollTop = this.body.scrollHeight;
    }
    if (prev.ready !== this.state.ready && this.state.ready && !this.props.compact) {
      this.inputEl?.focus({ preventScroll: true });
    }
  }

  private later(fn: () => void, ms: number) {
    const id = setTimeout(() => {
      this.timers = this.timers.filter((t) => t !== id);
      fn();
    }, ms);
    this.timers.push(id);
  }

  private clearTimers() {
    this.timers.forEach(clearTimeout);
    this.timers = [];
  }

  private push(lines: Line[]) {
    this.setState((s) => ({ lines: s.lines.concat(lines) }));
  }

  private reveal(lines: Line[], done?: () => void) {
    if (this.reduced || lines.length === 0) {
      this.push(lines);
      done?.();
      return;
    }
    let i = 0;
    const next = () => {
      this.push([lines[i]]);
      i += 1;
      if (i < lines.length) this.later(next, 45);
      else if (done) this.later(done, 60);
    };
    next();
  }

  private charDelay(ch: string) {
    let d = TYPE_MS * (0.6 + Math.random() * 0.8);
    if (ch === " ") d += TYPE_MS * 0.7;
    if (Math.random() < 0.08) d += TYPE_MS * 1.8;
    return d;
  }

  private press(kind: KeyKind, ch?: string) {
    if (this.state.sound) this.sounds.press(this.state.sw, kind, ch);
  }

  private release(kind: KeyKind, ch?: string) {
    if (this.state.sound) this.sounds.release(this.state.sw, kind, ch);
  }

  private stroke(kind: KeyKind, ch?: string) {
    this.press(kind, ch);
    this.later(() => this.release(kind, ch), 55 + Math.random() * 35);
  }

  private typeCommand(cmd: string, done: () => void) {
    if (this.reduced) {
      this.push([promptLine(cmd)]);
      done();
      return;
    }
    this.setState({ typing: true, typed: "" });
    let i = 0;
    const step = () => {
      i += 1;
      const ch = cmd.charAt(i - 1);
      this.setState({ typed: cmd.slice(0, i) });
      this.stroke(ch === " " ? "space" : "key", ch);
      if (i < cmd.length) {
        this.later(step, this.charDelay(ch));
        return;
      }
      this.later(() => {
        this.stroke("enter");
        this.setState({ typing: false, typed: "" });
        this.push([promptLine(cmd)]);
        done();
      }, 260);
    };
    this.later(step, 420);
  }

  boot = () => {
    this.clearTimers();
    this.setState({ lines: [], typed: "", typing: false, ready: false, busy: true, input: "" });
    const run = (k: number) => {
      if (k >= BOOT.length) {
        this.setState({ ready: true, busy: false });
        return;
      }
      this.typeCommand(BOOT[k].cmd, () => this.reveal(BOOT[k].out, () => this.later(() => run(k + 1), 380)));
    };
    this.later(() => run(0), 250);
  };

  skip = () => {
    this.clearTimers();
    const lines: Line[] = BOOT.flatMap((b) => [promptLine(b.cmd), ...b.out]);
    this.setState({ lines, typed: "", typing: false, ready: true, busy: false });
  };

  setSound = (on: boolean, announce = true) => {
    if (on && !this.sounds.unlock()) return;
    if (on) void this.sounds.load(this.state.sw);
    writePref(SOUND_KEY, on ? "on" : "off");
    this.setState({ sound: on }, () => {
      if (on && announce) this.stroke("enter");
    });
  };

  private setSwitch(sw: SwitchName) {
    writePref(SWITCH_KEY, sw);
    this.setState({ sw }, () => {
      if (this.state.sound) void this.sounds.load(sw).then(() => this.stroke("enter"));
    });
  }

  private execute(raw: string, echo: boolean) {
    const cmd = raw.trim();
    if (echo) this.push([promptLine(raw)]);
    if (!cmd) return;
    const { history, sound, sw } = this.state;
    const result = runCommand(cmd, { history, sound, sw });
    this.setState({ history: [...history, cmd].slice(-50), histIdx: -1 });
    if (result.clear) {
      this.setState({ lines: [] });
      return;
    }
    if (result.sound !== undefined) this.setSound(result.sound, false);
    if (result.switchTo) this.setSwitch(result.switchTo);
    this.reveal(result.out);
  }

  private runChip(cmd: string) {
    if (this.state.busy) return;
    this.setState({ busy: true, ready: false });
    this.typeCommand(cmd, () => {
      this.execute(cmd, false);
      this.later(() => this.setState({ busy: false, ready: true }), 120);
    });
  }

  private onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const k = e.key;
    if (k === "Enter") {
      e.preventDefault();
      const value = this.state.input;
      this.press("enter");
      this.setState({ input: "" });
      this.execute(value, true);
      return;
    }
    if (k === "ArrowUp" || k === "ArrowDown") {
      e.preventDefault();
      const h = this.state.history;
      if (!h.length) return;
      let idx = this.state.histIdx;
      if (k === "ArrowUp") idx = idx === -1 ? h.length - 1 : Math.max(0, idx - 1);
      else idx = idx === -1 ? -1 : idx + 1 >= h.length ? -1 : idx + 1;
      this.setState({ histIdx: idx, input: idx === -1 ? "" : h[idx] });
      this.press("key", k);
      return;
    }
    if (k === "Tab") {
      const v = this.state.input.toLowerCase();
      const match = v ? COMPLETIONS.find((c) => c.startsWith(v) && c !== v) : undefined;
      if (match) {
        e.preventDefault();
        this.setState({ input: match });
        this.press("key", "\t");
      }
      return;
    }
    if ((k === "l" || k === "L") && e.ctrlKey) {
      e.preventDefault();
      this.setState({ lines: [] });
      return;
    }
    const kind = kindOf(k);
    if (kind) this.press(kind, k);
  };

  private onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const kind = kindOf(e.key);
    if (kind) this.release(kind, e.key);
  };

  render() {
    const { compact } = this.props;
    const s = this.state;
    const chips = compact
      ? ["help", "ls projects", "cat achievements.txt", "contact"]
      : ["help", "ls projects", "cat highlights.txt", "cat achievements.txt", "contact"];

    return (
      <div className={`${mono.className} flex flex-col gap-4 text-[#e6edf3] ${compact ? "text-[12.5px]" : "text-[15px]"} leading-[1.55]`}>
        <div className="overflow-hidden rounded-xl border border-[#30363d] bg-[#161b22] text-left">
          <div className="flex h-12 items-center gap-2 border-b border-[#30363d] bg-[#21262d] pl-4 pr-1.5">
            <span aria-hidden className="size-3 shrink-0 rounded-full bg-[#ff5f57]" />
            <span aria-hidden className="size-3 shrink-0 rounded-full bg-[#febc2e]" />
            <span aria-hidden className="size-3 shrink-0 rounded-full bg-[#28c840]" />
            <span className="min-w-0 flex-1 truncate text-center text-[13px] text-[#8b949e]">
              {compact ? "madhav@hackheroic" : "madhav@hackheroic: ~"}
            </span>
            {s.busy && !s.ready ? (
              <button type="button" onClick={this.skip} className="h-11 shrink-0 px-2 text-xs text-[#8b949e] hover:text-[#e6edf3]">
                skip
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => this.setSound(!s.sound)}
              aria-pressed={s.sound}
              aria-label={s.sound ? "Turn keyboard sounds off" : "Turn keyboard sounds on"}
              className="flex h-11 min-w-11 shrink-0 items-center gap-1.5 px-2 text-xs"
              style={{ color: s.sound ? COLORS.green : COLORS.dim }}
            >
              {s.sound ? <Volume2 className="size-4" aria-hidden /> : <VolumeX className="size-4" aria-hidden />}
              <span>{s.sound ? "sound on" : "sound off"}</span>
            </button>
            <button
              type="button"
              onClick={this.boot}
              aria-label="Replay the intro"
              className="flex size-11 shrink-0 items-center justify-center text-[#8b949e] hover:text-[#e6edf3]"
            >
              <RotateCcw className="size-4" aria-hidden />
            </button>
          </div>
          <div
            ref={(el) => {
              this.body = el;
            }}
            className={`${compact ? "h-[min(470px,52vh)]" : "h-[min(430px,58vh)]"} overflow-y-auto px-[22px] py-[18px]`}
          >
            {s.lines.map((ln, i) => (
              <div
                key={i}
                className="whitespace-pre-wrap [overflow-wrap:anywhere]"
                style={ln.big ? { fontSize: "1.9em", fontWeight: 700, lineHeight: 1.3 } : undefined}
              >
                {ln.segs.map((sg, j) =>
                  sg.href ? (
                    <a
                      key={j}
                      href={sg.href}
                      target={sg.href.startsWith("mailto:") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className="underline underline-offset-2"
                      style={{ color: sg.color ?? COLORS.fg, fontWeight: sg.bold ? 700 : undefined }}
                    >
                      {sg.text}
                    </a>
                  ) : (
                    <span key={j} style={{ color: sg.color ?? COLORS.fg, fontWeight: sg.bold ? 700 : undefined }}>
                      {sg.text}
                    </span>
                  ),
                )}
              </div>
            ))}
            {s.typing ? (
              <div className="whitespace-pre-wrap [overflow-wrap:anywhere]">
                <span style={{ color: COLORS.blue }}>~</span>
                <span style={{ color: COLORS.green }}> $ </span>
                <span>{s.typed}</span>
                <span
                  aria-hidden
                  className="inline-block h-[1.15em] w-[0.6em] bg-[#e6edf3] align-text-bottom"
                  style={{ opacity: s.cursorOn || this.reduced ? 1 : 0 }}
                />
              </div>
            ) : null}
            {s.ready && !s.typing ? (
              <div className="flex items-center">
                <label htmlFor="terminal-cmd" className="shrink-0 whitespace-pre">
                  <span style={{ color: COLORS.blue }}>~</span>
                  <span style={{ color: COLORS.green }}> $ </span>
                </label>
                <input
                  id="terminal-cmd"
                  ref={(el) => {
                    this.inputEl = el;
                  }}
                  value={s.input}
                  onChange={(e) => this.setState({ input: e.target.value })}
                  onKeyDown={this.onKeyDown}
                  onKeyUp={this.onKeyUp}
                  aria-label="Type a command, then press Enter"
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck={false}
                  enterKeyHint="go"
                  className="m-0 min-w-0 flex-1 border-0 bg-transparent p-0 text-[#e6edf3] caret-[#e6edf3] outline-none"
                />
              </div>
            ) : null}
          </div>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {chips.map((cmd) => (
            <button
              key={cmd}
              type="button"
              disabled={s.busy}
              onClick={() => this.runChip(cmd)}
              className={`min-h-11 rounded-full border border-[#30363d] bg-[#161b22] px-4 text-[#e6edf3] transition-colors hover:border-[#3fb950] disabled:opacity-55 ${compact ? "text-xs" : "text-[13px]"}`}
            >
              {cmd}
            </button>
          ))}
        </div>
        <p className={`m-0 text-[#8b949e] ${compact ? "text-[11.5px]" : "text-[12.5px]"}`}>
          {compact
            ? "tap a command. sound is in the corner."
            : "turn sound on (top right), then type help or tap a command. ↑ for history, tab to complete. esc closes."}
        </p>
      </div>
    );
  }
}
