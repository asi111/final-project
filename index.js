console.log("app is loading");
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
import {
  getTemplateData,
  findTemplateDocAndUpdate,
  addDocToDB,
  getMainTemplateData,
} from "./utils.js";

const app = express();

app.use(express.json());



app.get("/EditorPage/:email", (req, res) => {
  getTemplateData(req, res);
});

app.get("/EditorPage/api/:id", (req, res) => {
  getMainTemplateData(req, res);
});

app.get("/api", (req, res) => {
  addDocToDB(req, res);
});

app.post("/EditorPage", (req, res) => {
  findTemplateDocAndUpdate(req, res);
});

app.use(express.static(path.join(__dirname, "client", "build")));
app.get("*", (req, resp) => {
  resp.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
