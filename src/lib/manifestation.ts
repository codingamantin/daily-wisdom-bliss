import { CARDS, ManifestationCard } from "@/data/cards";
import { uiContent } from "@/data/ui-content";

const KEYS = {
  user: "mc.userName",
  viewed: "mc.viewedCardIds",
  today: "mc.todayDraw", // { date: "YYYY-MM-DD", id: number }
  theme: "mc.theme",
};

const THEME_COLORS = {
  light: "#C9D5C4",
  dark: "#141414",
} as const;

function syncThemeDocument(theme: "light" | "dark") {
  document.documentElement.classList.toggle("dark", theme === "dark");

  const themeMeta = document.querySelector('meta[name="theme-color"]');
  if (themeMeta) {
    themeMeta.setAttribute("content", THEME_COLORS[theme]);
  }
}

export type TodayDraw = { date: string; id: number };

export function todayKey(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function getUserName(): string | null {
  return localStorage.getItem(KEYS.user);
}
export function setUserName(name: string) {
  localStorage.setItem(KEYS.user, name.trim());
}

export function getViewed(): number[] {
  try { return JSON.parse(localStorage.getItem(KEYS.viewed) || "[]"); } catch { return []; }
}
export function setViewed(ids: number[]) {
  localStorage.setItem(KEYS.viewed, JSON.stringify(ids));
}

export function getTodayDraw(): TodayDraw | null {
  try {
    const raw = localStorage.getItem(KEYS.today);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as TodayDraw;
    if (parsed.date !== todayKey()) return null;
    return parsed;
  } catch { return null; }
}
export function setTodayDraw(id: number) {
  const draw: TodayDraw = { date: todayKey(), id };
  localStorage.setItem(KEYS.today, JSON.stringify(draw));
}

export function resetDeck() {
  localStorage.removeItem(KEYS.viewed);
  localStorage.removeItem(KEYS.today);
}

export function drawNextCard(): ManifestationCard | null {
  const viewed = new Set(getViewed());
  const remaining = CARDS.filter((c) => !viewed.has(c.id));
  if (remaining.length === 0) return null;
  const pick = remaining[Math.floor(Math.random() * remaining.length)];
  const next = [...viewed, pick.id];
  setViewed(next);
  setTodayDraw(pick.id);
  return pick;
}

export function getCardById(id: number): ManifestationCard | undefined {
  return CARDS.find((c) => c.id === id);
}

export const TOTAL_CARDS = CARDS.length;

export function greeting(name?: string | null): string {
  const h = new Date().getHours();
  const base =
    h < 5
      ? uiContent.greetings.night
      : h < 12
        ? uiContent.greetings.morning
        : h < 18
          ? uiContent.greetings.afternoon
          : uiContent.greetings.evening;

  return name ? `${base}, ${name}` : base;
}

export function getTheme(): "light" | "dark" {
  return (localStorage.getItem(KEYS.theme) as "light" | "dark") || "light";
}
export function setTheme(t: "light" | "dark") {
  localStorage.setItem(KEYS.theme, t);
  syncThemeDocument(t);
}

export function applySavedTheme() {
  syncThemeDocument(getTheme());
}
