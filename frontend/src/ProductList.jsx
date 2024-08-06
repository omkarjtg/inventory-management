import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from './api';
import { Link } from 'react-router-dom';
import { useFlashMessage } from './FlashMessageContext';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { flashMessage, setFlashMessage } = useFlashMessage();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProducts();
                setProducts(response.data);
                setFilteredProducts(response.data);
                setLoading(false);
            } catch (error) {
                setError("Error fetching products");
                setLoading(false);
                console.error("Error fetching products", error);
            }
        };
        fetchProducts();
    }, []);

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(value.toLowerCase()) ||
            product.description.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await deleteProduct(id);
                setProducts(products.filter(product => product.id !== id));
                setFilteredProducts(filteredProducts.filter(product => product.id !== id));
                setFlashMessage('Product deleted successfully!');
            } catch (error) {
                setFlashMessage('Failed to delete product.');
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            {flashMessage && (
                <div className={`alert ${flashMessage.includes('successfully') ? 'alert-success' : 'alert-danger'}`} role="alert">
                    {flashMessage}
                </div>
            )}
            <h2>Product List</h2>
            <div className="mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name or description"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <table className='table'>
                <thead className='table-success'>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>{product.quantity}</td>
                            <td>{product.category}</td>
                            <td>
                                <Link to={`/editProduct/${product.id}`} className="btn btn-warning btn-sm">Edit</Link>
                                <button onClick={() => handleDelete(product.id)} className="btn btn-danger btn-sm ms-2">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
