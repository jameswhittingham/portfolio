angular.module('portfolioApp.services', [])

.factory('fileService', ['$q', '$http', function($q, $http) {
  return {
    getFile: function(path) {
      var q = $q.defer();

      $http.get(path).then(function(response) {
        q.resolve(response.data);
      }, function(err) {
        q.reject(err);
      });

      return q.promise;
    }
  }
}]);