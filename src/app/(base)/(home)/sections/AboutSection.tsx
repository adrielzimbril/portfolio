"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import svgPaths from "./imports/svg-443r28gzus";

const facts = [
  {
    id: 1,
    emoji: "😎",
    title: "I made you looked.",
    subtitle: "You can have the rest of the empty space here.",
    isTrue: true,
    funnyTruthMessage:
      "Haha! Tu as regardé! 😄 C'était effectivement vrai - je t'ai bien eu!",
    funnyLieMessage:
      "Oops! 🙃 En fait c'était vrai - je t'ai vraiment fait regarder!",
  },
  {
    id: 2,
    emoji: "🏔️",
    title: "J'ai escaladé l'Everest.",
    subtitle: "C'était une expérience incroyable mais très difficile.",
    isTrue: false,
    funnyTruthMessage:
      "Bien vu! 🎯 C'était effectivement un mensonge - je n'ai jamais mis les pieds sur l'Everest!",
    funnyLieMessage:
      "Haha, tu m'as cru! 😅 Non non, je n'ai jamais escaladé l'Everest - j'ai le vertige rien qu'en voyant une échelle!",
  },
  {
    id: 3,
    emoji: "🎸",
    title: "Je joue de la guitare depuis 10 ans.",
    subtitle: "J'ai commencé à apprendre quand j'avais 15 ans.",
    isTrue: true,
    funnyTruthMessage:
      "Exactement! 🎸 Je joue effectivement depuis 10 ans - même si je ne maîtrise toujours que 3 accords!",
    funnyLieMessage:
      "Oups! 🎵 C'était effectivement vrai - je gratte la guitare depuis une décennie!",
  },
  {
    id: 4,
    emoji: "🚀",
    title: "J'ai travaillé pour la NASA.",
    subtitle: "J'ai participé à un projet de recherche spatiale.",
    isTrue: false,
    funnyTruthMessage:
      "Bien joué! 🕵️ C'était un mensonge - mon seul contact avec l'espace c'est quand je regarde les étoiles!",
    funnyLieMessage:
      "Ahah! 🤭 Tu pensais que j'étais un astronaute? Non, je n'ai jamais travaillé pour la NASA!",
  },
];

const encouragements = [
  "Allez, fais ton choix! 🤔",
  "Vrai ou faux? À toi de voir! 🎯",
  "Qu'est-ce que tu en penses? 🧐",
  "Ton instinct te dit quoi? 💭",
  "Fais-moi confiance... ou pas! 😏",
];

