angular.module("loadDemo", ["loadDisplay"]).run(function($q, loadDisplay) {

  var full = $q.defer();
  loadDisplay.addDisplay(full.promise, "Loading Entire Page");
  setTimeout(function() {
    full.resolve();
  }, 2000);

  var div = $q.defer();
  loadDisplay.addDisplay(div.promise, "Loading Div", "loadingBlock");
  setTimeout(function() {
    div.resolve();
  }, 4000);

});