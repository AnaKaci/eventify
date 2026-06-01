import { useEffect, useState } from "react";
import { Save, X } from "lucide-react";
import { toInputDateTime } from "../utils/date";

const categories = ["Technology", "Business", "Culture", "Sports", "Career", "Academic", "Health", "Other"];

const emptyForm = {
  title: "",
  description: "",
  category: "Technology",
  date: "",
  location: "",
  totalSeats: 30
};

function EventForm({ initialEvent, onSubmit, isLoading, onCancel }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (initialEvent) {
      setForm({
        title: initialEvent.title,
        description: initialEvent.description,
        category: initialEvent.category,
        date: toInputDateTime(initialEvent.date),
        location: initialEvent.location,
        totalSeats: initialEvent.totalSeats
      });
    } else {
      setForm(emptyForm);
    }
  }, [initialEvent]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: name === "totalSeats" ? Number(value) : value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      ...form,
      totalSeats: Number(form.totalSeats)
    });
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div className="section-heading compact">
        <div>
          <p className="eyebrow">{initialEvent ? "Edit event" : "Create event"}</p>
          <h2>{initialEvent ? initialEvent.title : "New campus event"}</h2>
        </div>
      </div>

      <div className="form-grid">
        <label>
          Title
          <input name="title" value={form.title} onChange={handleChange} required />
        </label>
        <label>
          Category
          <select name="category" value={form.category} onChange={handleChange} required>
            {categories.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <label>
          Date and time
          <input
            type="datetime-local"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Location
          <input name="location" value={form.location} onChange={handleChange} required />
        </label>
        <label>
          Total seats
          <input
            type="number"
            name="totalSeats"
            min="1"
            value={form.totalSeats}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <label>
        Description
        <textarea
          name="description"
          rows="4"
          value={form.description}
          onChange={handleChange}
          required
        />
      </label>

      <div className="form-actions">
        {initialEvent && (
          <button type="button" className="secondary-button" onClick={onCancel}>
            <X size={16} />
            Cancel
          </button>
        )}
        <button type="submit" className="primary-button" disabled={isLoading}>
          <Save size={16} />
          {isLoading ? "Saving..." : initialEvent ? "Save changes" : "Create event"}
        </button>
      </div>
    </form>
  );
}

export default EventForm;
