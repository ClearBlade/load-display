/**
This code is heavily based on the $loadDialog service in angular-jqm version 1.1.5 authored by Andy Joslin:
https://github.com/ajoslin

Authored by: Corbyn Salisbury: https://github.com/corbyns
**/
angular.module('loadDisplay', [])
.service('loadDisplay', ['$rootElement', '$q', 'loadTemplate', function($rootElement, $q, loadTemplate) {
  var self = this;

  function getNewTemplate() {
    var template = angular.element(loadTemplate);
    return template;
  }

  self.msg = "";
  var counter = 0;
  var _Promises = {};
  var _PromiseStack = [];

  self.addDisplay = function(promise, msg, id) {
    var myClone = getNewTemplate();
    if(id == undefined) {
      $rootElement.append(myClone);
    } else {
      var parent = $rootElement.find("#"+id);
      parent.append(myClone);
    }
    var asyncDefer = $q.defer();
    asyncDefer.promise.then(function(response) {
      startDisplay(response.id, response.promise, response.msg, response.template);
    });
    var count = counter;
    counter += 1;
    asyncDefer.resolve({id : count, promise : promise, msg : msg, template : myClone});
  };

  // function meant to be called asyncly
  function startDisplay(id, promise, msg, template) {
    _PromiseStack.push(id);
    _Promises[id] = {msg : msg, template : template};
    promise.then(function() {
      removeDisplay(id);
    }, function() {
      removeDisplay(id);
    });
    displayTop();
  }

  function removeDisplay(id) {
    hideDisplay(_Promises[id].template);
    delete _Promises[id];
    var index = _PromiseStack.indexOf(id);
    _PromiseStack.splice(index, 1);
    displayTop();
  }

  function displayTop() {
    if(_PromiseStack.length > 0) {
      var lastIndex = _PromiseStack.length - 1;
      var topId = _PromiseStack[lastIndex];
      var msg = _Promises[topId].msg;
      var template = _Promises[topId].template;

      //hide any loading dialogs being displayed in the children
      var displayed = template.parent().find(".show-background");
      if(displayed.length > 0) {
        hideDisplay(displayed);
      }
      if(!window.jQuery || !ancestorHasLoading(template.parent())) {
        self.msg = msg;
        template.find('span').text(msg);
        template.addClass("show-background");
        template.removeClass("hide-background");
      }
    } else {
      self.msg = "";
    }
  }

  function ancestorHasLoading(temp) {
    var parent = temp.parent();
    var foundLoading = false;
    while(parent.length > 0) {
      console.log(parent.children(".show-background"));
      if(parent.children(".show-background").length > 0) {
        console.log("FOUND ONE!");
        foundLoading = true;
        break;
      }
      parent = parent.parent();
    }
    return foundLoading;
  }

  function hideDisplay(template) {
    template.removeClass("show-background");
    template.addClass("hide-background");
  }

  self.getActiveMsg = function() {
    return self.msg;
  };
}]);

angular.module('loadDisplay').value('loadTemplate',
  "<div id='load-background' class='hide-background'>" +
    "<div class='loading-display'>"+
      "<img src='img/ajax-loader.gif' height='46' width='46'><br><span>Loading</span></div>"+
    "</div>"+
  "</div>"
);