angular.module('covey.covey')
.directive('coveyDetails', () => (
  {
    templateUrl: 'features/covey/views/detailsView.html',
  }
))
.directive('coveyAttendees', () => (
  {
    templateUrl: 'features/attendees/views/attendeesView.html',
    controller: 'attendeesController',
  }
))
.directive('rides', () => (
  {
    templateUrl: 'features/rides/views/ridesView.html',
    controller: 'ridesController',
  }
))
.directive('supplies', () => (
  {
    templateUrl: 'features/supplies/views/suppliesView.html',
    controller: 'suppliesController',
  }
))
.directive('chat', () => (
  {
    templateUrl: 'features/chat/views/chatView.html',
    controller: 'chatController',
  }
))
.directive('expenses', () => (
  {
    templateUrl: 'features/expenses/views/expensesView.html',
    controller: 'expensesController',
  }
))
.directive('format', ['$filter', function ($filter) {
  return {
    require: '?ngModel',
    link: (scope, elem, attrs, ctrl) => {
      if (!ctrl) return;
      ctrl.$formatters.unshift(() => $filter(attrs.format)(ctrl.$modelValue));
      elem.bind('blur', () => {
        const plainNumber = elem.val().replace(/[^\d|\-+|\.+]/g, '');
        elem.val($filter(attrs.format)(plainNumber));
      });
    },
  };
}]);
