"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = unpackFeature;

var _statuses = _interopRequireDefault(require("../lib/statuses"));

var _supported = _interopRequireDefault(require("../lib/supported"));

var _browsers = require("./browsers");

var _browserVersions = require("./browserVersions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function unpackSupport(cipher) {
  // bit flags
  var stats = Object.keys(_supported.default).reduce(function (list, support) {
    if (cipher & _supported.default[support]) list.push(support);
    return list;
  }, []); // notes

  var notes = cipher >> 7;
  var notesArray = [];

  while (notes) {
    var note = Math.floor(Math.log2(notes)) + 1;
    notesArray.unshift("#".concat(note));
    notes -= Math.pow(2, note - 1);
  }

  return stats.concat(notesArray).join(' ');
}

function unpackFeature(packed) {
  var unpacked = {
    status: _statuses.default[packed.B],
    title: packed.C
  };
  unpacked.stats = Object.keys(packed.A).reduce(function (browserStats, key) {
    var browser = packed.A[key];
    browserStats[_browsers.browsers[key]] = Object.keys(browser).reduce(function (stats, support) {
      var packedVersions = browser[support].split(' ');
      var unpacked = unpackSupport(support);
      packedVersions.forEach(function (v) {
        return stats[_browserVersions.browserVersions[v]] = unpacked;
      });
      return stats;
    }, {});
    return browserStats;
  }, {});
  return unpacked;
}