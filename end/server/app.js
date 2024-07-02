require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const axios = require('axios')
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.get('/popular-pokemon', async (req, res, next) => {
    try {
        const { GoogleGenerativeAI } = require("@google/generative-ai");

        // Access your API key as an environment variable (see "Set up your API key" above)
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = "Please give me only a name for today's popular pokemon without bolding the text"

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(text);

        const pokemon = text.toLowerCase()

        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

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