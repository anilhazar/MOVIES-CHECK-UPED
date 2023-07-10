const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const _ = require("lodash");


const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.render("home");
})

app.get("/movies/:movie", function (req, res) {
    let x = req.params.movie
    let url = "http://www.omdbapi.com/?apikey=41497896&t=" + x;
    http.get(url, function (response) {
        response.on("data", function (data) {
            const dataJson = JSON.parse(data);
            const a = _.lowerCase(x);
            const b = _.lowerCase(dataJson.Title);
            
            if (dataJson.Response === "True") {
                res.render("post.ejs", {
                    movieTitle: dataJson.Title,
                    movieYear: dataJson.Year,
                    movieRelease: dataJson.Released,
                    movieGenre: dataJson.Genre,
                    movieDirector: dataJson.Director,
                    movieWriter: dataJson.Writer,
                    movieActors: dataJson.Actors,
                    moviePlot: dataJson.Plot,
                    movieAwards: dataJson.Awards,
                    moviePoster: dataJson.Poster,
                    movieMetascore: dataJson.Metascore,
                    movieimdbRating: dataJson.imdbRating,
                    movieimdbVotes: dataJson.imdbVotes,
                    movieType: dataJson.Type,

                })
            }
            else
                res.render("error");
        })
    })

})

app.post("/", function (req, res) {
    let movieN = req.body.movieName;
    res.redirect("/movies/" + movieN);

})

app.post("/back", function(req,res){
    res.redirect("/");
})


app.listen(3000, function () {
    console.log("Server is on progress on port 3000");
})
