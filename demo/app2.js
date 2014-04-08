angular.module("loadDemo2", ["loadDisplay"]).run(function($q, loadDisplay) {
  var div = $q.defer();
  loadDisplay.addDisplay(div.promise, "Loading Div", "loadingBlock");
  setTimeout(function() {
    div.resolve();
  }, 4000);

  var div2 = $q.defer();
  loadDisplay.addDisplay(div2.promise, "Loading Div", "loadingBlock2");
  setTimeout(function() {
    div2.resolve();
  }, 6000);

});