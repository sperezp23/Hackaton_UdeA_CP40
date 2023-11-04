import "./Header.scss";

const Header = () => {
  return (
    <div className="header">
      <figure className="header__logo">
        {/* <img src="https://i.ibb.co/NZbmQmD/Logo.png" alt="LLMed" /> */}
      </figure>
      <h1 className="header__title">
      Asistente para la prescripción de tratamiento
      </h1>
    </div>
  );
};

export default Header;
