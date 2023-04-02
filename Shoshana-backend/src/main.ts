import Express from "express";

const app = Express();
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)

    let a = getData("this is data")

    if(a.ok) {
        console.log(a.result);
    }
})

function getData(id : string) : Optional<string, Error> {

    return resOk("yes");
}
