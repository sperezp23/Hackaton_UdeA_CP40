import Header from "./components/Header/Header";
import Prompt from "./components/Prompt/Prompt";
import { ModalProvider } from "./components/ModalContext/ModalContext";

const App = () => {
  return (
    <ModalProvider>
      <div>
        <Header />
        <Prompt />
      </div>
    </ModalProvider>
  );
};

export default App;
