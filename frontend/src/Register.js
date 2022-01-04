import React, { Component } from "react";
import swal from "sweetalert";
import { Button, TextField, Link } from "@material-ui/core";
const axios = require("axios");

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      mobilenumber: "",
      country: "",
      password: "",
      password2: "",
    };
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  register = () => {
    axios
      .post("http://localhost:3000/users/register", {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        mobilenumber: this.state.mobilenumber,
        country: this.state.country,
        password: this.state.password,
        password2: this.state.password2,
      })
      .then((res) => {
        if(res.data.status=="success")
        {
        swal({
          text: res.data.message,
          icon: "success",
          type: "success",
        });
        this.props.history.push("/");
      }
      else if(res.data.status=="failure")
      {
        swal({
          text: res.data.message,
          icon: "error",
          type: "error",
        });
      }
      })
      .catch((err) => {
        swal({
          text: err.response.data.status,
          icon: "error",
          type: "error",
        });
      });
  };

  render() {
    return (
      <div style={{ marginTop: "200px" }}>
        <div>
          <h2>Register</h2>
        </div>

        <div>
          <TextField
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="firstname"
            value={this.state.firstname}
            onChange={this.onChange}
            placeholder="First Name"
            required
          />
          <br />
          <br />
          <TextField
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="lastname"
            value={this.state.lastname}
            onChange={this.onChange}
            placeholder="Last Name"
            required
          />
          <br />
          <br />
          <TextField
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            placeholder="E-mail"
            required
          />
          <br />
          <br />
          <TextField
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="mobilenumber"
            value={this.state.mobilenumber}
            onChange={this.onChange}
            placeholder="Mobile Number"
            required
          />
          <br />
          <br />
          <TextField
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="country"
            value={this.state.country}
            onChange={this.onChange}
            placeholder="Country"
            required
          />
          <br />
          <br />
          <TextField
            id="standard-basic"
            type="password"
            autoComplete="off"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
            placeholder="Password"
            required
          />
          <br />
          <br />
          <TextField
            id="standard-basic"
            type="password"
            autoComplete="off"
            name="password2"
            value={this.state.password2}
            onChange={this.onChange}
            placeholder="Confirm Password"
            required
          />
          <br />
          <br />
          <Button
            className="button_style"
            variant="contained"
            color="primary"
            size="small"
            disabled={this.state.firstname == "" && this.state.password == ""}
            onClick={this.register}
          >
            Register
          </Button>{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link href="/">Login</Link>
        </div>
      </div>
    );
  }
}
