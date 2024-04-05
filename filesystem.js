const fs = require("fs-extra");
const express = require('express');
const cors = require("cors");
const app = express();
const port = 4000;

console.log("-->Starting");

async function start() {

    let packageText = await fs.readFile("./package.json", { encoding: "utf-8" });
    let packageJson = JSON.parse(packageText);
    let filesystem = packageJson.filesystem;

    let paths = await fs.readdir(__dirname + filesystem, { recursive: true });
    let files = [];
    for (let path of paths) {
        let propierties = await fs.stat(__dirname + filesystem + path);
        if (propierties.isFile()) {

            let newPath = path;
            newPath = String(newPath).replace(/\\/g, '/');
            newPath = String(newPath).replace("#", 's');
            let splittedPath = newPath.split("/");
            
            newPath = String(splittedPath[0] + "/" + String(splittedPath[1]).replace(/[^A-Ga-g0-9mp3wav.]/, ''));

            while (String(newPath).includes(" ")) {
                newPath = String(newPath).replace(" ", '');
            }

            fs.rename(__dirname + filesystem + path, __dirname + filesystem + newPath);
            files.push(filesystem + newPath);
        }
    }
    await fs.writeFile(__dirname + "/filesystem.json", JSON.stringify(files), { encoding: "utf-8" });
    console.log("-->File writed");

    app.use(cors());

    app.use(express.static(__dirname));

    app.listen(port, () => {
        console.log(`-->Filesystem server is running on http://localhost:${port}`);
    });

}
start();