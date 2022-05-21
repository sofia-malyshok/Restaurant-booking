import "./App.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Booking from "./components/Booking";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar bg="light" variant="light">
          <Container>
            <Navbar.Brand href="/" className="font-weight-bold">
              ORZO
            </Navbar.Brand>
            <Nav>
              <Nav.Link href="/booking">Booking</Nav.Link>
              <Nav.Link href="/menu">Menu</Nav.Link>
              <Nav.Link href="/contact">Contact</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/booking" element={<Booking />}></Route>
          <Route path="/menu" element={<Home />}></Route>
          <Route path="/contact" element={<Home />}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
