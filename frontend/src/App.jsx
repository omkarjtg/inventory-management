import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './ProductList';
import AddForm from './AddForm';
import EditProduct from './EditForm';
import Navbar from './Navbar';
import { FlashMessageProvider } from './FlashMessageContext';
import './App.css';

function App() {
    return (
        <FlashMessageProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/addProduct" element={<AddForm />} />
                    <Route path="/editProduct/:id" element={<EditProduct />} />
                </Routes>
            </Router>
        </FlashMessageProvider>
    );
}

export default App;
