export const isVideo = (fileExt) => {
  const videosExtension = ['m4v', 'avi', 'mpg', 'mp4', 'webm', 'mov', 'mkv', 'wmv'];
  return videosExtension.indexOf(fileExt) !== -1;
};
