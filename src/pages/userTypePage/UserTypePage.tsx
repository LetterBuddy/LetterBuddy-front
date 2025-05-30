import { useNavigate } from "react-router-dom";
import classes from "./UserTypePage.module.css";
import Label from "../../components/ui/label/Label";
import animatedChild from "../../assets/Cartoon-Child.svg";
import animatedParent from "../../assets/Cartoon-Adult.svg";
import useAuthStore from "../../store/useAuthStore"; 

const UserTypePage = () => {
  const navigate = useNavigate();
  const setUserType = useAuthStore((state) => state.setIsChild);
  const setIsSignUp = useAuthStore((state) => state.setIsSignUp);

  const handleChildSelection = () => {
    setUserType(true);
    setIsSignUp(false);
    navigate("/auth");
  };

  const handleAdultSelection = () => {
    setUserType(false);
    setIsSignUp(true);
    navigate("/auth");
  };

  return (
    <>
      <Label>Please select user type</Label>
      <div className={classes.UserTypeButtons}>
        <button onClick={handleAdultSelection}>
          <img
            src={animatedParent}
            alt="Animated Parent"
            className={classes.icon}
          />
          Adult
        </button>
        <button onClick={handleChildSelection}>
          <img
            src={animatedChild}
            alt="Animated Child"
            className={classes.icon}
          />
          Child
        </button>
      </div>
    </>
  );
};

export default UserTypePage;