// Plays real mechanical-switch recordings (kbsim by Thomas Lai, MIT; see
// public/sounds/LICENSE-kbsim.txt) with small per-stroke variation in pitch and
// level so repeated keys never sound looped. Nothing loads until sound is on.

export const SWITCHES = ["holypanda", "cream", "topre", "mxblue", "buckling"] as const;
export type SwitchName = (typeof SWITCHES)[number];

export const SWITCH_LABELS: Record<SwitchName, string> = {
  holypanda: "holy panda",
  cream: "nk cream",
  topre: "topre (hhkb)",
  mxblue: "cherry mx blue",
  buckling: "ibm model m",
};

export type KeyKind = "key" | "space" | "enter" | "backspace";
type Group = "press" | "release";
type Sample = { buffer: AudioBuffer; gain: number };
type Bank = Record<Group, Record<string, Sample>>;
type Manifest = { switches: Record<string, Record<Group, Record<string, number>>> };

const ROWS = ["`1234567890-=", "qwertyuiop[]\\", "asdfghjkl;'", "zxcvbnm,./"];

function sampleName(group: Group, kind: KeyKind, ch?: string): string {
  if (kind === "enter") return "ENTER";
  if (kind === "space") return "SPACE";
  if (kind === "backspace") return "BACKSPACE";
  if (group === "release") return "GENERIC";
  const c = (ch ?? "").toLowerCase();
  const row = c ? ROWS.findIndex((r) => r.includes(c)) : -1;
  return `GENERIC_R${row === -1 ? 4 : row}`;
}

export class KeyboardSounds {
  volume = 0.6;
  private ctx: AudioContext | null = null;
  private input: AudioNode | null = null;
  private out: GainNode | null = null;
  private manifest: Promise<Manifest | null> | null = null;
  private banks: Partial<Record<SwitchName, Bank>> = {};
  private loading: Partial<Record<SwitchName, Promise<void>>> = {};

  /** Create or resume the audio context. Call from a click or key press. */
  unlock(): boolean {
    if (typeof window === "undefined") return false;
    if (!this.ctx) {
      const AC =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AC) return false;
      const ctx = new AC();
      const comp = ctx.createDynamicsCompressor();
      comp.threshold.value = -16;
      comp.knee.value = 10;
      comp.ratio.value = 3;
      comp.attack.value = 0.002;
      comp.release.value = 0.1;
      const out = ctx.createGain();
      out.gain.value = this.volume;
      comp.connect(out);
      out.connect(ctx.destination);
      this.ctx = ctx;
      this.input = comp;
      this.out = out;
    }
    if (this.ctx.state === "suspended") void this.ctx.resume();
    return true;
  }

  load(sw: SwitchName): Promise<void> {
    const ctx = this.ctx;
    if (!ctx || this.banks[sw]) return Promise.resolve();
    const pending = this.loading[sw];
    if (pending) return pending;
    this.manifest ??= fetch("/sounds/manifest.json")
      .then((r) => (r.ok ? (r.json() as Promise<Manifest>) : null))
      .catch(() => null);
    const job = this.manifest.then(async (m) => {
      const spec = m?.switches[sw];
      if (!spec) return;
      const bank: Bank = { press: {}, release: {} };
      const groups: Group[] = ["press", "release"];
      await Promise.all(
        groups.flatMap((group) =>
          Object.entries(spec[group]).map(async ([name, gainDb]) => {
            try {
              const res = await fetch(`/sounds/${sw}/${group}/${name}.mp3`);
              const buffer = await ctx.decodeAudioData(await res.arrayBuffer());
              bank[group][name] = { buffer, gain: Math.pow(10, gainDb / 20) };
            } catch {
              // a missing sample falls back to the generic one below
            }
          }),
        ),
      );
      this.banks[sw] = bank;
    });
    this.loading[sw] = job;
    return job;
  }

  press(sw: SwitchName, kind: KeyKind, ch?: string) {
    this.play(sw, "press", kind, ch);
  }

  release(sw: SwitchName, kind: KeyKind, ch?: string) {
    this.play(sw, "release", kind, ch);
  }

  close() {
    void this.ctx?.close();
    this.ctx = null;
    this.input = null;
    this.out = null;
    this.banks = {};
    this.loading = {};
  }

  private play(sw: SwitchName, group: Group, kind: KeyKind, ch?: string) {
    const { ctx, input, out } = this;
    if (!ctx || !input || !out) return;
    const bank = this.banks[sw];
    if (!bank) {
      void this.load(sw);
      return;
    }
    const set = bank[group];
    const sample = set[sampleName(group, kind, ch)] ?? set[group === "press" ? "GENERIC_R2" : "GENERIC"];
    if (!sample) return;
    out.gain.value = this.volume;
    const src = ctx.createBufferSource();
    src.buffer = sample.buffer;
    src.playbackRate.value = 0.97 + Math.random() * 0.06;
    const g = ctx.createGain();
    g.gain.value = sample.gain * (0.88 + Math.random() * 0.2);
    src.connect(g);
    g.connect(input);
    src.start();
  }
}
