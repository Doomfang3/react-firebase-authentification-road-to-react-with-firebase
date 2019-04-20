import React, { Component } from "react";
import { compose } from "recompose";
import { Helmet } from "react-helmet";

import { withFirebase } from "../Firebase";
import { withAuthorization } from "../Session";
import * as ROLES from "../../constants/roles";

import "./index.css";

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      users: []
    };
  }
  componentDidMount() {
    this.setState({ loading: true });
    this.props.firebase.users().on("value", snapshot => {
      const usersObject = snapshot.val();
      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key
      }));

      this.setState({
        users: usersList,
        loading: false
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;

    return (
      <div>
        <Helmet>
          <title>Admin</title>
          <meta name="admin page" content="admin" />
        </Helmet>
        <h1>Admin</h1>
        <p>The Admin Page is accessible by every signed in admin user.</p>
        {loading && <div>Loading ...</div>}
        <UserList users={users} />
      </div>
    );
  }
}

const UserList = ({ users }) => (
  <ul className="users-list">
    {users.map(user => (
      <li key={user.uid}>
        <span>
          <strong>ID: </strong>
          {user.uid}
        </span>
        <span>
          <strong>E-Mail: </strong>
          {user.email}
        </span>
        <span>
          <strong>Username: </strong>
          {user.username}
        </span>
        {user.roles ? (
          user.roles.includes(ROLES.ADMIN) ? (
            <span>
              <strong>Admin</strong>
            </span>
          ) : null
        ) : null}
      </li>
    ))}
  </ul>
);

const condition = authUser => authUser && authUser.roles.includes(ROLES.ADMIN)

export default compose(
  withAuthorization(condition),
  withFirebase)(AdminPage);