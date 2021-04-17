"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MovementStateController = void 0;

var _Constants = require("../Model/Constants.js");

var _DecisionAidSystem = require("../Helpers/DecisionAidSystem.js");

var _Utils = require("../Helpers/Utils.js");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MovementStateController =
/*#__PURE__*/
function () {
  function MovementStateController(sessionHistory) {
    var _this = this;

    var onStateUpdatedCallbacks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var checkStdInterval = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _Constants.MILISECONDS_BETWEEN_CONSISTENCY_UPDATES;

    _classCallCheck(this, MovementStateController);

    this.basePose = null;
    this.objectivePose = null;
    this.maxQueueLength = _Constants.MAX_FREQUENCY_IN_FRAMES;
    this.distancesQueue = [];
    this.posesQueue = [];
    this.onStateUpdatedCallbacks = onStateUpdatedCallbacks;
    this.sessionHistory = sessionHistory;
    this.xStd = [];
    this.yStd = [];
    this.normXStd = [];
    this.normYStd = [];
    this.basePoseDecisionSystem = new _DecisionAidSystem.DecisionAidSystem(_Constants.BASE_POSE_CRITERIA);
    this.objectivePoseDecisionSystem = new _DecisionAidSystem.DecisionAidSystem(_Constants.OBJECTIVE_POSE_CRITERIA);
    this.stdprocessID = setInterval(function () {
      return _this.updateStateParameters.call(_this);
    }, checkStdInterval);
  }
  /*Pushes a pose in the buffer and calls all the callbacks*/


  _createClass(MovementStateController, [{
    key: "updateState",
    value: function updateState(pose) {
      this.posesQueue.push(pose);

      if (this.basePose == null) {
        this.basePose = this.posesQueue[this.posesQueue.length - 1];
        this.updateStateParameters();
      }

      this.distancesQueue.push(this.distanceToObjectivePose(pose)); // Maintain it as a finite size queue

      if (this.posesQueue.length > this.maxQueueLength) {
        this.posesQueue.shift();
        this.distancesQueue.shift();
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.onStateUpdatedCallbacks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var callback = _step.value;
          callback(this.distancesQueue);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (pose !== null && this.basePose !== null && this.objectivePose !== null && this.xStd !== this.xStd[this.xStd.length - 1] && this.yStd[this.xStd.length - 1] !== null && this.normXStd[this.normXStd.length - 1] && this.normYStd[this.normYStd.length - 1]) {
        var historyEntry = {
          pose: pose,
          basePose: this.basePose,
          objectivePose: this.objectivePose,
          xStd: this.xStd[this.xStd.length - 1],
          yStd: this.yStd[this.xStd.length - 1],
          normXStd: this.normXStd[this.normXStd.length - 1],
          normYStd: this.normYStd[this.normYStd.length - 1]
        };
        this.sessionHistory.push(historyEntry);
      }
    }
    /*Calculates the distance between the pose Map and a base pose.*/

  }, {
    key: "distanceToObjectivePose",
    value: function distanceToObjectivePose(pose) {
      var _this2 = this;

      var useOnlyPredominantAxis = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Constants.MEASURE_ONLY_ON_PREDOMINANT_AXIS;
      //pose = this.objectivePose;
      var commonVisibleParts = Object.keys(pose).filter(function (key) {
        return Object.keys(_this2.basePose).includes(key) && Object.keys(_this2.objectivePose).includes(key);
      }); //we do not want to calculate a distance since we must avoid to loss the sign.

      var xStd = this.xStd[this.xStd.length - 1];
      var yStd = this.yStd[this.yStd.length - 1];
      var difference = 0;
      var totalStd = 0;

      if (useOnlyPredominantAxis) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = commonVisibleParts[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var part = _step2.value;

            var _ref = xStd[part] > yStd[part] ? ['x', xStd[part]] : ['y', yStd[part]],
                _ref2 = _slicedToArray(_ref, 2),
                predominantAxis = _ref2[0],
                std = _ref2[1];

            var min = Math.min(this.basePose[part][predominantAxis], this.objectivePose[part][predominantAxis]);
            var max = Math.max(this.basePose[part][predominantAxis], this.objectivePose[part][predominantAxis]);
            var partPos = pose[part][predominantAxis];
            difference += (0, _Utils.mapValue)(partPos, min, max, 0, std);
            totalStd += std;
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
      } else {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = commonVisibleParts[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var _part = _step3.value;
            var minX = Math.min(this.basePose[_part].x, this.objectivePose[_part].x);
            var maxX = Math.max(this.basePose[_part].x, this.objectivePose[_part].x);
            var minY = Math.min(this.basePose[_part].y, this.objectivePose[_part].y);
            var maxY = Math.max(this.basePose[_part].y, this.objectivePose[_part].y);
            difference += (0, _Utils.mapValue)(pose[_part].x, minX, maxX, 0, xStd[_part]) + (0, _Utils.mapValue)(pose[_part].y, minY, maxY, 0, yStd[_part]);
            totalStd += xStd[_part] + yStd[_part];
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
      }

      return difference / totalStd;
    }
  }, {
    key: "updateStateParameters",
    value: function updateStateParameters() {
      return regeneratorRuntime.async(function updateStateParameters$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (this.basePose !== null) {
                this.updateStd();
                if (this.xStd.length > 0) this.optimizeBaseAndObjectivePose();
              }

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "optimizeBaseAndObjectivePose",
    value: function optimizeBaseAndObjectivePose() {
      //TODO: The best pose is those where the part of the body with more standard deviation is at the lower point. 
      //And preferrably if we are updating during the same exercise, the one closer to the original. It also should have the more body parts visible.
      var basePose = this.basePoseDecisionSystem.decide(this.posesQueue, [this.normXStd[this.normXStd.length - 1], this.normYStd[this.normYStd.length - 1]]);

      if (basePose !== null) {
        this.basePose = basePose;
      }

      var objectivePose = this.objectivePoseDecisionSystem.decide(this.posesQueue, [this.normXStd[this.normXStd.length - 1], this.normYStd[this.normYStd.length - 1]]);

      if (objectivePose !== null) {
        this.objectivePose = objectivePose;
      }
    }
  }, {
    key: "updateStd",
    value: function updateStd() {
      var startAtPercentile = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _Constants.COUNT_STD_FROM_PERCENTILE;
      var xStd = {};
      var yStd = {};
      var normXStd = [];
      var normYStd = [];
      var poseQueueToUse = this.posesQueue.slice(~~(this.posesQueue.length * startAtPercentile));
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = _Constants.POSENET_CLEANED_PART_NAMES[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var part = _step4.value;
          xStd[part] = [];
          yStd[part] = [];
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

      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = poseQueueToUse[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var pose = _step5.value;

          for (var _i3 = 0, _Object$entries = Object.entries(pose); _i3 < _Object$entries.length; _i3++) {
            var _Object$entries$_i = _slicedToArray(_Object$entries[_i3], 2),
                _part2 = _Object$entries$_i[0],
                position = _Object$entries$_i[1];

            xStd[_part2].push(position.x);

            yStd[_part2].push(position.y);
          }
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
            _iterator5["return"]();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      for (var _i2 = 0, _Object$keys = Object.keys(xStd); _i2 < _Object$keys.length; _i2++) {
        var _part3 = _Object$keys[_i2];
        xStd[_part3] = xStd[_part3].length > 0 ? math.std(xStd[_part3]) : 0;
        yStd[_part3] = yStd[_part3].length > 0 ? math.std(yStd[_part3]) : 0;
        var stdSum = math.sum(xStd[_part3], yStd[_part3]);
        normXStd[_part3] = stdSum > 0 ? xStd[_part3] / stdSum : 0.5;
        normYStd[_part3] = stdSum > 0 ? yStd[_part3] / stdSum : 0.5;
      }

      this.xStd.push(xStd);
      this.yStd.push(yStd);
      this.normXStd.push(normXStd);
      this.normYStd.push(normYStd);

      if (this.xStd.length > _Constants.META_INFORMATION_WINDOW) {
        this.xStd.shift();
        this.yStd.shift();
        this.normXStd.shift();
        this.normYStd.shift();
      }
    }
  }]);

  return MovementStateController;
}();

exports.MovementStateController = MovementStateController;