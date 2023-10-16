export default function TypeOfMedia(url: string | undefined): string | boolean {
  if (url) {
    const sizeOfMedia = url.split('').length;
    const typeLength3 = url.slice(sizeOfMedia - 3, sizeOfMedia);
    const typeLength4 = url.slice(sizeOfMedia - 4, sizeOfMedia);
    const PictureAllowed = ['jpeg', 'png', 'jpg', 'mp4'];
    const thereIs3Length = PictureAllowed.includes(typeLength3);
    if (!thereIs3Length) {
      return typeLength4 === 'jpeg' ? typeLength4 : false;
    }
    return thereIs3Length ? typeLength3 : false;
  }
  return false;
}
