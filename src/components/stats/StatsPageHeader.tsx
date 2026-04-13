"use client";

import { motion } from "motion/react";

export function StatsPageHeader() {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <span className="text-sm font-medium text-primary">Stats</span>
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mx-auto mt-4 max-w-2xl text-balance text-center text-4xl font-medium leading-tight tracking-tight text-foreground md:text-5xl"
      >
        A peek behind the curtain
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mx-auto mt-4 max-w-xl text-center leading-8 text-muted-foreground"
      >
        Numbers, metrics, and fun facts about this little corner of the
        internet. Updated in real-time.
      </motion.p>
    </section>
  );
}
