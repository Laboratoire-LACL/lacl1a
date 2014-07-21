angular.module('projects', ['resources.projects', 'terminals', 'campaigns', 'security.authorization'])

.config(['$routeProvider', 'securityAuthorizationProvider', function ($routeProvider, securityAuthorizationProvider) {
  $routeProvider.when('/projects', {
    templateUrl:'projects/projects-list.tpl.html',
    controller:'ProjectsViewCtrl',
    resolve:{
      projects:['Projects', function (Projects) {
        //TODO: fetch only for the current user
        return Projects.all();
      }],
      authenticatedUser: securityAuthorizationProvider.requireAuthenticatedUser
    }
  });
}])

.controller('ProjectsViewCtrl', ['$scope', '$location', 'projects', 'security', function ($scope, $location, projects, security) {
  $scope.projects = projects;

  $scope.viewProject = function (project) {
    $location.path('/projects/'+project.$id());
  };

  $scope.manageTerminals = function (project) {
    $location.path('/projects/'+project.$id()+'/terminals');
  };

  $scope.manageCampaigns = function (project) {
    $location.path('/projects/'+project.$id()+'/campaigns');
  };
  $scope.getMyRoles = function(project) {
    if ( security.currentUser ) {
      return project.getRoles(security.currentUser.id);
    }
  };
}]);
