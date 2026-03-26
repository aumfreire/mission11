import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand';
import type { CartItem } from '../types/CartItem';
import { useCart } from '../context/CartContext';

function BuyBookPage() {
  const navigate = useNavigate();
  const { title, bookId } = useParams();
  const { addToCart } = useCart();
  const [qtyInput, setQtyInput] = useState<string>('1');
  const [unitPrice, setUnitPrice] = useState<number | null>(null);
  const [isLoadingPrice, setIsLoadingPrice] = useState<boolean>(true);
  const decodedTitle = title ? decodeURIComponent(title) : 'No Book Found';
  const parsedQty = Number.parseInt(qtyInput, 10);
  const qtyAmount = Number.isNaN(parsedQty) ? 0 : Math.max(0, parsedQty);
  const subtotal = qtyAmount * (unitPrice ?? 0);

  useEffect(() => {
    const fetchBookPrice = async () => {
      if (!bookId) {
        setIsLoadingPrice(false);
        setUnitPrice(null);
        return;
      }

      try {
        setIsLoadingPrice(true);
        const response = await fetch(
          `https://localhost:5000/bookstore/book/${bookId}`
        );

        if (!response.ok) {
          setUnitPrice(null);
          return;
        }

        const data = await response.json();
        const priceValue = Number(data.price ?? data.Price);
        setUnitPrice(Number.isFinite(priceValue) ? priceValue : null);
      } catch {
        setUnitPrice(null);
      } finally {
        setIsLoadingPrice(false);
      }
    };

    fetchBookPrice();
  }, [bookId]);

  const handleAddToCart = () => {
    if (qtyAmount <= 0 || unitPrice === null) return;

    const newItem: CartItem = {
      bookId: Number(bookId),
      title: decodedTitle,
      qtyAmount,
      price: unitPrice,
    };
    addToCart(newItem);
    navigate('/cart');
  };

  return (
    <>
      <WelcomeBand />
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <h2 className="h4 mb-3">
                  Title: <strong>{decodedTitle}</strong>
                </h2>

                <div className="row g-3 mb-4">
                  <div className="col-sm-6">
                    <div className="p-3 bg-light border rounded">
                      <div className="text-muted small">Unit Price</div>
                      <div className="fw-semibold">
                        {isLoadingPrice
                          ? 'Loading...'
                          : unitPrice !== null
                            ? `$${unitPrice.toFixed(2)}`
                            : 'Unavailable'}
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="p-3 bg-success-subtle border border-success-subtle rounded">
                      <div className="text-success-emphasis small">
                        Subtotal
                      </div>
                      <div className="fw-bold text-success-emphasis">
                        ${subtotal.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-center align-items-end gap-2 mb-3">
                  <div>
                    <label htmlFor="qtyInput" className="form-label mb-1">
                      Quantity
                    </label>
                    <div className="input-group" style={{ width: '11rem' }}>
                      <span className="input-group-text">Qty</span>
                      <input
                        id="qtyInput"
                        className="form-control text-center"
                        type="number"
                        min={1}
                        step={1}
                        value={qtyInput}
                        onChange={(x) => setQtyInput(x.target.value)}
                        onBlur={() => {
                          if (qtyInput === '' || qtyAmount <= 0) {
                            setQtyInput('1');
                          }
                        }}
                      />
                    </div>
                  </div>

                  <button
                    className="btn btn-success mb-1"
                    onClick={handleAddToCart}
                    disabled={unitPrice === null || isLoadingPrice}
                  >
                    Add to Cart
                  </button>
                </div>

                <div className="d-flex justify-content-center">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => navigate(-1)}
                  >
                    Go Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BuyBookPage;
