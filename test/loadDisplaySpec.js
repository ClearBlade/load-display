describe("loader service", function() {
  var loadService;
  var rootScope;
  var rootElement;
  var div1 = angular.element("<div id='div1'></div>")
  var div2 = angular.element("<div id='div2'></div>")


  loadTemplateMock = "<div id='load-background' class='hide-background'><div><span></div></div>";

  beforeEach(module('loadDisplay'));

  beforeEach(module(function($provide) {
    $provide.value('loadTemplate', loadTemplateMock);
  }))

  beforeEach(inject(function($injector, $rootScope, $rootElement) {
    loadService = $injector.get('loadDisplay');
    rootScope = $rootScope;
    rootElement = $rootElement
    rootElement.append(div1);
    rootElement.append(div2);
  }));

  it("should start up correctly", function() {
  });

  describe("addDisplay", function() {

    function makeADisplay(msg, element, id) {
      var promise = new promiseMock();
      loadService.addDisplay(promise, msg, id);
      rootScope.$apply();
      var displayedText = getLoadingText(element);
      expect(displayedText).toEqual(msg)
      return promise;
    }

    function getLoadingText(element) {
      var loaders = angular.element(element[0].querySelectorAll('.show-background'));
      return loaders.find('span').text();
    }

    it("add display should display", function() {
      makeADisplay("loading1", rootElement).resolve();
    });

    it("Adding and removing should go back to blank", function() {
      var promise = makeADisplay("loading2", rootElement);
      promise.resolve();
      expect(rootElement.children(".show-background").length).toEqual(0);
    });

    it("Adding 2 should display just second one", function() {
      var promise1 = makeADisplay("loading1", rootElement);
      var promise2 = makeADisplay("loading2", rootElement);
      promise1.resolve();
      promise2.resolve();
    });

    it("Adding 2 and removing second should display first", function() {
      var promise1 = makeADisplay("loading1", rootElement);
      var promise2 = makeADisplay("loading2", rootElement);
      promise2.resolve();
      expect(getLoadingText(rootElement)).toEqual("loading1");
      promise1.resolve();
    });

    it("Adding 2 and removing first should still display second", function() {
      var promise1 = makeADisplay("loading1", rootElement);
      var promise2 = makeADisplay("loading2", rootElement);
      expect(rootElement.children(".hide-background").length).toEqual(1);
      promise1.resolve();
      expect(getLoadingText(rootElement)).toEqual("loading2");
      promise2.resolve();  
    });

    it("Adding 2 and removing first then second should go back to blank", function() {
      var promise1 = makeADisplay("loading1", rootElement);
      var promise2 = makeADisplay("loading2", rootElement);
      promise1.resolve();
      promise2.resolve();
      expect(rootElement.children("#load-background").length).toEqual(0);
    });

    it("Adding to id div1 should only display in div", function() {
      var promise = makeADisplay("loading div", div1, "div1");
      expect(div2.children("#load-background").length).toEqual(0);
      promise.resolve();
    });

    it("Adding to id div2 should only display in div2", function() {
      var promise = makeADisplay("loading div2", div2, "div2");
      expect(div1.children("#load-background").length).toEqual(0);
      promise.resolve();
    });

    it("Adding and removing should display nothing", function() {
      var promise = makeADisplay("loading div1", div1, "div1");
      promise.resolve();
      expect(div1.children("#load-background").length).toEqual(0);
    });

    it("Displaying both should display both messages at same time", function() {
      var promise1 = makeADisplay("loading div1", div1, "div1");
      var promise2 = makeADisplay("loading div2", div2, "div2");
      expect(div1.children(".show-background").length).toEqual(1);
      expect(div2.children(".show-background").length).toEqual(1);
      promise1.resolve();
      promise2.resolve();
    });

    it("Displaying on top should override smaller div", function() {
      var divProm = makeADisplay("loading div1", div1, "div1");
      var topProm = makeADisplay("loading top", rootElement);
      expect(div1.children(".hide-background").length).toEqual(1);
      divProm.resolve();
      topProm.resolve();
    });

    it("Displaying div should not be displayed until top is resolved", function() {
      var topProm = makeADisplay("loading top", rootElement);
      
      var promise = new promiseMock();
      loadService.addDisplay(promise,"loading div", "div1");
      rootScope.$apply();
      expect(div1.children(".hide-background").length).toEqual(1);
      topProm.resolve();
      expect(div1.children(".show-background").length).toEqual(1);
      promise.resolve();
    });

    it("Displaying two under divs should not happen until top is resolved", function() {
      var topProm = makeADisplay("loading top", rootElement)

      var promise1 = new promiseMock();
      loadService.addDisplay(promise1, "loading div", "div1");
      rootScope.$apply();
      var promise2 = new promiseMock();
      loadService.addDisplay(promise2, "loading div2", "div2");
      rootScope.$apply();
      expect(div1.children(".hide-background").length).toEqual(1);
      expect(div2.children(".hide-background").length).toEqual(1);
      topProm.resolve();
      expect(div1.children(".show-background").length).toEqual(1);
      expect(div2.children(".show-background").length).toEqual(1);
    })
  })
});