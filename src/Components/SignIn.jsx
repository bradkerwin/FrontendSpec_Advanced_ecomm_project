import React, { useState } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (error) => {
    error.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.get("http://127.0.0.1:5000/customers");
      const customers = response.data;

      const customer = customers.find(
        (auth) => auth.email === email && auth.user_password === password
      );

      if (customer) {
        sessionStorage.setItem("user", JSON.stringify(customer));

        console.log("Logged in successfully!");
        navigate("/");
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
    <Form>
      <h1 className="mt-3 text-center">Welcome to Ecomm API!</h1>
      <h3 className="mt-3 text-center">Sign Into Your Account Here</h3>
      <Form.Group className="m-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter Your Email" required/>
      </Form.Group>

      <Form.Group className="m-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter Your Password" required/>
      </Form.Group>

      <Button className="m-3" variant="primary" onClick={handleSubmit}>Log In</Button>
    </Form>
  );
};

export default SignIn;