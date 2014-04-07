# LoadDisplay AngularJS Service
## Overview
Use this service to grey out your web page and display a loading icon and message while you wait for angularjs promises to be resolved.  This service supports greying out just parts of your page if you don't want to block the entire page waiting for async data.  This service supports handling multiple promises at the same time.

## Dependencies
* Obviously [AngularJs](http://angularjs.org) is required.  This service was made with v1.2.1.
* To be able to only grey out parts of your page and not the entire page, [JQuery](http://jquery.com/) is required.
* The test were created with [Jasmine](http://jasmine.github.io/) v2.0, and are ran with [Karma Runner](http://karma-runner.github.io/0.12/index.html).  They also make use of the [angular-mocks](https://github.com/angular/angular.js/tree/master/src/ngMock) service.

## To Use
To use the service in your app add the loadDisplay module to your list of app dependencies. So: angular.module("appName", ["loadDisplay"]). Make sure loadDisplay.js and loadDisplay.css are included in your app. Also make sure to pull in `ajax-loader.gif` into your app. I assume it located at `img/ajax-loader.gif` from the root folder of your app but you can change it's location in the `loadTemplate` value at the bottom of the `src\loadDisplay.js` file.

The service provides one function, `addDisplay`.  This function takes an AngularJs promise, a message string, and an optional ID string.  It will then display a loading icon until the given promise is resolved or rejected.  If an ID is given then only the html element with that ID will be greyed out.  If no ID is given then the entire page will be greyed out.

Look in `demo/` for an example.

## To Run Test And Demo
In the root folder just run `karma start` to run the test.

You can open demo/demo.html in your web browser. I have tested against Mozilla and Chrome.