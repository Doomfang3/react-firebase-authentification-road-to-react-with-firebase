import React from "react";
import { Helmet } from 'react-helmet';

import { withAuthorization } from "../Session";

const HomePage = () => (
  <div>
    <Helmet>
      <title>Home</title>
      <meta name="home page" content="home" />
    </Helmet>
    <h1>Home</h1>
    <p>The Home Page is accesible by avery signed in user.</p>
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
