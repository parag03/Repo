var app=angular.module('myApp',['FormService']);
app.controller('myControl',['$window','$scope','FormService',function($window,$scope,FormService){
  alert("in controller");
  $scope.userInfo={};
//   var getUser= function(){
//   FormService.getUsers().success(function(response){
//     //$scope.user=response;
//     $window.location.url="/users";
//     alert(response);
//
//   });
// }
  $scope.adduser = function() {
    alert($scope.userInfo.fname);
    FormService.addUser($scope.userInfo.fname,$scope.userInfo.lname,$scope.userInfo.age).success(function(response){
    alert("Successfully added");
    $window.location.href="/users";
  });
};
  //getUser();
  // $scope.userInfo={};
  // ="";
  // ="";
  // ="";
}])
