'use strict';

describe('service [Session]', function() {
	
	var session, $httpBackend;

    beforeEach(module('feedbacker.services'));
    
    beforeEach(inject(function(_Session_, _$httpBackend_) {

    	session = _Session_;
    	$httpBackend = _$httpBackend_;
    }));
    
    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });
    
    it('can get an instantce of itself', function(){
    	expect(session).toBeDefined();
    });
    
    it('has defined functions', function() {
        expect(angular.isFunction(session.login)).toBe(true);
        expect(angular.isFunction(session.logout)).toBe(true);
        expect(angular.isFunction(session.isLoggedIn)).toBe(true);
    });

    describe("calls the appropriate server api", function() {
        var dummyResult = "dummyResult";
    	
    	it('to login a user', function() {
    		var result, promise = session.login("user","pass");

            $httpBackend.expectPUT('/api/session/login', '{"apiVersion":"1.0","body":{"username":"user","password":"pass"}}').respond(200, dummyResult);
    		
    		// set the response value
    		promise.then(function(data) {
    			result = data.data;
    		});
    		expect(result).toBeUndefined(); // it really should at this point
    		$httpBackend.flush();

    		expect(result).toBeDefined();
            expect(result).toEqual(dummyResult);
    	});

        it('to logout a user', function() {
            var result, promise = session.logout();

            $httpBackend.expectGET('/api/session/logout').respond(200, dummyResult);
            
            // set the response value
            promise.then(function(data) {
                result = data.data;
            });
            expect(result).toBeUndefined();
            $httpBackend.flush();

            expect(result).toBeDefined();
            expect(result).toEqual(dummyResult);
        });

    });

    describe("has the correct in state when", function() {

        var doLogin = function() {
            expect(session.isLoggedIn()).toBe(false);

            session.login("user","pass");
            $httpBackend.expectPUT('/api/session/login', '{"apiVersion":"1.0","body":{"username":"user","password":"pass"}}').respond(200, "dummyResult");

            $httpBackend.flush();

            expect(session.isLoggedIn()).toBe(true);
        };

        it('is initiated', function() {
            expect(session.isLoggedIn()).toBe(false);
        });

        it('logging in a user', function() {
            doLogin();
        });

        it('logging out a user', function() {
            doLogin();

            session.logout();
            $httpBackend.expectGET('/api/session/logout').respond(200, "dummyResult");
            $httpBackend.flush();

            expect(session.isLoggedIn()).toBe(false);
        });

    });
});