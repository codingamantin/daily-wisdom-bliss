import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AmbientBackground from "@/components/AmbientBackground";
import OnboardingModal from "@/components/OnboardingModal";
import ManifestationCardView from "@/components/ManifestationCard";
import Header from "@/components/Header";
import {
  TOTAL_CARDS,
  drawNextCard,
  getCardById,
  getTodayDraw,
  getUserName,
  getViewed,
  greeting,
  resetDeck,
  setUserName,
} from "@/lib/manifestation";
import type { ManifestationCard } from "@/data/cards";

const Index = () => {
  const [userName, setUserNameState] = useState<string | null>(null);
  const [card, setCard] = useState<ManifestationCard | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [drawnToday, setDrawnToday] = useState(false);
  const [viewedCount, setViewedCount] = useState(0);
  const [deckComplete, setDeckComplete] = useState(false);
  const [ready, setReady] = useState(false);

  // Initialize from localStorage
  useEffect(() => {
    const name = getUserName();
    setUserNameState(name);

    const todays = getTodayDraw();
    const viewed = getViewed();
    setViewedCount(viewed.length);

    if (todays) {
      const c = getCardById(todays.id);
      if (c) {
        setCard(c);
        setDrawnToday(true);
        // Keep face-down so the user reveals it again each new session/day
        setFlipped(false);
      }
    } else if (viewed.length >= TOTAL_CARDS) {
      setDeckComplete(true);
    }
    setReady(true);
  }, []);

  const handleOnboard = (name: string) => {
    setUserName(name);
    setUserNameState(name);
  };

  const handleFlip = () => {
    if (drawnToday) {
      setFlipped(true);
      return;
    }
    const next = drawNextCard();
    if (!next) {
      setDeckComplete(true);
      return;
    }
    setCard(next);
    setDrawnToday(true);
    setViewedCount((v) => v + 1);
    setFlipped(true);
  };

  const handleReset = () => {
    resetDeck();
    setCard(null);
    setFlipped(false);
    setDrawnToday(false);
    setViewedCount(0);
    setDeckComplete(false);
  };

  const dateLabel = useMemo(() => {
    return new Date().toLocaleDateString("sq-AL", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  }, []);

  const showOnboarding = ready && !userName;

  return (
    <main className="relative min-h-screen flex flex-col font-sans-premium text-foreground overflow-x-hidden">
      <AmbientBackground />

      <Header greeting={greeting(userName)} date={dateLabel} />

      <section className="flex-1 flex flex-col items-center justify-center px-5 py-10 sm:py-14">
        {/* mobile greeting */}
        <div className="sm:hidden text-center mb-6">
          <p className="font-display text-xl text-foreground">{greeting(userName)}</p>
          <p className="font-mono-premium text-[10px] uppercase tracking-[0.25em] text-foreground/55 mt-1">
            {dateLabel}
          </p>
        </div>

        {/* Intro line */}
        <AnimatePresence mode="wait">
          {!flipped && !deckComplete && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-md mb-8 sm:mb-10"
            >
              <p className="font-mono-premium text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-accent-deep mb-3">
                Rituali i sotëm
              </p>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl leading-tight text-foreground">
                Hap kartën që zemra të dëshiron sot
              </h1>
              <p className="text-sm sm:text-base text-foreground/65 mt-3 sm:mt-4 max-w-sm mx-auto">
                Merr një frymëmarrje të ngadaltë. Kur të jesh gati, prek kartën.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Deck complete */}
        {deckComplete ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="glass rounded-3xl px-8 py-10 sm:px-12 sm:py-14 text-center max-w-lg shadow-card"
          >
            <div className="mx-auto mb-5 h-14 w-14 rounded-full gold-border flex items-center justify-center">
              <span className="text-gold text-xl">✦</span>
            </div>
            <p className="font-mono-premium text-[10px] uppercase tracking-[0.35em] text-accent-deep">
              Cikël i përfunduar
            </p>
            <h2 className="font-display text-3xl sm:text-4xl mt-3">Të gjitha 58 kartat janë hapur</h2>
            <p className="text-sm sm:text-base text-foreground/70 mt-4 max-w-sm mx-auto">
              Ke përfunduar një udhëtim të plotë. Kur të jesh gati, fillo një cikël të ri.
            </p>
            <button
              onClick={handleReset}
              className="mt-8 rounded-full bg-foreground text-background px-8 py-3.5 text-sm tracking-wide hover:bg-foreground/90 transition-all shadow-soft"
            >
              Rifillo kartat
            </button>
          </motion.div>
        ) : (
          <ManifestationCardView
            card={card}
            flipped={flipped}
            onFlip={handleFlip}
            canFlip={!flipped}
          />
        )}

        {/* Bottom states */}
        <div className="mt-8 sm:mt-10 min-h-[60px] flex flex-col items-center text-center">
          <AnimatePresence mode="wait">
            {!flipped && !deckComplete && (
              <motion.button
                key="cta"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                onClick={handleFlip}
                className="rounded-full bg-foreground text-background px-8 sm:px-10 py-3.5 text-sm tracking-wide hover:bg-foreground/90 transition-all shadow-soft"
              >
                Hap kartën e sotme
              </motion.button>
            )}

            {flipped && drawnToday && !deckComplete && (
              <motion.div
                key="drawn"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="flex flex-col items-center"
              >
                <p className="font-mono-premium text-[10px] uppercase tracking-[0.35em] text-accent-deep">
                  Karta e sotme është hapur
                </p>
                <p className="font-display italic text-foreground/70 mt-2 text-base sm:text-lg max-w-xs">
                  Kthehu nesër për një mesazh të ri.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Footer / progress */}
      <footer className="w-full px-5 sm:px-8 pb-6 sm:pb-8">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between font-mono-premium text-[10px] uppercase tracking-[0.3em] text-foreground/55 mb-2">
            <span>Progresi</span>
            <span>{viewedCount} / {TOTAL_CARDS}</span>
          </div>
          <div className="h-[3px] w-full rounded-full bg-foreground/10 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(viewedCount / TOTAL_CARDS) * 100}%` }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="h-full bg-gradient-gold"
            />
          </div>
          {viewedCount > 0 && !deckComplete && (
            <button
              onClick={handleReset}
              className="mt-4 mx-auto block font-mono-premium text-[10px] uppercase tracking-[0.3em] text-foreground/45 hover:text-foreground/80 transition-colors"
            >
              Rifillo kartat
            </button>
          )}
        </div>
      </footer>

      <OnboardingModal open={showOnboarding} onSubmit={handleOnboard} />
    </main>
  );
};

export default Index;
