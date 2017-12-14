'use strict';

window.Pictures = (function () {

  var ENTER_KEYCODE = 13;
  var pictureTemplate = document.querySelector('#picture-template').content;

  window.renderPicture = function (pic) {
    var picElement = pictureTemplate.cloneNode(true);

    picElement.querySelector('img').src = window.pictures[pic].url;
    picElement.querySelector('.picture-likes').textContent = window.pictures[pic].likes;
    picElement.querySelector('.picture-comments').textContent = window.pictures[pic].comments.length;
    picElement.querySelector('a').addEventListener('click', function (event) {
      event.preventDefault();
      window.showOverlay(pic);
    });
    picElement.querySelector('a').addEventListener('keydown', function (event) {
      if (event.keyCode === ENTER_KEYCODE) {
        window.showOverlay(pic);
      }
    });

    return picElement;
  };

})();
