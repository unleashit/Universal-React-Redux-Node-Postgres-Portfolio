var React = require('React');
var AppActions = require('../actions/appActions');
var AppStore = require('../stores/appStore');
var SearchForm = require('./searchForm');
var MovieResults = require('./movieResults')

function getAppState() {
    return {
        movies: AppStore.getMovieResults()
    }
}

var App = React.createClass({
    getInitialState: function() {
      return getAppState();  
    },
    componentDidMount: function() {
        AppStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        AppStore.removeChangeListener(this._onChange);
    },
    
    render: function() {
        var movieResults = (!this.state.movies.length) ? '' : <MovieResults movies={this.state.movies} />;

        return (
            <div>
                <SearchForm />
                {movieResults}
            </div>
        )
    },
    
    _onChange: function() {
        this.setState(getAppState());
    }
});

module.exports = App;