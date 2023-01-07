import { useState } from 'react';
import PropTypes from 'prop-types';
import { ImageModal } from 'components/Modal/Modal';
import { ImageStyle } from './ImageGalleryItem.Styled';

export const ImageItem = ({ webformatURL, largeImageURL, tags }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ImageStyle src={webformatURL} alt={tags} onClick={openModal} />

      {isModalOpen && (
        <ImageModal
          largeImageURL={largeImageURL}
          tags={tags}
          isOpen={openModal !== true}
          isClosed={closeModal}
        />
      )}
    </>
  );
};

ImageItem.propTypes = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  tags: PropTypes.string,
};
