import { Component } from 'react';
import { ListGroup, Button, Container, Alert, Card } from 'react-bootstrap';
import axios from 'axios';

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            error: null
        };
    }

    componentDidMount() {
        this.fetchProducts();
    }

    fetchProducts = () => {
        axios.get('http://127.0.0.1:5000/products')
             .then(response => {
                console.log(response.data);
                 this.setState({ products: response.data });
             })
             .catch(error => {
                 console.error('Error fetching data:', error);
                 this.setState({ error: 'Error fetching products. Please try again later.' });
             });
    }

    deleteProduct = (productId) => {
        if (window.confirm("Are you sure?")) { 
            axios.delete(`http://127.0.0.1:5000/products/${productId}`)
                 .then(() => {
                     this.fetchProducts();
                 })
                 .catch(error => {
                     console.error('Error deleting product:', error);
                     this.setState({ error: 'Error deleting product. Please try again.' });
                 });
        }
    }

    render() {

        const { error, products } = this.state;

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
                                    <Button variant="danger" onClick={()=> this.deleteProduct(product.id)}>Remove Product</Button>
                                </Card.Body>
                                </Card>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Container>
        );
    }
}

export default ProductList;