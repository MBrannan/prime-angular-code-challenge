var app = angular.module('myApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      controller: 'HomeController',
      controllerAs: 'home'
    })
    .when('/entry' ,{
      templateUrl: '/views/templates/entry.html',
      controller: 'EntryController',
      controllerAs: 'entry'
    })
    .when('/listing' ,{
      templateUrl: '/views/templates/listing.html',
      controller: 'ListingController',
      controllerAs: 'listing'
    })
    .otherwise({
      redirectTo: 'home'
    });

}]);

app.controller('HomeController', function() {
  console.log('home controller functional');
});

app.controller('EntryController',["$http", function($http) {
  console.log('entry controller running');
  var self = this;
  self.listing = []
  self.entry = {};

  self.createHero = function(newHero) {
    $http.post('/heroes', newHero)
      .then(function(response) {
        console.log("Hero added: ", response);
        self.listing.push(angular.copy(self.newHero));
      });
  }

}]);

app.controller('ListingController', ["$http", function($http) {
  console.log('Listing controller running');
  var self = this;
  self.listing = [];
  getListing();

  function getListing() {
    $http.get('/heroes')
      .then(function(response) {
        console.log(response.data);
        self.listing = response.data;
      });
  }

  self.deleteHero = function(hero) {
    $http.delete('/heroes/' + hero.id)
     .then(getListing);
  };
}]);
