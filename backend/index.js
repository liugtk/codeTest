const app = require('./app');
const logger = require('./utils/logger');
const config = require('./config');
app.listen(config.hostPort, () => {
    logger.info('Running on port ' + config.hostPort);
});
