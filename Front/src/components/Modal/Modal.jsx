import { useModalContext } from "../ModalContext/ModalContext";
import "./Modal.scss";

const Modal = () => {
  // Define un estado para controlar la visibilidad del modal
  const { modalVisible, setModalVisible } = useModalContext();

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="modal">
      <h2>Resultado</h2>
      <p className="modal__result">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi
        provident totam vitae animi vero perferendis reiciendis, quod architecto
        dolorem molestiae doloremque id autem iure ipsam iste. Sequi, est.
        Inventore, maxime.
      </p>
      <p className="modal__result--indice">Índice de confiabilidad: 0.5</p>
      <button onClick={handleCloseModal} className="modal__close">
        Cerrar
      </button>
    </div>
  );
};

export default Modal;
