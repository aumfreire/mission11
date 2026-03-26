import { useState } from 'react';
import CategoryFilter from '../components/CategoryFilter';
import BookstoreList from '../components/BookstoreList';
import WelcomeBand from '../components/WelcomeBand';
import CartSummary from '../components/CartSummary';

function BookstorePage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  return (
    <div className="container py-4">
      <CartSummary />
      <WelcomeBand />

      <div className="row g-4 mt-1">
        <div className="col-12 col-lg-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <CategoryFilter
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
              />
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-8">
          <BookstoreList selectedCategories={selectedCategories} />
        </div>
      </div>
    </div>
  );
}

export default BookstorePage;
