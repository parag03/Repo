var app=angular.module('myApp',['FormService']);
app.controller('myControl',['$scope','FormService',function($scope,FormService){
  alert("in controller");
  $scope.userInfo={};
  var getUser= function(){
  FormService.getUsers().success(function(response){
    $scope.user=response;

  });
}
  $scope.adduser=function(){
    alert($scope.userInfo.fname);
    FormService.addUser($scope.userInfo.fname,$scope.userInfo.lname,$scope.userInfo.age).success(function(response){
    alert("Successfully added");
  })
};
  getUser();
  // $scope.userInfo={};
  // ="";
  // ="";
  // ="";
}])
