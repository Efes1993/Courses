import React from 'react';
import classes from "./Form.module.css"
import { NavLink} from 'react-router-dom';

const Form = (props) => {
    const {email, 
        setEmail, 
        password, 
        setPassword,
        loginHandler,
        hasAccount,
        setHasAccount,
        emailError,
        passwordError,
        signUpHandler,
        isEnter} = props;        

    return (
        <div className={classes.wrapper_login} >
            <form className={classes.form}>
            <input 
                value={email}
                onChange={(e)=> setEmail(e.target.value)} 
                required
                name="email"
                type="email" 
                placeholder="Email" 
                className={classes.input}
            />
            <p className={classes.errorMsg}>{emailError}</p>
            <input 
                value={password} 
                onChange={(e)=> setPassword(e.target.value)} 
                required
                name="password" 
                type="password" 
                placeholder="Password" 
                className={classes.input}
            />
             <p className={classes.errorMsg}>{passwordError}</p>
                <div className={classes.btnContainer}>
                    {hasAccount ? (
                        <>
                        <NavLink to={isEnter ? '/playroom' : '/'} onClick={loginHandler}  className={classes.btn} >Sign In</NavLink>
                        <p>
                        Don't have an account?   
                        <span className={classes.span} onClick={() => setHasAccount (!hasAccount)}> Sign Up</span>
                        </p>
                        </>
                    ) : (
                        <>
                        <NavLink to={isEnter ? '/playroom' : '/'} onClick={signUpHandler} className={classes.btn} >Sign Up</NavLink>
                        <p>Have an account? <span className={classes.span} onClick={() => setHasAccount (!hasAccount)}>Sign In</span></p>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Form;