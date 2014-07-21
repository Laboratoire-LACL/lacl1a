angular.module('resources.tasks', ['mongolabResource']);
angular.module('resources.tasks').factory('Tasks', ['mongolabResource', function (mongolabResource) {

  var Tasks = mongolabResource('tasks');

  Tasks.statesEnum = ['STOPEE', 'ACTIVE', 'FINIE'];

  Tasks.forterminalsItem = function (terminalsItem) {
    return Tasks.query({terminalsItem:terminalsItem});
  };

  Tasks.forcampaign = function (campaignId) {
    return Tasks.query({campaignId:campaignId});
  };

  Tasks.forUser = function (userId) {
    return Tasks.query({userId:userId});
  };

  Tasks.forProject = function (projectId) {
    return Tasks.query({projectId:projectId});
  };

  return Tasks;
}]);