var path = require('path'),
	rootPath = path.normalize(__dirname + '/../../')

module.exports = {
	rootPath: rootPath,
	db: 'mongodb://localhost/pinsydb',
	port: process.env.PORT || 3030
}