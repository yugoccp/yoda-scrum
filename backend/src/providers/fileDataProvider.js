/**
 * Super slow temporary solution for data storage :)
 */
const fs = require('fs');
const path = require('path');
const FILE_PATH = '../../data/data.json';
const DATA_PATH = path.resolve(__dirname, FILE_PATH);

/**
 * Create dir and file with default contents
 */
function createDataFile() {
	const dir = __dirname + '/../../data';
	if (!fs.existsSync(dir)){
		fs.mkdirSync(dir);
	}

  const read = fs.createReadStream(__dirname + '/default.json');
  read.on("error", function(err) {
		read.destroy(err);
		console.log('Read error: ' + err);
	});

  const write = fs.createWriteStream(`${__dirname}/${FILE_PATH}`);
  write.on("error", function(err) {
		write.destroy(err);
		console.log('Write error: ' + err);
	});

	read.pipe(write);
}

/**
 * Check if data file exists and set path
 */
fs.access(DATA_PATH, fs.constants.F_OK, (err) => {
	if (err) {
		console.log("No data.json file found, creating a new one...")
		createDataFile();
	};
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