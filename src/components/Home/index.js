import React from "react";
import { compose } from "recompose";
import { Helmet } from "react-helmet";

import { withAuthorization, withEmailVerification } from "../Session";

const HomePage = () => (
  <div>
    <Helmet>
      <title>Home</title>
      <meta name="home page" content="home" />
    </Helmet>
    <h1>Home</h1>
    <p>The Home Page is accesible by every signed in user.</p>
  </div>
);

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(HomePage);
