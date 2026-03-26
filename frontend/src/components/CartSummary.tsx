import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartSummary = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const totalQty = cart.reduce((sum, item) => sum + item.qtyAmount, 0);
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.qtyAmount * item.price,
    0
  );

  return (
    <div
      style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        background: '#f8f9fa',
        padding: '10px 15px',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
        fontSize: '16px',
      }}
      onClick={() => navigate('/cart')}
    >
      🛒{' '}
      <strong>
        {' '}
        {totalQty} | ${totalAmount.toFixed(2)}
      </strong>
    </div>
  );
};

export default CartSummary;
