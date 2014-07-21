angular.module('campaigns', ['resources.campaigns', 'services.crud', 'tasks'])

.config(['crudRouteProvider', function(crudRouteProvider){

  var projectId = ['$route', function($route) {
    return $route.current.params.projectId;
  }];

  var terminals = ['$route', 'terminals', function ($route, terminals) {
    return terminals.forProject($route.current.params.projectId);
  }];

  crudRouteProvider.routesFor('campaigns', 'projects', 'projects/:projectId')
  .whenList({
    projectId: projectId,
    campaigns: ['$route', 'campaigns', function($route, campaigns){
      return campaigns.forProject($route.current.params.projectId);
    }]
  })

  .whenNew({
    projectId: projectId,
    campaign: ['$route', 'campaigns', function($route, campaigns){
      return new campaigns({projectId:$route.current.params.projectId});
    }],
    terminals : terminals
  })

  .whenEdit({
    projectId: projectId,
    campaign: ['$route', 'campaigns', function($route, campaigns){
      return campaigns.getById($route.current.params.itemId);
    }],
    terminals : terminals
  });

}])

.controller('campaignsListCtrl', ['$scope', '$location', 'crudListMethods', 'projectId', 'campaigns', function($scope, $location, crudListMethods, projectId, campaigns){
  $scope.campaigns = campaigns;

  angular.extend($scope, crudListMethods('/projects/'+projectId+'/campaigns'));

  $scope.tasks = function (campaign) {
    $location.path('/projects/'+projectId+'/campaigns/'+campaign.$id()+'/tasks');
  };
}])

.controller('campaignsEditCtrl', ['$scope', '$location', 'projectId', 'campaign', 'terminals', function($scope, $location, projectId, campaign, terminals){

  $scope.terminals = terminals;
  $scope.campaign = campaign;

  $scope.onSave = function () {
    $location.path('/projects/'+projectId+'/campaigns');
  };
  $scope.onError = function () {
    $scope.updateError = true;
  };
  
  $scope.campaign.campaignTerminals = $scope.campaign.campaignTerminals || [];

  $scope.terminalsLookup = {};
  angular.forEach($scope.terminals, function (terminal) {
    $scope.terminalsLookup[terminal.$id()] = terminal;
  });

  $scope.viewterminalsItem = function (terminal) {
    $location.path('/projects/'+projectId+'/terminals/'+terminal);
  };

  $scope.addTerminal = function (terminal) {
    $scope.campaign.campaignTerminals.push(terminal.$id());
  };

  $scope.removeTerminalsItem = function (terminalId) {
    $scope.campaign.campaignTerminals.splice($scope.campaign.campaignTerminals.indexOf(terminalId),1);
  };

  $scope.estimationInTotal = function () {
    var totalEstimation = 0;
    angular.forEach(campaign.campaignTerminals, function (terminalId) {
      totalEstimation += $scope.terminalsLookup[terminalId].media;
    });
    return totalEstimation;
  };

  $scope.notSelected = function (terminal) {
    return $scope.campaign.campaignTerminals.indexOf(terminal.$id())===-1;
  };
}]);