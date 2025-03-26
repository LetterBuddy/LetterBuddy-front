import { useState, useEffect } from 'react';
import Label from '../ui/label/Label';
import classes from './Alphabet.module.css';

// Dynamically import all GIFs from the folder
const images = import.meta.glob<{ default: string }>('../../assets/EnglishGIFs/lower/*.gif');

const Alphabet = () => {
  const [imageMap, setImageMap] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadImages = async () => {
      const loadedImages: Record<string, string> = {};

      for (const path in images) {
        const module = await images[path]();
        const fileName = path.split('/').pop()?.replace('.gif', '') || '';
        loadedImages[fileName] = module.default;
      }

      setImageMap(loadedImages);
    };

    loadImages();
  }, []);

  return (
    <div className={classes.Alphabet}>
      <Label>Handwriting Guidelines</Label>
      <div>
        {Object.entries(imageMap).map(([letter, src]) => (
          <img 
            key={letter} 
            src={src} 
            alt={`Handwriting guide for letter ${letter}`} 
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
};

export default Alphabet;
