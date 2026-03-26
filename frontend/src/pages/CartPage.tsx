import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import type { CartItem } from '../types/CartItem';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();
  const total = cart.reduce(
    (sum, item) => sum + item.qtyAmount * item.price,
    0
  );
  const itemCount = cart.reduce((sum, item) => sum + item.qtyAmount, 0);

  return (
    <div className="container py-4">
      <div className="row g-4">
        <div className="col-12 col-lg-8">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body p-4">
              <h2 className="h3 mb-3">Your Cart</h2>

              {cart.length === 0 ? (
                <div className="alert alert-info mb-0">Your cart is empty</div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead>
                      <tr>
                        <th>Book</th>
                        <th className="text-end">Qty</th>
                        <th className="text-end">Unit Price</th>
                        <th className="text-end">Subtotal</th>
                        <th className="text-end">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item: CartItem) => (
                        <tr key={item.bookId}>
                          <td>{item.title}</td>
                          <td className="text-end">{item.qtyAmount}</td>
                          <td className="text-end">${item.price.toFixed(2)}</td>
                          <td className="text-end">
                            ${(item.qtyAmount * item.price).toFixed(2)}
                          </td>
                          <td className="text-end">
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => removeFromCart(item.bookId)}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-4">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h3 className="h5 mb-3">Order Summary</h3>
              <ul className="list-group mb-3">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Total Items
                  <span className="badge text-bg-primary rounded-pill">
                    {itemCount}
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Order Total
                  <strong>${total.toFixed(2)}</strong>
                </li>
              </ul>

              <div className="d-grid gap-2">
                <button className="btn btn-dark" disabled={cart.length === 0}>
                  Checkout
                </button>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => navigate("/bookstore")}
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CartPage;
