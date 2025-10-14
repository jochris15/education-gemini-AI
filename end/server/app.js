require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const axios = require('axios')
const cors = require('cors')
const { GoogleGenAI } = require("@google/genai")

app.use(cors())
app.use(express.json())

app.get('/popular-pokemon', async (req, res, next) => {
    try {
        // Implementasi AI disini supaya popular pokemonnya ga hard code
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "Please give me only the name of the most popular blue pokemon today",
        });

        const pokemon = response.text.toLocaleLowerCase()
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

        res.status(200).json(data)
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Internal server error"
        })
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})