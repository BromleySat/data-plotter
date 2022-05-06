import "./App.css";
import React, { Component } from "react";
import logo from "./Logo.jpg";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

class App extends Component {
  state = { data: [] };

  componentDidMount() {
    const dataInterval = setInterval(this.getData, 1000);
  }

  componentDidUpdate() {
    console.log(this.state.data);
  }

  // FIX THE DATA - MAKE IT DYNAMIC
  getData = async () => {
    await axios.get("/random-data").then((res) => {
      this.setState({
        data: [
          ...this.state.data,
          res.data,
          // { currentDateTime: Date().toLocaleString() },
        ],
      });
    });
  };



  

  renderLine = () => {
    

    const colors = ["red", "blue", "green", "yellow", "orange"];
    const columns = [];
    var temp = 1;

     Object.entries(this.state.data[0]).forEach(([key, value]) => {
      if(key === 'deviceId'){
        return;
      }
      columns.push(key);

      
      
    })
    

    return columns.map((column) => {
      return(
        <Line type="monotone" dataKey={column} stroke="red" />
      ) 
    });

    // Object.entries(this.state.data).forEach(([key, value]) => {
    //   Object.entries(value).forEach(([key, value]) => {
    //     if (key === "deviceId" || key === "currentDateTime") {
    //       return;
    //     }
    //     console.log(temp);
    //     temp++;
    //     return <Line type="monotone" dataKey={key} stroke="red" />;
    //   });
    //   //
    // });
  };

  // { currentDateTime: Date().toLocaleString() }

  render() {
    if(!this.state.data || this.state.data.length === 0){
      return (<div>Loading..</div>
      )
    }
    return (
      
      <div
        className="App"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img src={logo} alt="BromleySat" />
        <h1 style={{ color: "green" }}>BromleySat's Serial Plotter</h1>
        <LineChart width={1000} height={300} data={this.state.data}>
          <CartesianGrid></CartesianGrid>
          {/* <XAxis dataKey="currentDateTime"></XAxis> */}
          <YAxis></YAxis>
          <Tooltip></Tooltip>
          <Legend></Legend>
          {this.renderLine()}
        </LineChart>
      </div>
    );
  }
}

// useEffect(() => {
//   getData();
// }, []);

export default App;
