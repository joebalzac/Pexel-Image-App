import useData from "../Hooks/useData";

const ImageGrid = () => {
  const { images, error, isLoading } = useData();

  if (isLoading) {
    return <div>Loading.....</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Ensure images is an array before mapping
  if (!Array.isArray(images)) {
    return <div>Error: Invalid data format</div>;
  }

  return (
    <div>
      {images.map((image) => (
        <div key={image.id}>
          <img src={image.src.tiny} alt="this is an image" />
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
