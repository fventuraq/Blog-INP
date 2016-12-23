var app = angular.module("myApp", []);
app.controller("myCtrl", function($scope, $http) {
console.log("Hola he iniciado bien");

var refresh = function() {
$http.get('/bloginp').success(function(response){
	console.log("He recibido la informacion");
	$scope.bloginp = response;
	$scope.blog = "";
});
};

refresh();

$scope.addBlog = function(){
	console.log($scope.blog);
	$http.post('/bloginp', $scope.blog).success(function(response){
		console.log(response);
		refresh();
	});
};

$scope.remove = function(id){
	console.log(id);
	$http.delete('/bloginp/' + id).success(function(response){
		refresh();
	});
};

$scope.edit = function(id){
	console.log(id);
	$http.get('/bloginp/' + id).success(function(response){
		$scope.blog = response;
	});
};

$scope.update = function(){
	console.log($scope.blog._id);
	$http.put('/bloginp/' + $scope.blog._id, $scope.blog).success(function(response){
		refresh();
	})
};

$scope.deselect = function(){
	$scope.blog = "";
}

})
