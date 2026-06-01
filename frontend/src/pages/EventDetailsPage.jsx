import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { CalendarDays, CheckCircle2, MapPin, Ticket, UsersRound, XCircle } from "lucide-react";
import {
  useCancelReservationMutation,
  useGetEventQuery,
  useReserveEventMutation
} from "../services/apiSlice";
import { formatDate, formatTime, getDay, getMonth } from "../utils/date";
import { getErrorMessage } from "../utils/errors";
import { getEventImage } from "../utils/eventVisuals";
import { useState } from "react";

function EventDetailsPage() {
  const { id } = useParams();
  const user = useSelector((state) => state.auth.user);
  const { data: event, isLoading, isError } = useGetEventQuery(id);
  const [reserveEvent, { isLoading: isReserving }] = useReserveEventMutation();
  const [cancelReservation, { isLoading: isCancelling }] = useCancelReservationMutation();
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const alreadyReserved =
    event?.reservedUsers?.some((reservedUser) => {
      const reservedId = reservedUser?._id || reservedUser;
      return reservedId === user?._id;
    }) || false;

  const handleReserve = async () => {
    setMessage("");
    setErrorMessage("");

    try {
      await reserveEvent(id).unwrap();
      setMessage("Your spot is reserved.");
    } catch (error) {
      setErrorMessage(getErrorMessage(error, "Could not reserve this event"));
    }
  };

  const handleCancel = async () => {
    setMessage("");
    setErrorMessage("");

    try {
      await cancelReservation(id).unwrap();
      setMessage("Reservation cancelled.");
    } catch (error) {
      setErrorMessage(getErrorMessage(error, "Could not cancel this reservation"));
    }
  };

  if (isLoading) {
    return <p className="container empty-text">Loading event...</p>;
  }

  if (isError || !event) {
    return <p className="container alert error">Event could not be loaded.</p>;
  }

  return (
    <section className="container page">
      <div className="details-layout">
        <article className="details-panel">
          <div
            className="details-visual"
            style={{ backgroundImage: `url("${getEventImage(event)}")` }}
          >
            <div className="event-date-badge">
              <span>{getMonth(event.date)}</span>
              <strong>{getDay(event.date)}</strong>
            </div>
          </div>

          <div className="card-tags">
            <span className="category-tag">{event.category}</span>
            <span className={`status-badge ${event.status?.toLowerCase()}`}>{event.status}</span>
          </div>

          <h1>{event.title}</h1>
          <p className="details-description">{event.description}</p>

          {message && <p className="alert success">{message}</p>}
          {errorMessage && <p className="alert error">{errorMessage}</p>}

          <div className="details-actions">
            {!user && (
              <Link to="/login" className="primary-button">
                <Ticket size={18} />
                Log in to reserve
              </Link>
            )}

            {user?.role === "student" && !alreadyReserved && (
              <button
                type="button"
                className="primary-button"
                onClick={handleReserve}
                disabled={isReserving || event.status !== "Open"}
              >
                <CheckCircle2 size={18} />
                {isReserving ? "Reserving..." : "Reserve a spot"}
              </button>
            )}

            {user?.role === "student" && alreadyReserved && (
              <button
                type="button"
                className="danger-button"
                onClick={handleCancel}
                disabled={isCancelling}
              >
                <XCircle size={18} />
                {isCancelling ? "Cancelling..." : "Cancel reservation"}
              </button>
            )}

            {user?.role === "admin" && (
              <Link to="/admin" className="secondary-button">
                Manage in dashboard
              </Link>
            )}
          </div>
        </article>

        <aside className="event-summary">
          <h2>Event information</h2>
          <div className="summary-list">
            <span>
              <CalendarDays size={18} />
              {formatDate(event.date)} at {formatTime(event.date)}
            </span>
            <span>
              <MapPin size={18} />
              {event.location}
            </span>
            <span>
              <UsersRound size={18} />
              {event.availableSeats} seats available from {event.totalSeats}
            </span>
          </div>
          <div className="seat-meter" aria-label="Reserved seats">
            <span
              style={{
                width: `${Math.min(
                  ((event.reservedUsers?.length || 0) / event.totalSeats) * 100,
                  100
                )}%`
              }}
            />
          </div>
          <p className="muted">{event.reservedUsers?.length || 0} reservations so far.</p>
        </aside>
      </div>
    </section>
  );
}

export default EventDetailsPage;
