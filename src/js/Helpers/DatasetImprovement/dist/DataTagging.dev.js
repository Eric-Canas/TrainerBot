"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataTagging = void 0;

var _Constants = require("../../Model/Constants.js");

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

      var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, poseInfo;

      return regeneratorRuntime.async(function startTagging$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 3;
              _iterator = this.historyToTag.poses[Symbol.iterator]();

            case 5:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context.next = 15;
                break;
              }

              poseInfo = _step.value;
              _context.next = 9;
              return regeneratorRuntime.awrap(new Promise(function (resolve) {
                return setTimeout(resolve, 1000 / _this.fps);
              }));

            case 9:
              this.posePainter.drawPose(poseInfo.pose, poseInfo.normXStd, poseInfo.normYStd, false);

              if (this.requireTag) {
                this.tagTemporalInfo();
                this.requireTag = false;
              }

              this.temporalTags.push(poseInfo);

            case 12:
              _iteratorNormalCompletion = true;
              _context.next = 5;
              break;

            case 15:
              _context.next = 21;
              break;

            case 17:
              _context.prev = 17;
              _context.t0 = _context["catch"](3);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 21:
              _context.prev = 21;
              _context.prev = 22;

              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }

            case 24:
              _context.prev = 24;

              if (!_didIteratorError) {
                _context.next = 27;
                break;
              }

              throw _iteratorError;

            case 27:
              return _context.finish(24);

            case 28:
              return _context.finish(21);

            case 29:
              console.log(this.posesTagged);

            case 30:
            case "end":
              return _context.stop();
          }
        }
      }, null, this, [[3, 17, 21, 29], [22,, 24, 28]]);
    }
  }, {
    key: "tagTemporalInfo",
    value: function tagTemporalInfo() {
      var tag = prompt("To which exercise these poses correspond?", 'None');
      this.posesTagged.push({
        tag: tag,
        poses: this.temporalTags
      });
      this.temporalTags = [];
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