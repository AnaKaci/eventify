import { Link } from "react-router-dom";
import { ArrowRight, Clock, MapPin, UsersRound } from "lucide-react";
import { formatDate, formatTime, getDay, getMonth } from "../utils/date";
import { getEventImage } from "../utils/eventVisuals";

function EventCard({ event, actionSlot, reserved = false }) {
  const statusClass = event.status?.toLowerCase() || "open";

  return (
    <article className="event-card">
      <div
        className="event-card-media"
        style={{ backgroundImage: `url("${getEventImage(event)}")` }}
      >
        <div className="event-date-badge">
          <span>{getMonth(event.date)}</span>
          <strong>{getDay(event.date)}</strong>
        </div>
        <span className={`status-badge media-status ${statusClass}`}>{event.status}</span>
      </div>

      <div className="event-card-content">
        <div className="card-tags">
          <span className="category-tag">{event.category}</span>
          {reserved && <span className="reserved-tag">Reserved</span>}
        </div>

        <h3>{event.title}</h3>
        <p className="muted clamp-text">{event.description}</p>

        <div className="event-meta">
          <span>
            <Clock size={16} />
            {formatDate(event.date)} at {formatTime(event.date)}
          </span>
          <span>
            <MapPin size={16} />
            {event.location}
          </span>
          <span>
            <UsersRound size={16} />
            {event.availableSeats} of {event.totalSeats} seats open
          </span>
        </div>

        <div className="card-footer">
          <Link to={`/events/${event._id}`} className="text-button">
            View details
            <ArrowRight size={16} />
          </Link>
          {actionSlot}
        </div>
      </div>
    </article>
  );
}

export default EventCard;
