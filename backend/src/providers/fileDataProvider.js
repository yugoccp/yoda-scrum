/**
 * Super slow temporary solution for data storage :)
 */
const fs = require('fs');
const path = require('path');
const FILE_PATH = '../../data/data.json';
let DATA_PATH;

fs.access(FILE_PATH, fs.constants.F_OK, (err) => {
	DATA_PATH = err ? path.resolve(__dirname, './default.json') : path.resolve(__dirname, FILE_PATH);
});

/**
 * Read file and retrieve DSM data.
 */
module.exports.findAllDsm = function() {
	const content = fs.readFileSync(DATA_PATH, 'utf8');
	const data = JSON.parse(content);
	return data.dsm;
}

/**
 * Read file, concat new DSM and overwrite previous files.
 */
module.exports.saveDsm = function(dsm) {
	const content = fs.readFileSync(DATA_PATH, 'utf8');
	const data = JSON.parse(content);
	data.dsm = data.dsm ? data.dsm : [];
	data.dsm.push(dsm);
	fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), (err) => {
		if (err) throw err;
		console.log('The file has been saved!');
	});
}