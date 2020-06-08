import React, { Component } from "react";
import axios from "axios";
import Loader from "./Loader";

import "./Login.scss";

class LoginPage extends Component {
  state = { loading: false, email: "", password: "", error: null };

  submitHandler = async (e) => {
    this.setState({ loading: true });
    e.preventDefault();
    try {
      const res = await axios.get(
        "https://q3rgtdews6.execute-api.us-east-2.amazonaws.com/default/login",
        {
          params: {
            email: this.state.email,
            password: this.state.password,
          },
        }
      );
      if (res.data.model) {
        this.setState({ loading: false });
        alert(`Hello ${res.data.model.name}`);
        this.props.history.push("/user");
      } else {
        this.setState({ loading: false, error: res.data.msg });
      }
    } catch (err) {
      if (err.response) {
        alert(`Sever Not working, Hello User`);
        this.props.history.push("/user");
        this.setState({ loading: false, error: err.response.data.msg });
      }
    }
  };

  render() {
    const { email, password, error, loading } = this.state;
    return (
      <div className="login">
        <div>
          <div>
            <h2>Login</h2>
            {this.state.error && <div className="error">{error}</div>}
            <form>
              <input
                type="text"
                value={email}
                name="email"
                placeholder="Useremail"
                onChange={(e) =>
                  this.setState({ email: e.target.value, error: null })
                }
              />
              <input
                type="password"
                value={password}
                name="password"
                placeholder="Password"
                onChange={(e) =>
                  this.setState({ password: e.target.value, error: null })
                }
              />
              <button type="submit" onClick={this.submitHandler}>
                Sign In{" "}
                {loading && (
                  <span>
                    <Loader size="sm" />
                  </span>
                )}
              </button>
              <p>
                <a href="#">Lost Your Password ?</a>
              </p>
            </form>
          </div>
          <p style={{ marginTop: "2rem" }}>
            Don't have an account?{" "}
            <a href="#">
              <u>Sign up here!</u>
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default LoginPage;
