//import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/button/Button';
import Label from '../components/ui/label/Label';
import myPen from '../assets/myPen.gif';
import EntryLayout from '../components/layouts/entryLayout/EntryLayout';

const SplashPage = () => {
    const navigate = useNavigate();

    const getStartedHandler = () => {
        navigate('/userType');
    };

    const alreadyHasAccountHandler = () => {
        // Handle the choice here
    };

    return (
        <EntryLayout>
            <Label>A personal AI assistant to help your kids improve their handwriting </Label>
            <img src={myPen} alt="myPen" style={{ width: '230px', height: '250px', margin: '1.5rem 1rem' }} />
            <Button onClick={getStartedHandler} variant="default">GET STARTED</Button>
            <Button onClick={alreadyHasAccountHandler} variant="white">I already have an account</Button>
        </EntryLayout>
    );
}

export default SplashPage;