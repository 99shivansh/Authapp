import React, { Component, useEffect } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  LinearProgress,
  DialogTitle,
  DialogContent,
  TableBody,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import swal from "sweetalert";
const axios = require("axios");

export default class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      rowdata: [],
    };
    this.getinfo = this.getinfo.bind(this);
  }

  componentDidMount() {
    let token = localStorage.getItem("LoggedIn");
    var country = localStorage.getItem("country");
    if (token == "false") {
      this.props.history.push("/");
    } else if (token == "true") {
      this.getinfo(country);
    }
  }

  async getinfo(data) {
    let data1 = axios
      .post("http://localhost:3000/users/getinfo", {
        country: data,
      })
      .then((response) => {
        let data = response.data;
        this.setState({ getinfo: data });
      })
      .catch((err) => {
        if (
          err.response &&
          err.response.data &&
          err.response.data.errorMessage
        ) {
          swal({
            text: err.response.data.errorMessage,
            icon: "error",
            type: "error",
          });
        }
      });
  }

  logOut = () => {
    localStorage.setItem("LoggedIn", false);
    this.props.history.push("/");
  };
  render() {
    const { getinfo } = this.state;

    return (
      <div>
        {this.state.loading && <LinearProgress size={40} />}

        <div>
          <h2>Dashboard</h2>
          <Button
            className="button_style"
            variant="contained"
            size="small"
            onClick={this.logOut}
          >
            Log Out
          </Button>
          <h3>Total Users={getinfo && getinfo.length}</h3>
        </div>

        <br />

        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">First Name</TableCell>
                <TableCell align="center">Last Name</TableCell>
                <TableCell align="center">E-mail</TableCell>
                <TableCell align="center">Country</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getinfo &&
                getinfo.map((getinfo) => {
                  return (
                    <TableRow key={getinfo}>
                      <TableCell align="center"> {getinfo.firstname}</TableCell>
                      <TableCell align="center">{getinfo.lastname}</TableCell>
                      <TableCell align="center">{getinfo.email}</TableCell>
                      <TableCell align="center">{getinfo.country}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          <br />
          <Pagination
            count={this.state.pages}
            page={this.state.page}
            onChange={this.pageChange}
            color="primary"
          />
        </TableContainer>
      </div>
    );
  }
}
