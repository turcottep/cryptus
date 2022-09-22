import React from "react";

//external exports
// import { motion, AnimatePresence } from "framer-motion";

import GridTemplate from "./gridetemplate/gridtemplate";

export default function Home() {
  return (
    <div className="">
      {/* <main>
        <AnimatePresence>
          <motion.div
            key="modal"
            initial={{ x: "-100vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.25, duration: 0.8 }}
            exit={{ opacity: 0 }}
          >
            <GridTemplate />
          </motion.div>
        </AnimatePresence>
      </main> */}
    </div>
  );
}
