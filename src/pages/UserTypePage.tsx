import Label from '../components/ui/label/Label';
import EntryLayout from '../components/layouts/entryLayout/EntryLayout';
import UserTypeButtons from '../components/userType/UserTypeButtons';

const UserTypePage = () => {    

    return (
        <EntryLayout>
            <Label>Please select user type</Label>
            <UserTypeButtons />
        </EntryLayout>
    );
}

export default UserTypePage;