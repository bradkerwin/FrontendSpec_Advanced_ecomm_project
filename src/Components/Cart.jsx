import React, { useState } from 'react'
import { Button, Container, ListGroupItem } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addItem, removeItem, checkout } from '../redux/cartSlice'

const Cart = () => {
    const totalItems = useSelector((state) => state.cart.totalItems)
    const products = useSelector((state) => state.cart.items)
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

    // const getProductName = (id) => {
    //   const product = products.find((product) => {
    //     return Number(id) === product.id
    //   })
  
    //   return product ? product.title : 'Unknown Product'
    // }

  return (
    <>
        <Container>
      <h2>Your Cart:</h2>

      {Object.entries(products).map(([id, quantity], idx) => (
        <ListGroupItem key={idx}>
          {/* <span>{getProductName(id)} - Quantity: {quantity}</span> */}
          <div>
            <Button className='m-2' variant="success" onClick={() => handleAddItem(id)}>Add Quantity</Button>
            <Button variant="danger" onClick={() => handleRemoveItem(id)}>Remove Product From Cart</Button>
          </div>
        </ListGroupItem>
      ))}

      <p>Total Items: {totalItems}</p>

      <Button className='m-2' variant='success' onClick={handleCheckout}>Checkout</Button>

      <Link to={'/products'}>
        <Button className='m-2' variant='primary'>Back to Product Catalog</Button>
      </Link>

      <Link to={'/'}>
        <Button className='m-2' variant='secondary'>Back to Homepage</Button>
      </Link>

    </Container>
    </>
  )
}

export default Cart