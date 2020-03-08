const fs = require('fs');
const archiver = require('archiver');
const bundled = require('npm-bundled');
var pjson = require('./package.json');

const ZIP_FILE_NAME = `${pjson.name}.zip`;
const NODE_MODULES_DIR = 'node_modules/';

async function createZip() {

    const modules = await getBundleModuleList();

    var output = fs.createWriteStream(__dirname + '/' + ZIP_FILE_NAME);
    const archive = archiver("zip", {})
    archive.pipe(output);

    archive.directory('dist/', false);
    archive.directory('src/assets/', 'assets');

    modules.forEach(dir => {
        archive.directory(NODE_MODULES_DIR + dir, NODE_MODULES_DIR + dir);
    });

    archive.file('package.json');

    archive.finalize();
}

async function getBundleModuleList() {
    return await bundled({ path: __dirname });
}

createZip();