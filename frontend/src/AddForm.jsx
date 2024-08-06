import React, { useState } from 'react';
import axios from 'axios'; // Make sure to import axios
import { Formik, Field, Form } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AddForm() {
    const [flashMessage, setFlashMessage] = useState('');

    const handleSubmit = async (values, { resetForm }) => {
        try {
            await axios.post('http://localhost:8080/spring_boot/api/products', {
                name: values.productName,
                description: values.description,
                price: values.price,
                quantity: values.quantity,
                category: values.category
            });
            setFlashMessage('Product added successfully!');
            resetForm();
        } catch (error) {
            console.error('Error adding product:', error); // Logging error for debugging
            setFlashMessage('Failed to add product.');
        }
    };

    return (
        <div className="container mt-4 text-start">
            <h1>Add Product</h1>
            {flashMessage && (
                <div className={`alert ${flashMessage.includes('successfully') ? 'alert-success' : 'alert-danger'}`} role="alert">
                    {flashMessage}
                </div>
            )}
            <Formik
                initialValues={{
                    productName: '',
                    description: '',
                    price: '',
                    quantity: '',
                    category: ''
                }}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div className="mb-3">
                        <label htmlFor="productName" className="form-label">Product Name</label>
                        <Field
                            id="productName"
                            name="productName"
                            className="form-control"
                            placeholder="Enter product name"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <Field
                            as="textarea"
                            id="description"
                            name="description"
                            className="form-control"
                            rows="4"
                            placeholder="Enter product description"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Price</label>
                        <Field
                            id="price"
                            name="price"
                            type="number"
                            className="form-control"
                            placeholder="Enter price"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="quantity" className="form-label">Quantity</label>
                        <Field
                            id="quantity"
                            name="quantity"
                            type="number"
                            className="form-control"
                            placeholder="Enter quantity"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">Category</label>
                        <Field
                            id="category"
                            name="category"
                            className="form-control"
                            placeholder="Enter category"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </Form>
            </Formik>
        </div>
    );
}
