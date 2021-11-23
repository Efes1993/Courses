import React from 'react';
import classes from "./Square.module.css"

const Square = (props) => {
    return (
       <button className={classes.square} onClick={props.onClick}>{props.value}</button>
    );
};

export default Square;