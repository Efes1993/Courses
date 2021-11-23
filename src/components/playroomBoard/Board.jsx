import React from 'react';
import classes from "./Board.module.css"
import Square from './Square';

const Board = (props) => {
    let squareElements = props.squares.map((square, i) => {
        return <Square key = {i} value={square} onClick={() => props.click(i)}/>
    })
    return (
        <div className={classes.board}>
            {squareElements}
        </div>
    );
};

export default Board;