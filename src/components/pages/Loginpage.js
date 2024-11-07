import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import nigam_img from '../images/nigam3.jpg'; // Correct path to your image

function Loginpage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === 'admin@jmc.in' && password === 'password') {
      navigate('/Homepage'); // Redirect to Homepage
    } else {
      alert('Incorrect email or password');
    }
  };

  return (
    <Container fluid className="login-page-container">
      <Row className="align-items-center">
        {/* Left: Login Form */}
        <Col md={6} className="login-form-container">
        <div className='form-col col-sm-8 col-md-6 col-lg-9 col-xl-12 mx-auto'>
          <h1 className="login-title text-left fw-bold mb-4">Login</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button className="login-btn mt-4" variant="btn" type="submit">
              Sign in  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="25">
    <path
      style={{ fill: "#fff" }}
      d="m18.707 12.707-3 3a1 1 0 0 1-1.414-1.414L15.586 13H6a1 1 0 0 1 0-2h9.586l-1.293-1.293a1 1 0 0 1 1.414-1.414l3 3a1 1 0 0 1 0 1.414z"
      data-name="Right"
    />
  </svg>
            </Button>
          </Form>
          </div>
        </Col>

        {/* Right: Background Image */}
        <Col
          md={6}
          className="d-none d-lg-block bg-image-container"
          style={{
            backgroundImage: `url(${nigam_img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
          }}
        >
          <div className="image-overlay"></div>
        </Col>
      </Row>
    </Container>
  );
}

export default Loginpage;
