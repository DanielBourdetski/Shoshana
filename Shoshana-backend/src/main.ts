import Express from "express";
import { loadDB } from "./database";

const app = Express();
const port = 3000

loadDB("mongodb://localhost:27017").catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})