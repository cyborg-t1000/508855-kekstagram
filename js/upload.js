'use strict';

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

var onUploadOverlayEscPress = function (event) {
  if (event.keyCode === ESC_KEYCODE) {
    closeUploadOverlay();
  }
};

var openUploadOverlay = function () {
  uploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onUploadOverlayEscPress);
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

uploadEffectControls.addEventListener('change', function (event) {
  var target = event.target ? event.target : event.srcElement;
  if (target.name === 'effect') {
    event.stopPropagation();
    effectImagePreview.classList.value = 'effect-image-preview';
    effectImagePreview.classList.add('effect-' + target.value);
  }
});

var resizeImage = function (delta) {
  var newValue = parseInt(uploadResizeControls.querySelector('.upload-resize-controls-value').value, 0) + delta;
  if (newValue < 25) {
    newValue = 25;
  }
  if (newValue > 100) {
    newValue = 100;
  }
  uploadResizeControls.querySelector('.upload-resize-controls-value').value = newValue + '%';
  effectImagePreview.style.transform = 'scale(' + newValue / 100 + ')';
};

uploadResizeControls.querySelector('.upload-resize-controls-button-dec').addEventListener('click', function () {
  resizeImage(-25);
});

uploadResizeControls.querySelector('.upload-resize-controls-button-inc').addEventListener('click', function () {
  resizeImage(25);
});

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
