import { Edit3, Trash2, UsersRound } from "lucide-react";
import { useState } from "react";
import EventForm from "../components/EventForm";
import {
  useCreateEventMutation,
  useDeleteEventMutation,
  useGetEventsQuery,
  useUpdateEventMutation
} from "../services/apiSlice";
import { formatDate } from "../utils/date";
import { getErrorMessage } from "../utils/errors";

function AdminDashboardPage() {
  const { data: events = [], isLoading } = useGetEventsQuery();
  const [createEvent, { isLoading: isCreating }] = useCreateEventMutation();
  const [updateEvent, { isLoading: isUpdating }] = useUpdateEventMutation();
  const [deleteEvent] = useDeleteEventMutation();
  const [editingEvent, setEditingEvent] = useState(null);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (form) => {
    setMessage("");
    setErrorMessage("");

    try {
      if (editingEvent) {
        await updateEvent({ id: editingEvent._id, ...form }).unwrap();
        setMessage("Event updated.");
        setEditingEvent(null);
      } else {
        await createEvent(form).unwrap();
        setMessage("Event created.");
      }
    } catch (error) {
      setErrorMessage(getErrorMessage(error, "Could not save event"));
    }
  };

  const handleDelete = async (eventId) => {
    const shouldDelete = window.confirm("Delete this event?");

    if (!shouldDelete) {
      return;
    }

    setMessage("");
    setErrorMessage("");

    try {
      await deleteEvent(eventId).unwrap();
      setMessage("Event deleted.");
      if (editingEvent?._id === eventId) {
        setEditingEvent(null);
      }
    } catch (error) {
      setErrorMessage(getErrorMessage(error, "Could not delete event"));
    }
  };

  return (
    <section className="container page admin-page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Admin</p>
          <h1>Event dashboard</h1>
          <p className="muted">Create events, update details, and monitor reservation counts.</p>
        </div>
      </div>

      {message && <p className="alert success">{message}</p>}
      {errorMessage && <p className="alert error">{errorMessage}</p>}

      <div className="admin-layout">
        <EventForm
          initialEvent={editingEvent}
          onSubmit={handleSubmit}
          onCancel={() => setEditingEvent(null)}
          isLoading={isCreating || isUpdating}
        />

        <div className="admin-list">
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">Overview</p>
              <h2>Existing events</h2>
            </div>
          </div>

          {isLoading ? (
            <p className="empty-text">Loading events...</p>
          ) : events.length === 0 ? (
            <p className="empty-text">No events created yet.</p>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Event</th>
                    <th>Date</th>
                    <th>Reservations</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => (
                    <tr key={event._id}>
                      <td>
                        <strong>{event.title}</strong>
                        <span className="table-subtext">{event.category}</span>
                      </td>
                      <td>{formatDate(event.date)}</td>
                      <td>
                        <span className="reservation-count">
                          <UsersRound size={16} />
                          {event.reservedUsers?.length || 0}/{event.totalSeats}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${event.status?.toLowerCase()}`}>
                          {event.status}
                        </span>
                      </td>
                      <td>
                        <div className="row-actions">
                          <button
                            type="button"
                            className="icon-button"
                            onClick={() => setEditingEvent(event)}
                            aria-label={`Edit ${event.title}`}
                            title="Edit"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button
                            type="button"
                            className="icon-button danger-icon"
                            onClick={() => handleDelete(event._id)}
                            aria-label={`Delete ${event.title}`}
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default AdminDashboardPage;
