import React, { Component } from "react";
import "./App.css";
import Users from "./components/Users";
import PaginatedTable from "./components/PaginatedTable";

function App() {
  return (
    <React.Fragment>
      {/* <Users /> */}
      <PaginatedTable />
    </React.Fragment>
  );
}

export default App;
