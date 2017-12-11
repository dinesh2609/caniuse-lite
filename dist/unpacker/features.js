"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.features = void 0;

/*
 * Load this dynamically so that it
 * doesn't appear in the rollup bundle.
 */
var features = require('../../data/features');

exports.features = features;