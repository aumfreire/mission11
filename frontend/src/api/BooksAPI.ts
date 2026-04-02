import type { Books } from "../types/books";

interface FetchBooksResponse {
    books: Books[];
    totalNumBooks: number;
}

const API_URL = `https://bookstore-backend-fsdpf4gaeehffwb3.centralus-01.azurewebsites.net/BookStore`

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
            `${API_URL}/allbooks?pageSize=${pageSize}&pageNum=${pageNum}${sortQuery}&${selectedCategories.length ? `&${categoryParams}` : ''}`
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
        const response = await fetch(`${API_URL}/DeleteBook/${bookId}`, { method: 'DELETE' });
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
        const response = await fetch(`${API_URL}/AddBook`, {
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
        const response = await fetch(`${API_URL}/GetBookCategories`);

        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }

        const categories = (await response.json()) as string[];

        return Array.from(
            new Set(
                categories
                    .map((category) => category.trim())
                    .filter((category) => category.length > 0)
            )
        );
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

// ============= LOAD SINGLE BOOK =============
export const fetchBookById = async (bookId: number): Promise<Books> => {
    try {
        const response = await fetch(`${API_URL}/Book/${bookId}`);

        if (!response.ok) {
            throw new Error('Failed to fetch book');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching book:', error);
        throw error;
    }
};

// ============= EDIT BOOK =============
export const updateBook = async (bookId: number, updatedBook: Books): Promise<Books> => {
    try {
        const response = await fetch(`${API_URL}/UpdateBook/${bookId}`, {
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