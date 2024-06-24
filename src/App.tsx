import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import { fetchPhotosByQuery } from './gallery-api';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import { Toaster } from 'react-hot-toast';
import ImageModal from './components/ImageModal/ImageModal';
import './App.css';
import { Image } from './types';

interface Response {
  results: Image[];
  total_pages: number;
}

const App: React.FC = () => {
  const [photos, setPhotos] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [totalPages, setTotalPages] = useState<number>(1);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [modalImageSrc, setModalImageSrc] = useState<string>('');
  const [modalImageAlt, setModalImageAlt] = useState<string>('');

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    async function fetchPhotos(): Promise<void> {
      setError(null);
      setLoading(true);
      try {
        const { results, total_pages } = await fetchPhotosByQuery<Response>(
          searchQuery,
          page
        );
        if (total_pages === 0) {
          throw new Error(
            'Sorry, there are no images matching your search query'
          );
        }
        setTotalPages(total_pages);
        setPhotos(prevPhotos => {
          return [...prevPhotos, ...results];
        });
      } catch (error: any) {
        setError(`${error.message}. Please try again!`);
      } finally {
        setLoading(false);
      }
    }
    fetchPhotos();
  }, [page, searchQuery]);

  const handleSearch = (query: string): void => {
    setPhotos([]);
    setSearchQuery(query);
    setPage(1);
    setTotalPages(1);
  };

  const handleLoadMore = (): void => {
    setPage(page + 1);
  };

  // =============modal==============

  function openModal(imgUrl: string, alt: string): void {
    setIsOpen(true);
    setModalImageSrc(imgUrl);
    setModalImageAlt(alt);
  }

  function closeModal(): void {
    setIsOpen(false);
    setModalImageSrc('');
    setModalImageAlt('');
  }

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {photos.length > 0 && <ImageGallery items={photos} onClick={openModal} />}
      {loading && <Loader />}
      {error && !loading && <ErrorMessage>{error}</ErrorMessage>}
      {page === totalPages && photos.length > 0 && (
        <p
          style={{
            fontSize: 'medium',
            marginBottom: 12,
            textAlign: 'center',
          }}
        >
          We`re sorry, there are no more images to load!
        </p>
      )}
      {page < totalPages && !loading && photos.length > 0 && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      <ImageModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        modalImageUrl={modalImageSrc}
        modalImageAlt={modalImageAlt}
      />
      <Toaster />
    </div>
  );
};

export default App;
