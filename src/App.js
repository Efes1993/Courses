import React, { useState, useEffect} from 'react';
import fire from './fire';
import Form from './components/registerBoard/Form/Form';
import classes from "./App.module.css"
import Game from './components/playroomBoard/Game';
import Leaderboard from './components/leaderBoard/Leaderboard';
import {  BrowserRouter, Route} from 'react-router-dom';
import { reLoad } from '.';

function App() {
  const [user, setUser] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [count, setCount] = useState(1);
  const [currentPlayerName, setCurrentPlayerName] = useState('');
  const [ratingData, setRatingData] = useState([])
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);
  const [isEnter, setIsEnter] = useState(false);
 
  const clearInputs = () => {
    setEmail('');
    setPassword('');
  }

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  }

  const loginHandler = (e) => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user1 = fire.auth().currentUser;
        const db = fire.database().ref('players/'+ user1.uid);
        db.on('value', (snapshot) => {
          const data = snapshot.val();
          setCount(data.total_games);
          setCurrentPlayerName(data.email);
          setIsEnter(true); 
        })
        
      })
      .catch(err => {
        switch (err.code) {
          case 'auth/invalid-email':
            setEmailError(err.message);
            break;
          case 'auth/user-disabled':
            setEmailError(err.message);
            break;
          case 'auth/user-not-found':
            setEmailError(err.message);
            break;
          case 'auth/wrong-password':
            setPasswordError(err.message);
            break;
          default:
            return
        }
      })
  };

  const signUpHandler = (e) => {
    clearErrors();
    setCount(count);
    setCurrentPlayerName(email);
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => { 
        const user1 = fire.auth().currentUser;
        fire.database().ref('players/'+ user1.uid).set({
         email: user1.email,
         total_games: count
        });
        setIsEnter(true);
      })
      .catch(err => {
        switch (err.code) {
          case 'auth/email-already-in-use':
          case 'auth/invalid-email':
            setEmailError(err.message);
            break;
          case 'auth/weak-password':
            setPasswordError(err.message);
            break;
          default:
            return
        }
      })
  };

  const logoutHandler = () => {
    clearInputs();
    clearErrors();
    fire.auth().signOut();
    setIsEnter(false);
  };

  useEffect(() => {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser('');
      }
    });
  }, []);

  const passwordHandler = (e) => {
    setPassword(e.target.value)
  }

  const dbCount = () => {
    const user1 = fire.auth().currentUser;
    const uid = user1.uid;
    fire.database().ref('players/' + uid).set({
      email: user1.email,
      total_games: count
    });
  } 

  function addPlayer(name, count) {
    dbCount()
    setRatingData(ratingData.concat([{
      name,
      total_games: count,
    }]))
    setCurrentPlayerName('');
    setCount(0);
    setTimeout(reLoad, 500);
  }

  return ( 
    <BrowserRouter>
    <div className={classes.app}>
    <Route exact path='/' render={() => <Form 
                      email={email} 
                      setEmail={setEmail} 
                      password={password} 
                      setPassword={setPassword} 
                      passwordHandler={passwordHandler}
                      loginHandler={loginHandler}  
                      signUpHandler={signUpHandler}
                      hasAccount={hasAccount}
                      setHasAccount={setHasAccount}  
                      emailError={emailError}
                      passwordError={passwordError}
                      currentPlayerName={currentPlayerName}
                      isEnter={isEnter}
                      setCount={setCount}
                      setIsEnter={setIsEnter} />
      }/>  
    <Route path='/playroom'  render={() => <Game  
                              currentPlayerName={currentPlayerName}  
                              logoutHandler={logoutHandler}  
                              ratingData={ratingData}
                              count={count} 
                              setCount={setCount}  
                              addPlayer={addPlayer}
                              />}
                              />    
    <Route path='/leaderboard' render={() => <Leaderboard 
                              logoutHandler={logoutHandler}
                              count={count}/>}/>
    </div>    
  </BrowserRouter>
  );
}

export default App;