var db = require('./index');


/**
 * Decorates db service so every service method
 * is called after db.getConnection() call;
 * So we ensure that service method is called after
 * db connection has been established.
 * 
 * @param {object} dbService
 */
function requireDbConnection(dbService) {
    Object.keys(dbService).forEach(function (key) {
        if (typeof dbService[key] === "function") {
            var initialFn = dbService[key];
            dbService[key] = (function () {
                var initialArgs = arguments;
                return db.getConnection().then(
                    () => initialFn.apply(dbService, [].slice.call(initialArgs)));
            }).bind(dbService);
        }
    });
    return dbService;
}


module.exports = requireDbConnection;