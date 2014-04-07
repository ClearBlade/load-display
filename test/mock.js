promiseMock = function() {
  var self = this;
  self.goodCallback;
  self.badCallback

  self.then = function(goodCallback, badCallback) {
    self.goodCallback = goodCallback;
    self.badCallback = badCallback;
  };

  self.resolve = function(results) {
    self.goodCallback(results);
  };

  self.reject = function(error) {
    self.badCallback(error);
  }
};