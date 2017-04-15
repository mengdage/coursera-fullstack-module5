(function(){
  'use strict';

  angular.module('data')
  .service('MenuDataService', MenuDataService)
  .constant('ApiBasepath', 'https://davids-restaurant.herokuapp.com');


  MenuDataService.$inject = ['$http', 'ApiBasepath'];
  function MenuDataService($http, ApiBasepath){
    var service = this;

    service.getAllCategories = function(){
      var response = $http({
        method: "GET",
        url: (ApiBasepath + '/categories.json')
      });

      return response;
    }

    service.getItemsForCategory = function(categoryShortName){
      var response = $http({
        method: "GET",
        url: (ApiBasepath + '/menu_items.json'),
        params: {
          category: categoryShortName
        }
      });

      return response;
    }

  }
})();
