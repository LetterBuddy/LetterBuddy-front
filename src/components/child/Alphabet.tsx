import Label from "../ui/label/Label";
import classes from "./Alphabet.module.css";
import a from "../../assets/EnglishGIFs/lower/a.gif";
import b from "../../assets/EnglishGIFs/lower/b.gif";
import c from "../../assets/EnglishGIFs/lower/c.gif";
import d from "../../assets/EnglishGIFs/lower/d.gif";

const Alphabet = () => {
  return (
    <div className={classes.Alphabet}>
      <Label>Handwriting Guidelines</Label>
      <div>
        <img src={a} alt="a" />
        <img src={b} alt="b" />
        <img src={c} alt="c" />
        <img src={d} alt="d" />
      </div>
    </div>
  );
};

export default Alphabet;
