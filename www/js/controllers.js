angular.module('starter.controllers', ['firebase','ionic'])

.controller('DashCtrl', function($scope,$firebaseArray,fbChat,$rootScope,$ionicLoading,$http) {
  var ref=new Firebase ("https://omkarrepal.firebaseio.com/");
  var chats=fbChat.all();
  $scope.loading=true;

  chats.$loaded()
    .then(function(){
      $scope.loading=false;
    });
    
 $scope.fbAuth=function(){
      ref.authWithOAuthPopup("facebook", function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
    $rootScope.login_success=false;
  } else {
    $rootScope.login_success=true;
    $rootScope.userName=authData.facebook.displayName;
    $rootScope.profilePicture=authData.facebook.profileImageURL;
    $rootScope.accessToken=authData.facebook.accessToken;
    
    console.log(authData);

    $ionicLoading.show({ template: 'Welcome {{userName}}!', noBackdrop: true, duration: 2000 });
    
    
  }
});


 }   
    

})

.controller('ChatsCtrl', function($scope, fbChat,$rootScope) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = fbChat.all();

  //$scope.remove = function(chat) {
    //Chats.remove(chat);
  //};
})

.controller('ChatDetailCtrl', function($scope,$stateParams,fbChat,$rootScope) {
  $scope.chat = fbChat.getUser($stateParams.userName);
})

.controller('AccountCtrl', function($scope,$rootScope) {
  $scope.settings = {
    enableFriends: true
  };

});
