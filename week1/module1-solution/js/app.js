(function(){
  'use strict';
  angular.module('LunchCheck', [])

  .controller('LunchCheckController', lunchCheckController);

  lunchCheckController.$injector = ['$scope'];

  function lunchCheckController($scope) {
    $scope.dishList = "";
    $scope.suggestMsg = "";
    $scope.dishChecker = function(){
      var dishes = $scope.dishList.split(',');
      dishes = dishes.filter(function(value){
        return value.trim() != '';
      })
      if(dishes.length == 0) {
        $scope.suggestMsg = "Please enter data first";
      }else if(dishes.length <= 3) {
        $scope.suggestMsg = "Enjoy!";
      } else if (dishes.length > 3) {
        $scope.suggestMsg = "Too much!"
      }
    }
  }

})();
