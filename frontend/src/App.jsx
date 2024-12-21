import React, { useState, useEffect } from 'react'
import './App.css'
import Axios from "axios";
import BookCard from "./components/BookCard";

function App() {
    const baseUrl = "http://localhost:3001"
    const [values, setValues] = useState({});
    const [books, setBooks] = useState([]);

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
            category: values.category,
            parutionDate: values.parutionDate,
            pageNumber: values.pageNumber,
            synopsis: values.synopsis,
            image: values.image
        }).then((response) =>{
            console.log(response)
        });
    }

    useEffect(() => {
        Axios.get(`${baseUrl}/books`)
            .then((response)=>{
            setBooks(response.data)
        })
    }, [])

    return (
        <div className="App">
          <div className="container">
              <h1 className="title">Book Manager</h1>
              <h3>Add a Book</h3>
              <div className="register-box">
                  <input className="register-input" 
                         type="text" 
                         name="name" 
                         placeholder="Title" 
                         onChange={handleChangeValues} />

                  <input className="register-input" 
                         type="text" 
                         name="isbn" 
                         placeholder="ISBN" 
                         onChange={handleChangeValues} />

                  <input className="register-input" 
                         type="number" 
                         name="cost" 
                         placeholder="Price (€)" 
                         onChange={handleChangeValues} />

                  <input className="register-input" 
                         type="text" 
                         name="authorId" 
                         placeholder="Author" 
                         onChange={handleChangeValues} />

                  <input className="register-input" 
                         type="text" 
                         name="category" 
                         placeholder="Category" 
                         onChange={handleChangeValues} />

                  <input className="register-input" 
                         type="date" 
                         name="parutionDate" 
                         placeholder="Publication Date" 
                         onChange={handleChangeValues} />

                  <input className="register-input" 
                         type="number" 
                         name="pageNumber" 
                         placeholder="Number of pages" 
                         onChange={handleChangeValues} />

                  <textarea className="register-input" 
                          name="synopsis" 
                          placeholder="Synopsis" 
                          onChange={handleChangeValues} />

                  <input className="register-input" 
                         type="text" 
                         name="image" 
                         placeholder="Image URL" 
                         onChange={handleChangeValues} />

                  <button className="register-button" onClick={handleClickButton}>Add Book</button>
              </div>
              <br/>
              <div className="cards">
                  {typeof books !== 'undefined' &&
                      books.map((book) => {
                          return <BookCard
                              key={book.id}
                              id={book.id}
                              name={book.name}
                              isbn={book.isbn}
                              cost={book.cost}
                              authorId={book.authorId}
                              category={book.category}
                              parutionDate={book.parutionDate}
                              pageNumber={book.pageNumber}
                              synopsis={book.synopsis}
                              image={book.image}
                          />;
                      })}
              </div>
          </div>
        </div>
    )
}

export default App