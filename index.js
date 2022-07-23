const express = require("express")
const fs = require("fs/promises")
const _ = require("lodash")
const cors = require("cors")
const { v4: uuid } = require("uuid")

const app = express();
app.use(express.json());



app.listen(5000, () => {
    console.log("connected/listening")
})

app.post("/comment", async(req, res) => {
    try {
        const id = uuid();
        const content = req.body.content;
        if (!content) {
            return res.sendStatus(400)
        }
        await fs.mkdir("data/comment", { recursive: true })
        await fs.writeFile(`data/comment/${id}.txt`, content);
        res.status(201).json(id)

    } catch (err) {
        res.sendStatus(err)
    }
    app.get("/comment/:id", async(req, res) => {
        const id = req.params.id;
        let contents;
        try {
            contents = await fs.readFile(`data/comment/${id}.txt`, "utf-8")
            res.json(contents)
        } catch (err) {
            res.sendStatus(404)
        }



    })


})
app.get("/outfits", (req, res) => {
    const top = ["Grenn", "Red", "Oragne", "Blue"];
    const shirt = ["Hlaf", "full", "semis"];
    const shoes = ["Dc", "Vans", "Nike"];

    res.json({
        top: _.sample(top),
        shirt: _.sample(shirt),
        shoes: _.sample(shoes),
    })
})