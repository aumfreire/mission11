import { useEffect, useState } from 'react';
import type { Books } from './types/books';

function BookstoreList() {
  const [books, setBooks] = useState<Books[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('none');
  const [sortDir, setSortDir] = useState<string>('asc');

  useEffect(() => {
    const fetchBooks = async () => {
      const sortQuery =
        sortBy === 'title' ? `&sortBy=${sortBy}&sortDir=${sortDir}` : '';
      const response = await fetch(
        `https://localhost:5000/bookstore/allbooks?pageSize=${pageSize}&pageNum=${pageNum}${sortQuery}`
      );
      const data = await response.json();

      setBooks(data.books);
      setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
    };

    fetchBooks();
  }, [pageSize, pageNum, sortBy, sortDir]);

  return (
    <>
      <h1>Welcome to my Bookstore</h1>
      <br />
      {books.map((b) => (
        <div id="bookCard" className="card" key={b.bookId}>
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
        </div>
      ))}

      <div className="pagination-controls">
        <button
          className="pagination-btn"
          disabled={pageNum === 1}
          onClick={() => setPageNum(pageNum - 1)}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            className="pagination-btn"
            key={i + 1}
            onClick={() => setPageNum(i + 1)}
            disabled={pageNum === i + 1}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="pagination-btn"
          disabled={pageNum === totalPages}
          onClick={() => setPageNum(pageNum + 1)}
        >
          Next
        </button>
      </div>

      <br />
      <label htmlFor="">
        Results per page:{' '}
        <select
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
      </label>
      <br />

      {/* SORT BY */}
      <label>
        Sort:
        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setPageNum(1);
          }}
        >
          <option value="none">None</option>
          <option value="title">Title</option>
        </select>
      </label>

      {sortBy === 'title' && (
        <label>
          Direction:
          <select
            value={sortDir}
            onChange={(e) => {
              setSortDir(e.target.value);
              setPageNum(1);
            }}
          >
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </label>
      )}
      <br />
    </>
  );
}

export default BookstoreList;
