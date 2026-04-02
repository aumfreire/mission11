import { useEffect, useState } from "react";
import { addBook, fetchBookCategories } from "../api/BooksAPI";
import type { Books } from "../types/books";
import "./BookForm.css";

interface NewBookFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}

const NewBookForm = ({ onSuccess, onCancel }: NewBookFormProps) => {
    const [categories, setCategories] = useState<string[]>([]);

    const [formData, setFormData] = useState<Books>({
        bookId: 0,
        title: '',
        author: '',
        publisher: '',
        isbn: '',
        classification: '',
        category: '',
        pageCount: 0,
        price: 0.0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "number" ? Number(value) : value,
        }) as Books);
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }) as Books);
    };

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await fetchBookCategories();
                setCategories(data);
            } catch (error) {
                console.error("Failed to load categories", error);
            }
        };

        loadCategories();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await addBook(formData);
        onSuccess();
    }
    return (
        <form onSubmit={handleSubmit} className="book-form card shadow-sm border-0 rounded-4">
            <div className="book-form__header">
                <p className="book-form__eyebrow">Book details</p>
                <h2>Add New Book</h2>
                <p>Enter the details for a new catalog record and publish it to the bookstore.</p>
            </div>

            <div className="book-form__grid">
                <div className="book-form__field">
                    <label htmlFor="new-title">Title</label>
                    <input id="new-title" type="text" name="title" value={formData.title} onChange={handleChange} required />
                </div>

                <div className="book-form__field">
                    <label htmlFor="new-author">Author</label>
                    <input id="new-author" type="text" name="author" value={formData.author} onChange={handleChange} required />
                </div>

                <div className="book-form__field">
                    <label htmlFor="new-publisher">Publisher</label>
                    <input id="new-publisher" type="text" name="publisher" value={formData.publisher} onChange={handleChange} required />
                </div>

                <div className="book-form__field">
                    <label htmlFor="new-isbn">ISBN</label>
                    <input id="new-isbn" type="text" name="isbn" value={formData.isbn} onChange={handleChange} required />
                </div>

                <div className="book-form__field">
                    <label htmlFor="new-classification">Classification</label>
                    <input id="new-classification" type="text" name="classification" value={formData.classification} onChange={handleChange} required />
                </div>

                <div className="book-form__field">
                    <label htmlFor="new-category">Category</label>
                    <select id="new-category" name="category" value={formData.category} onChange={handleSelectChange} required>
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="book-form__field">
                    <label htmlFor="new-pageCount">Page Count</label>
                    <input id="new-pageCount" type="number" name="pageCount" value={formData.pageCount} onChange={handleChange} min="0" step="1" required />
                </div>

                <div className="book-form__field">
                    <label htmlFor="new-price">Price</label>
                    <div className="book-form__currency-field">
                        <span>$</span>
                        <input id="new-price" type="number" name="price" value={formData.price} onChange={handleChange} step="0.01" min="0" required />
                    </div>
                </div>
            </div>

            <div className="book-form__actions">
                <button type="submit" className="book-form__submit">Add Book</button>
                <button type="button" className="book-form__cancel" onClick={onCancel}>Cancel</button>
            </div>
        </form >
    )
}

export default NewBookForm;


