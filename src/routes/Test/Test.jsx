import React, { PureComponent } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { Redirect, withRouter } from "react-router-dom";

const TestStyled = styled.div`
  background: #111;
  color: white;
  padding: 2rem;
`;

class Test extends PureComponent {
  render() {
    if (this.props.match.params.id === "redirect") {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Helmet>
          <title>Test Page Title</title>
          <meta property="og:title" content="Tomb Raider" />
          <meta property="og:type" content="website" />
          <meta
            property="og:url"
            content="https://www.sfanytime.com/sv/movie/28083/tomb-raider"
          />
          <meta
            property="og:image"
            content="https://secure.sfanytime.se/movieimages/COVER/385f6d3e-ba2c-44ed-8923-a8cf0107da90_COVER_01.jpg"
          />
        </Helmet>
        <h2>This is the Test PAGE!</h2>
        <p>Change /:id to 'redirect' to test a 301 Redirect!</p>
        <br />
        <br />
        <TestStyled>This is a Styled component Test</TestStyled>
      </div>
    );
  }
}

export default withRouter(Test);
