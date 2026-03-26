import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookstorePage from './pages/BookstorePage';
import BuyBookPage from './pages/BuyBookPage';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<BookstorePage />} />
            <Route path="/bookstore" element={<BookstorePage />} />
            <Route path="/cart/:title/:bookId" element={<BuyBookPage />} />
            <Route
              path="/cart/:title/:bookId/:price"
              element={<BuyBookPage />}
            />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </Router>
      </CartProvider>


    </>
  );
}

export default App;
