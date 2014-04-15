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

  var counter = 0;
  var _Promises = {};
  var _PromiseStack = [];

  self.addDisplay = function(promise, msg, id) {
    var myClone = getNewTemplate();
    if(id == undefined) {
      $rootElement.append(myClone);
    } else {
      var parent = angular.element(document.getElementById(id));
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
    _Promises[id].template.parent().removeClass("has-background");
    _Promises[id].template.remove()
    delete _Promises[id];
    var index = _PromiseStack.indexOf(id);
    _PromiseStack.splice(index, 1);
    displayTop();
  }

  function displayTop() {
    for(var i = 0; i < _PromiseStack.length; i++) {
      var lastIndex = i;
      var topId = _PromiseStack[lastIndex];
      var msg = _Promises[topId].msg;
      var template = _Promises[topId].template;

      //hide any loading dialogs being displayed in the children
      if (template.parent().length > 0) {
        var displayed = template.parent()[0].querySelectorAll(".show-background");
        if(displayed.length > 0) {
          hideDisplay(displayed);
        }
      }
      var load = ancestorHasLoading(template);
      if(!load) {
        template.find('span').text(msg);
        template.addClass("show-background");
        template.removeClass("hide-background");
        template.parent().addClass("has-background");
      }
    }
  }

  function ancestorHasLoading(temp) {
var e = temp[0];
while (e.parentElement) {
  if (e.parentElement.classList.contains('has-background')) {
    return true;
  }
  e = e.parentElement;
}
  }

  function hideDisplay(template) {
    for (var i = 0; i < template.length; i++) {
      template[i].parentElement.classList.remove("has-background");
      template[i].classList.remove("show-background")
      template[i].classList.add("hide-background");
    }

  }

}]);

angular.module('loadDisplay').value('loadTemplate',
  "<div class='loading-background hide-background'>" +
    "<div class='loading-display'>"+
      "<img src='img/ajax-loader.gif' height='46' width='46'><br><span>Loading</span></div>"+
    "</div>"+
  "</div>"
);
