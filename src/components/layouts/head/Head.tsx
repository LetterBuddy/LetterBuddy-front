import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IconAbc, IconHome } from '@tabler/icons-react';
import classes from './Head.module.css';

const Head: React.FC = () => {
  const location = useLocation(); 
  const navigate = useNavigate(); 

  const isSubmissionPage = location.pathname === '/submission';
  const isAlphabetPage = location.pathname === '/alphabet';

  return (
    <header className={classes.header}>
      <h1 className={classes.logo}>LetterBuddy</h1>
      
      {isSubmissionPage && (
        <IconAbc 
          className={classes.icon} 
          size={45} 
          onClick={() => navigate('/alphabet')} 
        />
      )}
      
      {isAlphabetPage && (
        <IconHome 
          className={classes.icon} 
          size={35} 
          onClick={() => navigate('/submission')} 
        />
      )}
    </header>
  );
}

export default Head;
