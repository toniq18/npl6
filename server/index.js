var path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const mockAPIResponse = require('./mockAPI.js')
const cors = require('cors');
const app = express()
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(express.static('dist'))
// import fetch from 'node-fetch';
console.log(__dirname)


const dotenv = require('dotenv');
const { request } = require('http');
const { response } = require('express');
const { text } = require('body-parser');
dotenv.config();






app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

//decalring the url and key to use
const url ='https://api.meaningcloud.com/sentiment-2.1?key='
const key = process.env.API_KEY

//recieving the users data from client side
app.post('/api', async  (request, response)=> {
        //putting the data into a variable called formText
        const formText = await request.body.text;
         //taking the url, api key and the text and concatenating it into a vairable 
        const result = await fetch(`${url}${key}&txt=${formText}`)
         //sending the formText (users url) to the api
        response.send(result)
        try {
            //awaiting the result from the api and putting the result into a variable 
            const response = await result.json();
            console.log(response)
            //returning the result
            return(response)
        } catch (error) {
            console.log("error", error);
        }
})
