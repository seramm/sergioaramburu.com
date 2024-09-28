import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";

const photos = [
  { src: "/image1.jpg", width: 1024, height: 768 },
  { src: "/image2.jpg", width: 1024, height: 768 },
  { src: "/image3.jpg", width: 1024, height: 768 },
];

export default function Gallery() {
  return <RowsPhotoAlbum photos={photos} />;
}
