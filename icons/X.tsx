import HomeStyles from "@/styles/HomeView.module.css";
import { motion } from "motion/react";

type XProps = {
    isExiting: boolean
    isWinningLine: boolean
}

const X = ({ isExiting, isWinningLine = false }: XProps) => {
    return (
        <motion.div
            initial={{ filter: "blur(10px)", opacity: 0 }}
            animate={{ filter: "blur(0px)", opacity: 1 }}
            exit={{ filter: "blur(10px)", opacity: 0 }}
            className={HomeStyles.iconContainer}>
            <svg className={HomeStyles.icon} style={{ opacity: isExiting ? 0.3 : 1 }} stroke={isWinningLine ? "aquamarine" : isExiting ? "#f00" : "currentColor"} fill="none" strokeWidth="0" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill={isWinningLine ? "aquamarine" : isExiting ? "#f00" : "currentColor"}></path></svg>
        </motion.div>
    )
}

export default X