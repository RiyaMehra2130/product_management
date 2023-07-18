
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import PublicLayout from './Layout/PublicLayout';
import PrivateLayout from './Layout/PrivateLayout';
import Home from './Components/Home/Home';
import Model from './Components/Model/Model';
;

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<PublicLayout />}>
            <Route index element={<Login />} />
            <Route path='signup' element={<SignUp />} />
          </Route>
          <Route path='/home' element={<PrivateLayout />}>
            <Route index element={<Home />} />
       
          </Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
     
    </div>
  );
}

export default App;
