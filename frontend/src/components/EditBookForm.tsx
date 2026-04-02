import { useEffect, useState } from "react";
import { fetchBookCategories, updateBook } from "../api/BooksAPI";
import type { Books } from "../types/books";
import "./BookForm.css";

interface EditBookFormProps {
    book: Books;
    onSuccess: () => void;
    onCancel: () => void;
}

const EditBookForm = ({ book, onSuccess, onCancel }: EditBookFormProps) => {
    const [categories, setCategories] = useState<string[]>([]);
    const [formData, setFormData] = useState<Books>({ ...book });


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
        await updateBook(formData.bookId, formData);
        onSuccess();
    }
    return (
        <form onSubmit={handleSubmit} className="book-form card shadow-sm border-0 rounded-4">
            <div className="book-form__header">
                <p className="book-form__eyebrow">Book details</p>
                <h2>Edit Book</h2>
                <p>Update the record and save the changes back to the catalog.</p>
            </div>

            <div className="book-form__grid">
                <div className="book-form__field">
                    <label htmlFor="edit-title">Title</label>
                    <input id="edit-title" type="text" name="title" value={formData.title} onChange={handleChange} required />
                </div>

                <div className="book-form__field">
                    <label htmlFor="edit-author">Author</label>
                    <input id="edit-author" type="text" name="author" value={formData.author} onChange={handleChange} required />
                </div>

                <div className="book-form__field">
                    <label htmlFor="edit-publisher">Publisher</label>
                    <input id="edit-publisher" type="text" name="publisher" value={formData.publisher} onChange={handleChange} required />
                </div>

                <div className="book-form__field">
                    <label htmlFor="edit-isbn">ISBN</label>
                    <input id="edit-isbn" type="text" name="isbn" value={formData.isbn} onChange={handleChange} required />
                </div>

                <div className="book-form__field">
                    <label htmlFor="edit-classification">Classification</label>
                    <input id="edit-classification" type="text" name="classification" value={formData.classification} onChange={handleChange} required />
                </div>

                <div className="book-form__field">
                    <label htmlFor="edit-category">Category</label>
                    <select id="edit-category" name="category" value={formData.category} onChange={handleSelectChange} required>
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="book-form__field">
                    <label htmlFor="edit-pageCount">Page Count</label>
                    <input id="edit-pageCount" type="number" name="pageCount" value={formData.pageCount} onChange={handleChange} min="0" step="1" required />
                </div>

                <div className="book-form__field">
                    <label htmlFor="edit-price">Price</label>
                    <div className="book-form__currency-field">
                        <span>$</span>
                        <input id="edit-price" type="number" name="price" value={formData.price} onChange={handleChange} step="0.01" min="0" required />
                    </div>
                </div>
            </div>

            <div className="book-form__actions">
                <button type="submit" className="book-form__submit">Save Changes</button>
                <button type="button" className="book-form__cancel" onClick={onCancel}>Cancel</button>
            </div>
        </form >
    )
}

export default EditBookForm;


