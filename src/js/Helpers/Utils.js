import {DATASET_PATH} from '../Model/Constants.js'
function mapValue(x, in_min, in_max, out_min = 0, out_max = 1) {
  x = x < in_min? in_min : x;
  x = x > in_max? in_max : x;
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
export {mapValue};

function saveJSON(JSONObject, fileName='session.txt', filePath = pathJoin(['../..', DATASET_PATH]), type='text/plain', notOverride = true){
    const file = new Blob(JSONObject, {type: type});
    saveFile(file, fileName, filePath, type, notOverride)

}
export {saveJSON};

function saveCSV(csvListOfLists, fileName='session.txt', filePath = pathJoin(['../..', DATASET_PATH]), type='text/plain', notOverride = true){
  const csvContent = "data:text/csv;charset=utf-8," 
      + csvListOfLists.map(e => e.join(",")).join("\n");
  const encodedUri = encodeURI(csvContent);
  saveFile(encodedUri, fileName, filePath, type, notOverride)
}
export {saveCSV};
function saveFile(encodedHref, fileName='session.txt', filePath = pathJoin(['../..', DATASET_PATH]), type='text/plain', notOverride = true){
  let element = document.createElement("a");
  element.href = encodedHref;
  if (notOverride){
    const fileNameParts = fileName.split('.');
    if (fileNameParts.length != 2){
      throw "FileName error, unable to save data"
    }
    fileName = fileNameParts[0]+Math.floor(Math.random() * 999999999)+'.'+fileNameParts[1]
    filePath = pathJoin([filePath, fileName]);
  } else{
    filePath = pathJoin([filePath, fileName])
  }
  element.download = filePath;
  element.click();
}
function pathJoin(parts, sep){
  var separator = sep || '/';
  var replace = new RegExp(separator+'{1,}', 'g');
  return parts.join(separator).replace(replace, separator);
}