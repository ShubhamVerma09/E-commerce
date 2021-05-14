const Log = require("tracer");

const { logLevel = "log" } = process.env;

const logger = Log.colorConsole({
    level: logLevel

});

module.exports = logger;
