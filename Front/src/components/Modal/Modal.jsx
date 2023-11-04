import { useModalContext } from "../ModalContext/ModalContext";
import "./Modal.scss";

const Modal = (props) => {
  // Define un estado para controlar la visibilidad del modal
  const { modalVisible, setModalVisible } = useModalContext();

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="modal">
      <h2>Resultado</h2>
      <p className="modal__result">Predicción: {props.prediction}</p>
      {/* <p className="modal__result--indice">Índice de confiabilidad: 89.65%</p> */}
      <button onClick={handleCloseModal} className="modal__close">
        Cerrar
      </button>
    </div>
  );
};

export default Modal;
