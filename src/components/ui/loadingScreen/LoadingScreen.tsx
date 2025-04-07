import Label from "../label/Label";
import myPen from "../../../assets/myPen.gif";
import classes from "./LoadingScreen.module.css";

const LoadingScreen = () => {
  return (
    <div className={classes.loadingScreen}>
      <img
        src={myPen}
        alt="myPen"
        style={{ width: "2...50px", height: "250px" }}
      />
      <Label>Loading...</Label>
    </div>
  );
};

export default LoadingScreen;
