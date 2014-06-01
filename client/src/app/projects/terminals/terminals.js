angular.module('terminals', ['resources.terminals', 'services.crud'])

  .config(['crudRouteProvider', function(crudRouteProvider){
  
  
    // projectId is a helper method wrapped with DI annotation that will be used in
    // route resolves in this file.
    var projectId = ['$route', function($route) {
      return $route.current.params.projectId;
    }];
  
  
    // Create the CRUD routes for editing the terminals
    crudRouteProvider.routesFor('terminals', 'projects', 'projects/:projectId')
      // How to handle the "list terminals" route
      .whenList({
        projectId: projectId,
            terminals : ['$route', 'terminals', function($route, terminals){
          return terminals.forProject($route.current.params.projectId);
        }]
      })
      
      // How to handle the "create a new product terminals item" route
      .whenNew({
        projectId: projectId,
        terminal : ['$route', 'terminals', function($route, terminals){
          return new terminals({projectId:$route.current.params.projectId});
        }]
      })
    
      // How to handle the "edit a product terminals item" route
      .whenEdit({
        projectId: projectId,
        terminal : ['$route', 'terminals', function($route, terminals){
          return terminals.getById($route.current.params.itemId);
        }]
      });
  }])
  
  
  
  // The controller for listing product terminals items
  .controller('terminalsListCtrl', ['$scope', 'crudListMethods', 'projectId', 'terminals', function($scope, crudListMethods, projectId, terminals){
  
    $scope.terminals = terminals;
    
    angular.extend($scope, crudListMethods('/projects/'+projectId+'/terminals'));
  
  }])
  
  
  
  // The controller for editing a product terminals item
  .controller('terminalsEditCtrl', ['$scope', '$location', 'projectId', 'terminal', function($scope, $location, projectId, terminal){
  
    $scope.terminal = terminal;
  
    $scope.onSave = function () {
      //TODO: missing message
      $location.path('/projects/'+projectId+'/terminals');
    };
  
    $scope.onError = function () {
      //TODO: missing message
      $scope.updateError = true;
    };
  
  }]);
