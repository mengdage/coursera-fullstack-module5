(function(){
  'use strict';

  angular.module('Spinner')
  .component('loadingSpinner', {
    templateUrl: 'src/templates/loading.template.html',
    controller: SpinnerController,

  });

  SpinnerController.$inject = ["$rootScope"];
  function SpinnerController($rootScope){
    var $ctrl = this;
    var cancelList = [];
    $ctrl.loading = false;
    $ctrl.$onInit = function(){
      var cancel = $rootScope.$on("$stateChangeStart",
                                    function(event, toState, toParams,
                                            fromState, fromParams){
                                              $ctrl.loading = true; });
      cancelList.push(cancel);
      cancel = $rootScope.$on("$stateChangeSuccess",
                                    function(event, toState, toParams,
                                            fromState, fromParams){
                                              $ctrl.loading = false; });
      cancelList.push(cancel);
      cancel = $rootScope.$on("$stateChangeError",
                                    function(event, toState, toParams,
                                            fromState, fromParams){
                                              $ctrl.loading = false; });
      cancelList.push(cancel);

    };

    $ctrl.$onDestroy = function(){
      cancelList.foreach(function(e){
        e();
      });

    };
  }
})();
