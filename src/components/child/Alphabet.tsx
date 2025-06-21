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
    const loadAssets = async (
      globMap: Record<string, () => Promise<{ default: string }>>,
      ext: string
    ): Promise<Record<string, string>> => {
      const entries = await Promise.all(
        Object.entries(globMap).map(async ([path, loader]) => {
          const mod = await loader();
          const name = path.split('/').pop()?.replace(`.${ext}`, '') || '';
          return [name, mod.default];
        })
      );
      return Object.fromEntries(entries);
    };

    const loadFiles = async () => {
      const [loadedLowerGifs, loadedLowerPngs, loadedUpperGifs, loadedUpperPngs] = await Promise.all([
        loadAssets(lowerGifs, 'gif'),
        loadAssets(lowerPngs, 'png'),
        loadAssets(upperGifs, 'gif'),
        loadAssets(upperPngs, 'png'),
      ]);

      setGifMap({ ...loadedLowerGifs, ...loadedUpperGifs });
      setPngMap({ ...loadedLowerPngs, ...loadedUpperPngs });
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