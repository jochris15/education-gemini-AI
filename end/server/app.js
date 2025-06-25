const express = require('express')
const app = express()
const port = 3000
const axios = require('axios')
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.get('/popular-pokemon', async (req, res, next) => {
    try {
        const { GoogleGenAI } = require("@google/genai")

        const ai = new GoogleGenAI({ apiKey: "AIzaSyBKr0rPCCqYOIzyb7RbnHXYbN30TOa8M1k" });

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: "Please tell me only the name of most popular purple pokemon today",
        });

        const pokemon = response.text.toLowerCase()
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