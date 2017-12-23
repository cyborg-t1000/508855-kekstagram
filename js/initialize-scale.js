'use strict';

window.Scale = (function () {

  var initializeScale = function (scaleElement, adjustScale) {

    var resizeImage = function (delta) {
      var newValue = parseInt(scaleElement.querySelector('.upload-resize-controls-value').value, 0) + delta;
      if (newValue < 25) {
        newValue = 25;
      }
      if (newValue > 100) {
        newValue = 100;
      }
      scaleElement.querySelector('.upload-resize-controls-value').value = newValue + '%';
      adjustScale(newValue);
    };

    scaleElement.querySelector('.upload-resize-controls-button-dec').addEventListener('click', function () {
      resizeImage(-25);
    });

    scaleElement.querySelector('.upload-resize-controls-button-inc').addEventListener('click', function () {
      resizeImage(25);
    });

  };

  window.initializeScale = initializeScale;

})();
