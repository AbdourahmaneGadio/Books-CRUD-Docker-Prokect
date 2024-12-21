import React, { useState, useEffect } from 'react'
import './App.css'
import Axios from "axios";
import BookCard from "./components/BookCard";
import { Pagination } from '@mui/material';

function App() {
    const baseUrl = "http://localhost:3001"
    
    const [values, setValues] = useState({});
    const [books, setBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]);

    const booksPerPage = 5
    const [nombreTotalBooks, setTotalCount] = useState(0);
    const [page, setPage] = useState(1);

    // Charger les auteurs et catégories au démarrage
    useEffect(() => {
        // Charger les auteurs
        Axios.get(`${baseUrl}/authors`)
            .then((response) => {
                setAuthors(response.data);
            })
            .catch(error => console.error('Error loading authors:', error));

        // Charger les catégories
        Axios.get(`${baseUrl}/categories`)
            .then((response) => {
                setCategories(response.data);
            })
            .catch(error => console.error('Error loading categories:', error));

        // Charge les livres et recupere la pagination
        Axios.get(`${baseUrl}/books`)
            .then((response) => {
                setTotalCount(response.data.length);
            })
            .catch(error => console.error('Error loading books:', error));

        Axios.get(`${baseUrl}/books?page=1&pageSize=${booksPerPage}`)
            .then((response) => {
                setBooks(response.data);
            })
            .catch(error => console.error('Error loading books:', error));
    }, [])

    const count = Math.ceil(nombreTotalBooks / booksPerPage);

    const handleChangeValues = (value) => {
        setValues((prevValue) => ({
            ...prevValue,
            [value.target.name]: value.target.value,
        }))
    }

    const handleClickButton = () => {
        Axios.post(`${baseUrl}/books/create`, {
            name: values.name,
            isbn: values.isbn,
            cost: values.cost,
            authorId: values.authorId,
            categoryId: values.categoryId,
            parutionDate: values.parutionDate,
            pageNumber: values.pageNumber,
            synopsis: values.synopsis,
            image: values.image
        })
            .then((response) => {
                console.log(response);
                // Recharger les livres après l'ajout
                Axios.get(`${baseUrl}/books?page=${page}&pageSize=${booksPerPage}`)
                    .then((response) => {
                        setBooks(response.data);
                    });
            });
    }

    const handleChangePage = (event, value) => {
        setPage(value);
        Axios.get(`${baseUrl}/books?page=${value}&pageSize=${booksPerPage}`)
            .then((response) => {
                setBooks(response.data);
            });
    };

    return (
        <div className="App">
            <div className="container">
                <h1 className="title">Book Manager</h1>
                <h3>Add a Book</h3>
                <div className="register-box">
                    <input
                        className="register-input"
                        type="text"
                        name="name"
                        placeholder="Title"
                        onChange={handleChangeValues}
                    />

                    <input
                        className="register-input"
                        type="text"
                        name="isbn"
                        placeholder="ISBN"
                        onChange={handleChangeValues}
                    />

                    <input
                        className="register-input"
                        type="number"
                        name="cost"
                        min={1}
                        placeholder="Price (€)"
                        onChange={handleChangeValues}
                    />

                    <select
                        className="register-input"
                        name="authorId"
                        onChange={handleChangeValues}
                        defaultValue=""
                    >
                        <option value="" disabled>Select an author</option>
                        {authors.map(author => (
                            <option key={author.id} value={author.id}>
                                {author.name}
                            </option>
                        ))}
                    </select>

                    <select
                        className="register-input"
                        name="categoryId"
                        onChange={handleChangeValues}
                        defaultValue=""
                    >
                        <option value="" disabled>Select a category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>

                    <input
                        className="register-input"
                        type="date"
                        name="parutionDate"
                        onChange={handleChangeValues}
                    />

                    <input
                        className="register-input"
                        type="number"
                        name="pageNumber"
                        min={1}
                        placeholder="Number of pages"
                        onChange={handleChangeValues}
                    />

                    <textarea
                        className="register-input"
                        name="synopsis"
                        placeholder="Synopsis"
                        onChange={handleChangeValues}
                    />

                    <input
                        className="register-input"
                        type="text"
                        name="image"
                        placeholder="Image URL"
                        onChange={handleChangeValues}
                    />

                    <button className="register-button" onClick={handleClickButton}>
                        Add Book
                    </button>
                </div>
                <br />
                <div className="cards">
                    {books.map((book) => (
                        <BookCard
                            key={book.id}
                            {...book}
                            authors={authors}
                            categories={categories}
                        />
                    ))}
                </div>
                {count > 1 && (
                    <Pagination
                        count={count}
                        page={page}
                        onChange={handleChangePage}
                        color="primary" 
                        showFirstButton showLastButton
                    />)}
            </div>
        </div>
    )
}

export default App