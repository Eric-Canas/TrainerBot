"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataTagging = void 0;

var _Constants = require("../../Model/Constants.js");

var _Utils = require("../../Helpers/Utils.js");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DataTagging =
/*#__PURE__*/
function () {
  function DataTagging(historyToTag, posePainter) {
    var lapseButton = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _Constants.TAG_LAPSE_ID;
    var fps = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 24 * 2;

    _classCallCheck(this, DataTagging);

    this.historyToTag = historyToTag;
    this.posePainter = posePainter;
    this.lapseButton = document.getElementById(lapseButton);
    this.lapseButton.addEventListener('click', this.tagLastSet.bind(this), false);
    this.fps = fps;
    this.requireTag = false;
    this.posesTagged = [];
    this.temporalTags = [];
  } // THIS WHOLE SHIT IS FOR RAPID DEBUGGING. IN RELEASE IT SHOULD BE COMPLETELY CHANGED FOR IMPROVING USER EXPERIENCE.
  // (helping with this tagging could be rewarded with beta functions availability or ads avoidance)


  _createClass(DataTagging, [{
    key: "startTagging",
    value: function startTagging() {
      var _this = this;

      var tagIt, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, poseInfo;

      return regeneratorRuntime.async(function startTagging$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              tagIt = true;

            case 1:
              if (!(this.posesTagged.length == 0 && tagIt)) {
                _context.next = 35;
                break;
              }

              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 5;
              _iterator = this.historyToTag.poses[Symbol.iterator]();

            case 7:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context.next = 17;
                break;
              }

              poseInfo = _step.value;
              _context.next = 11;
              return regeneratorRuntime.awrap(new Promise(function (resolve) {
                return setTimeout(resolve, 1000 / _this.fps);
              }));

            case 11:
              this.posePainter.drawPose(poseInfo.pose, poseInfo.normXStd, poseInfo.normYStd, false);

              if (this.requireTag) {
                this.tagTemporalInfo();
                this.requireTag = false;
              }

              this.temporalTags.push(poseInfo);

            case 14:
              _iteratorNormalCompletion = true;
              _context.next = 7;
              break;

            case 17:
              _context.next = 23;
              break;

            case 19:
              _context.prev = 19;
              _context.t0 = _context["catch"](5);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 23:
              _context.prev = 23;
              _context.prev = 24;

              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }

            case 26:
              _context.prev = 26;

              if (!_didIteratorError) {
                _context.next = 29;
                break;
              }

              throw _iteratorError;

            case 29:
              return _context.finish(26);

            case 30:
              return _context.finish(23);

            case 31:
              console.log(this.posesTagged);

              if (this.posesTagged.length == 0) {
                if (window.confirm('Nothing Tagged. RepeatTagging?')) {
                  this.posesTagged = [];
                  this.temporalTags = [];
                } else {
                  tagIt = false;
                }
              } else {
                if (window.confirm('Is it correctly tagged?')) {
                  (0, _Utils.saveCSV)(this.posesTagged);
                } else {
                  if (window.confirm('Repeat Tagging?')) {
                    this.posesTagged = [];
                    this.temporalTags = [];
                  } else {
                    tagIt = false;
                  }
                }
              }

              _context.next = 1;
              break;

            case 35:
            case "end":
              return _context.stop();
          }
        }
      }, null, this, [[5, 19, 23, 31], [24,, 26, 30]]);
    }
  }, {
    key: "tagTemporalInfo",
    value: function tagTemporalInfo() {
      var tag = prompt("To which exercise these poses correspond? (Don't tag for discarding)", "");
      console.log(tag);

      if (tag !== "") {
        var posesAsCSV = this.posesToCSV(this.temporalTags, tag); //concat doesn't work? 

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = posesAsCSV[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var pose = _step2.value;
            this.posesTagged.push(pose);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }

      this.temporalTags = [];
    }
  }, {
    key: "posesToCSV",
    value: function posesToCSV(solvedPosesList, tag) {
      var missingValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '?';
      var decimal_precision = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 5;
      decimal_precision = Math.pow(10, decimal_precision);
      var result = [];
      throw "Pasalo todo a XY!";
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = solvedPosesList[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var poseInfo = _step3.value;
          var currentPoseCSV = [];

          for (var _i = 0, _Object$entries = Object.entries(poseInfo); _i < _Object$entries.length; _i++) {
            var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
                key = _Object$entries$_i[0],
                positions = _Object$entries$_i[1];

            var availablePartsOfBody = Object.keys(positions);
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
              for (var _iterator4 = _Constants.POSENET_CLEANED_PART_NAMES[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var partOfBody = _step4.value;

                if (availablePartsOfBody.includes(partOfBody)) {
                  var dims = _typeof(positions[partOfBody]) === "object" ? ['x', 'y'] : ['', null];

                  for (var _i2 = 0, _dims = dims; _i2 < _dims.length; _i2++) {
                    var dim = _dims[_i2];

                    if (dim === null) {
                      continue;
                    }

                    var final_pos = dim === '' ? positions[partOfBody] : positions[partOfBody][dim];
                    var valueAsStr = (Math.round(final_pos * decimal_precision) / decimal_precision).toString();
                    currentPoseCSV.push(valueAsStr);
                  }
                } else {
                  currentPoseCSV.push(missingValue);
                }
              }
            } catch (err) {
              _didIteratorError4 = true;
              _iteratorError4 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
                  _iterator4["return"]();
                }
              } finally {
                if (_didIteratorError4) {
                  throw _iteratorError4;
                }
              }
            }
          }

          currentPoseCSV.push(tag);
          result.push(currentPoseCSV);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      return result;
    }
  }, {
    key: "tagLastSet",
    value: function tagLastSet() {
      this.requireTag = true;
    }
  }]);

  return DataTagging;
}();

exports.DataTagging = DataTagging;