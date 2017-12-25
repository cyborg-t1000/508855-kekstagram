'use strict';

window.Upload = (function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var uploadForm = document.querySelector('#upload-select-image');
  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadFile = document.querySelector('#upload-file');
  var uploadFormCancel = uploadOverlay.querySelector('.upload-form-cancel');
  var effectImagePreview = uploadOverlay.querySelector('.effect-image-preview');
  var uploadEffectControls = uploadOverlay.querySelector('.upload-effect-controls');
  var uploadResizeControls = uploadOverlay.querySelector('.upload-resize-controls');
  var uploadFormHashtags = uploadOverlay.querySelector('.upload-form-hashtags');
  var uploadEffectLevel = uploadEffectControls.querySelector('.upload-effect-level');
  var uploadEffectLevelPin = uploadEffectLevel.querySelector('.upload-effect-level-pin');
  var uploadEffectLevelVal = uploadEffectLevel.querySelector('.upload-effect-level-val');
  var selectedEffect = '';

  var setEffectValue = function (value, effect) {
    uploadEffectLevelPin.style.left = value + '%';
    uploadEffectLevelVal.style.width = value + '%';
    uploadEffectLevel.querySelector('input').value = value;
    switch (effect) {
      case 'chrome':
        effectImagePreview.style.filter = 'grayscale(' + value / 100 + ')';
        break;
      case 'sepia':
        effectImagePreview.style.filter = 'sepia(' + value / 100 + ')';
        break;
      case 'marvin':
        effectImagePreview.style.filter = 'invert(' + value + '%)';
        break;
      case 'phobos':
        effectImagePreview.style.filter = 'blur(' + (value / 100 * 3) + 'px)';
        break;
      case 'heat':
        effectImagePreview.style.filter = 'brightness(' + (value / 100 * 3) + ')';
        break;
    }
  };

  var sliderMoving = function (event) {
    var line = uploadEffectLevel.querySelector('.upload-effect-level-line').getBoundingClientRect();
    var newValue = (event.clientX - line.left) * 100 / (line.right - line.left);
    if (newValue < 0) {
      newValue = 0;
    }
    if (newValue > 100) {
      newValue = 100;
    }
    setEffectValue(newValue, window.selectedEffect);
  };

  var sliderStopMove = function (event) {
    event.preventDefault();
    document.removeEventListener('mousemove', sliderMoving);
    document.removeEventListener('mousemove', sliderStopMove);
  };

  var addSliderListener = function () {
    uploadEffectLevelPin.addEventListener('mousedown', function (event) {
      event.preventDefault();
      document.addEventListener('mousemove', sliderMoving);
      document.addEventListener('mouseup', sliderStopMove);
    });
  };

  var onUploadOverlayEscPress = function (event) {
    if (event.keyCode === ESC_KEYCODE) {
      closeUploadOverlay();
    }
  };

  var openUploadOverlay = function () {
    if (uploadEffectControls.querySelector('input[name = "effect"]:checked').value === 'none') {
      uploadEffectLevel.classList.add('hidden');
    } else {
      uploadEffectLevel.classList.remove('hidden');
    }
    uploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onUploadOverlayEscPress);
    addSliderListener();
  };

  var closeUploadOverlay = function () {
    uploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onUploadOverlayEscPress);
  };

  uploadFile.addEventListener('change', function () {
    openUploadOverlay();
  });

  uploadFormCancel.addEventListener('click', function () {
    closeUploadOverlay();
  });

  uploadFormCancel.addEventListener('keydown', function (event) {
    if (event.keyCode === ENTER_KEYCODE) {
      closeUploadOverlay();
    }
  });

  var applyFilter = function(newFilter) {
    effectImagePreview.classList.value = 'effect-image-preview';
    effectImagePreview.classList.add('effect-' + newFilter);
    if (newFilter === 'none') {
      uploadEffectLevel.classList.add('hidden');
    } else {
      uploadEffectLevel.classList.remove('hidden');
    }
    setEffectValue(100, newFilter);
  };

  window.initializeFilters(uploadEffectControls, applyFilter);


  var adjustScale = function (scale) {
    effectImagePreview.style.transform = 'scale(' + scale / 100 + ')';
  };
  window.initializeScale(uploadResizeControls, adjustScale);

  var arrayUnique = function (arr) {
    var u = [];
    var d = [];
    arr.forEach(function (n) {
      if (u.indexOf(n) === -1) {
        u.push(n);
      } else {
        d.push(n);
      }
    });
    return [u, d];
  };

  uploadForm.addEventListener('submit', function (event) {
    if (uploadFormHashtags.value.length === 0) {
      return true;
    }
    var re = /\s/;
    var tags = uploadFormHashtags.value.trim().toLowerCase().split(re);
    var errors = 0;
    tags.forEach(function (element) {
      if (element.substring(0, 1) !== '#') {
        errors++;
      }
      if (element.indexOf('#', 1) >= 0) {
        errors++;
      }
      if (element.length > 20) {
        errors++;
      }
    });

    var checkDuplicates = arrayUnique(tags);
    if (checkDuplicates[1].length > 0) {
      errors++;
    }
    if (tags.length > 5) {
      errors++;
    }

    if (errors === 0) {
      return true;
    } else {
      event.preventDefault();
      uploadFormHashtags.style.borderColor = 'red';
      uploadFormHashtags.focus();
      return false;
    }
  });

})();
