import "./App.css";
import logo from "./Logo.jpg";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

function App() {


const voltage = (Math.floor(Math.random() * 100 + 1));
const voltage2 = (Math.floor(Math.random() * 100 + 1));
const voltage3 = (Math.floor(Math.random() * 100 + 1));
const voltage4 = (Math.floor(Math.random() * 100 + 1));
const voltage5 = (Math.floor(Math.random() * 100 + 1));
const voltage6 = (Math.floor(Math.random() * 100 + 1));
const voltage7 = (Math.floor(Math.random() * 100 + 1));
const voltage8 = (Math.floor(Math.random() * 100 + 1));
const voltage9 = (Math.floor(Math.random() * 100 + 1));
const voltage10 = (Math.floor(Math.random() * 100 + 1));
const voltage11 = (Math.floor(Math.random() * 100 + 1));
const voltage12 = (Math.floor(Math.random() * 100 + 1));
console.log(voltage)

const data = [
  {
    baudRate: 1362,
    VoltageA: voltage,
    VoltageB: voltage2,
  },
  {
    baudRate: 1462,
    VoltageA: voltage3,
    VoltageB: voltage4,
  },
  {
    baudRate: 1562,
    VoltageA: voltage5,
    VoltageB: voltage6,
  },
  {
    baudRate: 1662,
    VoltageA: voltage7,
    VoltageB: voltage8,
  },
  {
    baudRate: 1762,
    VoltageA: voltage9,
    VoltageB: voltage10,
  },
  {
    baudRate: 1862,
    VoltageA: voltage11,
    VoltageB: voltage12
  }
]



 return(
    <div className="App" style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
      <img src={logo} alt="BromleySat" />
      <h1 style={{ color: "green"}}>BromleySat's Serial Plotter</h1>
      <LineChart width={1000} height={300} data={data}>
        <CartesianGrid></CartesianGrid>
        <XAxis dataKey="baudRate"></XAxis>
        <YAxis></YAxis>
        <Tooltip></Tooltip>
        <Legend></Legend>
        <Line type="monotone" dataKey="VoltageA" stroke="red"></Line>
        <Line type="monotone" dataKey="VoltageB" stroke="blue"></Line>
      </LineChart>
    </div>
  )
}

export default App;
