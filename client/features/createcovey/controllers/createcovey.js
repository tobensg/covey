angular.module('createCovey', ['covey.services', 'userId.services'])

.controller('createCoveyController', function ($scope, $rootScope, $location, coveysFactory, userIdFactory) {
  // Visibility of modal
  $scope.visible = false;

  // Visiblity of error message. Will show up if the event did not submit properly
  $scope.errorVisible = false;

  $scope.toggleModalVisibility = () => {
    $scope.visible = !$scope.visible;
  };

  $scope.toggleErrorVisibility = () => {
    $scope.errorVisible = !$scope.errorVisible;
  };
  // Resets the form fields to empty
  $scope.resetFormFields = () => {
    $scope.name = '';
    $scope.location = '';
    $scope.address = '';
    $scope.city = '';
    $scope.state = '';
    $scope.startDate = '';
    $scope.starTime = '';
    $scope.endDate = '';
    $scope.endTime = '';
    $scope.details = '';
    $scope.photoUrl = '';
  };
  // Set form fields to empty, by default
  $scope.resetFormFields();
  /*
   * Submits new covey to the server. If successful (201 response),
   * it will close the modal and angular will redirect the new covey.
   * If there's an error, it will display the error modal.
  */
  $scope.submitCovey = (isInvalid) => {
    if (isInvalid) return;
    // Combines date/times into a single value
    const combinedStartDateTime = new Date(
      $scope.startDate.getFullYear(),
      $scope.startDate.getMonth(),
      $scope.startDate.getDate(),
      $scope.startTime.getHours(),
      $scope.startTime.getMinutes()
      );
    const combinedEndDateTime = new Date(
      $scope.endDate.getFullYear(),
      $scope.endDate.getMonth(),
      $scope.endDate.getDate(),
      $scope.endTime.getHours(),
      $scope.endTime.getMinutes()
      );
    const coveyData = {
      userId: userIdFactory.getUserId(),
      name: $scope.name,
      location: $scope.location,
      address: $scope.address,
      city: $scope.city,
      state: $scope.state,
      startTime: combinedStartDateTime,
      endTime: combinedEndDateTime,
      details: $scope.details,
      blurb: $scope.details.length > 100
        ? $scope.details.slice(0, 97).concat('...')
        : $scope.details,
      photoUrl: $scope.photoUrl,
    };
    coveysFactory.postCovey(coveyData)
      .then((response) => {
        if (response.status !== 201) {
          // Shows error if post was not successful
          if (!$scope.errorVisible) $scope.toggleErrorVisibility();
        } else {
          $scope.toggleModalVisibility();
          $scope.resetFormFields();
          const newCoveyId = response.data.id;
          // Redirects the user to the new covey page
          $location.path(`/coveys/${newCoveyId}`);
        }
      });
  };
  // Toggles visibility of the modal whenever the create covey button is clicked
  $rootScope.$on('toggleCreateCoveyModal', () => {
    $scope.toggleModalVisibility();
  });
});
