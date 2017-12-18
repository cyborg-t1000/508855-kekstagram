'use strict';

window.Preview = (function () {

  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var galleryOverlay = document.querySelector('.gallery-overlay');

  var onOverlayEscPress = function (event) {
    if (event.keyCode === ESC_KEYCODE) {
      closeOverlay();
    }
  };

  var fillOverlay = function (overlay, pic) {
    overlay.querySelector('.gallery-overlay-image').src = pic.url;
    overlay.querySelector('.likes-count').textContent = pic.likes;
    overlay.querySelector('.comments-count').textContent = pic.comments.length;
  };

  window.showOverlay = function (pic) {
    fillOverlay(galleryOverlay, window.pictures[pic]);
    document.addEventListener('keydown', onOverlayEscPress);
    galleryOverlay.classList.remove('hidden');
  };

  var closeOverlay = function () {
    galleryOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onOverlayEscPress);
  };

  galleryOverlay.querySelector('.gallery-overlay-close').addEventListener('click', function () {
    closeOverlay();
  });

  galleryOverlay.querySelector('.gallery-overlay-close').addEventListener('keydown', function (event) {
    if (event.keyCode === ENTER_KEYCODE) {
      closeOverlay();
    }
  });

})();
