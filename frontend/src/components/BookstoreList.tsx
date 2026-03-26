import { useEffect, useState } from 'react';
import type { Books } from '../types/books';
import { useNavigate } from 'react-router-dom';

function BookstoreList({
  selectedCategories,
}: {
  selectedCategories: string[];
}) {
  const [books, setBooks] = useState<Books[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('none');
  const [sortDir, setSortDir] = useState<string>('asc');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      const categoryParams = selectedCategories
        .map((cat) => `bookCategories=${encodeURIComponent(cat)}`)
        .join('&');

      const sortQuery =
        sortBy === 'title' ? `&sortBy=${sortBy}&sortDir=${sortDir}` : '';
      const response = await fetch(
        `https://localhost:5000/bookstore/allbooks?pageSize=${pageSize}&pageNum=${pageNum}${sortQuery}&${selectedCategories.length ? `&${categoryParams}` : ''}`
      );
      const data = await response.json();

      if (
        selectedCategories.length > 0 &&
        pageNum > 1 &&
        data.books.length === 0
      ) {
        setPageNum(1);
        return;
      }

      setBooks(data.books);
      setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
    };

    fetchBooks();
  }, [pageSize, pageNum, sortBy, sortDir, selectedCategories]);

  return (
    <>
      <br />
      {books.map((b) => (
        <div id="bookCard" className="card shadow-sm mb-3" key={b.bookId}>
          <h3 className="card-title">
            <strong>{b.title}</strong>
          </h3>
          <br />

          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Author:</strong> {b.author}
              </li>
              <li>
                <strong>Publisher:</strong> {b.publisher}
              </li>
              <li>
                <strong>ISBN:</strong> {b.isbn}
              </li>
              <li>
                <strong>Classification/Category:</strong> {b.classification}/
                {b.category}
              </li>
              <li>
                <strong>Number of Pages:</strong> {b.pageCount}
              </li>
              <li>
                <strong>Price:</strong> ${b.price}
              </li>
            </ul>
          </div>
          <div className="d-flex justify-content-center pb-3">
            <button
              className="btn btn-success btn-sm w-auto"
              onClick={() =>
                navigate(`/cart/${encodeURIComponent(b.title)}/${b.bookId}`)
              }
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}

      <div className="d-flex justify-content-center my-3">
        <nav aria-label="Book pagination">
          <ul className="pagination mb-0">
            <li className={`page-item ${pageNum === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => setPageNum(pageNum - 1)}
              >
                Previous
              </button>
            </li>

            {[...Array(totalPages)].map((_, i) => (
              <li
                className={`page-item ${pageNum === i + 1 ? 'active' : ''}`}
                key={i + 1}
              >
                <button className="page-link" onClick={() => setPageNum(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}

            <li
              className={`page-item ${pageNum === totalPages ? 'disabled' : ''}`}
            >
              <button
                className="page-link"
                onClick={() => setPageNum(pageNum + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div className="row g-3 align-items-end mt-1">
        <div className="col-12 col-md-4">
          <label className="form-label mb-1">Results per page</label>
          <select
            className="form-select"
            value={pageSize}
            onChange={(p) => {
              setPageSize(Number(p.target.value));
              setPageNum(1);
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        <div className="col-12 col-md-4">
          <label className="form-label mb-1">Sort</label>
          <select
            className="form-select"
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setPageNum(1);
            }}
          >
            <option value="none">None</option>
            <option value="title">Title</option>
          </select>
        </div>

        {sortBy === 'title' && (
          <div className="col-12 col-md-4">
            <label className="form-label mb-1">Direction</label>
            <select
              className="form-select"
              value={sortDir}
              onChange={(e) => {
                setSortDir(e.target.value);
                setPageNum(1);
              }}
            >
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </select>
          </div>
        )}
      </div>
      <br />
    </>
  );
}

export default BookstoreList;
