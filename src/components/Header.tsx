import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { getTheme, setTheme } from "@/lib/manifestation";

type Props = { greeting: string; date: string };

const Header = ({ greeting, date }: Props) => {
  const [theme, setT] = useState<"light" | "dark">("light");

  useEffect(() => {
    const t = getTheme();
    setT(t);
    document.documentElement.classList.toggle("dark", t === "dark");
  }, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setT(next);
    setTheme(next);
  };

  return (
    <header className="w-full flex items-center justify-between px-5 sm:px-8 pt-6 sm:pt-8">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full gold-border flex items-center justify-center">
          <span className="text-gold text-sm">✦</span>
        </div>
        <div className="leading-tight">
          <p className="font-mono-premium text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-foreground/55">
            Manifestim
          </p>
          <p className="font-display text-base sm:text-lg text-foreground -mt-0.5">Karta e Ditës</p>
        </div>
      </div>

      <div className="hidden sm:flex flex-col items-end leading-tight">
        <p className="font-display text-base text-foreground">{greeting}</p>
        <p className="font-mono-premium text-[10px] uppercase tracking-[0.25em] text-foreground/55">{date}</p>
      </div>

      <button
        onClick={toggle}
        className="sm:ml-4 h-9 w-9 rounded-full glass flex items-center justify-center text-foreground/80 hover:text-foreground transition-colors"
        aria-label="Ndrysho temën"
      >
        {theme === "light" ? <Moon size={15} /> : <Sun size={15} />}
      </button>
    </header>
  );
};

export default Header;
