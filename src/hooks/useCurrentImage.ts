import {useCallback, useState} from "react";

export function useCurrentImage() {
  const [image, setImage] = useState(null);

  const ref = useCallback((img: HTMLImageElement) => {
    if (img !== null) {
      setImage(img);
    }
  }, []);
  return [image, ref];
}
