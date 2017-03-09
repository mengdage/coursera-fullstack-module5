(function(){
  'use strict';
  angular.module('ShoppingListApp', [])
  .controller('ShoppingListToBuyController', ShoppingListToBuyController)
  .controller('ShoppingListBoughtController',ShoppingListBoughtController)
  .service('ShoppingListService', ShoppingListService);

  ShoppingListToBuyController.$inject = ['ShoppingListService'];
  function ShoppingListToBuyController(ShoppingListService){
    var toBuyList = this;
    toBuyList.items = ShoppingListService.getToBugList();
    toBuyList.checkItem = function(index){
      ShoppingListService.checkItem(index);
    }


  }
  ShoppingListBoughtController.$inject = ['ShoppingListService'];
  function ShoppingListBoughtController(ShoppingListService){
    var boughtList = this;
    boughtList.items = ShoppingListService.getBoughtList();


  }

  function ShoppingListService(){
    var shoppingHelper = this;
    var toBuyList=[
      {
        name: "apples",
        quantity: "15"
      },
      {
        name: "grapes",
        quantity: "14"
      },
      {
        name: "watermelons",
        quantity: "13"
      },
      {
        name: "oranges",
        quantity: "12"
      },
      {
        name: "bananas",
        quantity: "11"
      }
    ];
    var boughtList=[];

    shoppingHelper.checkItem = function(index){
      var item = toBuyList.splice(index, 1);
      boughtList.push(item[0]);
    };
    shoppingHelper.getToBugList = function(){
      return toBuyList;
    };
    shoppingHelper.getBoughtList = function(){
      return boughtList;
    };

  }
})();
