import { useEffect, useState } from "react";
import { addBook, fetchBookCategories } from "../api/BooksAPI";
import type { Books } from "../types/books";

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
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
        <form onSubmit={handleSubmit}>
            <h2>Add New Book</h2>

            <label>Title: <input type="text" name="title" value={formData.title} onChange={handleChange} /></label>

            <label >Author: <input type="text" name="author" value={formData.author} onChange={handleChange} /></label>

            <label >Publisher: <input type="text" name="publisher" value={formData.publisher} onChange={handleChange} /></label>

            <label>ISBN: <input type="text" name="isbn" value={formData.isbn} onChange={handleChange} /></label>

            <label>Classification: <input type="text" name="classification" value={formData.classification} onChange={handleChange} /></label>

            <label>
                Category:
                <select name="category" value={formData.category} onChange={handleSelectChange}>
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </label>

            <label>Page Count: <input type="number" name="pageCount" value={formData.pageCount} onChange={handleChange} /></label>

            <label>Price: <span>$</span><input type="number" name="price" value={formData.price} onChange={handleChange} step="0.01" min="0" /></label>


            <div>
                <button type="submit">Add Book</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </div>
        </form >
    )
}

export default NewBookForm;


