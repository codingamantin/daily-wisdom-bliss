import { motion, AnimatePresence } from "framer-motion";
import type { ManifestationCard as Card } from "@/data/cards";
import { TOTAL_CARDS } from "@/lib/manifestation";

type Props = {
  card: Card | null;
  flipped: boolean;
  onFlip: () => void;
  canFlip: boolean;
};

const Ornament = () => (
  <svg width="64" height="10" viewBox="0 0 64 10" fill="none" aria-hidden>
    <path d="M0 5 H22" stroke="currentColor" strokeWidth="0.6" />
    <path d="M42 5 H64" stroke="currentColor" strokeWidth="0.6" />
    <circle cx="32" cy="5" r="2.4" stroke="currentColor" strokeWidth="0.6" fill="none" />
    <circle cx="26" cy="5" r="0.8" fill="currentColor" />
    <circle cx="38" cy="5" r="0.8" fill="currentColor" />
  </svg>
);

const CardBack = () => (
  <div className="absolute inset-0 backface-hidden rounded-[28px] bg-gradient-card-back overflow-hidden shadow-card">
    {/* gold border frame */}
    <div className="absolute inset-3 rounded-[22px] border border-accent/40" />
    <div className="absolute inset-4 rounded-[20px] border border-accent/15" />

    {/* center emblem */}
    <div className="absolute inset-0 flex flex-col items-center justify-center text-accent">
      <div className="relative h-32 w-32 sm:h-40 sm:w-40 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-accent/40" />
        <div className="absolute inset-3 rounded-full border border-accent/25" />
        <div className="absolute inset-6 rounded-full border border-accent/15" />
        {/* sun rays */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 h-[1px] w-16 sm:w-20 origin-left bg-gradient-to-r from-accent/60 to-transparent"
            style={{ transform: `rotate(${i * 30}deg) translateX(28px)` }}
          />
        ))}
        <span className="font-display text-4xl sm:text-5xl text-gold relative z-10">✦</span>
      </div>
      <p className="font-mono-premium mt-8 text-[10px] sm:text-[11px] uppercase tracking-[0.4em] text-accent/70">
        Manifestim
      </p>
      <p className="font-display mt-1 text-lg sm:text-xl text-accent/90 italic">Karta e Ditës</p>
    </div>

    {/* corners */}
    <div className="absolute top-6 left-6 text-accent/60"><Ornament /></div>
    <div className="absolute bottom-6 right-6 text-accent/60 rotate-180"><Ornament /></div>
  </div>
);

const CardFront = ({ card }: { card: Card | null }) => (
  <div
    className="absolute inset-0 backface-hidden rounded-[28px] bg-gradient-card-front shadow-card overflow-hidden"
    style={{ transform: "rotateY(180deg)" }}
  >
    {/* gold inner frame */}
    <div className="absolute inset-3 rounded-[22px] border border-accent/35" />
    <div className="absolute inset-4 rounded-[20px] border border-accent/15" />

    <div className="relative z-10 h-full w-full flex flex-col justify-between p-7 sm:p-10">
      {/* top: card number */}
      <div className="flex items-center justify-between text-foreground/60">
        <span className="font-mono-premium text-[10px] sm:text-[11px] tracking-[0.3em]">
          {card ? String(card.id).padStart(2, "0") : "—"} / {TOTAL_CARDS}
        </span>
        <span className="font-mono-premium text-[10px] sm:text-[11px] tracking-[0.3em] text-accent-deep">
          ✦ MANIFESTIM
        </span>
      </div>

      {/* center content */}
      <div className="flex flex-col items-center justify-center text-center my-auto">
        <div className="text-accent-deep mb-5 sm:mb-7"><Ornament /></div>
        <h3 className="font-display text-2xl sm:text-3xl md:text-4xl leading-tight text-foreground tracking-tight max-w-[26ch] mx-auto">
          {card?.title}
        </h3>
        <div className="my-5 sm:my-7 h-px w-16 bg-accent-deep/40" />
        <p className="font-sans-premium text-sm sm:text-base leading-relaxed text-foreground/75 max-w-[34ch] mx-auto">
          {card?.content}
        </p>
        <div className="text-accent-deep mt-5 sm:mt-7 rotate-180"><Ornament /></div>
      </div>

      {/* bottom signature */}
      <div className="flex items-center justify-center">
        <span className="font-display italic text-accent-deep text-sm sm:text-base">
          ~ rituali i ditës ~
        </span>
      </div>
    </div>
  </div>
);

const ManifestationCardView = ({ card, flipped, onFlip, canFlip }: Props) => {
  return (
    <div className="perspective-2000 w-full flex justify-center select-none">
      <motion.button
        type="button"
        onClick={() => canFlip && onFlip()}
        disabled={!canFlip}
        whileHover={canFlip && !flipped ? { y: -6, rotateZ: -1 } : {}}
        whileTap={canFlip && !flipped ? { scale: 0.98 } : {}}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`relative aspect-[5/8] w-[88vw] max-w-[360px] sm:max-w-[400px] md:max-w-[440px] preserve-3d rounded-[28px] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
          canFlip && !flipped ? "cursor-pointer animate-float-slow" : "cursor-default"
        }`}
        style={{
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 1.1s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        aria-label={flipped ? "Karta e ditës" : "Hapni kartën e ditës"}
      >
        <CardBack />
        <CardFront card={card} />
      </motion.button>

      <AnimatePresence>
        {flipped && card && (
          <motion.div
            key="card-content-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="pointer-events-none"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManifestationCardView;
