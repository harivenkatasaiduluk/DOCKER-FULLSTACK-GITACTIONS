import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const MovieManager = () => {
  const [movies, setMovies] = useState([]);
  const [form, setForm] = useState({ title: "", director: "", year: "", genre: "" });
  const [editingId, setEditingId] = useState(null);

  // ✅ Use env variable for backend URL
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  // Fetch all movies
  const fetchMovies = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/all`); // backend GET all endpoint
      setMovies(res.data);
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // Add or Update movie
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${BASE_URL}/${editingId}`, form);
      } else {
        await axios.post(BASE_URL, form);
      }

      setForm({ title: "", director: "", year: "", genre: "" });
      setEditingId(null);
      fetchMovies();
    } catch (err) {
      console.error("Error saving movie:", err);
    }
  };

  // Edit movie
  const handleEdit = (movie) => {
    setForm({
      title: movie.title,
      director: movie.director,
      year: movie.year,
      genre: movie.genre,
    });
    setEditingId(movie.id);
  };

  // Delete movie
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      fetchMovies();
    } catch (err) {
      console.error("Error deleting movie:", err);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-primary">🎬 Movie Management System</h2>

      {/* Movie Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-2">
          <div className="col-md-3">
            <input
              type="text"
              placeholder="Title"
              className="form-control"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              placeholder="Director"
              className="form-control"
              value={form.director}
              onChange={(e) => setForm({ ...form, director: e.target.value })}
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              placeholder="Year"
              className="form-control"
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              placeholder="Genre"
              className="form-control"
              value={form.genre}
              onChange={(e) => setForm({ ...form, genre: e.target.value })}
              required
            />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-success w-100">
              {editingId ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </form>

      {/* Movie Table */}
      <table className="table table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Director</th>
            <th>Year</th>
            <th>Genre</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((m) => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.title}</td>
              <td>{m.director}</td>
              <td>{m.year}</td>
              <td>{m.genre}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(m)}
                >
                  <i className="bi bi-pencil"></i>
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(m.id)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovieManager;
