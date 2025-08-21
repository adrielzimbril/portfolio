"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { toast } from "sonner";
import { SectionLayout } from "@/components/shared/sections/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Interface pour les questions
interface Question {
  id: number;
  emoji: string;
  title: string;
  description: string;
  subtitle: string;
  isTrue: boolean;
  funFact?: string;
  funnyTruthMessage?: string;
  funnyLieMessage?: string;
}

// Quiz Questions
const questions: Question[] = [
  {
    id: 1,
    emoji: "🎸",
    title: "J'ai joué dans un groupe de rock",
    description:
      "Pendant mes études, j'étais le guitariste principal d'un groupe qui a joué dans plusieurs bars locaux.",
    subtitle: "C'était une expérience incroyable mais très difficile.",
    isTrue: false,
    funFact: "En réalité, je ne sais jouer que 3 accords de guitare ! 🎵",
    funnyTruthMessage:
      "Bien vu! 🎯 C'était effectivement un mensonge - je n'ai jamais mis les pieds sur l'Everest!",
    funnyLieMessage:
      "Haha, tu m'as cru! 😅 Non non, je n'ai jamais escaladé l'Everest - j'ai le vertige rien qu'en voyant une échelle!",
  },
  {
    id: 2,
    emoji: "🌍",
    title: "J'ai visité 25 pays",
    description:
      "Mon passeport est rempli de tampons de tous les continents, sauf l'Antarctique.",
    subtitle: "C'était une expérience incroyable mais très difficile.",
    isTrue: true,
    funFact:
      "Mon pays préféré était le Japon - la culture et la nourriture étaient incroyables ! 🍜",
    funnyTruthMessage:
      "Bien vu! 🎯 C'était effectivement un mensonge - je n'ai jamais mis les pieds sur l'Everest!",
    funnyLieMessage:
      "Haha, tu m'as cru! 😅 Non non, je n'ai jamais escaladé l'Everest - j'ai le vertige rien qu'en voyant une échelle!",
  },
  {
    id: 3,
    emoji: "🥘",
    title: "Je peux cuisiner 50 plats différents",
    description:
      "De la cuisine française aux spécialités asiatiques, ma collection de recettes est impressionnante.",
    subtitle: "C'était une expérience incroyable mais très difficile.",
    isTrue: true,
    funFact:
      "J'ai appris en regardant des vidéos YouTube pendant le confinement ! 👨‍🍳",
    funnyTruthMessage:
      "Bien vu! 🎯 C'était effectivement un mensonge - je n'ai jamais mis les pieds sur l'Everest!",
    funnyLieMessage:
      "Haha, tu m'as cru! 😅 Non non, je n'ai jamais escaladé l'Everest - j'ai le vertige rien qu'en voyant une échelle!",
  },
  {
    id: 4,
    emoji: "🦈",
    title: "J'ai nagé avec des requins",
    description:
      "En Afrique du Sud, j'ai fait de la plongée en cage avec des grands blancs.",
    subtitle: "C'était une expérience incroyable mais très difficile.",
    isTrue: false,
    funFact: "J'ai une peur bleue des requins - même dans un aquarium ! 🫣",
    funnyTruthMessage:
      "Bien vu! 🎯 C'était effectivement un mensonge - je n'ai jamais mis les pieds sur l'Everest!",
    funnyLieMessage:
      "Haha, tu m'as cru! 😅 Non non, je n'ai jamais escaladé l'Everest - j'ai le vertige rien qu'en voyant une échelle!",
  },
  {
    id: 5,
    emoji: "🦈",
    title: "J'ai nagé avec des requins",
    description:
      "En Afrique du Sud, j'ai fait de la plongée en cage avec des grands blancs.",
    subtitle: "C'était une expérience incroyable mais très difficile.",
    isTrue: false,
    funFact: "J'ai une peur bleue des requins - même dans un aquarium ! 🫣",
    funnyTruthMessage:
      "Bien vu! 🎯 C'était effectivement un mensonge - je n'ai jamais mis les pieds sur l'Everest!",
    funnyLieMessage:
      "Haha, tu m'as cru! 😅 Non non, je n'ai jamais escaladé l'Everest - j'ai le vertige rien qu'en voyant une échelle!",
  },
  {
    id: 8,
    emoji: "🦈",
    title: "J'ai nagé avec des requins",
    description:
      "En Afrique du Sud, j'ai fait de la plongée en cage avec des grands blancs.",
    subtitle: "C'était une expérience incroyable mais très difficile.",
    isTrue: false,
    funFact: "J'ai une peur bleue des requins - même dans un aquarium ! 🫣",
    funnyTruthMessage:
      "Bien vu! 🎯 C'était effectivement un mensonge - je n'ai jamais mis les pieds sur l'Everest!",
    funnyLieMessage:
      "Haha, tu m'as cru! 😅 Non non, je n'ai jamais escaladé l'Everest - j'ai le vertige rien qu'en voyant une échelle!",
  },
];

