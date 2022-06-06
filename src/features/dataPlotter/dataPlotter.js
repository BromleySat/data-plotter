import React, { useState } from "react";
import ChartControl from "../chartControl/chartControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useTheme } from "@material-ui/core/styles";
import { Container } from "@mui/material";
import { validateInput } from "./validation";
import { getApiList } from "./validation";
import { trimHttp } from "../helpers/trimHttp";

export const storageSetItem = (key, value) => {
  localStorage.setItem(key, value);
};

export const DataPlotter = ({}) => {
  const theme = useTheme();
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("localStorageData") || "[]")
  );
  const [textBoxValue, setTextBoxValue] = useState("");
  const [urlList, setUrlList] = useState(
    JSON.parse(localStorage.getItem("urlList"))
  );
  const [toggle, setToggle] = useState(
    JSON.parse(localStorage.getItem("checked") || false)
  );
  const [error, setError] = useState(false);
  const [validUrl, setValidUrl] = useState();
  const [time, setTime] = useState([]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    console.log(time[0].getTime());
    setError(false);
    const validate = validateInput(textBoxValue);
    if (validate) {
      setError(false);

      storageSetItem("urlList", JSON.stringify(getApiList(textBoxValue)));
    } else {
      setError(true);
    }

    //setData([]);
  };

  return (
    <Container>
      <div>
        <form
          autoComplete="off"
          onSubmit={onFormSubmit}
          style={{
            marginTop: "150px",
            textAlign: "center",
          }}
        >
          <TextField
            id="standard-basic"
            variant="standard"
            defaultValue={trimHttp(urlList)}
            multiline={true}
            data-testid={"kierzk"}
            sx={{
              input: {
                color: theme.palette.text.primary,
                minWidth: "350px",
                fontFamily: "Quicksand",
                fontWeight: "700",
              },
            }}
            onChange={(e) => setTextBoxValue(e.target.value)}
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
          {error ? (
            <p
              style={{
                color: "red",
                fontFamily: "Quicksand",
                fontWeight: "700",
              }}
            >
              Please provide valid URL list
            </p>
          ) : null}
        </form>
      </div>
      <ChartControl
        validUrl={validUrl}
        setValidUrl={setValidUrl}
        data={data}
        setData={setData}
        toggle={toggle}
        setToggle={setToggle}
        urlList={urlList}
        setUrlList={setUrlList}
        setTime={setTime}
      />
    </Container>
  );
};
