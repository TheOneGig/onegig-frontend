export const formatDate = (date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Se suma 1 porque los meses en JavaScript son base 0
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
};
