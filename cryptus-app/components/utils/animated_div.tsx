import React from "react";
// import { AnimatePresence, motion } from "framer-motion";

export default function AnimatedDiv(props) {
  return (
    // <AnimatePresence>
    //   <motion.div
    //     key="modal"
    //     initial={{ x: "-100vw", opacity: 0 }}
    //     animate={{ x: 0, opacity: 1 }}
    //     transition={{ type: "spring", bounce: 0.25, duration: 0.8 }}
    //     exit={{ opacity: 0 }}
    //   >
    //     {props.children}
    //   </motion.div>
    // </AnimatePresence>
    <div>{props.children}</div>
  );
}
