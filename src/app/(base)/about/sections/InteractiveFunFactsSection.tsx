"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/utils/utils";
import Image from "next/image";
import { toast } from "sonner";
import { SectionLayout } from "@/components/shared/sections/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogCard,
  DialogBadge,
  DialogFooter,
  DialogSeparator,
} from "@/components/ui/dialog";
import posthog from "posthog-js";
import { useLocale, useTranslations } from "use-intl";
import { Locale } from "@/types";

// Interface pour les questions
interface Question {
  id: number;
  locale: Locale;
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
    locale: Locale.FR,
    emoji: "💣",
    title: "J'ai détruit un SaaS rentable",
    description: "J’ai fermé un projet qui faisait de l’argent.",
    subtitle: "Un choix volontaire, pas une erreur.",
    isTrue: true,
    funFact:
      "C'était un projet qui rapportait, mais qui ne me ressemblait pas.",
    funnyTruthMessage:
      "Exact! 🎯 Parfois il faut détruire pour mieux reconstruire.",
    funnyLieMessage: "Ahah non, là c'est bien réel… 💥",
  },
  {
    id: 2,
    locale: Locale.FR,
    emoji: "🍕",
    title: "Mon premier client m’a payé en pizzas",
    description: "Au lieu de me donner de l’argent, il m’a offert des pizzas.",
    subtitle: "Pepperoni > facture ?",
    isTrue: false,
    funFact:
      "J'ai eu des petits budgets… mais toujours en cash, jamais en mozzarella.",
    funnyTruthMessage: "Bien vu! 🎯 C'était faux, jamais payé en pizza.",
    funnyLieMessage:
      "Haha, tu m'as cru! 😅 Mais non, je préfère l'argent aux parts de pizza.",
  },
  {
    id: 3,
    locale: Locale.FR,
    emoji: "🚀",
    title: "4 SaaS présentés, 4 sélectionnés",
    description:
      "Mes 4 projets ont passé les premières phases d’un incubateur.",
    subtitle: "Mission validée!",
    isTrue: true,
    funFact: "C'était avec le programme Y’ELLO Startup.",
    funnyTruthMessage: "Exact! 🎯 Une de mes plus belles validations.",
    funnyLieMessage: "Ah non, celui-là est vrai 😉",
  },
  {
    id: 4,
    locale: Locale.FR,
    emoji: "🚫",
    title: "Je déteste les beaux designs inutiles",
    description: "Un mockup magnifique mais jamais codé, ça ne sert à rien.",
    subtitle: "Forme ≠ fond.",
    isTrue: true,
    funFact:
      "Un design non UX-ready ou inaccessible est une cata pour l’utilisateur, même s’il est joli.",
    funnyTruthMessage: "Exact! 🎯 L’esthétique seule ne me séduit pas.",
    funnyLieMessage: "Ah non, c’est vrai… j’ai horreur de ça.",
  },
  {
    id: 5,
    locale: Locale.FR,
    emoji: "🧀",
    title: "J'adore le fromage, j'en mange tous les jours",
    description: "Gourmand en mozzarella, je ne peux pas m'en passer.",
    subtitle: "Fromage addict.",
    isTrue: true,
    funFact: "Je peux en manger à chaque repas, sans jamais me lasser.",
    funnyTruthMessage: "Exact! 🎯 Le fromage, c’est ma faiblesse.",
    funnyLieMessage: "Ah non, c’est vrai… 🧀 forever.",
  },
  {
    id: 6,
    locale: Locale.FR,
    emoji: "😮‍💨",
    title: "J’ai failli arrêter le code à 18 ans",
    description: "Burnout, plus envie de toucher un clavier.",
    subtitle: "Presque la fin, mais pas tout à fait.",
    isTrue: true,
    funFact: "Ce break m’a recentré sur le produit et le design.",
    funnyTruthMessage: "Exact! 🎯 Ça m'a permis de revenir plus fort.",
    funnyLieMessage: "Ah non, c'est vrai… et dur à vivre.",
  },
  {
    id: 7,
    locale: Locale.FR,
    emoji: "🎨",
    title: "Le design m’a appris la discipline",
    description: "Reproduire, ajuster, recommencer encore et encore.",
    subtitle: "Design = rigueur.",
    isTrue: true,
    funFact:
      "Le design m’a appris la patience et la précision plus que le code.",
    funnyTruthMessage: "Exact! 🎯 C’est mon école invisible.",
    funnyLieMessage: "Non non, celui-là est vrai.",
  },
  {
    id: 8,
    locale: Locale.FR,
    emoji: "🎤",
    title: "J’ai appris le design en clonant des sites de rappeurs",
    description: "Je m’entraînais en refaisant leurs pages pour le fun.",
    subtitle: "Training mode.",
    isTrue: false,
    funFact:
      "J’ai appris le design autrement, mais pas avec des sites de rappeurs.",
    funnyTruthMessage: "Bien vu! 🎯 Ce n’était qu’un mensonge.",
    funnyLieMessage: "Haha tu m'as cru! 😅 Mais non, pas de sites de rappeurs.",
  },
  {
    id: 9,
    locale: Locale.FR,
    emoji: "🖼️",
    title: "J’ai recopié 50 designs sur Dribbble",
    description:
      "J’ai progressé en design en reproduisant les sites de mes designers préférés.",
    subtitle: "50 clones plus tard…",
    isTrue: true,
    funFact: "C’était ma meilleure école: observer et reproduire.",
    funnyTruthMessage: "Exact! 🎯 C’était mon entraînement intensif.",
    funnyLieMessage: "Non non, c'est bien vrai 😉",
  },
  {
    id: 10,
    locale: Locale.FR,
    emoji: "🏦",
    title: "Je veux créer une néobanque un jour",
    description: "Pas juste une app, une vraie banque digitale.",
    subtitle: "Projet long terme.",
    isTrue: false,
    funFact:
      "Je garde ça privé pour l’instant, mais disons que ce n’est pas mon projet actuel.",
    funnyTruthMessage: "Bien vu! 🎯 Ce n’est pas mon projet officiel.",
    funnyLieMessage: "Haha, tu m'as cru? 😅 Mais non, pas encore de néobanque.",
  },
  {
    id: 11,
    locale: Locale.FR,
    emoji: "🔤",
    title: "Toutes mes marques commencent par A",
    description: "Je ne lance que des noms en A.",
    subtitle: "Alphabet power.",
    isTrue: false,
    funFact:
      "J’adore les noms en A (flow, mémorisation), mais ce n’est pas une règle stricte.",
    funnyTruthMessage: "Bien vu! 🎯 J’aime les 'A' mais je ne suis pas rigide.",
    funnyLieMessage:
      "Haha tu m'as cru? 😅 Pas toutes mes marques commencent par A.",
  },
  {
    id: 12,
    locale: Locale.FR,
    emoji: "😭",
    title: "J’ai pleuré devant une erreur 500",
    description: "Après deux jours de blocage, c’était juste un ';' oublié.",
    subtitle: "Le drame du dev.",
    isTrue: true,
    funFact: "Une ligne, deux jours de ma vie perdus. Lesson learned.",
    funnyTruthMessage: "Exact! 🎯 C’était douloureux mais formateur.",
    funnyLieMessage: "Ah non, c'est bien vrai 😅",
  },
  {
    id: 13,
    locale: Locale.FR,
    emoji: "🎰",
    title: "Mon domaine est devenu un site de casino",
    description:
      "J’ai oublié de renouveler un domaine, il a fini en machines à sous.",
    subtitle: "Jackpot?",
    isTrue: true,
    funFact: "C’était un ancien domaine d’un projet perso. Gros fail.",
    funnyTruthMessage: "Exact! 🎯 Ça pique quand ça arrive.",
    funnyLieMessage: "Non non, c’est vrai… et douloureux.",
  },
  {
    id: 14,
    locale: Locale.FR,
    emoji: "🧑‍💻",
    title: "Je rêve de créer un langage qui porte mon prénom",
    description: "Imagine 'AdrielLang', ça sonne bien non?",
    subtitle: "Geek dream.",
    isTrue: false,
    funFact:
      "J’aimerais, mais ce n’est pas dans mes plans concrets (pour l’instant).",
    funnyTruthMessage: "Bien vu! 🎯 Pas encore de 'AdrielLang'.",
    funnyLieMessage: "Haha tu m'as cru! 😅 Non non, pas de langage maison.",
  },
  {
    id: 15,
    locale: Locale.FR,
    emoji: "🐢",
    title: "Mon premier PC mettait 10 minutes à démarrer",
    description: "Je devais attendre une éternité avant de coder.",
    subtitle: "Patience mode.",
    isTrue: true,
    funFact:
      "Celeron 1.10ghz, impossible de lancer un serveur Next.js. Une vraie tortue.",
    funnyTruthMessage: "Exact! 🎯 Ça forge la patience du dev.",
    funnyLieMessage: "Ah non, c'est bien vrai 😉",
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
  const t = useTranslations();
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
            {isFalse
              ? t(
                  "about.page.interactive-fun-facts-section.sections.guess-buttons.buttons.false"
                )
              : t(
                  "about.page.interactive-fun-facts-section.sections.guess-buttons.buttons.true"
                )}
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
        scale: 1,
        x,
        y,
        zIndex: 20,
      };
    }

    if (isPast) {
      // Past cards - shifted to the left
      return {
        rotate: rotation || 0,
        scale: 0.9,
        x,
        y,
        zIndex: totalQuestions - index,
      };
    }

    // Future cards - stacked behind with rotation
    const distanceFromCurrent = index - currentQuestionIndex;
    return {
      rotate: rotation || (distanceFromCurrent % 2 === 0 ? 2 : -2),
      scale: 1 - distanceFromCurrent * 0.05,
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
      <Card className="squircle squircle-b-base squircle-6xl squircle-smooth-xl border-0 overflow-hidden">
        <CardContent className="grid grid-cols-1 px-4 md:px-6 py-4 md:py-6 gap-4">
          <div
            className={cn(
              "flex relative flex-col min-h-60 items-center justify-center p-4 squircle squircle-smooth-xl squircle-xl md:squircle-3xl squircle-b-white overflow-hidden"
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

// Custom Alert Component with Dialog
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
  const t = useTranslations();
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <Dialog open={isVisible} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        size="sm"
        variant="modern"
        className="text-center"
        closeButton={false}
      >
        <DialogHeader>
          <div className="relative flex flex-col gap-2 items-center justify-center">
            <h3 className="mb-2 text-4xl">{isCorrect ? "🎉" : "😅"}</h3>

            <DialogTitle
              className={cn("font-bold", {
                "text-green-600": isCorrect,
                "text-red-600": !isCorrect,
              })}
            >
              {isCorrect
                ? t(
                    "about.page.interactive-fun-facts-section.sections.fact-alert.is-correct.true.title"
                  )
                : t(
                    "about.page.interactive-fun-facts-section.sections.fact-alert.is-correct.false.title"
                  )}
            </DialogTitle>

            <DialogDescription>
              {isCorrect
                ? t(
                    "about.page.interactive-fun-facts-section.sections.fact-alert.is-correct.true.description"
                  )
                : t(
                    "about.page.interactive-fun-facts-section.sections.fact-alert.is-correct.false.description"
                  )}
            </DialogDescription>
          </div>
        </DialogHeader>

        {question?.funFact && (
          <DialogCard variant="default" className="text-center">
            <DialogBadge variant="colored" className="mb-2">
              {t(
                "about.page.interactive-fun-facts-section.sections.fact-alert.response"
              )}{" "}
              🥸
            </DialogBadge>
            <p className="text-zinc-800">{question.funFact}</p>
          </DialogCard>
        )}

        <DialogFooter>
          <Button onClick={onClose} asFull asPointer whileTap>
            {isCorrect
              ? `${t("common.button.continue")} 😍`
              : `${t("common.button.retry")} 😩`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// All Facts Modal Component with Dialog
function AllFactsModal({
  isOpen,
  onClose,
  guessedFacts,
  questions,
}: {
  isOpen: boolean;
  onClose: () => void;
  guessedFacts: { [key: number]: boolean };
  questions: Question[];
}) {
  const t = useTranslations();
  const totalGuessed = Object.keys(guessedFacts).length;
  const totalQuestions = questions.length;
  const correctGuesses = questions.filter(
    (fact) => guessedFacts[fact.id] !== undefined && guessedFacts[fact.id]
  ).length;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        size="xl"
        variant="modern"
        className="flex flex-col gap-4 md:gap-6 p-4 sm:max-h-[min(640px,80vh)]"
      >
        <DialogHeader>
          <DialogTitle className="text-base font-normal md:font-medium md:text-xl text-b-white-invert-sec">
            {t(
              "about.page.interactive-fun-facts-section.sections.facts-modal.title"
            )}
          </DialogTitle>
        </DialogHeader>

        <DialogSeparator />

        <div className="flex flex-col gap-4 px-2 overflow-y-auto  max-h-[calc(100vh-200px)] scroll-smooth">
          {/* Score Section */}
          {totalGuessed > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <DialogCard variant="default">
                <h5 className="font-bold mb-2">
                  🎯{" "}
                  {t(
                    "about.page.interactive-fun-facts-section.sections.facts-modal.score.title",
                    { score: correctGuesses, total: totalQuestions }
                  )}
                </h5>
                <p className="text-gray-700">
                  {correctGuesses === totalQuestions
                    ? t(
                        "about.page.interactive-fun-facts-section.sections.facts-modal.score.state.good"
                      )
                    : correctGuesses > totalQuestions / 2
                      ? t(
                          "about.page.interactive-fun-facts-section.sections.facts-modal.score.state.medium"
                        )
                      : t(
                          "about.page.interactive-fun-facts-section.sections.facts-modal.score.state.bad"
                        )}
                </p>
              </DialogCard>
            </motion.div>
          )}

          {/* Facts Grid */}
          {questions.map((question, index) => {
            const userGuessed = guessedFacts[question.id] !== undefined;
            const userGuessedCorrect = userGuessed && guessedFacts[question.id];

            return (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                <DialogCard variant="default">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <h4 className="bg-white center leading-[140%] rounded-full p-2 aspect-square shrink-0">
                      {question.emoji}
                    </h4>

                    <div className="flex-1 min-w-0">
                      <h5 className="font-bold mb-1">{question.title}</h5>
                      <p className="text-base text-gray-700 mb-3">
                        {question.description}
                      </p>

                      {/* Badges */}
                      <div className="flex gap-2 flex-wrap">
                        <DialogBadge
                          variant="colored"
                          className={cn(
                            question.isTrue ? "text-green-800" : "text-red-800"
                          )}
                        >
                          {question.isTrue
                            ? t(
                                "about.page.interactive-fun-facts-section.sections.facts-modal.badge.fact.is-true"
                              )
                            : t(
                                "about.page.interactive-fun-facts-section.sections.facts-modal.badge.fact.is-false"
                              )}
                        </DialogBadge>

                        {userGuessed && (
                          <DialogBadge
                            className={cn(
                              userGuessedCorrect
                                ? "squircle-blue-100 text-blue-900"
                                : "squircle-orange-100 text-orange-900"
                            )}
                            variant="colored"
                          >
                            {userGuessedCorrect
                              ? t(
                                  "about.page.interactive-fun-facts-section.sections.facts-modal.badge.guessed.correct"
                                )
                              : t(
                                  "about.page.interactive-fun-facts-section.sections.facts-modal.badge.guessed.incorrect"
                                )}
                          </DialogBadge>
                        )}
                      </div>
                    </div>
                  </div>
                </DialogCard>
              </motion.div>
            );
          })}
        </div>

        <DialogSeparator />

        <DialogFooter>
          <Button onClick={onClose} size="lg" whileTap asPointer asFull>
            {t("common.button.understood")} 😊
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Interactive Fun Facts Component
export function InteractiveFunFacts() {
  const t = useTranslations();
  const locale = useLocale();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [guessedFacts, setGuessedFacts] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState<{
    isCorrect: boolean;
    question: Question | null;
  }>({ isCorrect: false, question: null });
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(true);
  const [showAllFacts, setShowAllFacts] = useState(false);
  const questionsLocale = questions.filter(
    (question) => question.locale === locale
  );

  // Derive calculations based on guessedFacts
  const answeredQuestionsCount = Object.keys(guessedFacts).length;
  const allQuestionsAnswered =
    answeredQuestionsCount === questionsLocale.length;

  // Verify if there is a false in the guessed answers
  const hasGuessedFalse = Object.values(guessedFacts).includes(false);

  const handleEmojiClick = (isTrue: boolean) => {
    const currentQuestion = questionsLocale[currentQuestionIndex];
    if (!currentQuestion || guessedFacts[currentQuestion.id] !== undefined) {
      return;
    }

    const isCorrect = currentQuestion.isTrue === isTrue;

    posthog.capture("fun-fact-guess-submitted", {
      question_id: currentQuestion.id,
      question_title: currentQuestion.title,
      user_guess: isTrue ? "true" : "false",
      is_correct: isCorrect,
    });

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
    if (currentQuestionIndex < questionsLocale.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
      }, 300);
    }
  };

  const resetGame = () => {
    posthog.capture("fun-facts-game-reset", {
      final_score: score,
      total_questions: questionsLocale.length,
    });
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
      ? `${t("about.page.interactive-fun-facts-section.badge-score")}: ${score}/${questionsLocale.length}`
      : t("about.page.interactive-fun-facts-section.badge");

  return (
    <SectionLayout
      isFlex
      badge={t("about.page.interactive-fun-facts-section.badge") ?? badge}
      //badge={`${badge} 🤭`}
      title={t("about.page.interactive-fun-facts-section.title")}
      description={t("about.page.interactive-fun-facts-section.description")}
    >
      {/* Main Game Zone */}
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

        {/* Cards Zone */}
        <div className="relative flex items-center justify-center order-1 sm:order-2 size-full py-8 md:py-14">
          {questionsLocale.map((question, index) => (
            <QuestionCard
              key={question.id}
              question={question}
              index={index}
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={questionsLocale.length}
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
            questions={questionsLocale}
            guessedFacts={guessedFacts}
          />
        )}
      </AnimatePresence>

      <div className="relative">
        {/* Responsive progression indicators */}
        <div className="flex gap-2 sm:gap-3 z-10">
          {questionsLocale.map((question, index) => {
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
                      : "bg-b-base border-zinc-200"
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
          onClick={() => {
            setShowAllFacts(true);
            posthog.capture("fun-facts-answers-viewed", {
              score: score,
              total_questions: questionsLocale.length,
              answered_questions_count: answeredQuestionsCount,
            });
          }}
          asPointer
          whileTap
          size="lg"
          asFull
        >
          {allQuestionsAnswered
            ? hasGuessedFalse
              ? t(
                  "about.page.interactive-fun-facts-section.buttons.show-all.want-response.has-false"
                )
              : t(
                  "about.page.interactive-fun-facts-section.buttons.show-all.want-response.has-true"
                )
            : showAllFacts
              ? t(
                  "about.page.interactive-fun-facts-section.buttons.show-all.want-retry"
                )
              : t(
                  "about.page.interactive-fun-facts-section.buttons.show-all.want-response.has-true"
                )}
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
              {t("about.page.interactive-fun-facts-section.buttons.retry")}
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
