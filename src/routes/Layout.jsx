import React, { PureComponent } from "react";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import routes from "./routes";
import Logo from "../logo.svg";

class Layout extends PureComponent {
  render() {
    return (
      <div>
        <h1>This is shared Layout file</h1>
        <Logo width={128} height={128} />
        <br />
        <br />
        <Link to="/">Home Page</Link>
        <br />
        <Link to="/test/id">Test Page</Link>
        <br />
        <Switch>
          {routes.map(route => (
            <Route key={`route-${route.name}`} {...route} />
          ))}
        </Switch>
      </div>
    );
  }
}

export default withRouter(Layout);
