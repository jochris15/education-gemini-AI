const express = require('express')
const app = express()
const port = 3000
const axios = require('axios')
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.get('/popular-pokemon', async (req, res, next) => {
    try {
        // const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/pikachu`)

        // res.status(200).json(data)
    } catch (error) {
        console.log(error);
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})