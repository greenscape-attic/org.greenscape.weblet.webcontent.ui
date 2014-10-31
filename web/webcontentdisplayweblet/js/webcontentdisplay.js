siteApp.registerCtrl('WebContentDisplayViewCtrl', function($scope, $rootScope,
		$log, Restangular) {
	$scope.add = function() {
		$scope.data.action = 'add';
		$scope.setView($scope.webletBaseURL + '/edit.html');
	}
	$scope.edit = function() {
		$scope.data.action = 'edit';
		$scope.setView($scope.webletBaseURL + '/edit.html');
	}
	var contentRes = Restangular.one('model/webcontentdisplay');
	contentRes.get({
		'pageletId' : $scope.pagelet.modelId
	}).then(function(list) {
		$scope.data.webcontent = list[0];
	});
});

siteApp.registerCtrl('WebContentDisplayEditCtrl', function($scope, $rootScope,
		$log, Restangular) {
	$scope.save = function() {
		$scope.webcontent.siteId = $scope.gSite.modelId;
		$scope.webcontent.pageletId = $scope.pagelet.modelId;
		if ($scope.data.action == 'edit') {
			var contentRes = Restangular.one('model/webcontentdisplay',
					$scope.data.webcontent.displayId);
			contentRes.customPUT($scope.webcontent).then(function(modelId) {
				$scope.data.webcontent.title = $scope.webcontent.title;
				$scope.data.webcontent.content = $scope.webcontent.content;
			});
		} else {
			var contentRes = Restangular.all('model/webcontentdisplay');
			contentRes.post($scope.webcontent).then(function(modelId) {
				$scope.data.webcontent.modelId = modelId;
			});
		}
		$scope.setView($scope.webletBaseURL + '/view.html');
	}
	if ($scope.data.action == 'edit') {
		$scope.webcontent = $scope.data.webcontent;
	} else {
		$scope.webcontent = {
			'title' : '',
			'content' : ''
		};
	}
});