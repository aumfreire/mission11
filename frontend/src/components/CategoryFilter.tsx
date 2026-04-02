import { useEffect, useState } from 'react';
import { fetchBookCategories } from '../api/BooksAPI';
import './CategoryFilter.css';

function CategoryFilter({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await fetchBookCategories();
        setCategories(data);
      } catch (error) {
        console.error(`Error fetching categories: ${error}`);
      }
    };
    fetchCategories();
  }, []);

  function handleCheckboxChange({ target }: { target: HTMLInputElement }) {
    const updatedCategories = selectedCategories.includes(target.value)
      ? selectedCategories.filter((x) => x !== target.value)
      : [...selectedCategories, target.value];

    setSelectedCategories(updatedCategories);
  }

  return (
    <div className="category-filter">
      <div className="category-filter__header">
        <h5>Book Categories</h5>
        <p>Filter the bookstore by one or more categories.</p>
      </div>
      <div className="category-list">
        {categories.map((c, index) => {
          const checkboxId = `category-${index}`;

          return (
            <div key={c} className="category-item">
              <input
                type="checkbox"
                id={checkboxId}
                value={c}
                className="category-checkbox"
                checked={selectedCategories.includes(c)}
                onChange={handleCheckboxChange}
              />
              <label htmlFor={checkboxId}>{c}</label>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default CategoryFilter;
