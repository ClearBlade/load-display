# LoadDisplay AngularJS Service
## Overview
Use this service to grey out your web page and display a loading icon and message while you wait for angularjs promises to be resolved.  This service supports greying out just parts of your page if you don't want to block the entire page waiting for async data.  This service supports handling multiple promises at the same time.

## Dependencies
* Obviously [AngularJs](http://angularjs.org) is required.  This service was made with v1.2.1.
* To be able to only grey out parts of your page and not the entire page, [JQuery](http://jquery.com/) is required.
* The test were created with [Jasmine](http://jasmine.github.io/) v2.0, and are ran with [Karma Runner](http://karma-runner.github.io/0.12/index.html).  They also make use of the [angular-mocks](https://github.com/angular/angular.js/tree/master/src/ngMock) service.

## To Use
The service provides one function, `addDisplay`.  This function takes an AngularJs promise, a message string, and an optional ID string.  It will then display a loading icon until the given promise is resolved or rejected.  If an ID is given then only the element with that ID will be greyed out.  If no ID is given then the entire page will be greyed out.

Look in `demo.html` and `demo/app.js` for an example.

## To run test
In the root folder just run `karma start` to run the test.