var Dispatcher = require('flux').Dispatcher;
var objectAssign = require('object-assign');

var AppDispatcher = objectAssign(new Dispatcher(), {
    handleViewAction: function(action) {
        var payload = {
            source: 'VIEW_ACTION',
            action: action
        };
        this.dispatch(payload);
    }
});

module.exports = AppDispatcher;