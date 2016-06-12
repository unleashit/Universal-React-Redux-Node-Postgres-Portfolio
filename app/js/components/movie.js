var React = require('React');
var AppActions = require('../actions/appActions');
var AppStore = require('../stores/appStore');

var Movie = React.createClass({
    render: function() {

        var link = 'http://www.imdb.com/title/' + this.props.movie.imdbID;

        return (
            <div className="well">
                <div className="row">
                    <div className="col-md-4">
                        <img src={this.props.movie.Poster} alt="" className="thumbnail" />
                    </div>
                    <div className="col-md-8">
                        <h4>{this.props.movie.Title}</h4>
                        <ul className="list-group">
                            <li className="list-group-item">Year Released: {this.props.movie.Year}</li>
                            <li className="list-group-item">IMDB ID: {this.props.movie.imdbID}</li>
                        </ul>
                        <a href={link} className="btn btn-primary">View on IMDB</a>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = Movie;