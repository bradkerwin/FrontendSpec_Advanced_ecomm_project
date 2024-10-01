import { Component, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { ListGroup, Button, Container, Alert, Card } from 'react-bootstrap';
import axios from 'axios';
import { addItem } from '../redux/cartSlice';


const ProductList = () => {
    const [products, setProducts] = useState([])
    const [error, setError] = useState('')
    
    const dispatch = useDispatch()
    
    const handleAddProductToCart = (id) => {
        dispatch(addItem({id}))
    }

    const fetchProducts = () => {
        axios.get('http://127.0.0.1:5000/products')
             .then(response => {
                console.log(response.data);
                 setProducts(response.data);
             })
             .catch(error => {
                 console.error('Error fetching data:', error);
                 setError(`Error fetching data:, ${error}`)
             });
    }

    const deleteProduct = (productId) => {
        if (window.confirm("Are you sure?")) { 
            axios.delete(`http://127.0.0.1:5000/products/${productId}`)
                 .then(() => {
                     fetchProducts();
                 })
                 .catch(error => {
                     console.error('Error deleting product:', error);
                     setError(`Error deleting product:, ${error}`)
                 });
        }
    }

    useEffect( () => {
        fetchProducts()
    }, [])
        return (

            <Container>
                {error && <Alert variant='danger'>{error}</Alert> }
                <h3 className='m-3'>Shop Our Fine Products</h3>
                <ListGroup>
                    {products.map(product => (
                        <ListGroup.Item key={product.id} className="d-flex justify-content-between align-items-center shadow-sm p-3 mb-3 bg-white rounded">
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src="holder.js/100px180" />
                                <Card.Body>
                                    <Card.Title>{product.product_name}</Card.Title>
                                    <Card.Text>
                                        Product ID: {product.id} <br/>
                                        Price: {product.price} <br/>
                                        Details: {product.product_details}
                                    </Card.Text>
                                    <Button className='m-2' variant="success" onClick={() => handleAddProductToCart(product.id)}>Add Product to Cart</Button>
                                    <Button className='m-2' variant="danger" onClick={()=> deleteProduct(product.id)}>Remove Product From Catalog</Button>
                                </Card.Body>
                                </Card>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Container>
        );
    }

export default ProductList;