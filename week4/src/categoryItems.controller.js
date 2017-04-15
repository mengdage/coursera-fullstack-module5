(function(){
  'use strict';

  angular.module('MenuApp')
  .controller('categoryItemsController', categoryItemsController);

  categoryItemsController.$inject = ['$stateParams', 'items'];
  function categoryItemsController($stateParams, items){
    var itemsCtrl = this;

    itemsCtrl.categoryId = $stateParams.categoryId;
    itemsCtrl.items = items.data.menu_items;
  }
})();
