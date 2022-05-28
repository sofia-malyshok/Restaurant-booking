import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

const Login = ({ user, setUser }) => {
  const [loginMode, setLoginMode] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    surname: "",
    phone: "",
  });

  useEffect(() => setError(null), [loginMode, user]);

  const login = () => {
    axios
      .post("/api/auth/login", formData)
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => {
        setError(err.response.data.message);
        console.log(err);
      });
  };

  const register = () => {
    axios
      .post("/api/auth/signup", formData)
      .then((res) => {
        console.log(res.data);
        setLoginMode(true);
      })
      .catch((err) => {
        setError(err.response.data.message);
        console.log(err);
      });
  };

  if (user) {
    return (
      <div>
        <h3 className="mt-3">Logged in, you can proceed to next stage</h3>
      </div>
    );
  }

  if (loginMode) {
    return (
      <div>
        <h3 className="mt-3">Please login</h3>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            style={{ width: "300px" }}
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            style={{ width: "300px" }}
            required
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          ></Form.Control>
        </Form.Group>
        {error ? <span className="text-danger">{error}</span> : null}
        <Button className="d-block" onClick={login}>
          Login
        </Button>
        <a onClick={() => setLoginMode(false)} href="#">
          Don't have an account? Register
        </a>
      </div>
    );
  } else {
    return (
      <div>
        <h3 className="mt-3">Please register</h3>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            style={{ width: "300px" }}
            placeholder="example@example.com"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            style={{ width: "300px" }}
            placeholder="@werty345"
            required
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            style={{ width: "300px" }}
            placeholder="John"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Surname</Form.Label>
          <Form.Control
            style={{ width: "300px" }}
            placeholder="Doe"
            required
            value={formData.surname}
            onChange={(e) =>
              setFormData({ ...formData, surname: e.target.value })
            }
          ></Form.Control>
          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              style={{ width: "300px" }}
              placeholder="+123 456 789"
              required
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            ></Form.Control>
          </Form.Group>
        </Form.Group>
        {error ? <span className="text-danger">{error}</span> : null}
        <div className="d-flex mt-3">
          <Button className="me-4" onClick={register}>
            Register
          </Button>
          <Button
            variant="secondary"
            href="http://localhost:3005/api/auth/facebook"
            target="_blank"
            onClick={() => setLoginMode(true)}
          >
            Register with Facebook
          </Button>
        </div>

        <a onClick={() => setLoginMode(true)} href="#">
          Have an account? Login
        </a>
      </div>
    );
  }
};

export default Login;
