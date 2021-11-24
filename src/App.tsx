import { ToastContainer } from 'react-toastify';
import { SmsForm } from './components/sms-form';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <SmsForm />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
    </div>
  );
}

export default App;
