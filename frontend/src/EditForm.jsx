import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, updateProduct } from './api';
import { useFlashMessage } from './FlashMessageContext';

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { flashMessage, setFlashMessage } = useFlashMessage();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getProductById(id);
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching product", error);
            }
        };
        fetchProduct();
    }, [id]);

    const handleChange = (event) => {
        setProduct({ ...product, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateProduct(id, product);
            setFlashMessage('Product updated successfully!');
            navigate('/');
        } catch (error) {
            setFlashMessage('Failed to update product.');
        }
    };

    if (!product) return <div>Loading...</div>;

    return (
        <div className="container mt-4 text-start">
            {flashMessage && (
                <div className={`alert ${flashMessage.includes('successfully') ? 'alert-success' : 'alert-danger'}`} role="alert">
                    {flashMessage}
                </div>
            )}
            <h1>Edit Product</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Product Name</label>
                    <input
                        id="name"
                        name="name"
                        className="form-control"
                        value={product.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        className="form-control"
                        rows="4"
                        value={product.description}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input
                        id="price"
                        name="price"
                        type="number"
                        className="form-control"
                        value={product.price}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="quantity" className="form-label">Quantity</label>
                    <input
                        id="quantity"
                        name="quantity"
                        type="number"
                        className="form-control"
                        value={product.quantity}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category</label>
                    <input
                        id="category"
                        name="category"
                        className="form-control"
                        value={product.category}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="btn btn-warning">Update Product</button>
            </form>
        </div>
    );
};

export default EditProduct;
