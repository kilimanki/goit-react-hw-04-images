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
    console.log(url);
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
// class Images extends Component {
//   state = {
//     search: '',
//     images: [],
//     page: 1,
//     loading: false,
//     error: null,
//     showModal: false,
//     url: '',
//     totalHits: 0,
//   };
// async getFetch() {
//   try {
//     const { page, search } = this.state;
//     this.setState({ loading: true });
//     const { data } = await imagesApi({ search, page });

//     if (data.hits.length === 0) {
//       Notiflix.Notify.info(
//         'Sorry, we are didn`t find pictures by your request'
//       );
//     }

//     this.setState(prevState => {
//       return {
//         loading: false,
//         images: [...prevState.images, ...data.hits],
//         totalHits: data.totalHits,
//       };
//     });
//   } catch (response) {
//     this.setState({ error: response.data.message || 'Cannot fetch posts' });
//   } finally {
//     this.setState({ loading: false });
//   }
// }
//   componentDidUpdate(_, prevState) {
//     const { page, search } = this.state;
//     if (prevState.page !== page || prevState.search !== search) {
//       this.getFetch();
//     }
//   }
// loadMore = () => {
//   this.setState(prevState => ({ page: prevState.page + 1 }));
// };
// onSubmit = ({ search }) => {
//   this.setState({
//     search,
//     page: 1,
//     images: [],
//   });
// };
// openModal = url => {
//   this.setState({
//     showModal: true,
//     url,
//   });
// };
// closeModal = () => {
//   this.setState({
//     showModal: false,
//     url: '',
//   });
// };
//   render() {
// const { images, loading, error, showModal, url } = this.state;

// return (
//   <>
//     {showModal && (
//       <Modal close={this.closeModal}>
//         <img src={url} alt="" />
//       </Modal>
//     )}

//     <Searchbar Submit={this.onSubmit} />
//     {loading && <Spinner />}

//     {error && <p>{error}</p>}
//     <ImageList images={images} onClick={this.openModal} />
//     {Boolean(images.length) && images.length !== this.state.totalHits && (
//       <LoadMore loadmore={this.loadMore} />
//     )}
//     {Boolean(images.length) && images.length === this.state.totalHits && (
//       <p>The end...</p>
//     )}
//   </>
// );
//   }
// }
export default Images;
