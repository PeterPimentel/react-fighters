const debug = require('debug')

const BASE = 'fighters-api'

const COLOURS = {
    trace: 8,
    info: 6,
    warn: 3,
    error: 1
}

class Log {
    generateMessage(level, message, source) {
        // Set the prefix which will cause debug to enable the message
        const namespace = `${BASE}:${level}`
        const createDebug = debug(namespace)

        // Set the colour of the message based on the level
        createDebug.color = COLOURS[level]

        if (source) { createDebug(source, message) }
        else { createDebug(message) }
    }

    trace(message, source) {
        return this.generateMessage('trace', message, source)
    }

    info(message, source) {
        return this.generateMessage('info', message, source)
    }

    warn(message, source) {
        return this.generateMessage('warn', message, source)
    }

    error(message, source) {
        return this.generateMessage('error', message, source)
    }
}

module.exports = new Log()
