export const getImageUrl = (image) => {
  const baseUrl = import.meta.env.VITE_IMG_URL;

  if (!image) return "/default.png";

  // external image
  if (image.startsWith("http")) {
    return image;
  }

  // local image
  return `${baseUrl}${image}`;
};
