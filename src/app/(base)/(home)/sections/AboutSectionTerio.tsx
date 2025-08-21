"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import svgPaths from "./imports/svg-443r28gzus";

// Interface pour les questions
interface Question {
  id: number;
  emoji: string;
  title: string;
  description: string;
  isTrue: boolean;
  funFact?: string;
}

// Questions du quiz
const questions: Question[] = [
  {
    id: 1,
    emoji: "🎸",
    title: "J'ai joué dans un groupe de rock",
    description:
      "Pendant mes études, j'étais le guitariste principal d'un groupe qui a joué dans plusieurs bars locaux.",
    isTrue: false,
    funFact: "En réalité, je ne sais jouer que 3 accords de guitare ! 🎵",
  },
  {
    id: 2,
    emoji: "🌍",
    title: "J'ai visité 25 pays",
    description:
      "Mon passeport est rempli de tampons de tous les continents, sauf l'Antarctique.",
    isTrue: true,
    funFact:
      "Mon pays préféré était le Japon - la culture et la nourriture étaient incroyables ! 🍜",
  },
  {
    id: 3,
    emoji: "🥘",
    title: "Je peux cuisiner 50 plats différents",
    description:
      "De la cuisine française aux spécialités asiatiques, ma collection de recettes est impressionnante.",
    isTrue: true,
    funFact:
      "J'ai appris en regardant des vidéos YouTube pendant le confinement ! 👨‍🍳",
  },
  {
    id: 4,
    emoji: "🦈",
    title: "J'ai nagé avec des requins",
    description:
      "En Afrique du Sud, j'ai fait de la plongée en cage avec des grands blancs.",
    isTrue: false,
    funFact: "J'ai une peur bleue des requins - même dans un aquarium ! 🫣",
  },
];

