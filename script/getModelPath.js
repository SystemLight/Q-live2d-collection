const fs = require("fs");
const ph = require("path");


let resultList = fs.readdirSync("../model");

let modelJsonList = [];
let unknownModelJsonList = [];

let patchModelPath = {
    "22": "/model/22/22.xmas.1.model.json",
    "33": "/model/33/model.2018.spring.json",
    "mashiro": "/model/mashiro/ryoufuku.model.json",
    "nep": "/model/nep/model.json",
    "rem": "/model/rem/rem.json",
    "Unitychan": "/model/Unitychan/unitychan.model.json",
    "tia": "/model/tia/model.json"
};

resultList.forEach(moduleFile => {
    let path = ph.join(__dirname, "../model", moduleFile);
    let resultModuleFileList = fs.readdirSync(path);

    if (resultModuleFileList.includes(`${moduleFile}.model.json`)) {
        let modelPath = "/" + ph.relative(__dirname, `../model/${moduleFile}/${moduleFile}.model.json`)
            .replace(/\\/g, "/");
        modelJsonList.push(modelPath);
    } else if (resultModuleFileList.includes(`index.json`)) {
        let modelPath = "/" + ph.relative(__dirname, `../model/${moduleFile}/index.json`)
            .replace(/\\/g, "/");
        modelJsonList.push(modelPath);
    } else {
        if (patchModelPath[moduleFile]) {
            modelJsonList.push(patchModelPath[moduleFile]);
        } else {
            unknownModelJsonList.push(moduleFile);
        }
    }
});


console.log(modelJsonList.length);
console.log(unknownModelJsonList.length);

console.log(modelJsonList);