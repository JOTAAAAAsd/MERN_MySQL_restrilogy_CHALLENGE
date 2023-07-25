import { AppRouting } from "./components/AppRouting";
import { AuthProvider } from "./hooks/context/AuthContext";
import {  Header } from "./components/UI/Header";
import { ToastContainer } from 'react-toastify';
import { ModalAppProvider } from "./hooks/context/ModalAppContext";

function App() {
  return <>
    <AuthProvider>
      <Header />
      <ModalAppProvider>
        <AppRouting />
      </ModalAppProvider>
    </AuthProvider>
    <ToastContainer />
  </>;
}

export default App;
