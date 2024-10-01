import React, { useState } from 'react'
import { Button, Container, ListGroupItem } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addItem, removeItem, checkout } from '../redux/cartSlice'

const Cart = () => {
    const totalItems = useSelector((state) => state.shoppingCart.totalItems)
    const products = useSelector((state) => state.shoppingCart.items)
    // const [shippingAddress, setShippingAddress] = useState('')
    const dispatch = useDispatch()

    const handleAddItem = (id) => {
        dispatch(addItem({id}))
        console.log("Product Quantity Increased by 1.");
    }

    const handleRemoveItem = (id) => {
        dispatch(removeItem({id}))
        console.log("Product Quantity Decreased by 1.");
    }

    const handleCheckout = (id) => {
        dispatch(checkout())
    }

  return (
    <>
        <Container>
      <h2>Your Cart:</h2>

      {Object.entries(products).map(([id, quantity], idx) => (
        <ListGroupItem key={idx}>
          <span>{getProductName(id)} - Quantity: {quantity}</span>
          <div>
            <Button variant="success" onClick={() => handleAddItem(id)}>Add Quantity</Button>
            <Button variant="danger" onClick={() => handleRemoveItem(id)}>Remove Product From Cart</Button>
          </div>
        </ListGroupItem>
      ))}

      <p>Total Items: {totalItems}</p>

      <Button variant='primary' onClick={handleCheckout}>Checkout</Button>

      <Link to={'/'}>
        <Button>Back to Homepage</Button>
      </Link>

    </Container>
    </>
  )
}

export default Cart