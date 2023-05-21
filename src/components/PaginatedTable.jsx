import React, { useState, useEffect } from "react";
import "../css/PaginatedTable.css";

const PaginatedTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [perPage, setPerPage] = useState(10);
  useEffect(() => {
    fetchData();
  }, [currentPage, perPage]);

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
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
