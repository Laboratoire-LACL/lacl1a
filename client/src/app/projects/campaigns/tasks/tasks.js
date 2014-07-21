angular.module('tasks', ['resources.tasks', 'services.crud'])

.config(['crudRouteProvider', function (crudRouteProvider) {

  var campaignTerminalsItems = ['campaigns', 'terminals', '$route', function (Campaigns, terminals, $route) {
    var campaignPromise = Campaigns.getById($route.current.params.campaignId);
    return campaignPromise.then(function (campaign) {
      return terminals.getByIds(campaign.campaignTerminals);
    });
  }];

  var teamMembers = ['Projects', 'Users', '$route', function (Projects, Users, $route) {
    var projectPromise = Projects.getById($route.current.params.projectId);
    return projectPromise.then(function(project){
      return Users.getByIds(project.teamMembers);
    });
  }];

  crudRouteProvider.routesFor('Tasks', 'projects/campaigns', 'projects/:projectId/campaigns/:campaignId')

  .whenList({
    tasks:['Tasks', '$route', function (Tasks, $route) {
      return Tasks.forcampaign($route.current.params.campaignId);
    }]
  })

  .whenNew({
    task:['Tasks', '$route', function (Tasks, $route) {
      return new Tasks({
        projectId:$route.current.params.projectId,
        campaignId:$route.current.params.campaignId,
        state:Tasks.statesEnum[0]
      });
    }],
    campaignTerminalsItems:campaignTerminalsItems,
    teamMembers:teamMembers
  })

  .whenEdit({
    task:['Tasks', '$route', function (Tasks, $route) {
      return Tasks.getById($route.current.params.itemId);
    }],
    campaignTerminalsItems:campaignTerminalsItems,
    teamMembers:teamMembers
  });
}])

.controller('TasksListCtrl', ['$scope', 'crudListMethods', '$route', 'tasks', function ($scope, crudListMethods, $route, tasks) {
  $scope.tasks = tasks;

  var projectId = $route.current.params.projectId;
  var campaignId = $route.current.params.campaignId;
  angular.extend($scope, crudListMethods('/projects/' + projectId + '/campaigns/' + campaignId + '/tasks'));
}])

.controller('TasksEditCtrl', ['$scope', '$location', '$route', 'Tasks', 'campaignTerminalsItems', 'teamMembers', 'task', function ($scope, $location, $route, Tasks, campaignTerminalsItems, teamMembers, task) {
  $scope.task = task;
  $scope.statesEnum = Tasks.statesEnum;
  $scope.campaignTerminalsItems = campaignTerminalsItems;
  $scope.teamMembers = teamMembers;

  $scope.onSave = function () {
    $location.path('/admin/users');
  };
  $scope.onError = function() {
    $scope.updateError = true;
  };
}]);