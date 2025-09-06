"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Linkedin,
  ExternalLink,
} from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  testimonial: string;
  linkedinUrl?: string;
  websiteUrl?: string;
  avatar?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sophie Martin",
    position: "CEO",
    company: "TechStart",
    testimonial:
      "Adriel a transformé notre vision en une solution concrète qui génère des résultats exceptionnels. Son expertise en IA et sa compréhension des enjeux business sont remarquables.",
    linkedinUrl: "https://linkedin.com/in/sophiemartin",
    avatar: "SM",
  },
  {
    id: 2,
    name: "Marc Dubois",
    position: "Directeur Marketing",
    company: "InnovateCorp",
    testimonial:
      "L'automatisation mise en place par Adriel nous a fait gagner 40% de temps sur nos processus d'acquisition client. Un travail de qualité professionnelle.",
    linkedinUrl: "https://linkedin.com/in/marcdubois",
    avatar: "MD",
  },
  {
    id: 3,
    name: "Claire Rousseau",
    position: "Fondatrice",
    company: "GrowthLab",
    testimonial:
      "Collaborer avec Adriel, c'est avoir accès à une expertise rare. Il comprend parfaitement les défis des entrepreneurs et propose des solutions innovantes.",
    websiteUrl: "https://growthlab.com",
    avatar: "CR",
  },
  {
    id: 4,
    name: "Thomas Leroy",
    position: "CTO",
    company: "DataFlow",
    testimonial:
      "Adriel maîtrise parfaitement les technologies IA et sait les appliquer de manière pragmatique. Nos résultats parlent d'eux-mêmes : +250% de conversion.",
    linkedinUrl: "https://linkedin.com/in/thomasleroy",
    avatar: "TL",
  },
  {
    id: 5,
    name: "Emma Moreau",
    position: "Head of Growth",
    company: "ScaleUp",
    testimonial:
      "Une collaboration fluide et des résultats au-delà de nos attentes. Adriel a su créer une solution sur mesure qui s'adapte parfaitement à nos besoins.",
    linkedinUrl: "https://linkedin.com/in/emmamoreau",
    avatar: "EM",
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
    filter: "blur(4px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
    filter: "blur(4px)",
  }),
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

function TestimonialCard({
  testimonial,
  direction,
}: {
  testimonial: Testimonial;
  direction: number;
}) {
  return (
    <motion.div
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="absolute inset-0 flex flex-col justify-center text-center max-w-4xl mx-auto px-6"
    >
      {/* Avatar */}
      <motion.div
        className="mx-auto mb-6"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.6,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        {testimonial.avatar ? (
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center text-lg">
            {testimonial.avatar}
          </div>
        ) : (
          <div className="w-16 h-16 bg-muted rounded-full" />
        )}
      </motion.div>

      {/* Testimonial Text */}
      <motion.blockquote
        className="text-lg md:text-xl text-foreground mb-8 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.5,
          duration: 0.7,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        "{testimonial.testimonial}"
      </motion.blockquote>

      {/* Author Info */}
      <motion.div
        className="space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.7,
          duration: 0.6,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        <h3 className="text-lg">{testimonial.name}</h3>
        <p className="text-muted-foreground">
          {testimonial.position} chez {testimonial.company}
        </p>

        {/* Links */}
        <motion.div
          className="flex items-center justify-center gap-4 pt-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.9,
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {testimonial.linkedinUrl && (
            <motion.a
              href={testimonial.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full text-sm hover:bg-accent transition-colors"
              whileHover={{
                scale: 1.05,
                y: -2,
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </motion.a>
          )}
          {testimonial.websiteUrl && (
            <motion.a
              href={testimonial.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full text-sm hover:bg-accent transition-colors"
              whileHover={{
                scale: 1.05,
                y: -2,
              }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="w-4 h-4" />
              Site web
            </motion.a>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function NavigationDots({
  total,
  current,
  onSelect,
}: {
  total: number;
  current: number;
  onSelect: (index: number) => void;
}) {
  return (
    <motion.div
      className="flex items-center justify-center gap-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {Array.from({ length: total }, (_, index) => (
        <motion.button
          key={index}
          className={`rounded-full transition-all duration-300 ${
            index === current
              ? "bg-primary w-6 h-2"
              : "bg-muted hover:bg-accent w-2 h-2"
          }`}
          onClick={() => onSelect(index)}
          aria-label={`Témoignage ${index + 1}`}
          variants={itemVariants}
          whileHover={{
            scale: 1.2,
            backgroundColor: index === current ? undefined : "var(--accent)",
          }}
          whileTap={{ scale: 0.9 }}
        />
      ))}
    </motion.div>
  );
}

function NavigationButtons({
  onPrev,
  onNext,
}: {
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <motion.div
      className="flex items-center justify-center gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.button
        onClick={onPrev}
        className="w-10 h-10 bg-muted rounded-full flex items-center justify-center hover:bg-accent transition-colors"
        aria-label="Témoignage précédent"
        variants={itemVariants}
        whileHover={{
          scale: 1.1,
          backgroundColor: "var(--accent)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div whileHover={{ x: -2 }} transition={{ duration: 0.2 }}>
          <ChevronLeft className="w-5 h-5" />
        </motion.div>
      </motion.button>
      <motion.button
        onClick={onNext}
        className="w-10 h-10 bg-muted rounded-full flex items-center justify-center hover:bg-accent transition-colors"
        aria-label="Témoignage suivant"
        variants={itemVariants}
        whileHover={{
          scale: 1.1,
          backgroundColor: "var(--accent)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div whileHover={{ x: 2 }} transition={{ duration: 0.2 }}>
          <ChevronRight className="w-5 h-5" />
        </motion.div>
      </motion.button>
    </motion.div>
  );
}

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  // Auto-rotation
  useEffect(() => {
    if (isPaused || !isInView) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, isInView]);

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  return (
    <section
      ref={ref}
      className="bg-background py-16 md:py-24 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2 className="mb-4" variants={itemVariants}>
            Ce qu'ils disent
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Découvrez les témoignages de mes clients et partenaires qui ont fait
            confiance à mon expertise.
          </motion.p>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
          }
          transition={{
            duration: 0.8,
            delay: 0.4,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <div className="relative h-80 md:h-64 mb-8 overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <TestimonialCard
                key={currentIndex}
                testimonial={testimonials[currentIndex]}
                direction={direction}
              />
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-between gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: 0.6,
              delay: 0.8,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <NavigationButtons onPrev={goToPrevious} onNext={goToNext} />

            <NavigationDots
              total={testimonials.length}
              current={currentIndex}
              onSelect={goToSlide}
            />

            <motion.div
              className="text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {currentIndex + 1} / {testimonials.length}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{
            duration: 0.8,
            delay: 1,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <motion.p
            className="text-muted-foreground mb-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1.2 }}
          >
            Prêt à faire partie de ces success stories ?
          </motion.p>
          <motion.button
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 25px rgba(3,2,19,0.2)",
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
            }
            transition={{
              duration: 0.6,
              delay: 1.4,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            Discutons de votre projet
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
