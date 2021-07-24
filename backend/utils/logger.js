var winston = require('winston');

var logger = winston.createLogger({
    transports: [
        new winston.transports.File({
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.align(),
                winston.format.printf((info) => {
                    const {
                        timestamp, level, message, ...args
                    } = info;
                    const ts = timestamp.slice(0, 19).replace('T', ' ');
                    return `${ts} [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
                })
            ),
            level: 'debug',
            filename: 'all-logs.log',
            json: true,
            handleExceptions: true,
            maxFiles: 1
        }),
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.timestamp(),
                winston.format.align(),
                winston.format.printf((info) => {
                    const {
                        timestamp, level, message, ...args
                    } = info;

                    const ts = timestamp.slice(0, 19).replace('T', ' ');
                    return `${ts} [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
                })
            ),
            level: 'info',
            handleExceptions: true, // to handle Uncaught Exceptions with winston
            json: false
        })
    ],
    exitOnError: false
});

module.exports = logger;
