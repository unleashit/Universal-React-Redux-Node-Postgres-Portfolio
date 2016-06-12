var AppDispatcher = require('../dispatcher/appDispatcher');
var AppConstants = require('../constants/appConstants');

var AppActions = {
    searchMovies: function(movie) {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.SEARCH_MOVIES,
            movie: movie
        });
    },
    receiveMovieResults: function(movies) {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.RECEIVE_MOVIE_RESULTS,
            movies: movies
        });
    }
};

module.exports = AppActions;
