import { Link } from "react-router-dom";
import { ArrowRight, CalendarCheck, GraduationCap, MapPin, ShieldCheck, UsersRound } from "lucide-react";
import EventCard from "../components/EventCard";
import { useGetEventsQuery } from "../services/apiSlice";
import { formatDate, formatTime } from "../utils/date";
import { getEventImage } from "../utils/eventVisuals";

function LandingPage() {
  const { data: events = [], isLoading } = useGetEventsQuery();
  const featuredEvents = events.slice(0, 3);
  const topEvent = events[0];

  return (
    <div>
      <section className="hero-section">
        <div className="hero-overlay" />
        <div className="container hero-content">
          <p className="hero-eyebrow">Campus events made easier</p>
          <h1>Eventify</h1>
          <p className="hero-copy">
            Discover activities around campus, reserve your place in seconds, and keep every
            reservation organized in one student-friendly platform.
          </p>
          <div className="hero-actions">
            <Link to="/events" className="primary-button">
              Browse events
              <ArrowRight size={18} />
            </Link>
            <Link to="/register" className="light-button">
              Create account
            </Link>
          </div>

          {topEvent && (
            <Link
              to={`/events/${topEvent._id}`}
              className="hero-event-preview"
              style={{ backgroundImage: `url("${getEventImage(topEvent)}")` }}
            >
              <div className="hero-preview-label">
                <span>Top pick</span>
                <strong>{topEvent.category}</strong>
              </div>
              <div className="hero-preview-copy">
                <p>
                  {formatDate(topEvent.date)} at {formatTime(topEvent.date)}
                </p>
                <h2>{topEvent.title}</h2>
                <span>
                  <MapPin size={16} />
                  {topEvent.location}
                </span>
              </div>
              <div className="hero-preview-seat">
                <UsersRound size={17} />
                {topEvent.availableSeats} seats open
              </div>
            </Link>
          )}

          {events.length > 0 && (
            <div className="hero-orbit-list" aria-label="Event previews">
              {events.slice(0, 10).map((event) => (
                <Link
                  to={`/events/${event._id}`}
                  className="hero-orbit-item"
                  key={event._id}
                  title={event.title}
                  style={{ backgroundImage: `url("${getEventImage(event)}")` }}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="container info-strip" aria-label="Platform highlights">
        <div className="info-item">
          <CalendarCheck size={28} />
          <div>
            <h3>Reserve Quickly</h3>
            <p>Students can claim or cancel seats with clear availability updates.</p>
          </div>
        </div>
        <div className="info-item">
          <GraduationCap size={28} />
          <div>
            <h3>Built For Campus</h3>
            <p>Events are organized by category, date, location, and status.</p>
          </div>
        </div>
        <div className="info-item">
          <ShieldCheck size={28} />
          <div>
            <h3>Admin Ready</h3>
            <p>Admins can manage events and see reservation counts from one dashboard.</p>
          </div>
        </div>
      </section>

      <section className="container page-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Featured</p>
            <h2>Upcoming campus moments</h2>
          </div>
          <Link to="/events" className="text-button">
            See all
            <ArrowRight size={16} />
          </Link>
        </div>

        {isLoading ? (
          <p className="empty-text">Loading featured events...</p>
        ) : featuredEvents.length > 0 ? (
          <div className="event-grid">
            {featuredEvents.map((event) => (
              <EventCard event={event} key={event._id} />
            ))}
          </div>
        ) : (
          <p className="empty-text">No events yet. Admins can add the first campus events.</p>
        )}
      </section>
    </div>
  );
}

export default LandingPage;
