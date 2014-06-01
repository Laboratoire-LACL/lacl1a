angular.module('resources.campaigns', ['mongolabResource']);
angular.module('resources.campaigns').factory('campaigns', ['mongolabResource', function (mongolabResource) {

  var Campaigns = mongolabResource('campaigns');
  Campaigns.forProject = function (projectId) {
    return Campaigns.query({projectId:projectId});
  };
  return Campaigns;
}]);