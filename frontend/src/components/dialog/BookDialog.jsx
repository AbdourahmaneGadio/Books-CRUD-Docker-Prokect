import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from "react";
import axios from "axios";
import MenuItem from '@mui/material/MenuItem';

export default function BookDialog(props) {
    const [editValues, setEditValues] = useState({
        id: props.id,
        name: props.name,
        isbn: props.isbn,
        cost: props.cost,
        authorId: props.authorId,
        categoryId: props.categoryId,
        parutionDate: props.parutionDate,
        pageNumber: props.pageNumber,
        synopsis: props.synopsis,
        image: props.image
    });

    const handleEditValues = () => {
        axios.put(`http://localhost:3001/books/${editValues.id}`, {
            id: editValues.id,
            name: editValues.name,
            isbn: editValues.isbn,
            cost: editValues.cost,
            authorId: editValues.authorId,
            categoryId: editValues.categoryId,
            parutionDate: editValues.parutionDate,
            pageNumber: editValues.pageNumber,
            synopsis: editValues.synopsis,
            image: editValues.image
        })
        .then(() => {
            handleClose();
            // On pourrait ajouter ici un callback pour rafraîchir la liste des livres
        })
        .catch(error => console.error('Error updating book:', error));
    }

    const handleChangeValues = (value) => {
        setEditValues(prevValues => ({
            ...prevValues,
            [value.target.id || value.target.name]: value.target.value,
        }))
    }

    const handleClose = () => {
        props.setOpen(false);
    };

    return (
        <Dialog open={props.open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>Edit Book</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Title"
                    defaultValue={props.name}
                    type="text"
                    onChange={handleChangeValues}
                    fullWidth
                    variant="standard"
                />
                
                <TextField
                    margin="dense"
                    id="isbn"
                    label="ISBN"
                    defaultValue={props.isbn}
                    type="text"
                    onChange={handleChangeValues}
                    fullWidth
                    variant="standard"
                />

                <TextField
                    margin="dense"
                    id="cost"
                    label="Price (€)"
                    defaultValue={props.cost}
                    type="number"
                    onChange={handleChangeValues}
                    fullWidth
                    variant="standard"
                />

                <TextField
                    select
                    margin="dense"
                    id="authorId"
                    name="authorId"
                    label="Author"
                    defaultValue={props.authorId}
                    onChange={handleChangeValues}
                    fullWidth
                    variant="standard"
                >
                    {props.authors.map((author) => (
                        <MenuItem key={author.id} value={author.id}>
                            {author.name}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    select
                    margin="dense"
                    id="categoryId"
                    name="categoryId"
                    label="Category"
                    defaultValue={props.categoryId}
                    onChange={handleChangeValues}
                    fullWidth
                    variant="standard"
                >
                    {props.categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                            {category.name}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    margin="dense"
                    id="parutionDate"
                    label="Publication Date"
                    defaultValue={props.parutionDate?.split('T')[0]}
                    type="date"
                    onChange={handleChangeValues}
                    fullWidth
                    variant="standard"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <TextField
                    margin="dense"
                    id="pageNumber"
                    label="Number of Pages"
                    defaultValue={props.pageNumber}
                    type="number"
                    onChange={handleChangeValues}
                    fullWidth
                    variant="standard"
                />

                <TextField
                    margin="dense"
                    id="synopsis"
                    label="Synopsis"
                    defaultValue={props.synopsis}
                    multiline
                    rows={4}
                    onChange={handleChangeValues}
                    fullWidth
                    variant="standard"
                />

                <TextField
                    margin="dense"
                    id="image"
                    label="Image URL"
                    defaultValue={props.image}
                    type="text"
                    onChange={handleChangeValues}
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleEditValues}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}