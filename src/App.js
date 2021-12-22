import "./App.css";
import logo from "./Logo.jpg";
import {useState, useEffect} from 'react';
import axios from 'axios';
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

  const [data, setData] = useState([]);

  const getData = () => {
    axios.get('/data')
    .then(res => {
        
        setData([...data, res.data]);
        
    })
  }

  const [temp, setTemp] = useState(0)

  useEffect(()=>{
    setInterval(()=>{
    setTemp((prevTemp)=>prevTemp+1)
  }, 2000)
}, [])

  useEffect(()=>{
  getData()
}, [temp])


console.log(data);

 return(
    <div className="App" style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
      <img src={logo} alt="BromleySat" />
      <h1 style={{ color: "green"}}>BromleySat's Serial Plotter</h1>
      <LineChart width={1000} height={300} data={data}>
        <CartesianGrid></CartesianGrid>
        <XAxis dataKey="date"></XAxis>
        <YAxis></YAxis>
        <Tooltip></Tooltip>
        <Legend></Legend>
        <Line type="monotone" dataKey="temperatureC" stroke="red"></Line>
        <Line type="monotone" dataKey="temperatureF" stroke="blue"></Line>
      </LineChart>
      <button onClick={getData}>Fetch API</button>
    </div>
  )
}

export default App;
