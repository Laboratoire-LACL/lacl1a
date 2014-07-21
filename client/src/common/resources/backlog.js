angular.module('resources.terminals', ['mongolabResource']);
angular.module('resources.terminals').factory('terminals', ['mongolabResource', function (mongolabResource) {
  var terminals = mongolabResource('terminals');

  terminals.forProject = function (projectId) {
    return terminals.query({projectId:projectId});
  };

  return terminals;
}]);
