import { Image } from '../../types';
import css from './ImageCard.module.css';

interface ImageCarProps {
  photo: Image;
  onClick: (imgUrl: string, alt: string) => void;
}

const ImageCard: React.FC<ImageCarProps> = ({ photo, onClick }) => {
  return (
    <div className={css.container}>
      <img
        onClick={(): void => onClick(photo.urls.regular, photo.description)}
        className={css.photo}
        src={photo.urls.small}
        alt={photo.description}
      />
    </div>
  );
};
export default ImageCard;