// Custom Emoji Component
function GuessButton({
  isFalse,
  onClick,
  canAnswer,
}: {
  isFalse?: boolean;
  onClick: () => void;
  canAnswer: boolean;
}) {
  const imgEmojiFalse = "/emoji-false.png";
  const imgEmojiTrue = "/emoji-true.png";

  return (
    <motion.div
      className={cn(
        "relative bg-stone-100 border-2 border-zinc-200 content-stretch flex items-center justify-start p-4 md:p-6 rounded-full shrink-0 cursor-pointer transition-all duration-300",
        canAnswer
          ? isFalse
            ? "hover:bg-red-100 hover:border-red-500"
            : "hover:bg-green-100 hover:border-green-500"
          : "pointer-events-none cursor-default"
      )}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative shrink-0 size-11 md:size-20">
        <Image
          src={isFalse ? imgEmojiFalse : imgEmojiTrue}
          width={100}
          height={100}
          alt={isFalse ? "Emoji/True" : "Emoji/False"}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-300 pointer-events-none",
            !canAnswer && "opacity-50"
          )}
        />
        {canAnswer && (
          <motion.span
            className={`absolute -top-2 -right-2 text-xs font-bold px-2 py-1 rounded-full text-white ${
              isFalse ? "bg-red-500" : "bg-green-500"
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            {isFalse ? "FAUX" : "VRAI"}
          </motion.span>
        )}
      </div>
    </motion.div>
  );
}

// Question Card Component
function QuestionCard({
  question,
  index,
  currentQuestionIndex,
  totalQuestions,
}: {
  question: Question;
  index: number;
  currentQuestionIndex: number;
  totalQuestions: number;
}) {
  const isActive = index === currentQuestionIndex;
  const isPast = index < currentQuestionIndex;

  // Calculate rotation and position
  const getCardTransform = () => {
    const rotation = index * (index % 2 === 0 ? 4 : -4);
    const x = Math.sin(((rotation * Math.PI) / 180) * 40);
    const y = Math.cos(((rotation * Math.PI) / 180) * 20);

    if (isActive) {
      // Active card - right and front
      return {
        rotate: 0,
        scale: 1.05,
        x,
        y,
        zIndex: 20,
      };
    }

    if (isPast) {
      // Past cards - shifted to the left
      return {
        rotate: rotation || 0,
        scale: 1,
        x,
        y,
        zIndex: totalQuestions - index,
      };
    }

    // Future cards - stacked behind with rotation
    const distanceFromCurrent = index - currentQuestionIndex;
    return {
      rotate: rotation || (distanceFromCurrent % 2 === 0 ? 8 : -8),
      scale: 1 - distanceFromCurrent * 0.02,
      x,
      y,
      zIndex: totalQuestions - distanceFromCurrent,
    };
  };

  const transform = getCardTransform();

  return (
    <motion.div
      className={cn("relative max-w-xl", index !== 0 && "absolute")}
      style={{
        zIndex: transform.zIndex,
        transformOrigin: "center center",
      }}
      animate={{
        rotate: transform.rotate,
        scale: transform.scale,
        x: transform.x,
        y: transform.y,
        opacity: isPast ? 0.3 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.8,
      }}
    >
      <Card className="squircle squircle-stone-100 squircle-6xl squircle-smooth-xl border-0 overflow-hidden">
        <CardContent className="grid grid-cols-1 px-4 md:px-6 py-4 md:py-6 gap-4">
          <div
            className={cn(
              "flex relative flex-col min-h-60 items-center justify-center p-4 squircle squircle-smooth-xl squircle-3xl squircle-white overflow-hidden"
            )}
          >
            <div className="flex flex-col items-start gap-4 w-full max-w-[90%] py-12 mx-auto">
              <Badge className="aspect-square p-4 rounded-full">
                <span className=" text-4xl">{question.emoji}</span>
              </Badge>
              <h3 className="text-3xl tracking-wide leading-[120%]">
                {question.title}
              </h3>

              <p className="text-zinc-500 text-xl leading-[140%]">
                {question.description}
              </p>
              <p className="text-zinc-400 text-lg leading-[120%]">
                {question.subtitle}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Custom Alert Component
function CustomAlert({
  isVisible,
  isCorrect,
  question,
  onClose,
}: {
  isVisible: boolean;
  isCorrect: boolean;
  question: Question | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible || !question) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/10 bg-opacity-50 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative squircle squircle-white squircle-5xl squircle-smooth-xl flex flex-col gap-6 p-8 max-w-md mx-4 text-center"
          initial={{ scale: 0.5, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.5, y: 50 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative flex flex-col gap-2 items-center justify-center">
            <h3 className="mb-2">{isCorrect ? "🎉" : "😅"}</h3>

            <h4
              className={cn("font-bold", {
                "text-green-600": isCorrect,
                "text-red-600": !isCorrect,
              })}
            >
              {isCorrect ? "Bravo !" : "Pas tout à fait !"}
            </h4>

            <p className="text-gray-700">
              {isCorrect
                ? "Tu as trouvé la bonne réponse ! 😆"
                : "Ce n'était pas la bonne réponse... 😖"}
            </p>
          </div>

          {question.funFact && (
            <div className="relative squircle squircle-stone-100 squircle-3xl squircle-smooth-xl flex flex-col p-4 gap-2 items-center justify-center">
              <Badge
                className="inline-flex w-fit squircle-white"
                variant="colored"
              >
                Réponse 🥸
              </Badge>
              <p className="text-zinc-800">{question.funFact}</p>
            </div>
          )}

          <Button onClick={onClose} asFull asPointer whileTap>
            {isCorrect ? "Continuer 😍" : "Réessayer 😩"}
          </Button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// All Facts Modal Component
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
  const totalQuestions = questions.length;
  const correctGuesses = questions.filter(
    (fact) => guessedFacts[fact.id] !== undefined && guessedFacts[fact.id]
  ).length;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/10 bg-opacity-50 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative squircle squircle-white squircle-5xl squircle-smooth-xl flex flex-col gap-6 p-6 sm:p-8 max-w-[95%] sm:max-w-2xl w-full max-h-[90vh]"
          initial={{ scale: 0.5, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.5, y: 50 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h4 className="text- ">D 🦄</h4>
              <Button onClick={onClose} asPointer whileTap size="icon">
                ✕
              </Button>
            </div>
          </div>
          <Separator />

          {/* Facts Grid */}
          <div className="flex flex-col gap-4 overflow-y-auto">
            {/* Score Section */}
            {totalGuessed > 0 && (
              <motion.div
                className="squircle squircle-stone-50 squircle-3xl squircle-smooth-xl p-4 sm:p-6 squircle-border-2 squircle-border-stone-200 flex flex-col gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h5 className="font-bold">
                  🎯 Ton score : {correctGuesses}/{totalQuestions}
                </h5>
                <p className="text-gray-700">
                  {correctGuesses === totalGuessed
                    ? "Tu as tout bon, Oula tu me connais un peu trop 😄🏆"
                    : correctGuesses > totalGuessed / 2
                    ? "Pas mal du tout ! 👏"
                    : "Tu peux mieux faire ! 😅"}
                </p>
              </motion.div>
            )}
            {questions.map((question, index) => {
              const userGuessed = guessedFacts[question.id] !== undefined;
              const userGuessedCorrect =
                userGuessed && guessedFacts[question.id];

              return (
                <motion.div
                  key={question.id}
                  className={cn(
                    "squircle squircle-zinc-50",
                    "squircle-3xl squircle-smooth-xl p-4 sm:p-6 border-2"
                  )}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <h4 className="bg-white center leading-[140%] rounded-full p-2 aspect-square shrink-0">
                      {question.emoji}
                    </h4>

                    <div className="flex-1 min-w-0">
                      <h5 className="font-bold mb-1">{question.title}</h5>
                      <p className="text-base text-gray-700">
                        {question.description}
                      </p>

                      {/* Badges */}
                      <div className="flex gap-2 flex-wrap">
                        <Badge
                          variant="colored"
                          className={cn(
                            "squircle-white squircle-border-2 squircle-border-stone-200 ",
                            question.isTrue ? "text-green-800" : "text-red-800"
                          )}
                        >
                          {question.isTrue ? "✅ Vérité" : "❌ Mensonge"}
                        </Badge>

                        {userGuessed && (
                          <Badge
                            className={cn(
                              userGuessedCorrect
                                ? "squircle-blue-100 text-blue-900"
                                : "squircle-orange-100 text-orange-900"
                            )}
                            variant="colored"
                          >
                            {userGuessedCorrect ? "🎯 Correct!" : "❌ Raté!"}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <Separator />
          {/* Close Button */}
          <Button onClick={onClose} size="lg" whileTap asPointer asFull>
            Fermer 😊
          </Button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Interactive Fun Facts Component
export function InteractiveFunFacts() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [guessedFacts, setGuessedFacts] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState<{
    isCorrect: boolean;
    question: Question | null;
  }>({
    isCorrect: false,
    question: null,
  });
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(true);
  const [showAllFacts, setShowAllFacts] = useState(false);

  // Derive calculations based on guessedFacts
  const answeredQuestionsCount = Object.keys(guessedFacts).length;
  const allQuestionsAnswered = answeredQuestionsCount === questions.length;

  // Verify if there is a false in the guessed answers
  const hasGuessedFalse = Object.values(guessedFacts).includes(false);

  const handleEmojiClick = (isTrue: boolean) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion || guessedFacts[currentQuestion.id] !== undefined) {
      return;
    }

    const isCorrect = currentQuestion.isTrue === isTrue;

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setGuessedFacts((prev) => ({ ...prev, [currentQuestion.id]: isCorrect }));
    setAlertData({ isCorrect, question: currentQuestion });
    setShowAlert(true);
  };

  const closeAlert = () => {
    setShowAlert(false);
    setAlertData({ isCorrect: false, question: null });

    // Pass to the next question after closing the alert
    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
      }, 300);
    }
  };

  const resetGame = () => {
    setCurrentQuestionIndex(0);
    setGuessedFacts({});
    setGameStarted(true);
    setScore(0);
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

  const canAnswer = gameStarted && !showAllFacts && !allQuestionsAnswered;
  const badge =
    gameStarted || showAllFacts
      ? `Score: ${score}/${questions.length}`
      : "Jouons";

  return (
    <SectionLayout
      isFlex
      badge="Jouons 🤭"
      //badge={`${badge} 🤭`}
      title="Faits amusants sur moi"
      description="L'un d'eux est un mensonge que tu devras deviner, essaie de ne pas te tromper 🤭"
    >
      {/* Zone de jeu principale */}
      <div className="content-center flex flex-col md:flex-row gap-4 md:gap-6 items-center justify-between w-full">
        <div className="flex flex-row gap-6 sm:gap-0 justify-center w-full sm:w-auto order-2 sm:order-1">
          <GuessButton
            isFalse
            onClick={() => handleEmojiClick(false)}
            canAnswer={canAnswer}
          />
          <div className="block sm:hidden">
            <GuessButton
              onClick={() => handleEmojiClick(true)}
              canAnswer={canAnswer}
            />
          </div>
        </div>

        {/* Zone des cartes */}
        <div className="relative flex items-center justify-center order-1 sm:order-2 size-full py-8 md:py-14">
          {questions.map((question, index) => (
            <QuestionCard
              key={question.id}
              question={question}
              index={index}
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={questions.length}
            />
          ))}
        </div>

        <div className="hidden sm:block order-3">
          <GuessButton
            onClick={() => handleEmojiClick(true)}
            canAnswer={canAnswer}
          />
        </div>
      </div>

      <AnimatePresence>
        {showAllFacts && (
          <AllFactsModal
            isOpen={showAllFacts}
            onClose={() => setShowAllFacts(false)}
            guessedFacts={guessedFacts}
          />
        )}
      </AnimatePresence>

      <div className="relative">
        {/* Responsive progression indicators */}
        <div className="flex gap-2 sm:gap-3 z-10">
          {questions.map((question, index) => {
            const isGuessed = guessedFacts[question.id] !== undefined;
            const isCorrect = isGuessed && guessedFacts[question.id];

            return (
              <motion.div
                key={index}
                className={cn(
                  "size-3 sm:size-4 rounded-full border-2 flex items-center justify-center",
                  !allQuestionsAnswered &&
                    "hover:scale-110 transition-transform duration-300 ease-in-out",
                  isGuessed
                    ? isCorrect
                      ? "bg-green-500 border-green-500"
                      : "bg-red-500 border-red-500"
                    : index === currentQuestionIndex
                    ? "bg-[#2a2a2a] border-[#2a2a2a]"
                    : "bg-[rgba(0,0,0,0.2)] border-[rgba(0,0,0,0.2)]"
                )}
              >
                {isGuessed && (
                  <span className="text-white text-[6px] sm:text-[8px]">
                    {isCorrect ? "✓" : "✗"}
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
        {/* Show all facts button */}
        <Button
          onClick={() => setShowAllFacts(true)}
          asPointer
          whileTap
          size="lg"
          asFull
        >
          {allQuestionsAnswered
            ? hasGuessedFalse
              ? "Je veux les réponses 😣"
              : "Je veux les réponses 😄"
            : showAllFacts
            ? "Recommencer le quiz 🔄"
            : "Je veux les réponses 😄"}
        </Button>

        {allQuestionsAnswered && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Button
              onClick={resetGame}
              asPointer
              variant="secondary"
              whileTap
              size="lg"
              asFull
            >
              Rejouer 🔄
            </Button>
          </motion.div>
        )}
      </div>

      {/* Personalized alert */}
      <CustomAlert
        isVisible={showAlert}
        isCorrect={alertData.isCorrect}
        question={alertData.question}
        onClose={closeAlert}
      />
    </SectionLayout>
  );
}
