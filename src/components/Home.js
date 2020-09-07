import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import Button from "react-bootstrap/Button";

import "../styles/Home.css";

class Home extends PureComponent {
  render() {
    return (
      <div className="home">
        <div className="welcome-text">Welcome</div>
        <Button
          variant="primary"
          size="lg"
          onClick={() => {
            this.props.history.push("/boards");
          }}
        >
          Get Started
        </Button>
      </div>
    );
  }
}
export default withRouter(Home);
