import { DATA } from "@/data/resume";
import { SWITCHES, SWITCH_LABELS, type SwitchName } from "./keyboard-sounds";

export const COLORS = {
  fg: "#e6edf3",
  dim: "#8b949e",
  green: "#3fb950",
  blue: "#58a6ff",
  orange: "#ffa657",
  purple: "#d2a8ff",
  red: "#ff7b72",
};

export type Seg = { text: string; color?: string; bold?: boolean; href?: string };
export type Line = { segs: Seg[]; big?: boolean };

const C = COLORS;
const seg = (text: string, color?: string, bold?: boolean, href?: string): Seg => ({ text, color, bold, href });
const line = (...segs: Seg[]): Line => ({ segs });
const text = (t: string, color?: string, bold?: boolean): Line => line(seg(t, color, bold));

export const promptLine = (cmd: string): Line => line(seg("~", C.blue), seg(" $ ", C.green), seg(cmd, C.fg));

const EMAIL = DATA.contact.email;
const LINKEDIN = DATA.contact.social.LinkedIn.url;
const GITHUB = DATA.contact.social.GitHub.url;

const whoami = (): Line[] => [
  { segs: [seg("C. Murali Madhav", C.fg, true)], big: true },
  text("i build for systems that break expensively.", C.dim),
];

const highlights = (): Line[] => [
  line(seg("112x   ", C.green, true), seg("cuda kernels vs single-core numpy")),
  line(seg("2.50%  ", C.orange, true), seg("my grid forecast error. the grid's own: 3.51%")),
  line(seg("ieee   ", C.blue, true), seg("first-author paper, appeec 2026, singapore")),
  line(seg("#8     ", C.purple, true), seg("hackmit puzzle contest, worldwide. was 17th.")),
  line(seg("1st    ", C.green, true), seg("nst startup foundry 2026, with jarvis")),
];

const achievements = (): Line[] => {
  const row = (label: string, detail: string) => line(seg(label.padEnd(22, " "), C.fg, true), seg(detail, C.dim));
  const head = (t: string) => text(`# ${t}`, C.purple);
  return [
    head("research"),
    row("ieee appeec 2026", "first author, kat-patchtst, singapore"),
    row("ieee pes shark tank", "3rd on the final leaderboard, top 5 pitch"),
    head("contests"),
    row("hackmit puzzle", "8th worldwide in 2026, 17th in 2025"),
    row("hackmit 2025", "runner-up, voloridge challenge"),
    row("google big code 2026", "top 50 national finalist of 15,000"),
    row("ieeextreme 18.0", "775th of 5,801 teams"),
    row("jee advanced 2023", "air 5,649 of 180,372 (top 3.1%)"),
    head("startups"),
    row("yc startup school", "india 2026, ~2,500 picked of 25,000+"),
    row("nst startup foundry", "1st, with jarvis"),
    row("zuvees", "1 of 3 founding engineers, margin +60%, ppo"),
    head("school"),
    row("newton school of tech", "100% merit scholarship"),
    row("uc berkeley", "global access program, spring + fall 2026"),
  ];
};

const startupJson = (): Line[] => [
  line(seg("{", C.dim), seg('"name"', C.blue), seg(": ", C.dim), seg("null", C.orange), seg(", ", C.dim), seg('"c_corp"', C.blue), seg(": ", C.dim), seg('"in process"', C.green), seg(",", C.dim)),
  line(seg(" ", C.dim), seg('"clients"', C.blue), seg(": [", C.dim), seg('"FL"', C.green), seg(", ", C.dim), seg('"NY"', C.green), seg("]}", C.dim)),
];

export const BOOT: { cmd: string; out: Line[] }[] = [
  { cmd: "whoami", out: whoami() },
  { cmd: "cat highlights.txt", out: highlights() },
  { cmd: "cat startup.json", out: startupJson() },
  { cmd: 'git commit -m "name the startup"', out: [text("nothing to commit, working tree clean", C.dim)] },
];

