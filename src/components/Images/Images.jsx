import { useState, useEffect } from 'react';
import { ImageList } from './ImageGallery/ImageList';
import { imagesApi } from '../../services/imagesApi';
import Searchbar from './Searchbar/Searchbar';

import Modal from 'Shared/Modal/Modal';
import { LoadMore } from './Button/LoadMore';
import Notiflix from 'notiflix';
import { Spinner } from './Loader/spinner';
const Images = () => {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState('');
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    const getFetch = async () => {
      try {
        setLoading(true);
        const { data } = await imagesApi({ search, page });

        if (data.hits.length === 0) {
          Notiflix.Notify.info(
            'Sorry, we are didn`t find pictures by your request'
          );
        }
        setLoading(false);
        setImages(prevState => {
          return [...prevState, ...data.hits];
        });
        setTotalHits(data.totalHits);
      } catch (response) {
        setError({ error: response.data.message || 'Cannot fetch posts' });
      } finally {
        setLoading(false);
      }
    };
    if (search) {
      getFetch();
    }
  }, [page, search]);
  const loadMore = () => {
    setPage(prevState => {
      return prevState + 1;
    });
  };
  const onSubmit = ({ search }) => {
    setSearch(search);
    setPage(1);
    setImages([]);
  };
  const openModal = url => {
    setShowModal(true);
    setUrl(url);
  };
  const closeModal = () => {
    setShowModal(false);
    setUrl('');
  };

  return (
    <>
      {showModal && (
        <Modal close={closeModal}>
          <img src={url} alt="" />
        </Modal>
      )}

      <Searchbar Submit={onSubmit} />
      {loading && <Spinner />}

      {error && <p>{error}</p>}
      <ImageList images={images} onClick={openModal} />
      {Boolean(images.length) && images.length !== totalHits && (
        <LoadMore loadmore={loadMore} />
      )}
      {Boolean(images.length) && images.length === totalHits && (
        <p>The end...</p>
      )}
    </>
  );
};
export default Images;
