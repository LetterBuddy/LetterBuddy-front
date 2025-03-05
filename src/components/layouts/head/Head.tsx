import React from 'react';
import classes from './Head.module.css';
import {useLocation} from 'react-router-dom';
import { IconAbc } from '@tabler/icons-react'


const Head: React.FC = () => {
  const location = useLocation(); // Get current path
  const isSubmissionPage = location.pathname === '/submission';
  return (
    <header className={classes.header}>
      <h1 className={classes.logo}>LetterBuddy</h1>
      {isSubmissionPage && <IconAbc className={classes.icon} size={45} />}
    </header>
  );
}

export default Head;