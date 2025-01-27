import React from "react";
import classes from "./UserTypeButtons.module.css";
import animatedChild from "../../assets/Cartoon-Child.svg";
import animatedParent from "../../assets/Cartoon-Adult.svg";

const UserTypeButtons = () => {
  return (
    <div className={classes.UserTypeButtons}>
      <button>
        <img
          src={animatedParent}
          alt="Animated Parent"
          className={classes.icon}
        />
        Adult
      </button>
      <button>
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
