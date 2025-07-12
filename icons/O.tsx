import HomeStyles from "@/styles/HomeView.module.css";
import { motion } from "motion/react";

type OProps = {
    isExiting: boolean;
    isWinningLine: boolean;
}

const O = ({ isExiting, isWinningLine }: OProps) => {
    return (
        <motion.div
            initial={{ filter: "blur(10px)", opacity: 0 }}
            animate={{ filter: "blur(0px)", opacity: 1 }}
            exit={{ filter: "blur(10px)", opacity: 0 }}
            className={HomeStyles.iconContainer}>
            <svg className={HomeStyles.icon} style={{ opacity: isExiting ? 0.3 : 1 }} stroke={isWinningLine ? "aquamarine" : isExiting ? "#f00" : "currentColor"} fill={isWinningLine ? "aquamarine" : isExiting ? "#f00" : "currentColor"} strokeWidth="0" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><motion.path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200z"></motion.path></svg>
        </motion.div>
    )
}

export default O