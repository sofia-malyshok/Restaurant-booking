import "./Home.css";
import { Button } from "react-bootstrap";

const Home = () => {
  return (
    <main>
      <header>
        <h1 className="display-1 mb-3">Food and drinks</h1>
        <h3 className="mb-3">Enjoy time with your closest ones</h3>
        <Button variant="outline-light" size="lg" href="/booking">
          Book a table
        </Button>
      </header>
    </main>
  );
};

export default Home;
