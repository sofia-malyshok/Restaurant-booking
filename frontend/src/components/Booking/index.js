import { useState } from "react";
import { Container, Button, ProgressBar, Form } from "react-bootstrap";
import Table from "./Restaurant";
import BookingInfo from "./BookingInfo";
import axios from "axios";

const Booking = () => {
  const [stage, setStage] = useState(1);
  const [availableTables, setAvailableTables] = useState([]);
  const [capacity, setCapacity] = useState(0);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [selectedTable, setSelectedTable] = useState(0);
  const [isDateAvailable, setIsDateAvailable] = useState(false);

  const prevStage = () => {
    if (stage > 1) {
      setStage(stage - 1);
    }
  };

  const nextStage = () => {
    if (availableTables.length > 0) {
      setStage(stage + 1);
    }
  };

  const loadAvailableTables = (date, cap, from, to) => {
    const fromDateTmp = new Date(+date);
    fromDateTmp.setHours(from.hours, from.minutes);

    const toDateTmp = new Date(+date);
    toDateTmp.setHours(to.hours, to.minutes);

    setFromDate(fromDateTmp);
    setToDate(toDateTmp);
    setCapacity(cap);

    axios
      .get(
        `http://localhost:3000/available-tables?from=${fromDateTmp.toISOString()}&to=${toDateTmp.toISOString()}&capacity=${cap}`
      )
      .then((res) => {
        console.log(res.data);
        setAvailableTables(res.data);
      })
      .catch((err) => console.log(err));
  };

  const checkAvailableDate = (date, cap) => {
    const fromDateTmp = new Date(+date);
    fromDateTmp.setUTCHours(0, 0, 0);

    const toDateTmp = new Date(+date);
    toDateTmp.setUTCHours(23, 59, 59);

    axios
      .get(
        `http://localhost:3000/available-tables?from=${fromDateTmp.toISOString()}&to=${toDateTmp.toISOString()}&capacity=${cap}`
      )
      .then((res) => {
        setIsDateAvailable(res.data.length > 0);
      })
      .catch((err) => console.log(err));
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
        <BookingInfo
          loadAvailableTables={loadAvailableTables}
          checkAvailableDate={checkAvailableDate}
          availableTables={availableTables}
          isDateAvailable={isDateAvailable}
        />
      ) : stage === 2 ? (
        <Table
          availableTables={[]}
          selectedTable={selectedTable}
          setSelectedTable={setSelectedTable}
        />
      ) : null}
      <div className="d-flex justify-content-end mt-3">
        <Button
          variant="secondary"
          className="me-3"
          onClick={prevStage}
          disabled={stage === 1}
        >
          Back
        </Button>
        <Button onClick={nextStage} disabled={availableTables.length === 0}>
          Continue
        </Button>
      </div>
    </Container>
  );
};

export default Booking;
