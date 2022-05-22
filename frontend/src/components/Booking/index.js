import { useEffect, useState } from "react";
import { Container, Button, ProgressBar, Form } from "react-bootstrap";
import Table from "./Restaurant";
import BookingInfo from "./BookingInfo";
import axios from "axios";
import checkmark from "../../assets/checkmark.jpg";

const Booking = () => {
  const [stage, setStage] = useState(1);
  const [availableTables, setAvailableTables] = useState([]);
  const [numberOfGuests, setNumberOfGuests] = useState(0);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [selectedTable, setSelectedTable] = useState(0);
  const [isDateAvailable, setIsDateAvailable] = useState(false);
  const [reservation, setReservation] = useState(null);

  useEffect(() => {
    if (stage === 4) {
      createReservation();
    }
  }, [stage]);

  const prevStage = () => {
    if (stage > 1) {
      setStage(stage - 1);
    }
  };

  const nextStage = () => {
    if (canMoveToNextStage()) {
      setStage(stage + 1);
    }
  };

  const canMoveToNextStage = () => {
    if (
      (stage === 1 && availableTables.length > 0) ||
      (stage === 2 && selectedTable !== 0) ||
      stage === 3
    ) {
      return true;
    }
    return false;
  };

  const createReservation = () => {
    const data = {
      user: "62812c00e095a3c05f12fd78",
      table: availableTables.find((tab) => tab.tableId === selectedTable)._id,
      numberOfGuests,
      fromDate,
      toDate,
    };
    axios
      .post("http://localhost:3000/reservation", data)
      .then((res) => {
        console.log(res.data);
        setReservation(res.data);
      })
      .catch((err) => console.log(err));
  };

  const loadAvailableTables = (date, cap, from, to) => {
    const fromDateTmp = new Date(+date);
    fromDateTmp.setHours(from.hours, from.minutes);

    const toDateTmp = new Date(+date);
    toDateTmp.setHours(to.hours, to.minutes);

    setFromDate(fromDateTmp);
    setToDate(toDateTmp);
    setNumberOfGuests(cap);

    axios
      .get(
        `http://localhost:3000/available-tables?from=${fromDateTmp.toISOString()}&to=${toDateTmp.toISOString()}&capacity=${cap}`
      )
      .then((res) => {
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
    <Container className="py-3 d-flex flex-column h-100">
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
          availableTables={availableTables.map((table) => table.tableId)}
          selectedTable={selectedTable}
          setSelectedTable={setSelectedTable}
        />
      ) : stage === 3 ? (
        <h3>User login would be here</h3>
      ) : (
        <div className="d-flex flex-column mt-5">
          <h3 className="align-self-center">Thank you for your booking</h3>
          <img
            className="align-self-center"
            src={checkmark}
            height="auto"
            width="50px"
          />
          {reservation ? (
            <span className="text-muted align-self-center">
              Your reservation id is {reservation._id}
            </span>
          ) : null}
        </div>
      )}
      {stage !== 4 ? (
        <div className="d-flex justify-content-end mt-3">
          <Button
            variant="secondary"
            className="me-3"
            onClick={prevStage}
            disabled={stage === 1}
          >
            Back
          </Button>
          <Button onClick={nextStage} disabled={!canMoveToNextStage()}>
            Continue
          </Button>
        </div>
      ) : null}
    </Container>
  );
};

export default Booking;
