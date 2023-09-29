import { useFormik } from "formik";
import * as Yup from "yup";
import "./Prompt.scss";
import Swal from "sweetalert2";

const Prompt = () => {
  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Muy Corto!")
      .max(70, "Muy Largo!")
      .required("Olbigatorio"),
    lastName: Yup.string()
      .min(2, "Muy Corto!")
      .max(70, "Muy Largo!")
      .required("Olbigatorio"),
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
      .max(400, "Muy Largo!")
      .required("Olbigatorio"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      age: "",
      symptoms: "",
    },

    onSubmit: async (values) => {
      await SignupSchema.validate(values, { abortEarly: false })
        .then(async () => {
          // Realiza el envío de datos o cualquier otra acción
          console.log(values);
          alert(JSON.stringify(values, null, 2));
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Formulario enviado con éxito",
            showConfirmButton: true,
          });
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
      <div className="prompt__result">
        <h2>Resultado</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi
          provident totam vitae animi vero perferendis reiciendis, quod
          architecto dolorem molestiae doloremque id autem iure ipsam iste.
          Sequi, est. Inventore, maxime.
        </p>
        <p>Índice de confiabilidad: 0.5</p>
      </div>
    </div>
  );
};

export default Prompt;
