angular.module('starter')
 
.controller('AppCtrl', function($scope, $state, $ionicPopup, AuthService, AUTH_EVENTS) {
  $scope.username = AuthService.username();
 
  $scope.$on(AUTH_EVENTS.notAuthorized, function(event) {
    var alertPopup = $ionicPopup.alert({
      title: 'Unauthorized!',
      template: 'You are not allowed to access this resource.'
    });
  });
 
  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    AuthService.logout();
    $state.go('login');
    var alertPopup = $ionicPopup.alert({
      title: 'Session Lost!',
      template: 'Sorry, You have to login again.'
    });
  });
 
  $scope.setCurrentUsername = function(name) {
    $scope.username = name;
  };
})

.controller('LoginCtrl', function($scope, $state, $ionicPopup, AuthService) {
  $scope.data = {};
 
  $scope.login = function(data) {
    AuthService.login(data.username, data.password).then(function(authenticated) {
      $state.go('main.dash', {}, {reload: true});
      $scope.setCurrentUsername(data.username);
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Please check your credentials!'
      });
    });
  };
})

.controller('DashCtrl', function($scope, $state, $http, $ionicPopup, AuthService, $stateParams) {
  $scope.data= [{
  	id:123,
  	name: 'sajin',
  	post:'director',
  	technology:'information technology',
  	passportname:'sajin initial',
  	gender:'male',
  	dob:'10/10/1992',
  	join_date:'10/10/2010',
  	designation:'director of IT',
  	religion:'Hindu'

  },{
  	id:124,
  	name: 'abc',
  	post:'director',
  	technology:'information technology',
  	passport_name:'abc de',
  	gender:'male',
  	dob:'10/10/1992',
  	joindate:'10/10/2010',
  	designation:'director of IT',
  	religion:'islam'
  },
  {
    	id:125,
    	name: 'jhone',
    	post:'director',
    	technology:'information technology',
    	passport_name:'abc de',
    	gender:'male',
    	dob:'10/10/1992',
    	joindate:'10/10/2010',
    	designation:'director of IT',
    	religion:'catholic'
    },
    {
      	id:126,
      	name: 'Babu',
      	post:'director',
      	technology:'information technology',
      	passport_name:'abc de',
      	gender:'male',
      	dob:'10/10/1992',
      	joindate:'10/10/2010',
      	designation:'director of IT',
      	religion:'hindhu'
      },
      {
        	id:127,
        	name: 'Peeter',
        	post:'director',
        	technology:'information technology',
        	passport_name:'abc de',
        	gender:'male',
        	dob:'10/10/1992',
        	joindate:'10/10/2010',
        	designation:'director of IT',
        	religion:'islam'
        },
        {
          	id:128,
          	name: 'Naeem',
          	post:'director',
          	technology:'information technology',
          	passport_name:'abc de',
          	gender:'male',
          	dob:'10/10/1992',
          	joindate:'10/10/2010',
          	designation:'director of IT',
          	religion:'islam'
          },
          {
            	id:129,
            	name: 'Anand',
            	post:'director',
            	technology:'information technology',
            	passport_name:'abc de',
            	gender:'male',
            	dob:'10/10/1992',
            	joindate:'10/10/2010',
            	designation:'director of IT',
            	religion:'christian'
            },
            {
              	id:130,
              	name: 'Amith',
              	post:'director',
              	technology:'information technology',
              	passport_name:'abc de',
              	gender:'male',
              	dob:'10/10/1992',
              	joindate:'10/10/2010',
              	designation:'director of IT',
              	religion:'islam'
              }]
  var param1 =  $stateParams.id;
  console.log('test:',param1);

  $scope.user=$scope.data.filter(function(item){
  	return item.id===parseInt($stateParams.id);
  })
  console.log('test:',$scope.user[name]);
  /*$scope.click = function(id){
  	console.log('id:',id)
  }*/
  $scope.logout = function() {
    AuthService.logout();
    $state.go('login');
  };
 
  $scope.performValidRequest = function() {
    $http.get('http://localhost:8100/valid').then(
      function(result) {
        $scope.response = result;
      });
  };
 
  $scope.performUnauthorizedRequest = function() {
    $http.get('http://localhost:8100/notauthorized').then(
      function(result) {
        // No result here..
      }, function(err) {
        $scope.response = err;
      });
  };
 
  $scope.performInvalidRequest = function() {
    $http.get('http://localhost:8100/notauthenticated').then(
      function(result) {
        // No result here..
      }, function(err) {
        $scope.response = err;
      });
  };
});