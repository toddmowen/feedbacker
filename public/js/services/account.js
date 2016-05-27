fbServices.service('Account', ['$log', '$http', '$q', function($log, $http, $q) {

	var invalidRequestError = function () {
		var deferred = $q.defer();
		deferred.reject("Invalid request");
		return deferred.promise
	};

	return {
		register: function(name, role, email, password, managerEmail) {
			if (!name || !email || !role || !managerEmail || !password) {
				return invalidRequestError();
			}
			return $http({
				method: "POST",
				url: "/api/register",
				data: {
					apiVersion:"1.0",
					body: {
						name: name,
						role: role,
						email: email,
						password: password,
						managerEmail: managerEmail
					}
				}
			});
		},

		getCurrentUser: function() {
			return $http.get("/api/user")
		},

		activate: function(email, token) {
			if (!email || !token) {
				return invalidRequestError();
			}
			return $http({
				method: "POST",
				url: "/api/register/activate",
				data:{
					apiVersion: "1.0",
					body: {
						email: email,
						token: token
					}
				}
			})
		},

		sendActivationEmail: function(email) {
			if (!email) {
				return invalidRequestError();
			}
			return $http({
				method:"POST",
				url:"/api/register/activate/email",
				data: {
					apiVersion:"1.0",
					body:{ email: email}
				}
			});
		},

		resetPassword: function(oldPassword, newPassword, token, username) {
			if (!oldPassword || !newPassword || !token) {
				return invalidRequestError();
			}			
			return $http({
				method:"POST",
				url:"/api/password/reset",
				data: {
					apiVersion:"1.0",
					body: { 
						oldPassword: oldPassword,
						newPassword: newPassword,
						token: token,
						username
					}
				}
			});
		},

		sendPasswordResetEmail: function(email) {
			if (!email) {
				return invalidRequestError();
			}
			return $http({
				method:"POST",
				url:"/api/password/reset/email",
				data: {
					apiVersion:"1.0",
					body:{ email: email}
				}
			});
		}
	}
}]);