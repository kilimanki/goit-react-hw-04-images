import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from '../styles.module.css';
const modalRoot = document.getElementById('modal-root');
const Modal = ({ close, children }) => {
  const pressedKey = ({ code, target, currentTarget }) => {
    if (target === currentTarget || code === 'Escape') {
      close();
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', pressedKey);
    return () => document.removeEventListener('keydown', pressedKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return createPortal(
    <div className={css.Overlay} onClick={pressedKey}>
      <div className={css.modal}>{children}</div>
    </div>,
    modalRoot
  );
};
// class Modal extends Component {
//   componentDidMount() {
// document.addEventListener('keydown', this.pressedKey);
//   }
//   componentWillUnmount() {
// document.removeEventListener('keydown', this.pressedKey);
//   }
// pressedKey = ({ code, target, currentTarget }) => {
//   if (target === currentTarget || code === 'Escape') {
//     const { close } = this.props;
//     close();
//   }
// };
//   render() {
// const { children } = this.props;
// return createPortal(
//   <div className={css.Overlay} onClick={this.pressedKey}>
//     <div className={css.modal}>{children}</div>
//   </div>,
//   modalRoot
// );
//   }
// }
export default Modal;
