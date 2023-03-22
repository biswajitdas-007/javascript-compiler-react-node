const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const PORT = 4001;

app.use(cors());
app.use(express.json());

app.post("/compile", async (req, res) => {
  try {
    const { code } = req.body;
    const filterString = code.replace(/^[//].*/gm, "");
    console.log("Code: ", filterString.replace(/\n/g, ""));
    const response = await axios({
      url: "https://api.jdoodle.com/v1/execute",
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      data: {
        script: filterString,
        language: "nodejs",
        versionIndex: "1",
        clientId: "c0beaf6d736fec7e9bd4fdc818dca05a",
        clientSecret:
          "7c57888790a9c4ad3eac3d8920f870298c5fe3042f1c6f65618dc0b6b784e2e3",
      },
    });
    console.log(response);
    res.send(response.data);
  } catch (err) {
    console.log("Error: ", err.cause);
  }
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
