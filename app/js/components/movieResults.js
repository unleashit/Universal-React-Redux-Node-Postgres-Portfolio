var React = require('React');
var AppActions = require('../actions/appActions');
var AppStore = require('../stores/appStore');
var Movie = require('./movie');

var MovieResults = React.createClass({
    render: function() {
        return (
            <div className="movie">
                <h3 className="text-center">Results</h3>
                {
                    this.props.movies.map((movie, i) => {
                        return (
                            <Movie movie={movie} key={i} />
                        )
                    })
                }
            </div>
        )
    }
});

module.exports = MovieResults;