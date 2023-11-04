import { useFormik } from "formik";
import * as Yup from "yup";
import "./Prompt.scss";
import Swal from "sweetalert2";
import axios from "axios";
import Modal from "../Modal/Modal";
import { useModalContext } from "../ModalContext/ModalContext";
import { useState } from "react";

const Prompt = () => {
  // Define un estado para controlar la visibilidad del modal
  const { modalVisible, setModalVisible } = useModalContext();
  const [prediction, setPrediction] = useState(null);

  const SignupSchema = Yup.object().shape({
    pidnum: Yup.string().required("Obligatorio"),
    time: Yup.string().required("Olbigatorio"),
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
  });

  const formik = useFormik({
    initialValues: {
      pidnum: "",
      time: "",
      trt: "",
      age: "",
      wtkg: "",
      hemo: "",
      homo: "",
      drugs: "",
      karnof: "",
      oprior: "",
      z30: "",
      zprior: "",
      preanti: "",
      race: "",
      gender: "",
      str2: "",
      strat: "",
      symptom: "",
      treat: "",
      offtrt: "",
      cd40: "",
      cd420: "",
      cd80: "",
      cd820: "",
      cid: "",
    },

    onSubmit: async (values) => {
      await SignupSchema.validate(values, { abortEarly: false })
        .then(async () => {
          // Realiza el envío de datos o cualquier otra acción
          try {
            console.log(values);
            const response = await axios.post(
              "http://localhost:8000/metodo",
              values
            );
            if (response.status === 200) {
              // Almacena la predicción en el estado
              setPrediction(response.data.prediction);

              Swal.fire({
                position: "center",
                icon: "success",
                title: "Síntomas enviados correctamente.",
                showConfirmButton: true,
              }).then(() => {
                setModalVisible(true);
              });

              console.log(values);
            } else {
              console.log("No entré");
            }
          } catch (error) {
            alert("Error al enviar los datos");
            console.log(error);
          }
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
        <div className="form__Inputs">
          <label htmlFor="pidnum">ID: </label>
          <input
            id="pidnum"
            name="pidnum"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.pidnum}
          />
          {formik.errors.pidnum && (
            <div className="error">{formik.errors.pidnum}</div>
          )}
        </div>
        {/* CID */}
        <div className="form__Inputs">
          <label htmlFor="cid">CID: </label>
          <input
            id="cid"
            name="cid"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.cid}
          />
          {formik.errors.cid && (
            <div className="error">{formik.errors.cid}</div>
          )}
        </div>
        {/* Time */}
        <div className="form__Inputs">
          <label htmlFor="time">CID: </label>
          <input
            id="time"
            name="time"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.time}
          />
          {formik.errors.time && (
            <div className="error">{formik.errors.time}</div>
          )}
        </div>
        {/* trt */}
        <div className="form__Inputs">
          <label htmlFor="trt">TRT: </label>
          <input
            id="trt"
            name="trt"
            type="trt"
            onChange={formik.handleChange}
            value={formik.values.trt}
          />
          {formik.errors.trt && (
            <div className="error">{formik.errors.trt}</div>
          )}
        </div>
        {/* age */}
        <div className="form__Inputs">
          <label htmlFor="age">Edad: </label>
          <input
            id="age"
            name="age"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.age}
          />
          {formik.errors.age && (
            <div className="error">{formik.errors.age}</div>
          )}
        </div>
        {/* wtkg */}
        <div className="form__Inputs">
          <label htmlFor="wtkg">wtkg: </label>
          <input
            id="wtkg"
            name="wtkg"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.wtkg}
          />
          {formik.errors.wtkg && (
            <div className="error">{formik.errors.wtkg}</div>
          )}
        </div>
        {/* hemo */}
        <div className="form__Inputs">
          <label htmlFor="hemo">Hemo: </label>
          <input
            id="hemo"
            name="hemo"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.hemo}
          />
          {formik.errors.hemo && (
            <div className="error">{formik.errors.hemo}</div>
          )}
        </div>
        {/* homo */}
        <div className="form__Inputs">
          <label htmlFor="homo">Homosexual: </label>
          <input
            id="homo"
            name="homo"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.homo}
          />
          {formik.errors.homo && (
            <div className="error">{formik.errors.homo}</div>
          )}
        </div>
        {/* drugs */}
        <div className="form__Inputs">
          <label htmlFor="drugs">Drugs: </label>
          <input
            id="drugs"
            name="drugs"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.drugs}
          />
          {formik.errors.drugs && (
            <div className="error">{formik.errors.drugs}</div>
          )}
        </div>
        {/* karnof */}
        <div className="form__Inputs">
          <label htmlFor="karnof">Karnofsky: </label>
          <input
            id="karnof"
            name="karnof"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.karnof}
          />
          {formik.errors.karnof && (
            <div className="error">{formik.errors.karnof}</div>
          )}
        </div>
        {/* oprior */}
        <div className="form__Inputs">
          <label htmlFor="oprior">Oprior: </label>
          <input
            id="oprior"
            name="oprior"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.oprior}
          />
          {formik.errors.oprior && (
            <div className="error">{formik.errors.oprior}</div>
          )}
        </div>
        {/* z30 */}
        <div className="form__Inputs">
          <label htmlFor="z30">Z30: </label>
          <input
            id="z30"
            name="z30"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.z30}
          />
          {formik.errors.z30 && (
            <div className="error">{formik.errors.z30}</div>
          )}
        </div>
        {/* zprior */}
        <div className="form__Inputs">
          <label htmlFor="zprior">Zprior: </label>
          <input
            id="zprior"
            name="zprior"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.zprior}
          />
          {formik.errors.zprior && (
            <div className="error">{formik.errors.zprior}</div>
          )}
        </div>
        {/* preanti */}
        <div className="form__Inputs">
          <label htmlFor="preanti">Preanti: </label>
          <input
            id="preanti"
            name="preanti"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.preanti}
          />
          {formik.errors.preanti && (
            <div className="error">{formik.errors.preanti}</div>
          )}
        </div>
        {/* race */}
        <div className="form__Inputs">
          <label htmlFor="race">Race: </label>
          <input
            id="race"
            name="race"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.race}
          />
          {formik.errors.race && (
            <div className="error">{formik.errors.race}</div>
          )}
        </div>
        {/* gender */}
        <div className="form__Inputs">
          <label htmlFor="trt">Género: </label>
          <select
            name="gender"
            id="gender"
            onChange={formik.handleChange}
            value={formik.values.gender}
          >
            <option value="">Selecciona un género</option>
            <option value="0">Masculino</option>
            <option value="1">Femenino</option>
          </select>
          {formik.errors.gender && (
            <div className="error">{formik.errors.gender}</div>
          )}
        </div>
        {/* str2 */}
        <div className="form__Inputs">
          <label htmlFor="str2">Str2: </label>
          <input
            id="str2"
            name="str2"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.str2}
          />
          {formik.errors.str2 && (
            <div className="error">{formik.errors.str2}</div>
          )}
        </div>
        {/* strat */}
        <div className="form__Inputs">
          <label htmlFor="strat">strat: </label>
          <input
            id="strat"
            name="strat"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.strat}
          />
          {formik.errors.strat && (
            <div className="error">{formik.errors.strat}</div>
          )}
        </div>
        {/* symptom */}
        <div className="form__Inputs">
          <label htmlFor="symptom">Síntomas: </label>
          <textarea
            id="symptom"
            name="symptom"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.symptom}
          />
          {formik.errors.symptom && (
            <div className="error">{formik.errors.symptom}</div>
          )}
        </div>
        {/* treat */}
        <div className="form__Inputs">
          <label htmlFor="treat">treat: </label>
          <input
            id="treat"
            name="treat"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.treat}
          />
          {formik.errors.treat && (
            <div className="error">{formik.errors.treat}</div>
          )}
        </div>
        {/* offtrt */}
        <div className="form__Inputs">
          <label htmlFor="offtrt">Offtrt: </label>
          <input
            id="offtrt"
            name="offtrt"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.offtrt}
          />
          {formik.errors.offtrt && (
            <div className="error">{formik.errors.offtrt}</div>
          )}
        </div>
        {/* cd40 */}
        <div className="form__Inputs">
          <label htmlFor="cd40">cd40: </label>
          <input
            id="cd40"
            name="cd40"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.cd40}
          />
          {formik.errors.cd40 && (
            <div className="error">{formik.errors.cd40}</div>
          )}
        </div>
        {/* cd420 */}
        <div className="form__Inputs">
          <label htmlFor="cd420">Cd420: </label>
          <input
            id="cd420"
            name="cd420"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.cd420}
          />
          {formik.errors.cd420 && (
            <div className="error">{formik.errors.cd420}</div>
          )}
        </div>
        {/* cd80 */}
        <div className="form__Inputs">
          <label htmlFor="cd80">Cd80: </label>
          <input
            id="cd80"
            name="cd80"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.cd80}
          />
          {formik.errors.cd80 && (
            <div className="error">{formik.errors.cd80}</div>
          )}
        </div>
        {/* cd820 */}
        <div className="form__Inputs">
          <label htmlFor="cd820">Cd820: </label>
          <input
            id="cd820"
            name="cd820"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.cd820}
          />
          {formik.errors.cd820 && (
            <div className="error">{formik.errors.cd820}</div>
          )}
        </div>

        <button className="form__submit" type="submit">
          Predecir
        </button>
      </form>
      {modalVisible && <Modal prediction={prediction} />}
    </div>
  );
};

export default Prompt;
