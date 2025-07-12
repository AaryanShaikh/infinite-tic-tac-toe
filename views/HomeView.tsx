"use client";
import { O, X } from "@/icons";
import HomeStyles from "@/styles/HomeView.module.css";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import GameWinCelebration from "@/components/GameWinCelebration";

const HomeView = () => {
    const [isStarted, setisStarted] = useState(true)
    const [whoseTurn, setwhoseTurn] = useState("X")
    const [board, setBoard] = useState([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ])
    const [xLocations, setxLocations] = useState<number[][]>([])
    const [oLocations, setoLocations] = useState<number[][]>([])
    const [isExiting, setisExiting] = useState<number[][]>([])
    const [isOExiting, setisOExiting] = useState<number[][]>([])
    const winningLines = [
        // Rows
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        // Columns
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        // Diagonals
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]],
    ];
    const [winningLine, setwinningLine] = useState<number[][]>([])
    const [winnerPlayer, setwinnerPlayer] = useState("")

    const isWon = (board: string[][], player: string): boolean => {
        // console.log("player", player);
        // console.log("board", board)

        for (let line of winningLines) {
            const values = line.map(([row, col]) => board[row][col]);
            console.log(`Checking line ${JSON.stringify(line)} → ${values}`);
            if (values.every(cell => cell === player)) {
                console.log("Found winning line:", line);
                setwinningLine(line);
                setwinnerPlayer(player);
                return true;
            }
        }
        return false;
    };

    const onClick = (row: number, col: number) => {
        const newBoard = board.map(inner => [...inner]);
        if (newBoard[row][col] !== "") return;

        const currentPlayer = whoseTurn;

        newBoard[row][col] = currentPlayer;

        if (currentPlayer === "X") {
            let temp = [...xLocations];

            if (temp.length === 2) {
                setisExiting([temp[0]]);
                temp.push([row, col]);
            } else if (temp.length === 3) {
                const [exrow, excol] = isExiting[0];
                newBoard[exrow][excol] = "";
                temp.shift();
                setisExiting([temp[0]]);
                temp.push([row, col]);
            } else {
                temp.push([row, col]);
            }

            setxLocations(temp);
        } else {
            let temp = [...oLocations];

            if (temp.length === 2) {
                setisOExiting([temp[0]]);
                temp.push([row, col]);
            } else if (temp.length === 3) {
                const [exrow, excol] = isOExiting[0];
                newBoard[exrow][excol] = "";
                temp.shift();
                setisOExiting([temp[0]]);
                temp.push([row, col]);
            } else {
                temp.push([row, col]);
            }

            setoLocations(temp);
        }

        if (isWon(newBoard, currentPlayer)) {
            // alert(`${currentPlayer} won`);
            setBoard(newBoard);
            console.log("i was called!");
            return;
        }

        setBoard(newBoard);
        setwhoseTurn(currentPlayer === "X" ? "O" : "X");
    };

    const resetGame = () => {
        setisStarted(false);
        setwhoseTurn("X");
        setBoard([
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ]);
        setxLocations([]);
        setoLocations([]);
        setisExiting([]);
        setisOExiting([]);
        setwinningLine([]);
        setwinnerPlayer("");
        setTimeout(() => {
            setisStarted(true);
        }, 500);
    };

    return (
        <div className={HomeStyles.container}>
            <div className={HomeStyles.header}>
                <h1 className={HomeStyles.text}>Infinity</h1>
                <h1 className={HomeStyles.text}>Tic Tac Toe</h1>
            </div>
            <GameWinCelebration winner={winnerPlayer} resetGame={resetGame} />
            {
                isStarted ? <>
                    <div className={HomeStyles.turn}><span style={{ color: "aquamarine", fontWeight: "700" }}>{whoseTurn}</span>'s turn</div>
                    <div className={HomeStyles.gameContainer}>
                        <div className={HomeStyles.mainGrid}>
                            {
                                board.map((row, rowIndex) => {
                                    return row.map((col, colIndex) => {
                                        return <div key={`${rowIndex}${colIndex}`} onClick={() => onClick(rowIndex, colIndex)} className={HomeStyles.grid}>
                                            <AnimatePresence mode="wait">
                                                {
                                                    col === "X" ? <X
                                                        key={`${rowIndex}-${colIndex}-${col}`}
                                                        isExiting={isExiting.length > 0 && rowIndex == isExiting[0][0] && colIndex == isExiting[0][1]}
                                                        isWinningLine={winningLine.length > 0 && winningLine.some(([row, col]) => row === rowIndex && col === colIndex)}
                                                    /> :
                                                        col === "O" ?
                                                            <O
                                                                key={`${rowIndex}-${colIndex}-${col}`}
                                                                isExiting={isOExiting.length > 0 && rowIndex == isOExiting[0][0] && colIndex == isOExiting[0][1]}
                                                                isWinningLine={winningLine.length > 0 && winningLine.some(([row, col]) => row === rowIndex && col === colIndex)}
                                                            /> : <></>
                                                }
                                            </AnimatePresence>
                                        </div>
                                    })
                                })
                            }
                        </div>
                    </div></>
                    :
                    <div className={HomeStyles.start}>
                        <button onClick={() => setisStarted(true)} className={HomeStyles.btn}>Start</button>
                    </div>
            }
        </div>
    )
}

export default HomeView