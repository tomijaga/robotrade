import Header from "../PageElements/Header";
import Navbar from "../PageElements/Navbar";
import Footer from "../PageElements/Footer";
import React, { Component } from "react";
import "../App.css";

export default class PageContainer extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="setPageRegions">
        <Header style={{ gridColumn: "1 / 2", gridRow: "1 / 1" }} />
        <Navbar
          style={{
            gridColumn: "1 / span 1",
            gridRow: "2 / 4",
            background: "red",
          }}
        ></Navbar>

        <div style={{ gridColumn: "2 / 3", gridRow: "2 / 3" }}>
          {this.props.children}
        </div>
        <Footer style={{ gridColumn: " 1/3", gridRow: "3/4" }}></Footer>
      </div>
    );
  }
}
