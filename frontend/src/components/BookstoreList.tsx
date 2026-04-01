import { useEffect, useState } from 'react';
import type { Books } from '../types/books';
import { useNavigate } from 'react-router-dom';
import Pagination from './Paginations';
import { fecthBooks } from '../api/BooksAPI';

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
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {

      try {
        setLoading(true)
        const data = await fecthBooks(pageSize, pageNum, sortBy, sortDir, selectedCategories);

        setBooks(data.books);
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
      } catch (error) {
        setError((error as Error).message)
      } finally {
        setLoading(false);
      }

    };

    loadBooks();
  }, [pageSize, pageNum, sortBy, sortDir, selectedCategories]);

  if (loading) return <p>Laoding books...</p>
  if (error) return <p className='text-red-500'>Error: {error}</p>

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

      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        sortBy={sortBy}
        sortDir={sortDir}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1);
        }}
        onSortByChange={setSortBy}
        onSortDirChange={setSortDir}

      />

      <br />
    </>
  );
}

export default BookstoreList;
