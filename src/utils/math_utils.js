var MathUtils = {
  nearestMultiple: function(n, multiple) {
    return Math.round(n / multiple) * multiple;
  },

  scaleBetween: function(lo, hi, scale) {
    return lo + (hi - lo) * scale;
  },

  // returns a percentage between hi and lo from a given input
  // e.g percentageBetween2(7, 4, 10) -> .5
  percentageBetween2: function(input, lo, hi) {
    return (input - lo) / (hi - lo);
  }
};

export default MathUtils;
