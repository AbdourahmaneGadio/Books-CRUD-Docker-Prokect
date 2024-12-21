import React, { useState } from "react";
import "./BookCard.css"
import BookDialog from "./dialog/BookDialog";
import axios from "axios";

const BookCard = (props) => {
    const [open, setOpen] = useState(false);

    const cardOpen = () => {
        setOpen(true)
    }

    const handleDeleteBook = () => {
        axios.delete(`http://localhost:3001/books/delete/${props.id}`);
    }

    return (
        <>
        <BookDialog 
            open={open} 
            setOpen={setOpen} 
            {...props} 
        />
        <div className="book-card">
            <div className="book-image">
                <img src={props.image || "/api/placeholder/150/200"} alt={props.name} />
            </div>
            <div className="info">
                <h3>{props.name}</h3>
                <p className="author">By: {props.authorId}</p>
                <p className="isbn">ISBN: {props.isbn}</p>
                <p className="price">€{props.cost}</p>
                <p className="category">{props.category}</p>
                <p className="date">Published: {new Date(props.parutionDate).toLocaleDateString()}</p>
                <p className="pages">{props.pageNumber} pages</p>
                <p className="synopsis">{props.synopsis}</p>
            </div>
            <div className="actions">
                <button className="edit" onClick={cardOpen}>Edit</button>
                <button className="delete" onClick={handleDeleteBook}>Delete</button>
            </div>
        </div>
        </>
    );
};

export default BookCard;