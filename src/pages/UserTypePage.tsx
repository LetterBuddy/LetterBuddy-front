// import React from 'react';
import Button from '../components/ui/button/Button';
import Label from '../components/ui/label/Label';
import EntryLayout from '../components/layouts/entryLayout/EntryLayout';

const UserTypePage = () => {

    const choiceHandler = () => {
        // Handle the choice here
    };
    return (
        <EntryLayout>
            <Label>Please select user type</Label>
            <Button onClick={choiceHandler} variant="default">CONTINUE</Button>
        </EntryLayout>
    );
}

export default UserTypePage;