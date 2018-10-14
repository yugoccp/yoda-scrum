/**
 * Super slow temporary solution for data storage :)
 */
const fs = require('fs');
const path = require('path');
const DATA_PATH = path.resolve(__dirname, '../../data/data.json');

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