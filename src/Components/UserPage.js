import React, { Component } from "react";
import axios from "axios";

import "./User.scss";

class UserPage extends Component {
  state = {
    users: [],
    loading: false,
    err: null,
    visible: false,
    width: 0,
    height: 0,
    selected: 0,
    sorted: [],
    isSort: false,
    sortNo: -1,
  };

  componentDidMount() {
    this.loadUser();
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  loadUser = async () => {
    let status = [];
    this.setState({ loading: true });
    try {
      const res = await axios.get(
        "https://q3rgtdews6.execute-api.us-east-2.amazonaws.com/default/user"
      );
      status = [
        { type: "in progress", color: "green" },
        { type: "completed", color: "blue" },
        { type: "cancelled", color: "red" },
        { type: "pending", color: "orange" },
      ];
      if (res.data.model) {
        let newUsers = [];

        for (let i = 0; i < res.data.model.users.length * 10; i++) {
          newUsers.push({
            ...res.data.model.users[i % res.data.model.users.length],
            ...status[Math.floor(Math.random() * 4)],
            users: Math.floor(Math.random() * 4),
            budget: Math.floor(Math.random() * 1000),
          });
        }
        this.setState({
          users: newUsers,
          sorted: [...newUsers],
          loading: false,
        });
      } else {
        this.setState({ loading: false, err: res.data.msg });
      }
    } catch (err) {
      if (err.response) {
        const res = {
          data: {
            model: {
              users: [
                {
                  id: 1,
                  name: "Manish Kumar",
                  email: "manishkp@gmail.com",
                  phone: "000099999",
                },
                {
                  id: 2,
                  name: "John Doe",
                  email: "johndoe@gmail.com",
                  phone: "000099999",
                },
              ],
            },
          },
        };
        let newUsers = [];

        for (let i = 0; i < res.data.model.users.length * 10; i++) {
          newUsers.push({
            ...res.data.model.users[i % res.data.model.users.length],
            ...status[Math.floor(Math.random() * 4)],
            users: Math.floor(Math.random() * 4),
            budget: Math.floor(Math.random() * 1000),
          });
        }
        this.setState({
          users: newUsers,
          sorted: [...newUsers],
          loading: false,
        });
        // console.log(err.response);
      }
    }
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  sortUsers = (param) => {
    let sortUsers = [].concat(this.state.users);
    if (param === "budget") sortUsers.sort((a, b) => b["budget"] - a["budget"]);
    else if (param === "type")
      sortUsers.sort((a, b) => {
        if (a.type > b.type) return -1;
        if (a.type < b.type) return 1;
        return 0;
      });
    this.setState({ sorted: sortUsers });
  };

  render() {
    const {
      visible,
      width,
      selected,
      users,
      sorted,
      isSort,
      sortNo,
    } = this.state;
    const tabs = [
      { name: "Table", icon: "fas fa-table", color: "yellow" },
      { name: "Projects", icon: "fas fa-project-diagram", color: "orange" },
      { name: "Timeline", icon: "fas fa-tasks", color: "black" },
      { name: "Calendar", icon: "fas fa-calendar-week", color: "red" },
      { name: "Integrations", icon: "fas fa-phone", color: "green" },
      { name: "Statics", icon: "fas fa-cogs", color: "purple" },
    ];

    const createTab = () => {
      let list = [];
      tabs.map((tab, i) =>
        list.push(
          <p
            key={i}
            onClick={() => this.setState({ selected: i })}
            className={`${selected === i && "selected"}`}
          >
            <span style={{ color: tab.color }}>
              {<i className={tab.icon}></i>}
            </span>
            <span>{tab.name}</span>
            {selected === i && (
              <span>
                <i className="fas fa-sort"></i>
              </span>
            )}
          </p>
        )
      );
      return list;
    };

    const inpImages = (n) => {
      let list = [];
      for (let i = 1; i <= n; i++) {
        list.push(
          <img
            src={require(`./images/${i}.jpg`)}
            alt={i}
            className="avataar"
            key={i}
          />
        );
      }
      return list;
    };
    const createUsers = () => {
      let list = [];
      for (let i = 0; i < sorted.length; i++) {
        let nam = sorted[i].name.split(" ");
        list.push(
          <div key={i} className="userBox">
            <div className="avt" style={{ background: sorted[i].color }}>
              {nam[0][0]}
              {nam[0][1]}
            </div>
            <span>{sorted[i].name}</span>
            <span style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  background: sorted[i].color,
                  padding: "0",
                  width: "0.35rem",
                  height: "0.35rem",
                  display: "inline-block",
                  borderRadius: "50%",
                  marginRight: "0.2rem",
                }}
              ></div>
              {sorted[i].type}
            </span>
            <span>{inpImages(sorted[i].users)}</span>
            <span>{sorted[i].budget}</span>
            <span>...</span>
          </div>
        );
      }
      return list;
    };

    return (
      <div className="userPage">
        <div className={`slider  ${visible && width <= 992 && "visible"}`}>
          {width > 992 && (
            <i
              className="fas fa-bars"
              style={{
                position: "absolute",
                top: "2.5rem",
                left: "3.25rem",
                fontSize: "1.5rem",
              }}
            ></i>
          )}
          <p style={{ marginTop: width > 992 ? "2.1rem" : "2.5rem" }}>
            <i className="fas fa-home"></i> Dash Home{" "}
            <i className="fas fa-chevron-down"></i>
          </p>

          <div className="tabs">{createTab()}</div>
        </div>

        <button
          onClick={() => this.setState({ visible: !this.state.visible })}
          style={{
            display: width > 992 ? "none" : "visible",
            zIndex: visible ? 100 : 200,
          }}
          className={`${visible && "btnVis"}`}
        >
          <span>&#8594;</span>
        </button>
        <div className="usersTab">
          <div className="navBar">
            <p>
              <i className="fas fa-gift"></i> Epic Admin DashBoard
            </p>
            <p>
              <i className="far fa-bell"></i>
              <span>
                <img src={require("./images/1.jpg")} alt="img" /> <span></span>
              </span>
              <span>
                <img src={require("./images/2.jpg")} alt="img" /> <span></span>
              </span>
              <span>
                <img src={require("./images/3.jpg")} alt="img" /> <span></span>
              </span>
              <span>
                <img src={require("./images/4.jpg")} alt="img" /> <span></span>
              </span>
            </p>
          </div>
          <div className="data">
            <div className="inner">
              <div className="titleBar">
                <span className="avt"></span>
                <span>PROJECT NAME</span>
                <span>
                  STATUS{" "}
                  <button
                    disabled={isSort && sortNo === 2}
                    onClick={() => {
                      if (isSort) {
                        this.setState({
                          isSort: !isSort,
                          sortNo: -1,
                          sorted: users,
                        });
                      } else {
                        this.setState({
                          isSort: !isSort,
                          sortNo: 1,
                        });
                        this.sortUsers("type");
                      }
                    }}
                  >
                    <i className="fas fa-sort"></i>
                  </button>
                </span>
                <span>USERS</span>
                <span>
                  BUDGET{" "}
                  <button
                    disabled={isSort && sortNo === 1}
                    onClick={() => {
                      if (isSort) {
                        this.setState({
                          isSort: !isSort,
                          sortNo: -1,
                          sorted: [...users],
                        });
                      } else {
                        this.setState({
                          isSort: !isSort,
                          sortNo: 2,
                        });
                        this.sortUsers("budget");
                      }
                    }}
                  >
                    <i className="fas fa-sort"></i>
                  </button>
                </span>
                <span className="dot">...</span>
              </div>
              <div className="usersList">{createUsers()}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserPage;
