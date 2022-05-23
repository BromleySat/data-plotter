import React, { useState, useCallback } from "react";
import Chart from "../chart/chart";
import { RefreshRate } from "../refreshRate/refreshRate";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { BromleySatSwitch } from "../../components/switch";
import { useTheme } from "@material-ui/core/styles";
import { Container, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

export const DataPlotter = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const theme = useTheme();
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("localStorageData") || "[]")
  );
  const [term, setTerm] = useState(
    localStorage.getItem("api-address") || "http://localhost:5229/random-data"
  );
  const [textboxValue, setTextboxValue] = useState("");
  const [toggle, setToggle] = useState(
    JSON.parse(localStorage.getItem("checked") || false)
  );

  const getData = useCallback(async () => {
    await axios.get(term).then((res) => {
      var today = new Date();
      var time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      res.data.time = time;
      setData((data) => [...data, res.data]);
      console.log(data);
      if (toggle) {
        localStorage.setItem("localStorageData", JSON.stringify(data));
      } else {
        localStorage.removeItem("localStorageData");
      }
    });
  }, [data, term, toggle]);

  const onFormSubmit = (formData) => {
    if (term === "") {
      return;
    }
    setTerm(textboxValue);
    setData([]);
    localStorage.setItem("api-address", textboxValue);
  };

  const onCheckboxChange = (e) => {
    localStorage.setItem("checked", e.target.checked);
    setToggle(e.target.checked);
    if (e.target.checked) {
      localStorage.setItem("localStorageData", JSON.stringify(data));
    } else {
      // Hidden Bug, removes data
      localStorage.removeItem("localStorageData");
      console.log("anything");
    }
  };
  return (
    <Container>
      <div>
        <form
          autoComplete="off"
          onSubmit={handleSubmit(onFormSubmit)}
          style={{
            marginTop: "150px",
            textAlign: "center",
          }}
        >
          <TextField
            id="standard-basic"
            variant="standard"
            onChange={(e) => setTextboxValue(e.target.value)}
            defaultValue={term}
            sx={{
              input: {
                color: theme.palette.text.primary,
                minWidth: "350px",
                fontFamily: "Quicksand",
                fontWeight: "700",
              },
            }}
            {...register("url", {
              required: true,
              pattern:
                /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm,
            })}
          />
          <Button
            type="submit"
            variant="contained"
            size="small"
            style={{
              marginLeft: "20px",
              backgroundColor: "#00C119",
              fontFamily: "Quicksand",
              fontWeight: "700",
            }}
          >
            Update
          </Button>
          {errors.url && (
            <p
              style={{
                color: "red",
                fontFamily: "Quicksand",
                fontWeight: "700",
              }}
            >
              Please provide a valid Url.
            </p>
          )}
        </form>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "20px",
          marginBottom: "20px",
          paddingRight: "73px",
        }}
      >
        <div style={{ paddingLeft: "240px" }}></div>
        <Typography
          variant="h4"
          style={{
            color: "#00C119",
            fontFamily: "Quicksand",
            fontWeight: "700",
          }}
        >
          Data Plotter
        </Typography>

        <RefreshRate term={term} getData={getData} />
      </div>

      <Chart data={data} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          marginTop: "20px",
        }}
      >
        <div style={{ minHeight: "100px" }}>
          <Typography
            sx={{
              color: theme.palette.text.primary,
              fontFamily: "Quicksand",
              fontWeight: "700",
            }}
          >
            Local Storage Toggle
          </Typography>
          <BromleySatSwitch checked={toggle} onChange={onCheckboxChange} />
        </div>
      </div>
    </Container>
  );
};
