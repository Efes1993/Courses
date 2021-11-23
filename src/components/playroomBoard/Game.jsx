import React, {useState} from 'react';
import Board from './Board';
import classes from "./Game.module.css"
import { calculateWinner } from './winnerFunction';
import { NavLink} from 'react-router-dom';

const Game = (props) => {
    const [board, setBoard] = useState(Array(9).fill(null))
    const [xIsNext, setXIsNext] = useState(true)
    const winner = calculateWinner(board);
    
    const handleClick = (index) => {
        const newBoard = [...board]
        if (winner || newBoard[index]) return null;
        newBoard[index] = xIsNext ? 'X': 'O'
        setBoard(newBoard)
        setXIsNext(!xIsNext)
    }
    const startNewGame = () => {
        console.log(props.count)
        return (
            <button className={classes.start__btn} onClick={() => {
            setBoard(Array(9).fill(null))
            props.setCount(props.count+1)
            }}> Start over</button>
        )
    } 
    return (
        <div className={classes.playroom}>
            <NavLink to='/'  className={classes.start__btn} onClick={props.logoutHandler} >Log out</NavLink>
            <div className={classes.wrapper}>
                <div className={classes.wrapper__game}>
                    <div className={classes.item}>
                        <p className={classes.currentPlayer}>Current player: {props.currentPlayerName}</p>
                        <p className={classes.currentPlayer}>{props.count}-ая игра</p>
                        <Board squares={board} click={handleClick} />
                        <p className={classes.game__info}>
                            { winner ?  'Победитель '  + winner : 'Сейчас ходит ' + ( xIsNext ? 'X' : 'O') }
                        </p>
                    </div>
                    <div className={classes.item}>
                        <p className={classes.header}>The Game</p>
                        {startNewGame()}
                        <NavLink className={classes.start__btn} onClick={() => props.addPlayer(props.currentPlayerName, props.count)} to='/leaderboard'>View rating </NavLink> 
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Game;