function BoldDuotoneSchoolBook() {
  return (
    <div
      className="relative shrink-0 size-4 sm:size-6"
      data-name="Bold Duotone / School / Book"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Bold Duotone / School / Book">
          <path
            d={svgPaths.p27ad6300}
            fill="var(--fill-0, #45454A)"
            id="Vector"
          />
          <path
            d={svgPaths.p1c53ce80}
            fill="var(--fill-0, #45454A)"
            id="Vector_2"
            opacity="0.5"
          />
          <g id="Vector_3">
            <path d={svgPaths.p38a88480} fill="var(--fill-0, #45454A)" />
            <path d={svgPaths.p32b767c0} fill="var(--fill-0, #45454A)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame4496() {
  return (
    <div className="absolute bg-[#f9f9f9] box-border content-stretch flex flex-row gap-2 sm:gap-3 items-center justify-start overflow-clip p-[6px] sm:p-[9.6px] right-[4px] sm:right-[6px] rounded-[120px] top-1 sm:top-2">
      <BoldDuotoneSchoolBook />
    </div>
  );
}

function ScreenIPhone12({
  fact,
  hasGuessed,
}: {
  fact: (typeof facts)[0];
  hasGuessed: boolean;
}) {
  return (
    <div
      className="bg-[#ffffff] h-48 sm:h-60 relative shrink-0 w-full"
      data-name=".Screen•iPhone12"
    >
      <div className="flex flex-col items-center justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col gap-2 sm:gap-2.5 h-48 sm:h-60 items-center justify-center px-4 sm:px-[34px] py-0 relative w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={fact.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="box-border content-stretch flex flex-col gap-1 sm:gap-[6.976px] items-start justify-start leading-[0] not-italic p-0 relative shrink-0 text-left w-full"
            >
              <div className="font-['SF_Pro_Display:Semibold',_sans-serif] leading-[1.2] relative shrink-0 text-[20px] sm:text-[29.649px] text-[rgba(0,0,0,0.87)] tracking-[0.1216px] w-full">
                <p className="block mb-0">{fact.emoji}</p>
                <p className="block">{fact.title}</p>
              </div>
              <div className="font-['SF_Pro_Display:Medium',_sans-serif] relative shrink-0 text-[16px] sm:text-[24px] text-[rgba(0,0,0,0.38)] tracking-[0.0168px] w-full">
                <p className="block leading-[1.2]">{fact.subtitle}</p>
              </div>
              {!hasGuessed && (
                <motion.div
                  className="font-['SF_Pro_Display:Medium',_sans-serif] text-[14px] sm:text-[18px] text-[rgba(0,0,0,0.6)] mt-1 sm:mt-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="block leading-[1.2]">👈 Faux ou Vrai 👉</p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
          <Frame4496 />
        </div>
      </div>
    </div>
  );
}

function BackgroundFactsRotation({
  facts,
  currentIndex,
}: {
  facts: typeof facts;
  currentIndex: number;
}) {
  const otherFacts = facts.filter((_, index) => index !== currentIndex);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10 sm:opacity-20">
      {otherFacts.map((fact, index) => (
        <motion.div
          key={fact.id}
          className="absolute text-[60px] sm:text-[120px] text-[rgba(0,0,0,0.1)]"
          initial={{
            x:
              Math.random() *
              (typeof window !== "undefined" ? window.innerWidth : 800),
            y:
              Math.random() *
              (typeof window !== "undefined" ? window.innerHeight : 600),
            rotate: Math.random() * 360,
          }}
          animate={{
            rotate: 360,
            x: [
              Math.random() *
                (typeof window !== "undefined" ? window.innerWidth : 800),
              Math.random() *
                (typeof window !== "undefined" ? window.innerWidth : 800),
              Math.random() *
                (typeof window !== "undefined" ? window.innerWidth : 800),
            ],
            y: [
              Math.random() *
                (typeof window !== "undefined" ? window.innerHeight : 600),
              Math.random() *
                (typeof window !== "undefined" ? window.innerHeight : 600),
              Math.random() *
                (typeof window !== "undefined" ? window.innerHeight : 600),
            ],
          }}
          transition={{
            duration: 20 + index * 5,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {fact.emoji}
        </motion.div>
      ))}
    </div>
  );
}

function DeviceIPhone12({
  fact,
  hasGuessed,
}: {
  fact: (typeof facts)[0];
  hasGuessed: boolean;
}) {
  return (
    <motion.div
      className="bg-neutral-100 relative rounded-[24px] sm:rounded-[48px] shrink-0 w-[280px] sm:w-[400px] lg:w-[542px] z-10"
      data-name=".Device•iPhone 12"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="box-border content-stretch flex flex-col items-center justify-end overflow-clip p-[8px] sm:p-[16px] relative w-full">
        <ScreenIPhone12 fact={fact} hasGuessed={hasGuessed} />
      </div>
      <div
        aria-hidden="true"
        className="absolute border-[#f9f9f9] border-[8px] sm:border-[16px] border-solid inset-0 pointer-events-none rounded-[24px] sm:rounded-[48px]"
      />
    </motion.div>
  );
}

function Component03Emoji({
  isActive,
  onClick,
  isLeft,
}: {
  isActive: boolean;
  onClick: () => void;
  isLeft?: boolean;
}) {
  const imgEmojiFalse = "/emoji-false.png";
  const imgEmojiTrue = "/emoji-true.png";
  return (
    <motion.div
      className="relative shrink-0 size-[44px] sm:size-[64px] lg:size-[88px] cursor-pointer"
      data-name="03 Emoji"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <div
        className="absolute bg-center bg-cover bg-no-repeat inset-0 transition-opacity duration-300"
        data-name="Emoji/False"
        style={{
          backgroundImage: `url('${imgEmojiFalse}')`,
          opacity: isActive ? 0 : 1,
        }}
      />
      <div
        className="absolute bg-center bg-cover bg-no-repeat inset-0 transition-opacity duration-300"
        data-name="Emoji/True"
        style={{
          backgroundImage: `url('${imgEmojiTrue}')`,
          opacity: isActive ? 1 : 0,
        }}
      />
    </motion.div>
  );
}

function GuessButton({
  isLeft,
  onGuess,
  hasGuessed,
  currentIndex,
}: {
  isLeft: boolean;
  onGuess: (guess: boolean) => void;
  hasGuessed: boolean;
  currentIndex: number;
}) {
  const isNavigationButton = hasGuessed;
  const canNavigate =
    isNavigationButton &&
    (isLeft ? currentIndex > 0 : currentIndex < facts.length - 1);
  const isActive = !hasGuessed || canNavigate;

  const handleClick = () => {
    if (!hasGuessed) {
      // Mode devinette
      onGuess(!isLeft); // gauche = faux (false), droite = vrai (true)
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 sm:gap-3">
      <motion.div
        className="bg-[#f9f9f9] box-border content-stretch flex flex-row items-center justify-start overflow-clip p-[12px] sm:p-[18px] lg:p-[24px] relative rounded-[120px] shrink-0 cursor-pointer"
        data-name="Guess Button"
        whileHover={{ scale: isActive ? 1.05 : 1 }}
        whileTap={{ scale: isActive ? 0.95 : 1 }}
        onClick={handleClick}
        style={{ opacity: isActive ? 1 : 0.5 }}
        initial={{ x: isLeft ? -50 : 50, opacity: 0 }}
        animate={{ x: 0, opacity: isActive ? 1 : 0.5 }}
        transition={{ duration: 0.5 }}
      >
        <Component03Emoji
          isActive={isActive}
          onClick={handleClick}
          isLeft={isLeft}
        />
      </motion.div>

      {hasGuessed && (
        <motion.div
          className="font-['SF_Pro_Display:Medium',_sans-serif] text-[12px] sm:text-[14px] text-[rgba(0,0,0,0.6)] text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {isLeft ? "← Précédent" : "Suivant →"}
        </motion.div>
      )}
    </div>
  );
}

function NavigationButton({
  isLeft,
  currentIndex,
  onNavigate,
  disabled,
}: {
  isLeft: boolean;
  currentIndex: number;
  onNavigate: (direction: "prev" | "next") => void;
  disabled: boolean;
}) {
  const canNavigate =
    !disabled && (isLeft ? currentIndex > 0 : currentIndex < facts.length - 1);

  const handleClick = () => {
    if (canNavigate) {
      onNavigate(isLeft ? "prev" : "next");
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 sm:gap-3">
      <motion.div
        className="bg-[#f9f9f9] box-border content-stretch flex flex-row items-center justify-start overflow-clip p-[12px] sm:p-[18px] lg:p-[24px] relative rounded-[120px] shrink-0 cursor-pointer"
        data-name="Navigation Button"
        whileHover={{ scale: canNavigate ? 1.05 : 1 }}
        whileTap={{ scale: canNavigate ? 0.95 : 1 }}
        onClick={handleClick}
        style={{ opacity: canNavigate ? 1 : 0.3 }}
        initial={{ x: isLeft ? -50 : 50, opacity: 0 }}
        animate={{ x: 0, opacity: canNavigate ? 1 : 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <Component03Emoji
          isActive={canNavigate}
          onClick={handleClick}
          isLeft={isLeft}
        />
      </motion.div>

      <motion.div
        className="font-['SF_Pro_Display:Medium',_sans-serif] text-[12px] sm:text-[14px] text-[rgba(0,0,0,0.6)] text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {isLeft ? "← Précédent" : "Suivant →"}
      </motion.div>
    </div>
  );
}

function Frame4538({
  currentFact,
  currentIndex,
  onNavigate,
  onGuess,
  hasGuessed,
}: {
  currentFact: (typeof facts)[0];
  currentIndex: number;
  onNavigate: (direction: "prev" | "next") => void;
  onGuess: (guess: boolean) => void;
  hasGuessed: boolean;
}) {
  return (
    <div className="absolute box-border content-center flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center sm:justify-between left-1/2 p-4 sm:p-0 top-[180px] sm:top-[240px] lg:top-[298px] translate-x-[-50%] w-full max-w-[340px] sm:max-w-[600px] lg:max-w-[1136px] z-10">
      <div className="flex flex-row sm:flex-col gap-6 sm:gap-0 justify-between w-full sm:w-auto order-2 sm:order-1">
        {!hasGuessed ? (
          <GuessButton
            isLeft={true}
            onGuess={onGuess}
            hasGuessed={hasGuessed}
            currentIndex={currentIndex}
          />
        ) : (
          <NavigationButton
            isLeft={true}
            currentIndex={currentIndex}
            onNavigate={onNavigate}
            disabled={false}
          />
        )}

        <div className="block sm:hidden">
          {!hasGuessed ? (
            <GuessButton
              isLeft={false}
              onGuess={onGuess}
              hasGuessed={hasGuessed}
              currentIndex={currentIndex}
            />
          ) : (
            <NavigationButton
              isLeft={false}
              currentIndex={currentIndex}
              onNavigate={onNavigate}
              disabled={false}
            />
          )}
        </div>
      </div>

      <div className="order-1 sm:order-2">
        <DeviceIPhone12 fact={currentFact} hasGuessed={hasGuessed} />
      </div>

      <div className="hidden sm:block order-3">
        {!hasGuessed ? (
          <GuessButton
            isLeft={false}
            onGuess={onGuess}
            hasGuessed={hasGuessed}
            currentIndex={currentIndex}
          />
        ) : (
          <NavigationButton
            isLeft={false}
            currentIndex={currentIndex}
            onNavigate={onNavigate}
            disabled={false}
          />
        )}
      </div>
    </div>
  );
}

function Component02ControlsButtons({
  onShowAll,
  onReset,
}: {
  onShowAll: () => void;
  onReset: () => void;
}) {
  return (
    <div className="absolute flex flex-col sm:flex-row gap-3 sm:gap-4 bottom-[120px] sm:bottom-auto sm:top-[580px] lg:top-[630px] left-1/2 translate-x-[-50%] z-10 px-4">
      <motion.div
        className="bg-[#2a2a2a] box-border content-stretch flex flex-row items-center justify-center sm:justify-start overflow-clip px-4 sm:px-6 py-[10px] sm:py-[13px] rounded-lg sm:rounded-xl cursor-pointer text-center"
        data-name="02 Controls / Buttons"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onShowAll}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="font-['SF_Pro_Text:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[15px] sm:text-[17px] text-left text-nowrap tracking-[0.0731px]">
          <p className="adjustLetterSpacing block leading-[20px] sm:leading-[22px] whitespace-pre">
            Montre-moi tout 🦄
          </p>
        </div>
      </motion.div>

      <motion.div
        className="bg-[#f9f9f9] border-2 border-[#2a2a2a] box-border content-stretch flex flex-row items-center justify-center sm:justify-start overflow-clip px-4 sm:px-6 py-[10px] sm:py-[13px] rounded-lg sm:rounded-xl cursor-pointer text-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onReset}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="font-['SF_Pro_Text:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#2a2a2a] text-[15px] sm:text-[17px] text-left text-nowrap tracking-[0.0731px]">
          <p className="adjustLetterSpacing block leading-[20px] sm:leading-[22px] whitespace-pre">
            Recommencer 🔄
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function Frame4430({ encouragement }: { encouragement: string }) {
  return (
    <motion.div
      className="absolute box-border content-stretch flex flex-col gap-2 sm:gap-4 items-center justify-start leading-[0] left-1/2 not-italic p-4 sm:p-0 text-center top-[20px] sm:top-[60px] lg:top-[104px] translate-x-[-50%] z-10 w-full max-w-[90%] sm:max-w-none"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="font-['SF_Pro_Display:Semibold',_sans-serif] relative shrink-0 text-[32px] sm:text-[48px] lg:text-[64px] text-[rgba(0,0,0,0.87)] tracking-[0.1408px] text-center">
        <p className="adjustLetterSpacing block leading-none">
          4 faits amusants sur moi
        </p>
      </div>
      <div className="font-['SF_Pro_Display:Medium',_sans-serif] relative shrink-0 text-[18px] sm:text-[24px] lg:text-[34px] text-[rgba(0,0,0,0.6)] tracking-[0.0238px] w-full max-w-[280px] sm:max-w-[500px] lg:max-w-[654px]">
        <p className="adjustLetterSpacing block leading-[1.2]">{`L'un d'eux est un mensonge. 😋`}</p>
      </div>
      <motion.div
        className="font-['SF_Pro_Display:Medium',_sans-serif] text-[16px] sm:text-[20px] lg:text-[24px] text-[rgba(0,0,0,0.8)] mt-1 sm:mt-2"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <p className="block leading-[1.2]">{encouragement}</p>
      </motion.div>
    </motion.div>
  );
}

function AllFactsModal({
  isOpen,
  onClose,
  guessedFacts,
}: {
  isOpen: boolean;
  onClose: () => void;
  guessedFacts: { [key: number]: boolean };
}) {
  if (!isOpen) return null;

  const totalGuessed = Object.keys(guessedFacts).length;
  const correctGuesses = facts.filter(
    (fact) =>
      guessedFacts[fact.id] !== undefined &&
      guessedFacts[fact.id] === fact.isTrue
  ).length;

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-[16px] sm:rounded-[24px] p-4 sm:p-8 max-w-[95%] sm:max-w-2xl w-full max-h-[90vh] sm:max-h-[80vh] overflow-y-auto"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-[24px] sm:text-[32px] font-semibold text-[rgba(0,0,0,0.87)]">
            Tous les faits 🦄
          </h2>
          <button
            onClick={onClose}
            className="text-[rgba(0,0,0,0.6)] hover:text-[rgba(0,0,0,0.87)] text-[20px] sm:text-[24px]"
          >
            ✕
          </button>
        </div>

        {totalGuessed > 0 && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-blue-50 rounded-[12px] sm:rounded-[16px] border-2 border-blue-200">
            <h3 className="text-[16px] sm:text-[20px] font-semibold text-blue-800 mb-1 sm:mb-2">
              🎯 Ton score : {correctGuesses}/{totalGuessed}
            </h3>
            <p className="text-[14px] sm:text-base text-blue-700">
              {correctGuesses === totalGuessed
                ? "Parfait ! Tu as tout bon ! 🏆"
                : correctGuesses > totalGuessed / 2
                ? "Pas mal du tout ! 👏"
                : "Tu peux mieux faire ! 😅"}
            </p>
          </div>
        )}

        <div className="grid gap-3 sm:gap-4">
          {facts.map((fact, index) => {
            const userGuessed = guessedFacts[fact.id] !== undefined;
            const userGuessCorrect =
              userGuessed && guessedFacts[fact.id] === fact.isTrue;

            return (
              <motion.div
                key={fact.id}
                className={`p-3 sm:p-4 rounded-[12px] sm:rounded-[16px] border-2 ${
                  userGuessed
                    ? userGuessCorrect
                      ? "border-green-200 bg-green-50"
                      : "border-red-200 bg-red-50"
                    : fact.isTrue
                    ? "border-green-200 bg-green-50"
                    : "border-red-200 bg-red-50"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-start gap-2 sm:gap-3">
                  <span className="text-[24px] sm:text-[32px]">
                    {fact.emoji}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[16px] sm:text-[20px] font-semibold text-[rgba(0,0,0,0.87)] mb-1">
                      {fact.title}
                    </h3>
                    <p className="text-[14px] sm:text-[16px] text-[rgba(0,0,0,0.6)] mb-2">
                      {fact.subtitle}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      <span
                        className={`inline-block px-2 sm:px-3 py-1 rounded-full text-[12px] sm:text-[14px] font-medium ${
                          fact.isTrue
                            ? "bg-green-200 text-green-800"
                            : "bg-red-200 text-red-800"
                        }`}
                      >
                        {fact.isTrue ? "✅ Vrai" : "❌ Mensonge"}
                      </span>
                      {userGuessed && (
                        <span
                          className={`inline-block px-2 sm:px-3 py-1 rounded-full text-[12px] sm:text-[14px] font-medium ${
                            userGuessCorrect
                              ? "bg-blue-200 text-blue-800"
                              : "bg-orange-200 text-orange-800"
                          }`}
                        >
                          {userGuessCorrect ? "🎯 Correct!" : "❌ Raté!"}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAllFacts, setShowAllFacts] = useState(false);
  const [guessedFacts, setGuessedFacts] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [encouragementIndex, setEncouragementIndex] = useState(0);

  const currentFact = facts[currentIndex];
  const hasGuessedCurrent = guessedFacts[currentFact.id] !== undefined;

  const handleNavigate = (direction: "prev" | "next") => {
    if (direction === "prev" && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (direction === "next" && currentIndex < facts.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }

    // Change encouragement
    setEncouragementIndex((prev) => (prev + 1) % encouragements.length);
  };

  const handleGuess = (guess: boolean) => {
    if (hasGuessedCurrent) return;

    setGuessedFacts((prev) => ({ ...prev, [currentFact.id]: guess }));

    const isCorrect = guess === currentFact.isTrue;
    const message = isCorrect
      ? currentFact.funnyTruthMessage
      : currentFact.funnyLieMessage;

    // Show fun toast
    if (isCorrect) {
      toast.success(message, {
        duration: 4000,
        style: {
          background: "#10B981",
          color: "white",
          border: "none",
          fontSize: "16px",
          borderRadius: "12px",
        },
      });
    } else {
      toast.error(message, {
        duration: 4000,
        style: {
          background: "#EF4444",
          color: "white",
          border: "none",
          fontSize: "16px",
          borderRadius: "12px",
        },
      });
    }
  };

  const handleReset = () => {
    setGuessedFacts({});
    setCurrentIndex(0);
    setEncouragementIndex(0);
    toast.success("C'est reparti pour un tour! 🚀", {
      duration: 2000,
      style: {
        background: "#6366F1",
        color: "white",
        border: "none",
        fontSize: "16px",
        borderRadius: "12px",
      },
    });
  };

  return (
    <div
      className="bg-[#ffffff] relative w-full min-h-screen overflow-hidden"
      data-name="01 Home + Work / Project Hero / Center"
    >
      <BackgroundFactsRotation facts={facts} currentIndex={currentIndex} />

      <Frame4538
        currentFact={currentFact}
        currentIndex={currentIndex}
        onNavigate={handleNavigate}
        onGuess={handleGuess}
        hasGuessed={hasGuessedCurrent}
      />

      <Component02ControlsButtons
        onShowAll={() => setShowAllFacts(true)}
        onReset={handleReset}
      />

      <Frame4430 encouragement={encouragements[encouragementIndex]} />

      <AnimatePresence>
        {showAllFacts && (
          <AllFactsModal
            isOpen={showAllFacts}
            onClose={() => setShowAllFacts(false)}
            guessedFacts={guessedFacts}
          />
        )}
      </AnimatePresence>

      {/* Indicateurs de progression responsives */}
      <motion.div
        className="absolute bottom-[200px] sm:bottom-[120px] lg:bottom-[100px] left-1/2 translate-x-[-50%] flex gap-2 sm:gap-3 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {facts.map((fact, index) => {
          const isGuessed = guessedFacts[fact.id] !== undefined;
          const isCorrect = isGuessed && guessedFacts[fact.id] === fact.isTrue;

          return (
            <motion.div
              key={index}
              className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full cursor-pointer border-2 flex items-center justify-center ${
                index === currentIndex
                  ? "bg-[#2a2a2a] border-[#2a2a2a]"
                  : isGuessed
                  ? isCorrect
                    ? "bg-green-500 border-green-500"
                    : "bg-red-500 border-red-500"
                  : "bg-[rgba(0,0,0,0.2)] border-[rgba(0,0,0,0.2)]"
              }`}
              whileHover={{ scale: 1.3 }}
              onClick={() => setCurrentIndex(index)}
            >
              {isGuessed && (
                <span className="text-white text-[6px] sm:text-[8px]">
                  {isCorrect ? "✓" : "✗"}
                </span>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Progress text responsive */}
      <motion.div
        className="absolute bottom-[170px] sm:bottom-[80px] lg:bottom-[60px] left-1/2 translate-x-[-50%] text-center z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <p className="text-[rgba(0,0,0,0.6)] text-[14px] sm:text-[16px]">
          {Object.keys(guessedFacts).length}/{facts.length} faits devinés
        </p>
      </motion.div>
    </div>
  );
}
