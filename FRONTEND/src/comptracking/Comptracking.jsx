import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config"; // single import, use config.url or config.baseUrl

export default function CompTracking() {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    serialNumber: "",
  });

  const [computers, setComputers] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        const response = await axios.put(`${config.url}/comptrackingapi/update`, {
          id: editId,
          ...formData,
        });
        if (response.status === 200) {
          setMessage("Computer updated successfully!");
          setError("");
          resetForm();
          fetchComputers();
        }
      } else {
        const response = await axios.post(`${config.url}/comptrackingapi/add`, formData);
        if (response.status === 200) {
          setMessage("Computer added successfully!");
          setError("");
          resetForm();
          fetchComputers();
        }
      }
    } catch (err) {
      setMessage("");
      setError("Failed to save computer");
    }
  };

  const fetchComputers = async () => {
    try {
      const response = await axios.get(`${config.url}/comptrackingapi/viewall`);
      setComputers(response.data);
    } catch (err) {
      setError("Failed to fetch computers");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this computer?")) {
      try {
        const response = await axios.delete(`${config.url}/comptrackingapi/delete/${id}`);
        setMessage(response.data);
        setError("");
        fetchComputers();
      } catch (err) {
        setMessage("");
        setError("Failed to delete computer");
      }
    }
  };

  const handleEdit = (computer) => {
    setFormData({
      name: computer.name,
      brand: computer.brand,
      serialNumber: computer.serialNumber,
    });
    setEditId(computer.id);
    setEditMode(true);
  };

  const resetForm = () => {
    setFormData({ name: "", brand: "", serialNumber: "" });
    setEditMode(false);
    setEditId(null);
  };

  useEffect(() => {
    fetchComputers();
  }, []);

  return (
    <div>
      <h2>Computer Tracking System</h2>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Computer Name:</label>
          <input type="text" id="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Brand:</label>
          <input type="text" id="brand" value={formData.brand} onChange={handleChange} required />
        </div>
        <div>
          <label>Serial Number:</label>
          <input type="text" id="serialNumber" value={formData.serialNumber} onChange={handleChange} required />
        </div>
        <button type="submit">{editMode ? "Update Computer" : "Add Computer"}</button>
      </form>

      <h3>All Computers</h3>
      {computers.length === 0 ? (
        <p>No computers found</p>
      ) : (
        <table border="1" cellPadding="8" cellSpacing="0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Serial Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {computers.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.brand}</td>
                <td>{c.serialNumber}</td>
                <td>
                  <button onClick={() => handleEdit(c)}>Edit</button>
                  <button onClick={() => handleDelete(c.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
