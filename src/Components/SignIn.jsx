import React, { useState } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.get("http://127.0.0.1:5000/customers");
      const customers = response.data;

      const customer = customers.find(
        (auth) => auth.email === email && auth.phone === phone
      );

      if (customer) {
        sessionStorage.setItem("user", JSON.stringify(customer));

        console.log("Logged in successfully!");
        navigate("/homepage");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError("An error occurred while fetching customers.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1 className="mt-3 text-center">Welcome to Ecomm API!</h1>
      <h3 className="mt-3 text-center">Sign Into Your Account Here</h3>
      <Form.Group className="m-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
      </Form.Group>

      <Form.Group className="m-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter Your Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required/>
      </Form.Group>

      <Button className="m-3" variant="primary" type="submit">Log In</Button>

      <Link to="/newcustomer"><Button variant="success">Don't have an account? Sign up here!</Button>
      </Link>
    </Form>
  );
};

export default SignIn;