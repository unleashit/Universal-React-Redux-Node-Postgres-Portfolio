var AppActions = require('../actions/appActions');
var axios = require('axios');

module.exports = {
    searchMovies: function(movie) {
        axios('http://www.omdbapi.com/', {
            params: {
                s: movie.title
            }
        })
        .then(resp => {
            AppActions.receiveMovieResults(resp.data.Search);
        })
        .catch(err => {
            alert(err);
        })
    }
};