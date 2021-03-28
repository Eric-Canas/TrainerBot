"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PosePainter = void 0;

var _Constants = require("../Model/Constants.js");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PosePainter =
/*#__PURE__*/
function () {
  function PosePainter(webcamCanvas, movementStateController) {
    _classCallCheck(this, PosePainter);

    this.webcamCanvas = webcamCanvas;
    this.movementStateController = movementStateController;
  }

  _createClass(PosePainter, [{
    key: "drawPose",
    value: function drawPose(pose) {
      var xStd = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var yStd = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var plotBaseAndObjectivePose = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _Constants.PLOT_BASE_POSE;
      var invertYAxis = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _Constants.INVERT_Y_AXIS;
      var pointsRadius = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : _Constants.DRAWN_POINTS_RADIUS;
      var showStdDirection = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : _Constants.SHOW_STD_DIRECTION;
      var pointToLineThreshold = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : _Constants.POINTS_TO_LINE_THRESHOLD;
      //TODO: Improve it
      var width = this.webcamCanvas.canvas.width;
      var height = this.webcamCanvas.canvas.height;
      this.webcamCanvas.clearCanvas(width, height);

      if (showStdDirection) {
        for (var _i = 0, _Object$entries = Object.entries(pose); _i < _Object$entries.length; _i++) {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
              part = _Object$entries$_i[0],
              position = _Object$entries$_i[1];

          var basePositionX = position.x * width;
          var basePositionY = (invertYAxis - position.y) * height;

          if (xStd === null) {
            xStd = this.movementStateController.xStd[this.movementStateController.xStd.length - 1][part];
          }

          if (yStd === null) {
            yStd = this.movementStateController.yStd[this.movementStateController.yStd.length - 1][part];
          }

          if (xStd > pointToLineThreshold || yStd > pointToLineThreshold) {
            var _ref = [xStd / (Math.max(xStd, yStd) + 0.0001) * pointsRadius * 2, yStd / (Math.max(xStd, yStd) + 0.0001) * pointsRadius * 2];
            xStd = _ref[0];
            yStd = _ref[1];
            this.webcamCanvas.drawSegment([basePositionX - xStd, basePositionY - yStd], [basePositionX + xStd, basePositionY + yStd], this.selectColorForPart(part), pointsRadius);
          } else {
            this.webcamCanvas.drawPoint(basePositionX, basePositionY, pointsRadius, this.selectColorForPart(part));
          }
        }
      } else {
        for (var _i2 = 0, _Object$entries2 = Object.entries(pose); _i2 < _Object$entries2.length; _i2++) {
          var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
              _part = _Object$entries2$_i[0],
              _position = _Object$entries2$_i[1];

          this.webcamCanvas.drawPoint(_position.x * width, (invertYAxis - _position.y) * height, pointsRadius, _Constants.TRANSPARENT_RED);
        }
      }

      this.drawSkeleton(pose, invertYAxis);

      if (plotBaseAndObjectivePose && this.movementStateController.basePose !== null) {
        for (var _i3 = 0, _Object$entries3 = Object.entries(this.movementStateController.basePose); _i3 < _Object$entries3.length; _i3++) {
          var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i3], 2),
              _part2 = _Object$entries3$_i[0],
              _position2 = _Object$entries3$_i[1];

          this.webcamCanvas.drawPoint(_position2.x * width, (invertYAxis - _position2.y) * height, pointsRadius, _Constants.TRANSPARENT_RED);
        }

        this.drawSkeleton(this.movementStateController.basePose, invertYAxis, _Constants.TRANSPARENT_WHITE);
      }

      if (plotBaseAndObjectivePose && this.movementStateController.objectivePose !== null) {
        for (var _i4 = 0, _Object$entries4 = Object.entries(this.movementStateController.objectivePose); _i4 < _Object$entries4.length; _i4++) {
          var _Object$entries4$_i = _slicedToArray(_Object$entries4[_i4], 2),
              _part3 = _Object$entries4$_i[0],
              _position3 = _Object$entries4$_i[1];

          this.webcamCanvas.drawPoint(_position3.x * width, (invertYAxis - _position3.y) * height, pointsRadius, _Constants.TRANSPARENT_BLUE);
        }

        this.drawSkeleton(this.movementStateController.objectivePose, invertYAxis, _Constants.TRANSPARENT_WHITE);
      }
    }
  }, {
    key: "drawSkeleton",
    value: function drawSkeleton(pose) {
      var invertYAxis = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Constants.INVERT_Y_AXIS;
      var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "white";
      var width = this.webcamCanvas.canvas.width;
      var height = this.webcamCanvas.canvas.height;
      var detectedParts = Object.keys(pose);

      for (var _i5 = 0, _detectedParts = detectedParts; _i5 < _detectedParts.length; _i5++) {
        var part = _detectedParts[_i5];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = _Constants.SKELETON_CONNECTIONS[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var connection = _step.value;

            if (part === connection[0] && detectedParts.includes(connection[1])) {
              var p1X = pose[part].x * width;
              var p1Y = (invertYAxis - pose[part].y) * height;
              var p2X = pose[connection[1]].x * width;
              var p2Y = (invertYAxis - pose[connection[1]].y) * height;
              this.webcamCanvas.drawSegment([p1X, p1Y], [p2X, p2Y], color, _Constants.DRAWN_POINTS_RADIUS / 2);
            }
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
      }
    }
  }, {
    key: "selectColorForPart",
    value: function selectColorForPart(part) {
      var xStd = this.movementStateController.xStd[this.movementStateController.xStd.length - 1][part];
      var yStd = this.movementStateController.yStd[this.movementStateController.yStd.length - 1][part];
      var i = (xStd + yStd) / 2 * 255 / 0.5;
      var r = Math.round(Math.sin(0.024 * i + 0) * 127 + 128);
      var g = Math.round(Math.sin(0.024 * i + 2) * 127 + 128);
      var b = Math.round(Math.sin(0.024 * i + 4) * 127 + 128);
      return 'rgb(' + r + ',' + g + ',' + b + ')';
      /* //Version for going from green to red
      const i = 128 - (((xStd + yStd)/2) * 128 / (0.5));
      return 'hsl(' + i + ',100%,50%)';
      */
    }
  }]);

  return PosePainter;
}();

exports.PosePainter = PosePainter;