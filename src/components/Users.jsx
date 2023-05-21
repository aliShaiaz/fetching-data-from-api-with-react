import React, { Component } from "react";

class Users extends Component {
  state = {
    users: {},
    x: "asdfas",
  };

  handleClick = async () => {
    console.log(this.state.users[0]);
  };

  async componentDidMount() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();

    this.setState({ users });

    console.log(users);
  }

  render() {
    return (
      <React.Fragment>
        <h1>Users</h1>
        <button onClick={this.handleClick}>Click</button>
        <br />

        {/* {this.state.users ? this.state.users : ""} */}
        {this.state.x}
      </React.Fragment>
    );
  }
}

export default Users;
