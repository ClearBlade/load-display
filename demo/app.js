angular.module("loadDemo", ["loadDisplay"]).run(function($q, loadDisplay) {

  var div = $q.defer();
  loadDisplay.addDisplay(div.promise, "Loading Div", "loadingBlock");
  setTimeout(function() {
    div.resolve();
  }, 4000);

  var full = $q.defer();
  loadDisplay.addDisplay(full.promise, "Loading Entire Page");
  setTimeout(function() {
    full.resolve();
  }, 3000);

  var full2 = $q.defer();
  loadDisplay.addDisplay(full2.promise, "Loading Entire Page2");
  setTimeout(function() {
    full2.resolve();
  }, 2000);

  var div2 = $q.defer();
  loadDisplay.addDisplay(div2.promise, "Loading Div 2", "loadingBlock2");
  setTimeout(function() {
    div2.resolve();
  }, 6000);

});