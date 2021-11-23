import React from 'react';
import LeadItem from './Lead-item/LeadItem';
import classes from './Leaderboard.module.css';
import { NavLink} from 'react-router-dom';
import fire  from '../../fire';


const Leaderboard = (props) => {
  const db = fire.database().ref('players/');
  let array = [];
  db.on('value', (snapshot) => {
    const data = snapshot.val();
    Object.keys(data).map(e => array.push(data[e]));
    array.sort((first, second) => {
      return first.total_games < second.total_games ? 1 : -1;
    });
  })
  let postElements = array.slice(0, 10).map((player, index) =>  {
    return <LeadItem positionNumber={index + 1} name={player.email} total_games={player.total_games} />
})
    return (
      <div className={classes.wrapper_leaderboard}> 
        <div className={classes.leaderboard}>
        <NavLink to='/' className={classes.navlink} onClick={props.logoutHandler} >Log out</NavLink>
          <div className={classes.titles}>
            <div className={classes.item}>Number</div>
            <div className={classes.item}>Player Profile</div>
            <div className={classes.item}>Points</div>
          </div>
          <ul className={classes.items}>
           {postElements}
          </ul>
      </div> 
      </div>
    );
};

export default Leaderboard;