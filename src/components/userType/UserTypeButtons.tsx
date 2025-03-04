import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import classes from "./UserTypeButtons.module.css";
import animatedChild from "../../assets/Cartoon-Child.svg";
import animatedParent from "../../assets/Cartoon-Adult.svg";

const UserTypeButtons = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<"adult" | "child" | "">("");

  const userTypeHandler = (type: "adult" | "child") => {
    setUserType(type);
    navigate("/auth");
  };

  return (
    <div className={classes.UserTypeButtons}>
      <button
        onClick={() => userTypeHandler("adult")}>
        <img
          src={animatedParent}
          alt="Animated Parent"
          className={classes.icon}
        />
        Adult
      </button>
      <button
      onClick={() => userTypeHandler("child")}>
        <img
          src={animatedChild}
          alt="Animated Child"
          className={classes.icon}
        />
        Child
      </button>
    </div>
  );
};

export default UserTypeButtons;
