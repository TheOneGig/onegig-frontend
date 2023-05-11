export const isImage = (fileExt) => {
  const imagesExtension = ['png', 'jpg', 'jpeg', 'gif', 'svg', 'bmp', 'webp'];
  return imagesExtension.indexOf(fileExt) !== -1;
};
