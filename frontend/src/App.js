import "./App.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Home from "./components/Home";
import Booking from "./components/Booking";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import MyBookings from "./components/MyBookings";

const App = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(JSON.parse(window.localStorage.getItem("user")));
  }, []);

  const onUserChange = (newUser) => {
    setUser(newUser);
    window.localStorage.setItem("user", JSON.stringify(newUser));
  };

  return (
    <>
      <div className="min-vh-100 vw-100 d-flex flex-column">
        <Navbar bg="light" variant="light">
          <Container>
            <Navbar.Brand as={Link} to="/" className="fw-bold">
              ORZO
            </Navbar.Brand>
            <Nav>
              <Nav.Link as={Link} to="/booking">
                Book a table
              </Nav.Link>
              {user ? (
                <>
                  <Nav.Link as={Link} to="/bookings">
                    My Bookings
                  </Nav.Link>
                  <Nav.Link as={Link} to="/" onClick={() => setUser(null)}>
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              )}
            </Nav>
          </Container>
        </Navbar>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/booking"
            element={<Booking user={user} onUserChange={onUserChange} />}
          ></Route>
          <Route path="/bookings" element={<MyBookings user={user} />}></Route>
          <Route
            path="/login"
            element={
              <Container className="py-3 d-flex flex-column h-100">
                <Login
                  user={user}
                  onUserChange={onUserChange}
                  onLogin={() => navigate("/bookings")}
                />
              </Container>
            }
          ></Route>
        </Routes>
      </div>
      <footer className="border-top">
        <Container>
          <div className="d-flex justify-content-between pt-4 pb-3">
            <Link
              to="/"
              className="fs-5 fw-bold text-dark text-decoration-none"
            >
              ORZO
            </Link>
            <div className="text-end">
              <h5>Contact</h5>
              <ul className="list-unstyled">
                <li>
                  <a
                    href="tel:4820632864011"
                    className="btn btn-link text-black-50 px-0"
                  >
                    +4820632864011
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:sofia.malyshok@gmail.com"
                    className="btn btn-link text-black-50 px-0"
                  >
                    sofia.malyshok@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Container>
        <div className="text-center p-4 bg-light">© 2021 Copyright</div>
      </footer>
    </>
  );
};

export default App;
