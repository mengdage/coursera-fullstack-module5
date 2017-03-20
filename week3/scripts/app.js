(function(){
  'use strict'

  angular.module('MenuFinderApp', [])
  .controller('MenuFinderController', MenuFinderController)
  .directive('menuResult', MenuResultDirective)
  .service('MenuRetriever', MenuRetrieverService)
  .constant('RestaurantApiBasePath', 'https://davids-restaurant.herokuapp.com');

  function MenuResultDirective(){
    var ddo = {
      strict: 'E',
      templateUrl: 'resultList.html',
      scope: {
        menuItems: "<",
        deleteItem: "&"
      },
      link: MenuResultDirectiveLink,
      controller: MenuResultDirectiveController,
      controllerAs: 'resultList',
      bindToController: true

    };
    return ddo;
  }
  function MenuResultDirectiveController(){
    var resultList = this;

    resultList.emptyItems = function(){
      if(resultList.menuItems !== undefined){
      }
      if(resultList.menuItems !== undefined && resultList.menuItems.length ===0){
        return true;
      } else{
        return false;
      }
    }
  }

  function MenuResultDirectiveLink(scope, element, attrs, controller){
    scope.$watch("resultList.emptyItems()", function(newValue, oldValue){
      if(newValue){
        displayError();
      } else {
        hideError();
      }

    });

    function displayError(){
      element.find('div').css('display', 'block');
    }
    function hideError(){
      element.find('div').css('display', 'none');
    }
  }

  MenuFinderController.$inject=['$filter', 'MenuRetriever'];
  function MenuFinderController($filter, MenuRetriever){
    var finder = this;
    finder.keywords = "";
    finder.narrowDown = function(){
      if(finder.keywords === "") {
        finder.items = [];
      } else {
        var promise = MenuRetriever.getCertainMenuItems(finder.keywords);
        promise.then(function(result){
          finder.items = result;
        })
      }
      // finder.items
    };

    finder.deleteItem = function(index){
      finder.items.splice(index, 1);
    };
  }

  MenuRetrieverService.$inject = ['$http','$filter', 'RestaurantApiBasePath'];
  function MenuRetrieverService($http, $filter, RestaurantApiBasePath){
    var service = this;

    service.getAllMenuItems = function(){
      var response = $http({
        url: (RestaurantApiBasePath + '/menu_items.json'),
        method: 'GET'
      });

      return response;
    }
    service.getCertainMenuItems = function(keywords){
      return $http({
        url: (RestaurantApiBasePath + '/menu_items.json'),
        method: 'GET'
      }).then(function(response){
        return $filter('filter')(response.data.menu_items, function(value, index, array){
          return value.description.indexOf(keywords) !== -1;
        });
        // return response.data.menu_items;
        // return "hello";
      });

      // return response;
    }
  }

})();
