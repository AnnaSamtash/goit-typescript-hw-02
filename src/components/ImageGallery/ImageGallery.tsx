import css from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';
import { Image } from '../../types';

interface ImageGalleryProps {
  items: Image[];
  onClick: (imgUrl: string, alt: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ items, onClick }) => {
  return (
    <ul className={css.gallerylist}>
      {items.map(item => {
        return (
          <li key={item.id} className={css.gallerylist_item}>
            <ImageCard photo={item} onClick={onClick} />
          </li>
        );
      })}
    </ul>
  );
};
export default ImageGallery;
