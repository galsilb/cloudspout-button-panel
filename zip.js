const fs = require('fs');
const archiver = require('archiver');
const glob = require("glob")

const cwd = 'dist/'
const folderPath = '**';
const out = 'galsilb-button-panel.zip';

glob(folderPath, {cwd}, (err, files) => {

    if (err) {
        console.error(err);
        return err;
    }

    const output = fs.createWriteStream('./' + out);
    const archive = archiver('zip', {zlib:{level: 9}});
    archive.pipe(output);

    // Linux needs the root folder itself
    archive.file(cwd, {name:'galsilb-button-panel/'})
    files.forEach(file => {
        if (file === out) return;
        console.log(file);
        archive.file(cwd + file, {name:'galsilb-button-panel/'+file});
    });

    archive.finalize();

});