const PROJECTS: Record<string, { href: string; blurb: string; stat: string }> = {
  sieve: {
    href: "https://github.com/HackHeroic/sieve",
    blurb: "pattern mining for noisy time series that doesn't fool itself.",
    stat: "4% false alarms on pure noise; the standard method: 100%. kernels 112x faster than numpy.",
  },
  "kat-patchtst": {
    href: "https://drive.google.com/file/d/11kkBXDHZNQpR5bB-Vir0e4JbweyfZ98j/view?usp=drive_link",
    blurb: "power-grid forecasting that gets penalized for inventing electricity.",
    stat: "first author, ieee appeec 2026. the follow-up beats grid operators' own forecasts: 2.50% vs 3.51%.",
  },
  snake_game_os: {
    href: "https://github.com/HackHeroic/Snake_game_os",
    blurb: "terminal snake whose game logic never touches libc's malloc.",
    stat: "runs on our own 64 kb first-fit, coalescing allocator. the snake was the easy part.",
  },
  jarvis: {
    href: "https://github.com/HackHeroic/Jarvis-Engine",
    blurb: "an llm reads what you meant; a cp-sat solver builds the schedule.",
    stat: "1st at nst startup foundry 2026. it cannot make me follow the schedule.",
  },
  optiforge: {
    href: "https://github.com/HackHeroic/optiforge",
    blurb: "lstm and mlp option pricers, benchmarked against black-scholes.",
    stat: "r² 0.948 on held-out aapl quotes. not financial advice.",
  },
  file_organizer: {
    href: "https://github.com/HackHeroic/file_organizer",
    blurb: "raw os syscalls in c, with an ai agent on top.",
    stat: "the agent asks before it deletes anything.",
  },
};

const ALIASES: Record<string, string> = {
  snake: "snake_game_os",
  kat: "kat-patchtst",
  "watt-if": "kat-patchtst",
  paper: "kat-patchtst",
  files: "file_organizer",
  "file-organizer": "file_organizer",
};

