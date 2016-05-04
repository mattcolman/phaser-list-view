"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var MathUtils = {

    nearestMultiple: function nearestMultiple(n, multiple) {
        return Math.round(n / multiple) * multiple;
    },

    scaleBetween: function scaleBetween(lo, hi, scale) {
        return lo + (hi - lo) * scale;
    },

    // returns a percentage between hi and lo from a given input
    // e.g percentageBetween2(7, 4, 10) -> .5
    percentageBetween2: function percentageBetween2(input, lo, hi) {
        return (input - lo) / (hi - lo);
    }
};

exports.default = MathUtils;