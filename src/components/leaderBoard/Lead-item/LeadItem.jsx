import React from 'react';
import logo from '../1.png'
import classes from './LeadItem.module.css'

const LeadItem = (props) => {
    return (
        <li className={classes.wrapper}>
        <div className={classes.number}> {props.positionNumber}</div> <div className={classes.profile}> <img src={logo} alt='logo'></img>{props.name}</div>  <div className={classes.total}>{props.total_games}</div>
        </li>
    );
};

export default LeadItem;