// Composant pour l'emoji personnalisé
function CustomEmoji({
  isTrue,
  onClick,
  isActive,
  canAnswer,
  hasActiveQuestion,
}: {
  isTrue: boolean;
  onClick: () => void;
  isActive: boolean;
  canAnswer: boolean;
  hasActiveQuestion: boolean;
}) {
  const isAnswerButton = hasActiveQuestion && canAnswer;
  const imgEmojiFalse = "/emoji-false.png";
  const imgEmojiTrue = "/emoji-true.png";

  return (
    <motion.div
      className={`bg-[#f9f9f9] box-border content-stretch flex items-center justify-start overflow-clip p-[24px] relative rounded-[120px] shrink-0 cursor-pointer transition-all duration-300 ${
        isActive
          ? "ring-4 ring-blue-500 bg-blue-50"
          : isAnswerButton
          ? "hover:bg-green-50 hover:ring-2 hover:ring-green-300"
          : "hover:bg-gray-100"
      }`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative shrink-0 size-[88px]">
        <div
          className="absolute bg-center bg-cover bg-no-repeat inset-0"
          style={{
            backgroundImage: `url('${isTrue ? imgEmojiTrue : imgEmojiFalse}')`,
          }}
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

// Composant pour une carte de question
function QuestionCard({
  question,
  rotation,
  zIndex,
  isActive,
}: {
  question: Question;
  rotation: number;
  zIndex: number;
  isActive: boolean;
}) {
  return (
    <motion.div
      className="absolute bg-[#ffffff] h-[339px] rounded-[48px] w-[542px]"
      style={{
        zIndex,
        transformOrigin: "center center",
      }}
      initial={{ rotate: rotation }}
      animate={{
        rotate: isActive ? 0 : rotation,
        scale: isActive ? 1.1 : 1,
        x: isActive ? 0 : Math.sin((rotation * Math.PI) / 180) * 30,
        y: isActive ? -20 : Math.cos((rotation * Math.PI) / 180) * 15,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.6,
      }}
    >
      <div className="box-border content-stretch flex flex-col h-[339px] items-center justify-center overflow-clip px-4 py-[91px] relative w-[542px]">
        <div className="bg-[#ffffff] h-60 relative shrink-0 w-full">
          <div className="flex flex-col items-center justify-center overflow-clip relative size-full">
            <div className="box-border content-stretch flex flex-col gap-2.5 h-60 items-center justify-center px-[34px] py-0 relative w-full">
              <div className="content-stretch flex flex-col gap-[6.976px] items-start justify-start leading-[0] not-italic relative shrink-0 w-full">
                <div className="font-['SF_Pro_Display:Semibold',_sans-serif] leading-[1.2] relative shrink-0 text-[29.649px] text-[rgba(0,0,0,0.87)] tracking-[0.1216px] w-full text-center">
                  <p className="mb-0">{question.emoji}</p>
                  <p>{question.title}</p>
                </div>
                <div className="font-['SF_Pro_Display:Medium',_sans-serif] relative shrink-0 text-[18px] text-[rgba(0,0,0,0.38)] tracking-[0.0168px] w-full text-center">
                  <p className="leading-[1.2]">{question.description}</p>
                </div>
              </div>

              {isActive && (
                <motion.div
                  className="absolute bg-[#f9f9f9] box-border content-stretch flex gap-3 items-center justify-start overflow-clip p-[9.6px] right-[6px] rounded-[120px] top-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="relative shrink-0 size-6">
                    <svg
                      className="block size-full"
                      fill="none"
                      preserveAspectRatio="none"
                      viewBox="0 0 24 24"
                    >
                      <g>
                        <path
                          d={svgPaths.p27ad6300}
                          fill="var(--fill-0, #45454A)"
                        />
                        <path
                          d={svgPaths.p1c53ce80}
                          fill="var(--fill-0, #45454A)"
                          opacity="0.5"
                        />
                        <g>
                          <path
                            d={svgPaths.p38a88480}
                            fill="var(--fill-0, #45454A)"
                          />
                          <path
                            d={svgPaths.p32b767c0}
                            fill="var(--fill-0, #45454A)"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                </motion.div>
              )}
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
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
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
            Continuer
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function InteractiveFunFacts() {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number | null>(
    null
  );
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(
    new Set()
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

  const handleEmojiClick = (isTrue: boolean) => {
    if (!gameStarted) {
      setGameStarted(true);
    }

    // Si on a une question active, c'est une réponse
    if (activeQuestionIndex !== null) {
      const question = questions[activeQuestionIndex];
      const isCorrect = question.isTrue === isTrue;

      if (isCorrect) {
        setScore((prev) => prev + 1);
      }

      setAnsweredQuestions((prev) => new Set([...prev, question.id]));
      setAlertData({ isCorrect, question });
      setShowAlert(true);
      setActiveQuestionIndex(null);
    } else {
      // Sinon, on montre la première question non répondue
      const unansweredQuestionIndex = questions.findIndex(
        (q) => !answeredQuestions.has(q.id)
      );
      if (unansweredQuestionIndex !== -1) {
        setActiveQuestionIndex(unansweredQuestionIndex);
      }
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
    setAlertData({ isCorrect: false, question: null });
  };

  const resetGame = () => {
    setActiveQuestionIndex(null);
    setAnsweredQuestions(new Set());
    setScore(0);
    setGameStarted(false);
    setShowAllQuestions(false);
  };

  const handleShowAll = () => {
    if (!gameStarted) {
      setGameStarted(true);
    }
    setShowAllQuestions(!showAllQuestions);
    setActiveQuestionIndex(null);
  };

  const allQuestionsAnswered = answeredQuestions.size === questions.length;

  return (
    <div className="bg-[#ffffff] relative size-full">
      {/* Titre */}
      <div className="absolute content-stretch flex flex-col gap-4 items-center justify-start leading-[0] left-1/2 not-italic text-center top-[104px] translate-x-[-50%]">
        <div className="font-['SF_Pro_Display:Semibold',_sans-serif] relative shrink-0 text-[64px] text-[rgba(0,0,0,0.87)] text-nowrap tracking-[0.1408px]">
          <p className="leading-none whitespace-pre">
            4 faits amusants sur moi
          </p>
        </div>
        <div className="font-['SF_Pro_Display:Medium',_sans-serif] relative shrink-0 text-[34px] text-[rgba(0,0,0,0.6)] tracking-[0.0238px] w-[654px]">
          <p className="leading-[1.2]">{`L'un d'eux est un mensonge. 😋`}</p>
        </div>

        {gameStarted && (
          <motion.div
            className="mt-4 text-xl font-medium text-blue-600"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Score: {score}/{questions.length}
          </motion.div>
        )}
      </div>

      {/* Zone de jeu principale */}
      <div className="absolute content-center flex flex-wrap gap-6 items-center justify-between left-1/2 top-[298px] translate-x-[-50%] w-[1136px]">
        {/* Bouton Faux (gauche) */}
        <CustomEmoji
          isTrue={false}
          onClick={() => handleEmojiClick(false)}
          isActive={false}
          canAnswer={gameStarted}
          hasActiveQuestion={activeQuestionIndex !== null}
        />

        {/* Zone des cartes */}
        <div className="relative flex h-[427.27px] items-center justify-center w-[592.28px]">
          {questions.map((question, index) => (
            <QuestionCard
              key={question.id}
              question={question}
              rotation={
                index === 0 ? -10 : index === 1 ? 13.659 : index === 2 ? -5 : 8
              }
              zIndex={
                showAllQuestions
                  ? questions.length - index
                  : activeQuestionIndex === index
                  ? 10
                  : questions.length - index
              }
              isActive={showAllQuestions || activeQuestionIndex === index}
            />
          ))}
        </div>

        {/* Bouton Vrai (droite) */}
        <CustomEmoji
          isTrue={true}
          onClick={() => handleEmojiClick(true)}
          isActive={false}
          canAnswer={gameStarted}
          hasActiveQuestion={activeQuestionIndex !== null}
        />
      </div>

      {/* Bouton "Montrez-moi tout" */}
      <div
        className="absolute bg-[#2a2a2a] box-border content-stretch flex items-center justify-start overflow-clip px-6 py-[13px] rounded-xl top-[680px] translate-x-[-50%]"
        style={{ left: "calc(50% + 0px)" }}
      >
        <motion.button
          className="font-['SF_Pro_Text:Regular',_sans-serif] leading-[0] not-italic text-[#ffffff] text-[17px] text-nowrap tracking-[0.0731px] bg-transparent border-none cursor-pointer"
          onClick={handleShowAll}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <p className="leading-[22px] whitespace-pre">
            {showAllQuestions ? "Cacher tout 🙈" : "Montrez-moi tout 🦄"}
          </p>
        </motion.button>
      </div>

      {/* Instructions ou résultat final */}
      {!gameStarted && (
        <motion.div
          className="absolute left-1/2 top-[750px] translate-x-[-50%] text-center text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Clique sur les emojis pour commencer !
        </motion.div>
      )}

      {gameStarted && !allQuestionsAnswered && activeQuestionIndex !== null && (
        <motion.div
          className="absolute left-1/2 top-[750px] translate-x-[-50%] text-center text-blue-600 font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Clique sur l'emoji VRAI ou FAUX pour répondre ! 👆
        </motion.div>
      )}

      {allQuestionsAnswered && (
        <motion.div
          className="absolute left-1/2 top-[750px] translate-x-[-50%] text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-3xl font-bold text-green-600 mb-4">
            Félicitations ! 🎊
          </div>
          <div className="text-xl text-gray-700 mb-6">
            Score final: {score}/{questions.length}
          </div>
          <motion.button
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-medium text-lg transition-colors"
            onClick={resetGame}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Rejouer 🔄
          </motion.button>
        </motion.div>
      )}

      {/* Alerte personnalisée */}
      <CustomAlert
        isVisible={showAlert}
        isCorrect={alertData.isCorrect}
        question={alertData.question}
        onClose={closeAlert}
      />
    </div>
  );
}
