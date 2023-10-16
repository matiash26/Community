function getDate(): string {
  const currentDate = new Date();

  const day = String(currentDate.getDate()).padStart(2, '0');
  const mouth = String(currentDate.getMonth() + 1).padStart(2, '0'); 
  const year = currentDate.getFullYear();

  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');

  const dateFormated = `${year}/${mouth}/${day} ${hours}:${minutes}:${seconds}`;

  return dateFormated;
}
export default getDate;
