'use strict';

window.Filters = (function () {

  var initializeFilters = function (filterElement, applyFilter) {

    filterElement.addEventListener('change', function (event) {
      var target = event.target ? event.target : event.srcElement;
      if (target.name === 'effect') {
        event.stopPropagation();
        window.selectedEffect = target.value;
        applyFilter(window.selectedEffect);
      }
    });

  };

  window.initializeFilters = initializeFilters;

})();
