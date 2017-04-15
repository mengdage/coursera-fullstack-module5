(function(){
  'use strict';
  angular.module('MenuApp')
  .controller('categoriesStateController', categoriesStateController);

  categoriesStateController.$inject = ['categoriesData'];
  function categoriesStateController(categoriesData){
    var cateCtrl = this;
    cateCtrl.categories = categoriesData.data;
  }
})();
