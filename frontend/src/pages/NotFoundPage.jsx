import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section className="container page centered-page">
      <p className="eyebrow">404</p>
      <h1>Page not found</h1>
      <p className="muted">The page you are looking for does not exist.</p>
      <Link to="/events" className="primary-button">
        Back to events
      </Link>
    </section>
  );
}

export default NotFoundPage;
