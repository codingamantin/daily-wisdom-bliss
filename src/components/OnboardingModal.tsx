import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { uiContent } from "@/data/ui-content";

type Props = {
  open: boolean;
  onSubmit: (name: string) => void;
};

const OnboardingModal = ({ open, onSubmit }: Props) => {
  const [name, setName] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed.length < 1) return;
    onSubmit(trimmed);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" />
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="glass relative w-full max-w-md rounded-3xl p-8 sm:p-10 shadow-card"
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full gold-border">
                <span className="text-gold font-display text-xl">✦</span>
              </div>
              <p className="font-mono-premium text-xs uppercase tracking-[0.3em] text-foreground/60">
                {uiContent.onboarding.label}
              </p>
              <h2 className="font-display mt-3 text-3xl sm:text-4xl text-foreground">
                {uiContent.onboarding.title}
              </h2>
              <p className="font-sans-premium mt-3 text-[15px] sm:text-lg text-foreground/70 max-w-xs">
                {uiContent.onboarding.body}
              </p>
            </div>

            <div className="mt-8">
              <label className="font-mono-premium block text-[11px] uppercase tracking-[0.25em] text-foreground/60 mb-2">
                {uiContent.onboarding.nameLabel}
              </label>
              <input
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={uiContent.onboarding.namePlaceholder}
                className="w-full bg-transparent border-b border-foreground/30 focus:border-accent outline-none py-3 font-display text-[28px] sm:text-3xl text-foreground placeholder:text-foreground/30 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={!name.trim()}
              className="mt-8 w-full rounded-full bg-foreground text-background py-4 font-sans-premium text-[15px] sm:text-base tracking-wide hover:bg-foreground/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-soft"
            >
              {uiContent.onboarding.submit}
            </button>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OnboardingModal;
