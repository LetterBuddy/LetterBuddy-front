// import React from 'react';
import Button from '../components/ui/button/Button';
import Label from '../components/ui/label/Label';
import myPen from '../assets/myPen.gif';
import EntryLayout from '../components/layouts/entryLayout/EntryLayout';

const SplashPage = () => {

    // const [isClicked, setIsClicked] = React.useState<boolean>(false);

    const toggleButtonHandler = () => {
        // Handle the choice here

    };
    return (
        <EntryLayout>
            <Label>A personal AI assistant to help your kids improve their handwriting </Label>
            <img src={myPen} alt="myPen" style={{ width: '230px', height: '250px', margin: '1.5rem 1rem' }} />
            <Button onClick={toggleButtonHandler} variant="default">GET STARTED</Button>
            <Button onClick={toggleButtonHandler} variant="white">I already have an account</Button>
        </EntryLayout>
    );
}

export default SplashPage;