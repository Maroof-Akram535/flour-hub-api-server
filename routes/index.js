var express = require('express');
var router = express.Router();

require('./userRoutes')(router);
require('./productRoutes')(router);
require('./adminRoutes')(router);
require('./orderRoutes')(router);


module.exports = router;