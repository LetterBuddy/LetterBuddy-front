import './App.css'
import React from 'react'
import Button from './components/ui/button/Button'
import Layout from './components/layouts/Layout';
import Head from './components/layouts/head/Head';

// TODO: Add all the app routes here 

function App() {
  const [isClicked, setIsClicked] = React.useState<boolean>(false);

  const toggleButtonHandler = () => {
    setIsClicked((oldState) => !oldState);
  };

  return (
    <>
      <Head />
      <Button onClick={toggleButtonHandler} variant="default">GET STARTED</Button>
      <Button onClick={toggleButtonHandler} variant="white">I already have an account</Button>
    </>
  )
}

export default App;
