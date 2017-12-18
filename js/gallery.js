'use strict';

window.Gallery = (function () {

  var picturesList = document.querySelector('.pictures');

  var makeFragment = function () {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.pictures.length; i++) {
      fragment.appendChild(window.renderPicture(i));
    }
    return fragment;
  };

  picturesList.appendChild(makeFragment());

})();
