import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";

const StatusCode = ({ code, children }) => (
  <Route
    render={({ staticContext }) => {
      if (staticContext) staticContext.status = code;
      return children;
    }}
  />
);

StatusCode.propTypes = {
  code: PropTypes.number.isRequired
};

export default StatusCode;
