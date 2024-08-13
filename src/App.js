import './App.css';
import Layout from './components/layout';
import Home from './pages/home';
import Detail from './pages/detail';
import CartPage from './pages/detail';
import ThankYouPage from './pages/ThankYouPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="bottom-right" autoClose={3000} />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/:slug' element={<Detail />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/thank-you' element={<ThankYouPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;