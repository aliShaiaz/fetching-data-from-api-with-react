import React, { useState, useEffect } from "react";
import "../css/PaginatedTable.css";
import EditModal from "./EditModal";

const PaginatedTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deletingUser, setDeletingUser] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    fetchData();
  }, [currentPage, perPage]);

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsEditing(true);
    setModalOpen(true);
  };

  const handleSave = (updatedUser) => {
    // Perform the API call or update the data in your preferred way
    console.log("Saving changes:", updatedUser);
    setModalOpen(false);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setModalOpen(false);
  };

  const handleDelete = (user) => {
    setDeletingUser(user);
    setConfirmDelete(true);
  };

  const handleConfirmDelete = () => {
    console.log("Deleting user:", deletingUser);
    setConfirmDelete(false);
  };

  const handleCancelDelete = () => {
    setConfirmDelete(false);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users?_page=${currentPage}&_limit=${perPage}`
      );
      const json = await response.json();
      setData(json);
      setTotalPages(Math.ceil(response.headers.get("X-Total-Count") / perPage));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePerPageChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (e.target.value > 0) {
      setPerPage(value);
      setCurrentPage(1);
    } else {
      setPerPage(0);
    }
  };

  return (
    <div>
      <div>
        Rows per page:{" "}
        <input type="text" value={perPage} onChange={handlePerPageChange} />
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <EditModal
          user={editingUser}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}

      {confirmDelete && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this user?</p>
            <div className="modal-actions">
              <button onClick={handleConfirmDelete}>Delete</button>
              <button onClick={handleCancelDelete}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      <div>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous Page
        </button>
        <span>{currentPage}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default PaginatedTable;
