"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapValue = mapValue;
exports.saveJSON = saveJSON;
exports.saveCSV = saveCSV;

var _Constants = require("../Model/Constants.js");

function mapValue(x, in_min, in_max) {
  var out_min = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var out_max = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  x = x < in_min ? in_min : x;
  x = x > in_max ? in_max : x;
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function saveJSON(JSONObject) {
  var fileName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'session.txt';
  var filePath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : pathJoin(['../..', _Constants.DATASET_PATH]);
  var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'text/plain';
  var notOverride = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
  var element = document.createElement("a");
  console.log(filePath);
  var file = new Blob(JSONObject, {
    type: type
  });
  saveFile(file, fileName, filePath, type, notOverride);
}

function saveCSV(csvListOfLists) {
  var fileName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'session.txt';
  var filePath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : pathJoin(['../..', _Constants.DATASET_PATH]);
  var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'text/plain';
  var notOverride = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
  var csvContent = "data:text/csv;charset=utf-8," + csvListOfLists.map(function (e) {
    return e.join(",");
  }).join("\n");
  var encodedUri = encodeURI(csvContent);
  saveFile(encodedUri, fileName, filePath, type, notOverride);
}

function saveFile(encodedHref) {
  var fileName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'session.txt';
  var filePath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : pathJoin(['../..', _Constants.DATASET_PATH]);
  var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'text/plain';
  var notOverride = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
  element.href = encodedHref;

  if (notOverride) {
    var fileNameParts = fileName.split('.');

    if (fileNameParts.length != 2) {
      throw "FileName error, unable to save data";
    }

    fileName = fileNameParts[0] + Math.floor(Math.random() * 999999999) + '.' + fileNameParts[1];
    filePath = pathJoin([filePath, fileName]);
  } else {
    filePath = pathJoin([filePath, fileName]);
  }

  element.download = filePath;
  element.click();
}

function pathJoin(parts, sep) {
  var separator = sep || '/';
  var replace = new RegExp(separator + '{1,}', 'g');
  return parts.join(separator).replace(replace, separator);
}