import { XCircle } from "lucide-react";
import EventCard from "../components/EventCard";
import { useCancelReservationMutation, useGetMyReservationsQuery } from "../services/apiSlice";
import { getErrorMessage } from "../utils/errors";
import { useState } from "react";

function MyReservationsPage() {
  const { data: reservations = [], isLoading, isError } = useGetMyReservationsQuery();
  const [cancelReservation, { isLoading: isCancelling }] = useCancelReservationMutation();
  const [errorMessage, setErrorMessage] = useState("");

  const handleCancel = async (eventId) => {
    setErrorMessage("");

    try {
      await cancelReservation(eventId).unwrap();
    } catch (error) {
      setErrorMessage(getErrorMessage(error, "Could not cancel reservation"));
    }
  };

  return (
    <section className="container page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Your calendar</p>
          <h1>My reservations</h1>
          <p className="muted">Keep track of the campus events you have reserved.</p>
        </div>
      </div>

      {errorMessage && <p className="alert error">{errorMessage}</p>}
      {isLoading && <p className="empty-text">Loading reservations...</p>}
      {isError && <p className="alert error">Could not load your reservations.</p>}

      {!isLoading && reservations.length === 0 && (
        <p className="empty-text">You have not reserved any events yet.</p>
      )}

      <div className="event-grid">
        {reservations.map((event) => (
          <EventCard
            event={event}
            key={event._id}
            reserved
            actionSlot={
              <button
                type="button"
                className="danger-button compact-button"
                onClick={() => handleCancel(event._id)}
                disabled={isCancelling}
              >
                <XCircle size={16} />
                Cancel
              </button>
            }
          />
        ))}
      </div>
    </section>
  );
}

export default MyReservationsPage;
