import axios from "axios";
import { useEffect, useState } from "react";

interface Image {
  id: number;
  url: string;
  photographer: string;
  src: {
    original: string;
    tiny: string;
    portrait: string;
  };
}

const useData = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://api.pexels.com/v1/curated?per_page=20",
          {
            headers: {
              Authorization:
                "563492ad6f917000010000012e4fb8dc07f948cea947a9d2559cde79",
            },
          }
        );
        const data = response.data;
        const photos: Image[] = data.photos;
        console.log("Big data dawg", photos);
        setImages(photos);
      } catch (error) {
        if (error) {
          setError("unknown error found");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchPhotos();
  }, []);

  return { images, error, isLoading };
};

export default useData;
