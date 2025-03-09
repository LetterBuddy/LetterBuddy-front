import Label from '../components/ui/label/Label';
import EntryLayout from '../components/layouts/EntryLayout';
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