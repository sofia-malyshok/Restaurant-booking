import { useState } from "react";
import DatePicker from "sassy-datepicker";
import { format } from "date-fns";
import { Button, Form } from "react-bootstrap";

const guestsOptions = [1, 2, 3, 4, 5].map((num) => ({
  value: num,
  label: `${num} guests`,
}));

const BookingInfo = () => {
  const [isChoosingDate, setChoosingDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDateAvailable, setIsDateAvailable] = useState(false);

  const onDateChange = (newDate) => {
    setSelectedDate(newDate);
    setChoosingDate(false);
  };

  return (
    <>
      <h3 className="mt-3">Booking info</h3>
      <Form.Group className="mb-3">
        <Form.Label>Amount of guests</Form.Label>
        <Form.Select style={{ width: "200px" }}>
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
      <Form.Group className="d-flex flex-column mt-2 position-relative">
        <Form.Label>Booking date</Form.Label>

        <Button
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
            style={{ top: "75px" }}
          />
        ) : null}
        <Form.Text>
          {isDateAvailable ? (
            <span className="text-danger mt-3">
              Chosen date <strong>{format(selectedDate, "dd.MM.yyyy")}</strong>{" "}
              is fully booked. Please choose another one
            </span>
          ) : (
            <span className="text-success mt-3">
              Chosen date <strong>{format(selectedDate, "dd.MM.yyyy")}</strong>{" "}
              is available
            </span>
          )}
        </Form.Text>
      </Form.Group>
    </>
  );
};

export default BookingInfo;
