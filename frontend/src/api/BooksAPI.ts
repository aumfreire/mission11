import type { Books } from "../types/books";

interface FetchBooksResponse {
    books: Books[];
    totalNumBooks: number;
}

// ============= LOAD BOOKS =============
export const fecthBooks = async (
    pageSize: number,
    pageNum: number,
    sortBy: string,
    sortDir: string,
    selectedCategories: string[]
): Promise<FetchBooksResponse> => {
    try {
        const categoryParams = selectedCategories
            .map((cat) => `bookCategories=${encodeURIComponent(cat)}`)
            .join('&');

        const sortQuery =
            sortBy === 'title' ? `&sortBy=${sortBy}&sortDir=${sortDir}` : '';
        const response = await fetch(
            `https://localhost:5000/BookStore/allbooks?pageSize=${pageSize}&pageNum=${pageNum}${sortQuery}&${selectedCategories.length ? `&${categoryParams}` : ''}`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch projects');
        }

        return await response.json();

    } catch (error) {
        console.error('Error fetching projects', error);
        throw error;
    }
};

// ============= DELETE BOOK =============
export const deleteBook = async (bookId: number): Promise<void> => {
    try {
        const response = await fetch(`https://localhost:5000/BookStore/DeleteBook/${bookId}`, { method: 'DELETE' });
        if (!response.ok) {
            throw new Error('Failed to delete project');
        }
    } catch (error) {
        console.error('Error deleting project: ', error);
        throw error;
    }
}

// ============= ADD BOOK =============
export const addBook = async (book: Books): Promise<Books> => {
    try {
        const response = await fetch('https://localhost:5000/BookStore/AddBook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(book),
        });

        if (!response.ok) {
            throw new Error('Failed to add book');
        }

        return await response.json();
    } catch (error) {
        console.error('Error adding book:', error);
        throw error;
    }
};

// ============= LOAD CATEGORIES =============
export const fetchBookCategories = async (): Promise<string[]> => {
    try {
        const response = await fetch('https://localhost:5000/BookStore/GetBookCategories');

        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

// ============= EDIT BOOK =============
export const updateBook = async (bookId: number, updatedBook: Books): Promise<Books> => {
    try {
        const response = await fetch(`https://localhost:5000/bookstore/UpdateBook/${bookId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedBook)
        });
        return await response.json();
    } catch (error) {
        console.error('Error updating project', error);
        throw error;
    }
}