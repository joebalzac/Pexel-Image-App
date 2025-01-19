import { useEffect, useState } from "react";
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
  const { data, error, isLoading } = useData<Image[]>();
  const [images, setImages] = useState<Image[]>([]);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [selectedImageIds, setSelectedImageIds] = useState<number[] | null>(
    null
  );
  const [isError, setIsError] = useState("");

  useEffect(() => {
    if (data) {
      setImages(data);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading.....</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleSelectedImage = (image: Image) => {
    setSelectedImage(image);
    console.log("This image is selected", selectedImage);
  };

  const handleCloseSelectedImage = () => {
    setSelectedImage(null);
  };

  const handleDeleteImage = (id: number) => {
    setImages(images.filter((image) => image.id !== id));
    console.log("this is firing");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    setSelectedImageIds((prevSelected) =>
      e.target.checked
        ? [...(prevSelected || []), id]
        : prevSelected?.filter((imageId) => imageId !== id) || null
    );
    console.log("selected images", selectedImageIds);
  };

  const deleteSelectedImages = () => {
    if (!selectedImageIds || selectedImageIds.length === 0) {
      setIsError("Please select images to delete");
    }
    setImages((prevImages) =>
      prevImages.filter((image) => !selectedImageIds?.includes(image.id))
    );

    setSelectedImageIds([]);
    setIsError("");
  };

  console.log("big Data", data, images);

  return (
    <>
      {" "}
      {isLoading ? (
        <div>Chill it's loading give it a....</div>
      ) : (
        <div>
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
              <button
                onClick={deleteSelectedImages}
                className="bg-purple-400 text-white py-2 px-4 rounded-3xl shadow-md hover:bg-purple-600"
              >
                Delete Selected Images
              </button>
              {isError && <p>{isError}</p>}
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                {images.map((image) => (
                  <div>
                    <input
                      type="checkbox"
                      checked={selectedImageIds?.includes(image.id) || false}
                      onChange={(e) => handleInputChange(e, image.id)}
                    />

                    <li
                      className="cursor-pointer hover:-translate-y-1 hover:shadow-2xl transition-all"
                      key={image.id}
                      onClick={() => handleSelectedImage(image)}
                    >
                      {" "}
                      <img
                        className="h-full"
                        src={image.src.original}
                        alt="this is an image"
                      />
                    </li>

                    <button
                      className="bg-blue-400 text-white py-2 px-6 mt-4 rounded-md shadow-md hover:bg-blue-600"
                      onClick={() => {
                        handleDeleteImage(image.id);
                      }}
                    >
                      Delete Image
                    </button>
                  </div>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ImageGrid;
