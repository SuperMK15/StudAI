import React from "react";
import { motion } from 'framer-motion'

const loaderVarients = {
  animationOne: {
      x: [-20, -20],
      y: [0, -30],
      transition: {
        x: {
          yoyo: Infinity,
          duration: 0.5
        },
        y: {
          yoyo: Infinity,
          duration: 0.25
        }
      }
  }
}

const LoadingCircleAnimation = () => {
  return (
    <motion.div className="loader" variants={loaderVarients} animate="animationOne">
      empty
    </motion.div>
  )
}

export default LoadingCircleAnimation;