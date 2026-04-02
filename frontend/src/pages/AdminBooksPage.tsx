import { useEffect, useRef, useState } from "react";
import Pagination from "../components/Paginations";
import { deleteBook, fecthBooks } from "../api/BooksAPI";
import type { Books } from "../types/books";
import NewBookForm from "../components/NewBookForm";
import EditBookForm from "../components/EditBookForm";

const AdminBooksPage = () => {
    const [pageNum, setPageNum] = useState<number>(1);
    const [loading, setLoading] = useState(true);
    const [pageSize, setPageSize] = useState<number>(10);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortBy, setSortBy] = useState<string>('none');
    const [sortDir, setSortDir] = useState<string>('asc');
    const [books, setBooks] = useState<Books[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [addForm, setAddForm] = useState(false);
    const [editingBook, setEditingBook] = useState<Books | null>(null);
    const editFormRef = useRef<HTMLDivElement | null>(null);



    useEffect(() => {
        const loadBooks = async () => {

            try {
                setLoading(true)
                const data = await fecthBooks(pageSize, pageNum, sortBy, sortDir, []);

                setBooks(data.books);
                setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
            } catch (error) {
                setError((error as Error).message)
            } finally {
                setLoading(false);
            }

        };

        loadBooks();
    }, [pageSize, pageNum, sortBy, sortDir]);

    useEffect(() => {
        if (editingBook && editFormRef.current) {
            editFormRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [editingBook]);

    const handleDelete = async (bookId: number) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this book?');
        if (!confirmDelete) return;

        try {
            await deleteBook(bookId);
            setBooks(books.filter((p) => p.bookId !== bookId))
        } catch {
            alert('Failed to delete project. Please try again.');

        }
    }

    if (loading) return <p>Loading books...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>

    return (<>
        <h1>Admin - Bookstore</h1>

        {/* ==== DISPLAY ADD BOOK FORM */}
        {!addForm && !editingBook && (
            <button
                className="btn btn-success btn-sm mb-3"
                style={{
                    alignSelf: "center",
                    width: "fit-content",
                    display: "inline-block",
                    padding: "0.3rem 0.7rem",
                    fontSize: "0.82rem"
                }}
                onClick={() => setAddForm(true)}
            >
                Add Book
            </button>
        )}

        {addForm && (
            <div className="book-form-wrapper">
                <NewBookForm
                    onSuccess={() => {
                        setAddForm(false);
                        fecthBooks(pageSize, pageNum, sortBy, sortDir, [])
                            .then((data) => setBooks(data.books))
                    }}
                    onCancel={() => setAddForm(false)}
                />
            </div>
        )}

        {/* ==== DISPLAY EDIT BOOK FORM */}
        {editingBook && (
            <div className="book-form-wrapper" ref={editFormRef}>
                <EditBookForm
                    book={editingBook} onSuccess={() => {
                        setEditingBook(null);
                        fecthBooks(pageSize, pageNum, sortBy, sortDir, [])
                            .then((data) => setBooks(data.books))

                    }}
                    onCancel={() => setEditingBook(null)}
                />
            </div>
        )}




        <table className="table table-bordered table-striped">
            <thead className="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Publisher</th>
                    <th>ISBN</th>
                    <th>Classification</th>
                    <th>Category</th>
                    <th>PageCount</th>
                    <th>Price</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {books.map((b) => (
                    <tr key={b.bookId}>
                        <td>{b.bookId}</td>
                        <td><strong>{b.title}</strong></td>
                        <td>{b.author}</td>
                        <td>{b.publisher}</td>
                        <td>{b.isbn}</td>
                        <td>{b.classification}</td>
                        <td>{b.category}</td>
                        <td>{b.pageCount}</td>
                        <td>${b.price}</td>
                        <td>
                            <button
                                className="btn btn-primary btn-sm w-100 mb-1"
                                onClick={() => {
                                    setAddForm(false);
                                    setEditingBook(b);
                                }}
                            >
                                Edit
                            </button>
                            <button className="btn btn-danger btn-sm w-100" onClick={() => handleDelete(b.bookId)}>Delete</button></td>

                    </tr>
                ))}
            </tbody>
        </table>

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

    </>)
}

export default AdminBooksPage;