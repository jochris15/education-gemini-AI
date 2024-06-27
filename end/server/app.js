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
        const vertexAI = new VertexAI({ project: "bsd-15", location: 'us-central1' });

        const generativeModel = vertexAI.getGenerativeModel({
            model: 'gemini-1.5-flash-001',
        });

        const prompt =
            "Please give me only a name for a popular orange fire pokemon without bolding the text";

        const resp = await generativeModel.generateContent(prompt);
        const contentResponse = await resp.response;

        console.log(JSON.stringify(contentResponse));
        console.log(contentResponse?.candidates[0]?.content?.parts[0]?.text.toString().toLowerCase());

        const pokemonName = contentResponse?.candidates[0]?.content?.parts[0]?.text.toString().toLowerCase() || 'pikachu'

        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)

        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})