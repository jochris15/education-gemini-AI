const express = require('express')
const app = express()
const port = 3000
const axios = require('axios')
const cors = require('cors')
const { VertexAI } = require('@google-cloud/vertexai');

app.use(cors())
app.use(express.json())

app.get('/popular-pokemon', async (req, res, next) => {
    try {
        const vertexAI = new VertexAI({ project: "bsd-15", location: 'asia-southeast1' });

        const generativeModel = vertexAI.getGenerativeModel({
            model: 'gemini-1.5-flash-001',
        });

        const prompt =
            "Please give me a name of the most popular pokemon";

        // const resp = await generativeModel.generateContent(prompt);
        // const contentResponse = await resp.response;
        // console.log(JSON.stringify(contentResponse));

        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/pikachu`)

        res.status(200).json(data)
    } catch (error) {
        console.log(error);
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})