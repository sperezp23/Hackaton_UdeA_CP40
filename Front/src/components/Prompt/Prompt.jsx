import { useFormik } from "formik";
import * as Yup from "yup";
import "./Prompt.scss";
import Swal from "sweetalert2";
import axios from "axios";
import Modal from "../Modal/Modal";
import { useModalContext } from "../ModalContext/ModalContext";

const Prompt = () => {
  // Define un estado para controlar la visibilidad del modal
  const { modalVisible, setModalVisible } = useModalContext();

  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Muy Corto!")
      .max(70, "Muy Largo!")
      .required("Olbigatorio"),
    lastName: Yup.string()
      .min(2, "Muy Corto!")
      .max(70, "Muy Largo!")
      .required("Olbigatorio"),
    gender: Yup.string().required("Olbigatorio"),
    age: Yup.string() // Cambia a cadena en lugar de número
      .test(
        "is-number",
        "Edad debe ser un número válido",
        (value) => !isNaN(value) // Verifica si es un número válido
      )
      .test("is-over-18", "La edad debe estar entre 18 y 100 años", (value) => {
        const age = parseFloat(value);
        return !isNaN(age) && age > 18 && age < 100;
      }),
    symptoms: Yup.string()
      .min(2, "Muy Corto!")
      .max(1000, "Muy Largo!")
      .required("Olbigatorio"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      gender: "",
      age: "",
      symptoms: "",
    },

    onSubmit: async (values) => {
      await SignupSchema.validate(values, { abortEarly: false })
        .then(async () => {
          // Realiza el envío de datos o cualquier otra acción
          try {
            const response = await axios.post(
              "http://localhost:8000/prompt",
              values
            );
            if (response.status === 200) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Resultado del diagnóstico: " + response.data.prediction,
                text: "Índice de confiabilidad: 89.65%\n",
                showConfirmButton: true,
              });
              console.log(response);
            }
          } catch (error) {
            alert("Error al enviar los datos");
            console.log(error);
          }

          console.log(values);

          Swal.fire({
            position: "center",
            icon: "success",
            title: "Síntomas enviados correctamente.",
            showConfirmButton: true,
          });

          setModalVisible(true);
        })
        .catch((errors) => {
          // Actualiza el estado de errores en formik
          formik.setErrors(
            errors.inner.reduce((acc, error) => {
              acc[error.path] = error.message;
              return acc;
            }, {})
          );
        });
    },
  });
  return (
    <div className="prompt">
      <form onSubmit={formik.handleSubmit} className="form">
        <div className="form__name">
          <label htmlFor="firstName">Nombre: </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.firstName}
          />
          {formik.errors.firstName && (
            <div className="error">{formik.errors.firstName}</div>
          )}
        </div>
        <div className="form__lastname">
          <label htmlFor="lastName">Apellido: </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.lastName}
          />
          {formik.errors.lastName && (
            <div className="error">{formik.errors.lastName}</div>
          )}
        </div>
        <div className="form__gender">
          <label htmlFor="gender">Género: </label>
          <select
            name="gender"
            id="gender"
            onChange={formik.handleChange}
            value={formik.values.gender}
          >
            <option value="">Selecciona un género</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>
          {formik.errors.gender && (
            <div className="error">{formik.errors.gender}</div>
          )}
        </div>
        <div className="form__age">
          <label htmlFor="age">Edad: </label>
          <input
            id="age"
            name="age"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.age}
          />
          {formik.errors.age && (
            <div className="error">{formik.errors.age}</div>
          )}
        </div>
        <div className="form__symptoms">
          <label htmlFor="symptoms">Síntomas: </label>
          <textarea
            id="symptoms"
            name="symptoms"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.symptoms}
          />
          {formik.errors.symptoms && (
            <div className="error">{formik.errors.symptoms}</div>
          )}
        </div>
        <button className="form__submit" type="submit">
          Predecir
        </button>
      </form>
      {modalVisible && <Modal />}
    </div>
  );
};

export default Prompt;
