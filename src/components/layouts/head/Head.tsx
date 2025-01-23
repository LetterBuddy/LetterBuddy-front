import React from 'react';
import classes from './Head.module.css';


const Head: React.FC = () => {
  return (
    <header className={classes.header}>
      <h1 className={classes.logo}>LetterBuddy</h1>
    </header>
  );
}

export default Head;