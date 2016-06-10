angular.module('FormService',[])
        .factory('FormService',['$http',function($http){
          return {
            getUsers: function(){

              return $http.get('/users');
            },
            addUser: function(fname,lname,age){
              var req = {
                method: 'POST',
                url: '/users',
                data: {
                  fname: fname,
                  lname: lname,
                  age:age
                }
              }
              return $http(req);
            }
          };
        }]);
