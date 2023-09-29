import "./Header.scss";

const Header = () => {
  return (
    <div className="header">
      <figure className="header__logo">
        <img src="https://i.ibb.co/NZbmQmD/Logo.png" alt="LLMed" />
      </figure>
      <h1 className="header__title">
        Transformando Datos en Diagnósticos: Tu Socio en la Lucha contra la
        Desinformación.
      </h1>
    </div>
  );
};

export default Header;
