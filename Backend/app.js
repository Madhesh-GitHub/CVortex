import express from "express";
import config from "./Configure/config.js";

const app = express();

app.listen(config.port, () => {
    console.log(`Server is connected with port ${config.port}`)
})