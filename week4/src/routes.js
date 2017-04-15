(function(){
  'use strict';

  angular.module('MenuApp')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'src/templates/home.template.html'
      })
      .state('categories', {
        url: '/categories',
        templateUrl: 'src/templates/categoriesState.template.html',
        controller: 'categoriesStateController as cateCtrl',
        resolve:{
          categoriesData: ['MenuDataService', function(MenuDataService){
            return MenuDataService.getAllCategories();
          }]
          // categoriesData: function(){
          //   console.log('resolve categoriseData');
          //   return 'abc';
          //
          // }
        }
      })
      .state('categories.items', {
        url: '/item/{categoryId}',
        templateUrl: 'src/templates/category-items.template.html',
        controller: 'categoryItemsController as itemsCtrl',
        resolve: {
          items: ['MenuDataService', '$stateParams', function(MenuDataService, $stateParams){
            return MenuDataService.getItemsForCategory($stateParams.categoryId);
          }]
        }
      })
      ;

  }
})();
