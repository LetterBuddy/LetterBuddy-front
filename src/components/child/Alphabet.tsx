import { useState, useEffect } from 'react';
import Label from '../ui/label/Label';
import classes from './Alphabet.module.css';

// Dynamically import all GIFs from the folder
const lowerGifs = import.meta.glob<{ default: string }>('../../assets/EnglishGIFs/lower/*.gif');
const lowerPngs = import.meta.glob<{ default: string }>('../../assets/EnglishImgs/lower/*.png');

const upperGifs = import.meta.glob<{ default: string }>('../../assets/EnglishGIFs/upper/*.gif');
const upperPngs = import.meta.glob<{ default: string }>('../../assets/EnglishImgs/upper/*.png');


const Alphabet = () => {
  const [gifMap, setGifMap] = useState<Record<string, string>>({});
  const [pngMap, setPngMap] = useState<Record<string, string>>({});
  const [active, setActive] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const loadFiles = async () => {
      const gifsLoaded: Record<string, string> = {};
      const pngsLoaded: Record<string, string> = {};

      for (const path in lowerGifs) {
        const mod = await lowerGifs[path]();
        const name = path.split('/').pop()?.replace('.gif', '') || '';
        gifsLoaded[name] = mod.default;
      }

      for (const path in lowerPngs) {
        const mod = await lowerPngs[path]();
        const name = path.split('/').pop()?.replace('.png', '') || '';
        pngsLoaded[name] = mod.default;
      }

      for (const path in upperGifs) {
        const mod = await upperGifs[path]();
        const name = path.split('/').pop()?.replace('.gif', '') || '';
        gifsLoaded[name] = mod.default;
      }
      
      for (const path in upperPngs) {
        const mod = await upperPngs[path]();
        const name = path.split('/').pop()?.replace('.png', '') || '';
        pngsLoaded[name] = mod.default;
      }
      
      setGifMap(gifsLoaded);
      setPngMap(pngsLoaded);
    };

    loadFiles();
  }, []);

  const handleClick = (letter: string) => {
    setActive(prev => ({ ...prev, [letter]: !prev[letter] }));
  };

  return (
    <div className={classes.Alphabet}>
      <Label>Handwriting Guidelines</Label>
      <div className={classes.grid}>
        {Object.keys(gifMap).map(letter => (
          <img
            key={letter}
            src={active[letter] ? gifMap[letter] : pngMap[letter]}
            alt={`Handwriting guide for letter ${letter}`}
            loading="lazy"
            onClick={() => handleClick(letter)}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </div>
    </div>
  );
};

export default Alphabet;