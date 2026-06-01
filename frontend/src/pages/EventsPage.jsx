import { Search } from "lucide-react";
import EventCard from "../components/EventCard";
import { useGetEventsQuery } from "../services/apiSlice";
import { useState } from "react";

const categories = ["All", "Technology", "Business", "Culture", "Sports", "Career", "Academic", "Health", "Other"];

function EventsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const { data: events = [], isLoading, isError } = useGetEventsQuery({ search, category });

  return (
    <section className="container page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Explore</p>
          <h1>Campus events</h1>
          <p className="muted">Find workshops, talks, clubs, and social activities around campus.</p>
        </div>
      </div>

      <div className="toolbar">
        <label className="search-box">
          <Search size={18} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by title, category, or location"
          />
        </label>

        <div className="category-chips" aria-label="Filter events by category">
          {categories.map((item) => (
            <button
              type="button"
              className={category === item ? "category-chip active" : "category-chip"}
              onClick={() => setCategory(item)}
              key={item}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {isLoading && <p className="empty-text">Loading events...</p>}
      {isError && <p className="alert error">Could not load events. Check that the backend is running.</p>}
      {!isLoading && !isError && events.length === 0 && (
        <p className="empty-text">No events match your filters.</p>
      )}

      <div className="event-grid">
        {events.map((event) => (
          <EventCard event={event} key={event._id} />
        ))}
      </div>
    </section>
  );
}

export default EventsPage;
