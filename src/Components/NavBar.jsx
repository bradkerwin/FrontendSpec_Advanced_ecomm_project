import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';

function NavigationBar() {

    const navigate = useNavigate();

    const handleLogOut = () => {
        sessionStorage.removeItem("user");
        navigate("/");
    }

    return (
        <Navbar bg="primary" expand="md">
            <Navbar.Brand href="/homepage">Welcome to E-Commerce</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="m-auto">
                    
                    <Nav.Link as= {NavLink} to="/customers" activeclassname="active">
                    Customers
                    </Nav.Link>

                    <Nav.Link as= {NavLink} to="/newproduct" activeclassname="active">
                    Add New Product
                    </Nav.Link>

                    <Nav.Link as= {NavLink} to="/products" activeclassname="active">
                    Our Products
                    </Nav.Link>

                    <Nav.Link as= {NavLink} to="/cart" activeclassname="active">
                    Your Cart
                    </Nav.Link>
                </Nav>

                <Button variant='mx-3' onClick={handleLogOut}>Log Out</Button>

            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavigationBar;