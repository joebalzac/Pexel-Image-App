import { useState } from "react";
import useData from "../Hooks/useData";
import { IoCloseSharp } from "react-icons/io5";

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

const ImageGrid = () => {
  const { data: images, error, isLoading } = useData<Image[]>();
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  if (isLoading) {
    return <div>Loading.....</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!Array.isArray(images)) {
    return <div>Error: Invalid data format</div>;
  }

  const handleSelectedImage = (image: Image) => {
    setSelectedImage(image);
    console.log("This image is selected", selectedImage);
  };

  const handleCloseSelectedImage = () => {
    setSelectedImage(null);
  };

  return (
    <>
      {selectedImage ? (
        <div className="relative">
          <IoCloseSharp
            onClick={handleCloseSelectedImage}
            className="cursor-pointer absolute top-0 right-20 z-50 h-10 w-10"
          />
          <img src={selectedImage.src.portrait} alt="" />
        </div>
      ) : (
        <div>
          {" "}
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            {images.map((image) => (
              <li
                className="cursor-pointer hover:-translate-y-1 hover:shadow-2xl transition-all"
                key={image.id}
                onClick={() => handleSelectedImage(image)}
              >
                <img src={image.src.original} alt="this is an image" />
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default ImageGrid;