const projectKey = (name: string) => {
  const n = name.toLowerCase().replace(/\/+$/, "").replace(/^projects\//, "");
  return ALIASES[n] ?? n;
};

const lsProjects = (): Line[] =>
  Object.entries(PROJECTS).map(([k, p]) => line(seg(`${k}/`.padEnd(17, " "), C.blue, true), seg(p.blurb)));

const openProject = (name: string): Line[] => {
  const k = projectKey(name);
  const p = PROJECTS[k];
  if (!p) return [text(`open: no such project: ${name || "(nothing)"}. try ls projects`, C.red)];
  const shown = p.href.replace(/^https?:\/\//, "");
  return [
    text(k, C.fg, true),
    text(p.blurb),
    text(p.stat, C.dim),
    line(seg("→ ", C.dim), seg(shown.length > 52 ? `${shown.slice(0, 49)}...` : shown, C.blue, false, p.href)),
  ];
};

const help = (): Line[] =>
  [
    ["ls", "what is here"],
    ["ls projects", "the things i have built"],
    ["open <project>", "details and a link"],
    ["cat <file>", "highlights.txt, achievements.txt, startup.json, todo.txt"],
    ["resume, contact", "the useful ones"],
    ["sound on | off", "keyboard sounds"],
    ["switch <name>", "change the keyboard: " + SWITCHES.join(", ")],
    ["clear", "start over"],
    ["credits", "who made the sounds"],
  ].map(([cmd, what]) => line(seg(cmd.padEnd(18, " "), C.green, true), seg(what, C.dim)));

const resume = (): Line[] => [
  line(seg("resume.pdf → ", C.dim), seg("open it", C.blue, false, DATA.resumeUrl)),
  text("one page. every bullet fits on one line. i checked.", C.dim),
];

const contact = (): Line[] => [
  line(seg("email     ", C.dim), seg(EMAIL, C.blue, false, `mailto:${EMAIL}`)),
  line(seg("linkedin  ", C.dim), seg("in/c-murali-madhav", C.blue, false, LINKEDIN)),
  line(seg("github    ", C.dim), seg("@HackHeroic", C.blue, false, GITHUB)),
];

export const COMPLETIONS = [
  "help", "ls", "ls projects", "open sieve", "open kat-patchtst", "open snake_game_os", "open jarvis",
  "open optiforge", "open file_organizer", "cat highlights.txt", "cat achievements.txt", "cat startup.json",
  "cat todo.txt", "resume", "contact", "sound on", "sound off", "clear", "history", "whoami", "credits",
  ...SWITCHES.map((s) => `switch ${s}`),
];

export type CommandResult = {
  out: Line[];
  clear?: boolean;
  sound?: boolean;
  switchTo?: SwitchName;
};

export function runCommand(raw: string, env: { history: string[]; sound: boolean; sw: SwitchName }): CommandResult {
  const cmd = raw.trim();
  const parts = cmd.split(/\s+/);
  const head = (parts[0] ?? "").toLowerCase();
  const rest = parts.slice(1).join(" ");
  const arg = rest.toLowerCase();

  switch (head) {
    case "clear":
    case "cls":
      return { out: [], clear: true };
    case "help":
    case "man":
    case "?":
      return { out: help() };
    case "ls":
    case "dir":
      if (/^projects\/?$/.test(arg)) return { out: lsProjects() };
      return { out: [line(seg("projects/", C.blue, true), seg("  highlights.txt  achievements.txt  startup.json  todo.txt  resume.pdf"))] };
    case "open":
      return { out: openProject(rest) };
    case "cat": {
      if (PROJECTS[projectKey(rest)]) return { out: openProject(rest) };
      if (arg === "highlights.txt" || arg === "highlights") return { out: highlights() };
      if (arg === "achievements.txt" || arg === "achievements") return { out: achievements() };
      if (arg === "startup.json" || arg === "startup") return { out: startupJson() };
      if (arg === "todo.txt" || arg === "todo") return { out: [text("1. name the startup"), text("2. sleep"), text("3. see 1.", C.dim)] };
      if (arg === "resume.pdf" || arg === "resume") return { out: resume() };
      return { out: [text(`cat: ${rest || "(nothing)"}: no such file. try ls`, C.red)] };
    }
    case "achievements":
      return { out: achievements() };
    case "cd":
      return { out: [text(`cd: this is a website, not a filesystem. try open ${rest || "sieve"}`, C.dim)] };
    case "resume":
      return { out: resume() };
    case "contact":
    case "email":
      return { out: contact() };
    case "whoami":
      return { out: whoami() };
    case "sudo":
      return { out: [text("permission denied. there is one root user here,", C.red), text("and he's busy naming a startup.", C.red)] };
    case "hire":
    case "jobs":
    case "careers":
      return { out: [text("hiring soon. first, the startup needs a name.", C.dim), line(seg("meanwhile: ", C.dim), seg("say hi", C.blue, false, `mailto:${EMAIL}`))] };
    case "sound": {
      const want = arg === "off" ? false : arg === "on" ? true : !env.sound;
      return { out: [text(want ? `sound on: ${SWITCH_LABELS[env.sw]} switches.` : "sound off.", C.dim)], sound: want };
    }
    case "switch": {
      const target = SWITCHES.find((s) => s === arg || SWITCH_LABELS[s] === arg);
      if (!target) return { out: [text(`switches: ${SWITCHES.join(", ")}`, C.dim), text(`now: ${env.sw}`, C.dim)] };
      return { out: [text(`switched to ${SWITCH_LABELS[target]}.${env.sound ? "" : " turn sound on to hear it."}`, C.dim)], switchTo: target };
    }
    case "credits":
      return { out: [line(seg("keyboard sounds: ", C.dim), seg("kbsim", C.blue, false, "https://github.com/tplai/kbsim"), seg(" by thomas lai, mit license.", C.dim)), text("everything else: me.", C.dim)] };
    case "git":
      return { out: [text("nothing to commit, working tree clean", C.dim)] };
    case "nvidia-smi":
      return { out: [text("gpu 0: busy. still not the bottleneck.", C.green)] };
    case "sleep":
      return { out: [text("zsh: command not found: sleep", C.red)] };
    case "rm":
      return { out: [text("the agent asks before deleting anything. it asked. the answer is no.", C.orange)] };
    case "exit":
    case "logout":
    case "quit":
      return { out: [text("there is no exit. (there is: esc, or the x. but stay a bit.)", C.dim)] };
    case "vim":
    case "vi":
    case "nano":
    case "emacs":
      return { out: [text(`${head}: nobody has ever left. try open sieve instead.`, C.dim)] };
    case "pwd":
      return { out: [text("/home/madhav/systems-that-break-expensively")] };
    case "date":
      return { out: [text(new Date().toDateString().toLowerCase())] };
    case "echo":
      return { out: [text(rest)] };
    case "history":
      return { out: [...env.history, cmd].map((h, i) => text(`${String(i + 1).padStart(3, " ")}  ${h}`, C.dim)) };
    default:
      return { out: [line(seg(`zsh: command not found: ${parts[0]}`, C.red), seg("  (try help)", C.dim))] };
  }
}
