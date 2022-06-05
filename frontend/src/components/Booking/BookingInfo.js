import { useEffect, useState } from "react";
import DatePicker from "sassy-datepicker";
import { TimePicker } from "sassy-datepicker";
import { format } from "date-fns";
import { Button, Form } from "react-bootstrap";

const guestsOptions = [1, 2, 3, 4, 5, 6, 7, 8].map((num) => ({
  value: num,
  label: `${num} guests`,
}));

function pad(n) {
  return n < 10 ? "0" + n : n;
}

const timeConstraints = {
  minStart: {
    hours: 9,
    minutes: 0,
  },
  maxEnd: {
    hours: 22,
    minutes: 0,
  },
};

const BookingInfo = ({
  loadAvailableTables,
  checkAvailableDate,
  availableTables,
  isDateAvailable,
}) => {
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [isChoosingDate, setChoosingDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState({
    minutes: 0,
    hours: 18,
  });
  const [endTime, setEndTime] = useState({
    minutes: 0,
    hours: 19,
  });

  useEffect(() => {
    checkAvailableDate(selectedDate, numberOfGuests);
  }, [selectedDate, numberOfGuests]);

  useEffect(() => {
    loadAvailableTables(selectedDate, numberOfGuests, startTime, endTime);
  }, [selectedDate, numberOfGuests, startTime, endTime]);

  const onDateChange = (newDate) => {
    setSelectedDate(newDate);
    setChoosingDate(false);
  };

  return (
    <>
      <h3 className="mt-3">Booking info</h3>
      <Form.Group className="mb-3">
        <Form.Label>Amount of guests</Form.Label>
        <Form.Select
          style={{ width: "200px" }}
          data-testid="guests-select"
          onChange={(e) => setNumberOfGuests(e.target.value)}
        >
          {guestsOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Form.Select>
        <Form.Text className="text-muted">
          If you plan a bigger dinner, please contact us by phone
        </Form.Text>
      </Form.Group>
      <Form.Group className="d-flex flex-column mt-4 position-relative">
        <Form.Label>Booking date</Form.Label>

        <Button
          data-testid="date-button"
          onClick={() => setChoosingDate(!isChoosingDate)}
          style={{ width: "200px" }}
        >
          Choose date
        </Button>
        {isChoosingDate ? (
          <DatePicker
            minDate={new Date()}
            selected={selectedDate}
            onChange={onDateChange}
            className="position-absolute"
            style={{ top: "75px", zIndex: "1" }}
            data-testid="date-picker"
          />
        ) : null}
        <Form.Text>
          {isDateAvailable ? (
            <span className="text-success mt-3">
              Chosen date <strong>{format(selectedDate, "dd.MM.yyyy")}</strong>{" "}
              is available
            </span>
          ) : (
            <span className="text-danger mt-3" data-testid="no-tables-message">
              Chosen date <strong>{format(selectedDate, "dd.MM.yyyy")}</strong>{" "}
              is fully booked. Please choose another one
            </span>
          )}
        </Form.Text>
      </Form.Group>
      {isDateAvailable ? (
        <Form.Group className="d-flex flex-column mt-4">
          <Form.Label>Booking time</Form.Label>
          <div>
            <TimePicker
              selected={startTime}
              onChange={(time) => setStartTime(time)}
              minTime={timeConstraints.minStart}
              maxTime={endTime}
              className="me-3"
              data-testid="start-time"
            />
            <TimePicker
              selected={endTime}
              onChange={(time) => setEndTime(time)}
              minTime={startTime}
              maxTime={timeConstraints.maxEnd}
              data-testid="end-time"
            />
          </div>

          <Form.Text>
            {availableTables.length > 0 ? (
              <span className="text-success mt-3">
                Chosen time{" "}
                <strong>
                  {`${startTime.hours}:${pad(startTime.minutes)} - ${
                    endTime.hours
                  }:${pad(endTime.minutes)}`}
                </strong>{" "}
                is available
              </span>
            ) : (
              <span className="text-danger mt-3">
                Chosen time{" "}
                <strong>
                  {`${startTime.hours}:${pad(startTime.minutes)} - ${
                    endTime.hours
                  }:${pad(endTime.minutes)}`}
                </strong>{" "}
                is fully booked. Please choose another one
              </span>
            )}
          </Form.Text>
        </Form.Group>
      ) : null}
    </>
  );
};

export default BookingInfo;
