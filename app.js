const express = require('express')
const axios = require('axios')
const cors = require("cors");
const path = require("path");
const app = express()
const port = 5000

app.use(cors());

app.get('/:tital', async(req, res) => {
    try { 
        const title = req.params.tital
        const currentPage= 1
        const count = 10
        const requestUrl = title ? `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=5adc0ef7be763da42ce94e17d0a3b3cf&text=${title}&page=${currentPage}&per_page=${count}&format=json&nojsoncallback=1` : `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=5adc0ef7be763da42ce94e17d0a3b3cf&page=${currentPage}&per_page=${count}&format=json&nojsoncallback=1`;

        const imagesData = await axios.get(requestUrl);
        res.status(200).json({
            status:"sucess",
            data:imagesData.data.photos.photo
        })
        
    } catch (error) {
            res.status(400).json({
                status:"fail",
                message:error
            })
    }
});

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => console.log(`Node app listening on port ${port}!`))