import React from "react";
import StatusCode from "../StatusCode";

export default class NotFound extends React.PureComponent {
  render() {
    return (
      <StatusCode code={404}>
        <h1>404: Not found!</h1>
      </StatusCode>
    );
  }
}
