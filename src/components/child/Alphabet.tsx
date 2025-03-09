  import React from 'react';
  import Label from '../ui/label/Label';
  import classes from './Alphabet.module.css';
  import a from "../../assets/EnglishGIFs/lower/a.gif";
  import b from "../../assets/EnglishGIFs/lower/b.gif";
  import c from "../../assets/EnglishGIFs/lower/c.gif";
  import d from "../../assets/EnglishGIFs/lower/d.gif";

  const images: Record<string, string> = { a, b, c, d };

  const Alphabet: React.FC = () => {
    return (
      <div className={classes.Alphabet}>
        <Label>Handwriting Guidelines</Label>
        <div>
          {Object.entries(images).map(([letter, src]) => (
            <img key={letter} src={src} alt={letter} loading="lazy" />
          ))}
        </div>
      </div>
    );
  };

  export default Alphabet;
