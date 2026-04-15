"use client";
import { useState, useEffect, useMemo } from "react";
import { cn } from "@/utils/utils";
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
import { useLocale, useTranslations } from "use-intl";
import { getGamesByLocale, type GameItem } from "@/types/personalData";

type Question = GameItem;

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
  // const imgEmojiFalse = getImageUrl(getEmojiHub("🤥", "fluent", "anim"));
  // const imgEmojiTrue = getImageUrl(getEmojiHub("😀", "fluent", "anim"));
  // const imgEmojiFalse = getImageUrl(getEmojiHub("🤥", "apple"));
  // const imgEmojiTrue = getImageUrl(getEmojiHub("😀", "apple"));

  return (
    <div
      className={cn(
        "relative bg-b-base border-4 border-b-base-accent content-stretch flex items-center justify-start p-4 md:p-6 rounded-full shrink-0 cursor-pointer transition-all duration-400",
        canAnswer
          ? isFalse
            ? "hover:bg-red-100 hover:border-red-500 dark:hover:border-red-400"
            : "hover:bg-green-100 hover:border-green-500 dark:hover:border-green-400"
          : "pointer-events-none cursor-default",
      )}
      onClick={onClick}
    >
      <div className="relative shrink-0 size-11 md:size-20">
        {/* <Image
          src={isFalse ? imgEmojiFalse : imgEmojiTrue}
          width={100}
          height={100}
          alt={isFalse ? "Emoji/True" : "Emoji/False"}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-300 pointer-events-none",
            !canAnswer && "opacity-50"
          )}
        /> */}
        <span
          className={cn(
            "size-full flex items-center justify-center  text-5xl md:text-7xl object-cover pointer-events-none",
            !canAnswer && "opacity-50",
          )}
        >
          {isFalse ? "🤥" : "😀"}
        </span>
        {canAnswer && (
          <span
            className={`absolute -top-2 -right-2 text-xs font-bold px-2 py-1 rounded-full text-white ${
              isFalse ? "bg-red-500" : "bg-green-500"
            }`}
          >
            {isFalse
              ? t(
                  "about.page.interactive-fun-facts-section.sections.guess-buttons.buttons.false",
                )
              : t(
                  "about.page.interactive-fun-facts-section.sections.guess-buttons.buttons.true",
                )}
          </span>
        )}
      </div>
    </div>
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
    const rotation = index * (index % 2 === 0 ? 1.5 : -1.5);
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
      rotate: rotation || (distanceFromCurrent % 2 === 0 ? 0.8 : -0.8),
      scale: 1 - distanceFromCurrent * 0.05,
      x,
      y,
      zIndex: totalQuestions - distanceFromCurrent,
    };
  };

  const transform = getCardTransform();

  return (
    <div
      className={cn("relative max-w-xl", index !== 0 && "absolute")}
      style={{
        zIndex: transform.zIndex,
        transformOrigin: "center center",
        transform: `rotate(${transform.rotate}deg) scale(${transform.scale}) translate(${transform.x}px, ${transform.y}px)`,
        opacity: isPast ? 0.8 : 1,
      }}
    >
      <Card className="squircle squircle-b-base squircle-4xl md:squircle-6xl squircle-smooth-xl border-0 overflow-hidden">
        <CardContent className="grid grid-cols-1 px-4 md:px-6 py-4 md:py-6 gap-4">
          <div
            className={cn(
              "flex relative flex-col min-h-60 items-center justify-center p-4 squircle squircle-smooth-xl squircle-xl md:squircle-3xl squircle-sh-white overflow-hidden",
            )}
          >
            <div className="flex flex-col items-start gap-4 w-full max-w-[90%] py-12 mx-auto">
              <Badge className="aspect-square p-4 rounded-full">
                <span className=" text-4xl">{question.emoji}</span>
              </Badge>
              <h3 className="text-3xl tracking-wide leading-[120%]">
                {question.title}
              </h3>

              <p className="text-b-white-invert-thr text-xl leading-[140%]">
                {question.description}
              </p>
              <p className="text-zinc-400 text-lg leading-[120%]">
                {question.subtitle}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
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
                    "about.page.interactive-fun-facts-section.sections.fact-alert.is-correct.true.title",
                  )
                : t(
                    "about.page.interactive-fun-facts-section.sections.fact-alert.is-correct.false.title",
                  )}
            </DialogTitle>

            <DialogDescription>
              {isCorrect
                ? t(
                    "about.page.interactive-fun-facts-section.sections.fact-alert.is-correct.true.description",
                  )
                : t(
                    "about.page.interactive-fun-facts-section.sections.fact-alert.is-correct.false.description",
                  )}
            </DialogDescription>
          </div>
        </DialogHeader>

        {question?.funFact && (
          <DialogCard variant="default" className="text-center">
            <DialogBadge variant="colored" className="mb-2">
              {t(
                "about.page.interactive-fun-facts-section.sections.fact-alert.response",
              )}{" "}
              🥸
            </DialogBadge>
            <p className="text-white-invert-fr">{question.funFact}</p>
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
    (fact) => guessedFacts[fact.id] !== undefined && guessedFacts[fact.id],
  ).length;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        size="xl"
        variant="modern"
        className="flex flex-col gap-4 md:gap-6 px-4 py-4.5 sm:max-h-[min(640px,80vh)]"
      >
        <DialogHeader>
          <DialogTitle className="text-base font-normal md:font-medium md:text-xl text-b-white-invert-sec">
            {t(
              "about.page.interactive-fun-facts-section.sections.facts-modal.title",
            )}
          </DialogTitle>
        </DialogHeader>

        <DialogSeparator />

        <div className="flex flex-col gap-4 px-2 overflow-y-auto max-h-[calc(100vh-200px)] scroll-smooth">
          {/* Score Section */}
          {totalGuessed > 0 && (
            <div>
              <DialogCard variant="default">
                <h5 className="font-bold mb-2">
                  🎯{" "}
                  {t(
                    "about.page.interactive-fun-facts-section.sections.facts-modal.score.title",
                    { score: correctGuesses, total: totalQuestions },
                  )}
                </h5>
                <p className="text-white-invert-fr">
                  {correctGuesses === totalQuestions
                    ? t(
                        "about.page.interactive-fun-facts-section.sections.facts-modal.score.state.good",
                      )
                    : correctGuesses > totalQuestions / 2
                      ? t(
                          "about.page.interactive-fun-facts-section.sections.facts-modal.score.state.medium",
                        )
                      : t(
                          "about.page.interactive-fun-facts-section.sections.facts-modal.score.state.bad",
                        )}
                </p>
              </DialogCard>
            </div>
          )}

          {/* Facts Grid */}
          {questions.map((question, index) => {
            const userGuessed = guessedFacts[question.id] !== undefined;
            const userGuessedCorrect = userGuessed && guessedFacts[question.id];

            return (
              <div key={question.id}>
                <DialogCard variant="default">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <h4 className="bg-b-white center leading-[140%] rounded-full p-2 aspect-square shrink-0">
                      {question.emoji}
                    </h4>

                    <div className="flex-1 min-w-0">
                      <h5 className="font-bold mb-1">{question.title}</h5>
                      <p className="text-base text-white-invert-fr mb-3">
                        {question.description}
                      </p>

                      {/* Badges */}
                      <div className="flex gap-2 flex-wrap">
                        <DialogBadge
                          variant="colored"
                          className={cn(
                            question.isTrue
                              ? "text-green-800 dark:text-green-400"
                              : "text-red-800 dark:text-red-500",
                          )}
                        >
                          {question.isTrue
                            ? t(
                                "about.page.interactive-fun-facts-section.sections.facts-modal.badge.fact.is-true",
                              )
                            : t(
                                "about.page.interactive-fun-facts-section.sections.facts-modal.badge.fact.is-false",
                              )}
                        </DialogBadge>

                        {userGuessed && (
                          <DialogBadge
                            className={cn(
                              userGuessedCorrect
                                ? "squircle-blue-100 text-blue-900"
                                : "squircle-orange-100 text-orange-900",
                            )}
                            variant="colored"
                          >
                            {userGuessedCorrect
                              ? t(
                                  "about.page.interactive-fun-facts-section.sections.facts-modal.badge.guessed.correct",
                                )
                              : t(
                                  "about.page.interactive-fun-facts-section.sections.facts-modal.badge.guessed.incorrect",
                                )}
                          </DialogBadge>
                        )}
                      </div>
                    </div>
                  </div>
                </DialogCard>
              </div>
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
    {},
  );
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState<{
    isCorrect: boolean;
    question: Question | null;
  }>({ isCorrect: false, question: null });
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(true);
  const [showAllFacts, setShowAllFacts] = useState(false);

  const questionsLocale = useMemo(() => getGamesByLocale(locale), [locale]);

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

      {showAllFacts && (
        <AllFactsModal
          isOpen={showAllFacts}
          onClose={() => setShowAllFacts(false)}
          questions={questionsLocale}
          guessedFacts={guessedFacts}
        />
      )}

      <div className="relative">
        {/* Responsive progression indicators */}
        <div className="flex gap-2 sm:gap-3 z-10">
          {questionsLocale.map((question, index) => {
            const isGuessed = guessedFacts[question.id] !== undefined;
            const isCorrect = isGuessed && guessedFacts[question.id];

            return (
              <div
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
                      : "bg-b-base border-b-base-accent",
                )}
              >
                {isGuessed && (
                  <span className="text-white text-[6px] sm:text-[8px]">
                    {isCorrect ? "✓" : "✗"}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
        {/* Show all facts button */}
        <Button
          onClick={() => {
            setShowAllFacts(true);
          }}
          asPointer
          whileTap
          size="lg"
          asFull
        >
          {allQuestionsAnswered
            ? hasGuessedFalse
              ? t(
                  "about.page.interactive-fun-facts-section.buttons.show-all.want-response.has-false",
                )
              : t(
                  "about.page.interactive-fun-facts-section.buttons.show-all.want-response.has-true",
                )
            : showAllFacts
              ? t(
                  "about.page.interactive-fun-facts-section.buttons.show-all.want-retry",
                )
              : t(
                  "about.page.interactive-fun-facts-section.buttons.show-all.want-response.has-true",
                )}
        </Button>

        {allQuestionsAnswered && (
          <div className="text-center">
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
          </div>
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
