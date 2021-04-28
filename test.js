const s = require('./lib/control-server')
const c = require('./lib/config')

const sr = new s.ControlServer(c.DEFAULT_CONFIG.controlHost, c.DEFAULT_CONFIG.controlPort)

sr.run()
