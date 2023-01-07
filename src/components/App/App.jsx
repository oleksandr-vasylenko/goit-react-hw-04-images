import { useState, useEffect } from 'react';
import { GlobalStyle } from '../../GlobalStyle';
import { fetchImages } from 'components/services/api';

import { AppThumb } from './App.Styled';
import { Loader } from 'components/Loader/Loader';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      setLoading(true);
      fetchImages(query, page)
        .then(data => setImages(data.hits))
        .finally(() => setLoading(false));
    }
  }, [query]);

  useEffect(() => {
    if (page > 1) {
      setLoading(true);

      fetchImages(query, page)
        .then(data => setImages(prevImages => [...prevImages, ...data.hits]))
        .finally(() => setLoading(false));
    }
  }, [page]);

  const handleFormSubmit = sumbittedQuery => {
    setQuery(sumbittedQuery);
    setPage(1);
  };

  const loadMore = () => setPage(prevState => prevState + 1);

  return (
    <AppThumb>
      <Searchbar onSubmit={handleFormSubmit} />

      <ImageGallery images={images} />

      {loading && <Loader />}

      {images.length > 11 && <Button onLoadClick={loadMore}>LOAD MORE</Button>}

      <GlobalStyle />
    </AppThumb>
  );
};
