var Promise = require("bluebird");
var mongoose = require("mongoose");
Promise.promisifyAll(mongoose);
var connectionPromise = null;
var mongoUri = "mongodb://localhost:27017/flourdb";
mongoose.connection.on('open', () => {
});
mongoose.connection.on('error', (err) => {
    connectionPromise = null;
    mongoose.disconnect();
});
mongoose.connection.on('disconnected', (err) => {
    connectionPromise = null;
    setTimeout(() => {
        mongoose.connect(mongoUri, {});
    }, 60 * 1000); // reconnect in 1 minute
});
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
module.exports = {
    /**
     * @returns {Promise} Returns db connection promise which is resolved
     *                    when db connection is in "connected" state
     */
    getConnection: function () {
        if (connectionPromise) {
            return connectionPromise;
        }
        connectionPromise = new Promise((resolve, reject) => {
            var checkPeriod = 10 * 1000; // 10 sec
            var checkInterval = null;
            var checkConnection = function () {
                // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
                if (mongoose.connection.readyState === 1) {
                    resolve(mongoose.connection);
                    return true;
                }
                return false;
            };
            if (!checkConnection()) {
                checkInterval = setInterval(() => {
                    if (checkConnection()) {
                        clearInterval(checkInterval);
                    }
                }, checkPeriod);
            }
        });
        return connectionPromise;
    }
};