import { useEffect, useState } from "react";
import { Container, Button, ProgressBar, Form } from "react-bootstrap";
import Table from "./Restaurant";
import BookingInfo from "./BookingInfo";
import Login from "../Login";
import axios from "axios";
import checkmark from "../../assets/checkmark.jpg";

const Booking = ({ user, onUserChange }) => {
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
      (stage === 3 && user)
    ) {
      return true;
    }
    return false;
  };

  const createReservation = () => {
    const data = {
      table: availableTables.find((tab) => tab.tableId === selectedTable)._id,
      numberOfGuests,
      fromDate,
      toDate,
    };
    axios
      .post("/api/reservation", data, {
        headers: {
          Authorization: user ? "Bearer " + user.token : "",
        },
      })
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
        `/api/available-tables?from=${fromDateTmp.toISOString()}&to=${toDateTmp.toISOString()}&capacity=${cap}`
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
        `/api/available-tables?from=${fromDateTmp.toISOString()}&to=${toDateTmp.toISOString()}&capacity=${cap}`
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
        <Login user={user} onUserChange={onUserChange} />
      ) : (
        <div className="d-flex flex-column mt-5">
          <h3 className="align-self-center" data-testid="thanks-button">Thank you for your booking</h3>
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
          <Button data-testid="continue-button" onClick={nextStage} disabled={!canMoveToNextStage()}>
            Continue
          </Button>
        </div>
      ) : null}
    </Container>
  );
};

export default Booking;
