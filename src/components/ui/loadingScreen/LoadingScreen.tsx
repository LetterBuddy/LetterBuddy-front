import Label from "../label/Label";
import loading_gif from "../../../assets/loading_gif.gif";
import classes from "./LoadingScreen.module.css";

const LoadingScreen = () => {
  return (
    <div className={classes.loadingScreen}>
      <img
        src={loading_gif}
        alt="loading"
        style={{ width: "300px", height: "300px" }}
      />
      <Label>Loading...</Label>
    </div>
  );
};

export default LoadingScreen;
