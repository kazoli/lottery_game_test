import 'react-toastify/dist/ReactToastify.css';
import '../../styles/index.css';
import { ContextProvider } from './Context';
import { ToastContainer } from 'react-toastify';
import Router from './Router';

function App() {
  return (
    <ContextProvider>
      <Router />
      <ToastContainer autoClose={5000} />
    </ContextProvider>
  );
}

export default App;
