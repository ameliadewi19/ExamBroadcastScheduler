import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Confirmation = () => {
    const history = useNavigate();
    const [books, setBooks] = useState([]);

    // useEffect(() => {
    //     getBooks();
    // }, []);

    // const getBooks = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:5000/books');
    //         setBooks(response.data);
    //         console.log(response.data);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // const handleEdit = (id) => {
    //     // Navigasi ke halaman edit buku dengan ID tertentu
    //     history(`/edit-book/${id}`);
    // }

    // const handleAdd = (id) => {
    //     // Navigasi ke halaman add buku
    //     history(`/add-book`);
    // }

    // const handleDelete = async (id) => {
    //     try {
    //         await axios.delete(`http://localhost:5000/books/${id}`);
    //         setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    return (
        <p>test</p>
    );
};

export default Confirmation;