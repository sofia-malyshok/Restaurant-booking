import { Container, ListGroup, Badge, Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";

const MyBookings = ({ user }) => {
  const [reservations, setReservations] = useState([]);
  const [deletedReservation, setDeletedReservation] = useState(null);

  const getReservations = () => {
    if (user) {
      axios
        .get("/api/reservation", {
          headers: {
            Authorization: user ? "Bearer " + user.token : "",
          },
        })
        .then((res) => {
          console.log(res.data);
          setReservations(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  const deleteReservation = () => {
    axios
      .delete("/api/reservation/" + deletedReservation._id, {
        headers: {
          Authorization: user ? "Bearer " + user.token : "",
        },
      })
      .then((res) => {
        setReservations(
          reservations.filter((res) => res._id !== deletedReservation._id)
        );
        setDeletedReservation(null);
      })
      .catch((err) => console.log(err));
  };

  useEffect(getReservations, [user]);

  return (
    <>
      {deletedReservation ? (
        <div
          className="position-absolute h-100 w-100"
          style={{ zIndex: 5, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <Modal.Dialog style={{ marginTop: "15%" }}>
            <Modal.Header closeButton>
              <Modal.Title>Are you sure you want to delete?</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p>You can't undo this action.</p>
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setDeletedReservation(null)}
              >
                Cancel
              </Button>
              <Button variant="danger" onClick={() => deleteReservation()}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      ) : null}
      <Container className="py-3 d-flex flex-column h-100">
        <h1>Your bookings</h1>
        <ListGroup as="ol" numbered className="mt-3">
          {reservations.length == 0 ? <h2>No bookings yet ;(</h2> : null}
          {reservations.map((res) => (
            <ListGroup.Item
              key={res._id}
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">
                  Booking on {format(new Date(res.fromDate), "dd.MM.yyyy")} (
                  {format(new Date(res.fromDate), "HH:MM")} -{" "}
                  {format(new Date(res.toDate), "HH:MM")})
                </div>
                Guests: {res.numberOfGuests}
              </div>
              <Badge
                bg="danger"
                pill
                style={{ cursor: "pointer" }}
                onClick={() => setDeletedReservation(res)}
              >
                Cancel
              </Badge>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </>
  );
};

export default MyBookings;
