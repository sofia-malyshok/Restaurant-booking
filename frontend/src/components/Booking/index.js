import { useState } from "react";
import { Container, Button, ProgressBar, Form } from "react-bootstrap";
import Table from "./Restaurant";
import BookingInfo from "./BookingInfo";

const Booking = () => {
  const [stage, setStage] = useState(1);

  const prevStage = () => {
    if (stage > 1) {
      setStage(stage - 1);
    }
  };

  const nextStage = () => {
    setStage(stage + 1);
  };

  return (
    <Container className="pt-3 d-flex flex-column">
      <h2>Booking a table</h2>
      <ProgressBar
        now={(stage / 4) * 100}
        animated
        style={{ height: "25px" }}
      />
      {stage === 1 ? (
        <BookingInfo />
      ) : stage === 2 ? (
        <Table disabledTables={[1]} />
      ) : null}
      <div className="d-flex justify-content-end mt-3">
        <Button variant="secondary" className="me-3" onClick={prevStage}>
          Back
        </Button>
        <Button onClick={nextStage}>Continue</Button>
      </div>
    </Container>
  );
};

export default Booking;
