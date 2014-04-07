describe("loader service", function() {
  var loadService;
  var rootScope;

  loadTemplateMock = "<div><div><span></span></div></div>";

  beforeEach(module('loadDisplay'));

  beforeEach(module(function($provide) {
    $provide.value('loadTemplate', loadTemplateMock);
  }))

  beforeEach(inject(function($injector, $rootScope) {
    loadService = $injector.get('loadDisplay');
    rootScope = $rootScope;
  }));

  it("Message should originally be blank", function() {
    expect(loadService.getActiveMsg()).toEqual("");
  });

  describe("Adding and removing displays", function() {

    function makeADisplay(msg) {
      var promise = new promiseMock();
      loadService.addDisplay(promise, msg);
      rootScope.$apply();
      expect(loadService.getActiveMsg()).toEqual(msg);
      return promise;
    }

    it("add display should display", function() {
      makeADisplay("loading1");
    });

    it("Adding and removing should go back to blank", function() {
      var promise = makeADisplay("loading2");
      promise.resolve();
      expect(loadService.getActiveMsg()).toEqual("");
    });

    it("Adding 2 and removing last should go back to first", function() {
      var promise1 = makeADisplay("loading1");
      var promise2 = makeADisplay("loading2");
      promise2.resolve();
      expect(loadService.getActiveMsg()).toEqual("loading1");
    });

    it("Adding 2 and removing first should still display second", function() {
      var promise1 = makeADisplay("loading1");
      var promise2 = makeADisplay("loading2");
      promise1.resolve();
      expect(loadService.getActiveMsg()).toEqual("loading2");
    });

    it("Adding 2 and removing first then second should go back to blank", function() {
      var promise1 = makeADisplay("loading1");
      var promise2 = makeADisplay("loading2");
      promise1.resolve();
      promise2.resolve();
      expect(loadService.getActiveMsg()).toEqual("");
    })
  })
});