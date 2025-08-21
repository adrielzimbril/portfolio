"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import svgPaths from "./imports/svg-443r28gzus";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { toast } from "sonner";
import { SectionLayout } from "@/components/shared/sections/layout";
import { Button } from "@/components/ui/button";

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

// Questions du quiz
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

// Composant pour l'emoji personnalisé
function CustomEmoji({
  isTrue,
  onClick,
  canAnswer,
  hasActiveQuestion,
}: {
  isTrue: boolean;
  onClick: () => void;
  canAnswer: boolean;
  hasActiveQuestion: boolean;
}) {
  const isAnswerButton = hasActiveQuestion && canAnswer;
  const imgEmojiFalse = "/emoji-false.png";
  const imgEmojiTrue = "/emoji-true.png";

  return (
    <motion.div
      className={`bg-[#f9f9f9] box-border content-stretch flex items-center justify-start overflow-clip p-[24px] relative rounded-[120px] shrink-0 cursor-pointer transition-all duration-300 ${
        isAnswerButton
          ? "hover:bg-green-50 hover:ring-2 hover:ring-green-300"
          : "hover:bg-gray-100"
      }`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative shrink-0 size-[88px]">
        {/* <div
          className="absolute bg-center bg-cover bg-no-repeat inset-0"
          style={{
            backgroundImage: `url('${isTrue ? imgEmojiTrue : imgEmojiFalse}')`,
          }}
        /> */}
        <Image
          src={isTrue ? imgEmojiTrue : imgEmojiFalse}
          width={100}
          height={100}
          alt="Emoji/True"
          className={cn(
            "w-full h-full object-cover transition-opacity duration-300 pointer-events-none"
          )}
        />
        {isAnswerButton && (
          <motion.div
            className={`absolute -top-2 -right-2 text-xs font-bold px-2 py-1 rounded-full text-white ${
              isTrue ? "bg-green-500" : "bg-red-500"
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            {isTrue ? "VRAI" : "FAUX"}
          </motion.div>
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
  showAllQuestions,
}: {
  question: Question;
  index: number;
  currentQuestionIndex: number;
  totalQuestions: number;
  showAllQuestions: boolean;
}) {
  const isActive = index === currentQuestionIndex;
  const isPast = index < currentQuestionIndex;

  // Calculate rotation and position
  const getCardTransform = () => {
    const rotation = index * (index % 2 === 0 ? 4 : -4);
    const x = Math.sin(((rotation * Math.PI) / 180) * 40);
    const y = Math.cos(((rotation * Math.PI) / 180) * 20);

    if (showAllQuestions) {
      // Show all questions mode - all cards visible with rotations
      return {
        rotate: rotation || 0,
        scale: index === 0 ? 1.1 : 1,
        x,
        y,
        zIndex: totalQuestions - index,
      };
    }

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
      scale: 1 - distanceFromCurrent * 0.05,
      x,
      y,
      zIndex: totalQuestions - distanceFromCurrent,
    };
  };

  const transform = getCardTransform();

  return (
    <motion.div
      className="absolute bg-[#ffffff] h-[339px] rounded-[48px] w-[542px]"
      style={{
        zIndex: transform.zIndex,
        transformOrigin: "center center",
      }}
      animate={{
        rotate: transform.rotate,
        scale: transform.scale,
        x: transform.x,
        y: transform.y,
        opacity: isPast && !showAllQuestions ? 0.3 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.8,
      }}
    >
      <div className="box-border content-stretch flex flex-col h-[339px] items-center justify-center overflow-clip px-4 py-[91px] relative w-[542px]">
        <div className="bg-[#ffffff] h-60 relative shrink-0 w-full">
          <div className="flex flex-col items-center justify-center overflow-clip relative size-full">
            <div className="box-border content-stretch flex flex-col gap-2.5 h-60 items-center justify-center px-[34px] py-0 relative w-full">
              <div className="content-stretch flex flex-col gap-[6.976px] items-start justify-start leading-[0] not-italic relative shrink-0 w-full">
                <div className="font-['SF_Pro_Display:Semibold',_sans-serif] leading-[1.2] relative shrink-0 text-[29.649px] text-[rgba(0,0,0,0.87)] tracking-[0.1216px] w-full text-center">
                  <h2 className="mb-4">{question.emoji}</h2>
                  <h4>{question.title}</h4>
                </div>
                <div className="font-['SF_Pro_Display:Medium',_sans-serif] relative shrink-0 text-[18px] text-[rgba(0,0,0,0.38)] tracking-[0.0168px] w-full text-center">
                  <p className="leading-[1.2]">{question.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute border-[#f9f9f9] border-[16px] border-solid inset-0 pointer-events-none rounded-[48px]"
      />
    </motion.div>
  );
}

// Composant pour l'alerte personnalisée
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
          className={`bg-white rounded-3xl p-8 max-w-md mx-4 text-center ${
            isCorrect ? "border-4 border-green-500" : "border-4 border-red-500"
          }`}
          initial={{ scale: 0.5, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.5, y: 50 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-6xl mb-4">{isCorrect ? "🎉" : "😅"}</div>

          <h3
            className={`text-2xl font-bold mb-3 ${
              isCorrect ? "text-green-600" : "text-red-600"
            }`}
          >
            {isCorrect ? "Bravo !" : "Pas tout à fait !"}
          </h3>

          <p className="text-gray-700 mb-4">
            {isCorrect
              ? "Tu as trouvé la bonne réponse ! 🎯"
              : "Ce n'était pas la bonne réponse... 🤔"}
          </p>

          {question.funFact && (
            <div className="bg-blue-50 p-4 rounded-xl">
              <p className="text-sm text-blue-800 font-medium mb-2">
                Fun Fact :
              </p>
              <p className="text-blue-700">{question.funFact}</p>
            </div>
          )}

          <motion.button
            className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-medium transition-colors"
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isCorrect ? "Continuer" : "Essayer encore"}
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
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
  const correctGuesses = questions.filter(
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
          {questions.map((question, index) => {
            const userGuessed = guessedFacts[question.id] !== undefined;
            const userGuessCorrect =
              userGuessed && guessedFacts[question.id] === question.isTrue;

            return (
              <motion.div
                key={question.id}
                className={`p-3 sm:p-4 rounded-[12px] sm:rounded-[16px] border-2 ${
                  userGuessed
                    ? userGuessCorrect
                      ? "border-green-200 bg-green-50"
                      : "border-red-200 bg-red-50"
                    : question.isTrue
                    ? "border-green-200 bg-green-50"
                    : "border-red-200 bg-red-50"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-start gap-2 sm:gap-3">
                  <span className="text-[24px] sm:text-[32px]">
                    {question.emoji}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[16px] sm:text-[20px] font-semibold text-[rgba(0,0,0,0.87)] mb-1">
                      {question.title}
                    </h3>
                    <p className="text-[14px] sm:text-[16px] text-[rgba(0,0,0,0.6)] mb-2">
                      {question.subtitle}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      <span
                        className={`inline-block px-2 sm:px-3 py-1 rounded-full text-[12px] sm:text-[14px] font-medium ${
                          question.isTrue
                            ? "bg-green-200 text-green-800"
                            : "bg-red-200 text-red-800"
                        }`}
                      >
                        {question.isTrue ? "✅ Vrai" : "❌ Mensonge"}
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

export default function InteractiveFunFacts() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(
    new Set()
  );
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
  const [gameStarted, setGameStarted] = useState(false);
  const [showAllQuestions, setShowAllQuestions] = useState(false);
  const [showAllFacts, setShowAllFacts] = useState(false);

  const handleEmojiClick = (isTrue: boolean) => {
    if (showAllQuestions) {
      setShowAllQuestions(false);
      return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion || answeredQuestions.has(currentQuestion.id)) {
      return;
    }

    const isCorrect = currentQuestion.isTrue === isTrue;

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setAnsweredQuestions((prev) => new Set([...prev, currentQuestion.id]));
    setGuessedFacts((prev) => ({ ...prev, [currentQuestion.id]: isTrue }));
    setAlertData({ isCorrect, question: currentQuestion });
    setShowAlert(true);
  };

  const closeAlert = () => {
    setShowAlert(false);
    setAlertData({ isCorrect: false, question: null });

    // Passer à la question suivante après fermeture de l'alerte
    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
      }, 300);
    }
  };

  const resetGame = () => {
    setCurrentQuestionIndex(0);
    setAnsweredQuestions(new Set());
    setGuessedFacts({});
    setScore(0);
    setGameStarted(true);
    setShowAllQuestions(false);
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

  const allQuestionsAnswered = answeredQuestions.size === questions.length;
  const canAnswer = gameStarted && !showAllQuestions && !allQuestionsAnswered;
  const badgeOld = gameStarted
    ? `Score: ${score}/${questions.length} | Question ${Math.min(
        currentQuestionIndex + 1,
        questions.length
      )}/${questions.length}`
    : "Jouons";
  const badge =
    gameStarted || showAllQuestions
      ? `Score: ${score}/${questions.length}`
      : "Jouons";

  return (
    <SectionLayout
      className={cn("relative w-full py-[104px]")}
      isFlex
      badge={`${badge} 🤭`}
      title="Faits amusants sur moi"
      description="L'un d'eux est un mensonge que tu devras deviner, essaie de ne pas te tromper 🤭"
    >
      {/* Titre */}
      {/* <div className="content-stretch flex flex-col gap-4 items-center justify-start leading-[0] left-1/2 not-italic text-center top-[104px] translate-x-[-50%]">
          {gameStarted && (
            <motion.div
              className="mt-4 text-xl font-medium text-blue-600"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {badge}
            </motion.div>
          )}
        </div> */}

      {/* Zone de jeu principale */}
      <div className="content-center flex flex-wrap gap-6 items-center justify-between w-[1136px]">
        {/* Bouton Faux (gauche) */}
        <CustomEmoji
          isTrue={false}
          onClick={() => handleEmojiClick(false)}
          canAnswer={canAnswer}
          hasActiveQuestion={canAnswer}
        />

        {/* Zone des cartes */}
        <div className="relative flex h-[427.27px] items-center justify-center w-[592.28px] overflow-hiddens">
          {questions.map((question, index) => (
            <QuestionCard
              key={question.id}
              question={question}
              index={index}
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={questions.length}
              showAllQuestions={showAllQuestions}
            />
          ))}
        </div>

        {/* Bouton Vrai (droite) */}
        <CustomEmoji
          isTrue={true}
          onClick={() => handleEmojiClick(true)}
          canAnswer={canAnswer}
          hasActiveQuestion={canAnswer}
        />
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

      {allQuestionsAnswered && (
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-3xl font-bold text-green-600 mb-4">
            Félicitations ! 🎊
          </div>
          <div className="text-xl text-gray-700 mb-6">
            Score final: {score}/{questions.length}
          </div>
        </motion.div>
      )}

      <div className="relative">
        {/* Indicateurs de progression responsives */}
        <div className="flex gap-2 sm:gap-3 z-10">
          {questions.map((question, index) => {
            const isGuessed = guessedFacts[question.id] !== undefined;
            const isCorrect =
              isGuessed && guessedFacts[question.id] === question.isTrue;

            return (
              <motion.div
                key={index}
                className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full cursor-pointer border-2 flex items-center justify-center ${
                  index === currentQuestionIndex
                    ? "bg-[#2a2a2a] border-[#2a2a2a]"
                    : isGuessed
                    ? isCorrect
                      ? "bg-green-500 border-green-500"
                      : "bg-red-500 border-red-500"
                    : "bg-[rgba(0,0,0,0.2)] border-[rgba(0,0,0,0.2)]"
                }`}
                whileHover={{ scale: 1.3 }}
                onClick={() => setCurrentQuestionIndex(index)}
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

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 z-10 px-4">
        {/* Bouton "Montrez-moi tout" */}
        <Button
          onClick={() => setShowAllFacts(true)}
          asPointer
          whileTap
          size="lg"
        >
          {allQuestionsAnswered
            ? "Montrez-moi tout 🦄"
            : showAllQuestions
            ? "Reprendre le quiz 🔄"
            : "Montrez-moi tout 🦄"}
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
            >
              Rejouer 🔄
            </Button>
          </motion.div>
        )}
      </div>
      {/* Instructions ou résultat final */}
      {!gameStarted && (
        <motion.div
          className="text-center text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Clique sur les emojis pour commencer !
        </motion.div>
      )}

      {gameStarted && !allQuestionsAnswered && !showAllQuestions && (
        <motion.div
          className="text-center text-blue-600 font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Clique sur l'emoji VRAI ou FAUX pour répondre ! 👆
        </motion.div>
      )}

      {showAllQuestions && (
        <motion.div
          className="text-center text-purple-600 font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Voici toutes les questions ! Clique sur "Reprendre le quiz" pour
          continuer 🎯
        </motion.div>
      )}

      {/* Alerte personnalisée */}
      <CustomAlert
        isVisible={showAlert}
        isCorrect={alertData.isCorrect}
        question={alertData.question}
        onClose={closeAlert}
      />
    </SectionLayout>
  );
}
