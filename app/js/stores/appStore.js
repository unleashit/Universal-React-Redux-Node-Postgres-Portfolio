var AppDispatcher = require('../dispatcher/appDispatcher');
var AppConstants = require('../constants/appConstants');
var EventEmitter = require('events').EventEmitter;
var objectAssign = require('object-assign');
var AppAPI = require('../utils/appApi');

var CHANGE_EVENT = 'change';

var _movies = [];
var _selected = '';

var AppStore = objectAssign({}, EventEmitter.prototype, {
    setMovieResults: function(movies) {
        _movies = movies;
    },
    getMovieResults: function() {
       return _movies;
    },
    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function (callback) {
        this.on('change', callback);
    },
    removeChangeListener: function (callback) {
        this.removeListener('change', callback);
    }
});

AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
        case AppConstants.SEARCH_MOVIES:
            AppAPI.searchMovies(action.movie);
            AppStore.emit(CHANGE_EVENT);
            break;
        case AppConstants.RECEIVE_MOVIE_RESULTS:
            console.log(action.movies);
            AppStore.setMovieResults(action.movies);
            AppStore.emit(CHANGE_EVENT);
            break;
    }

    return true;
});

module.exports = AppStore;