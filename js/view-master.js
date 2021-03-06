// Variables
const     gallery                       = document.querySelector('.gallery'),
          galleryUl                     = document.querySelector('.gallery ul'),
          imgArray                      = Array.from(galleryUl.children),
          viewMasterModal               = document.querySelector('.view-master-modal'),
          nextButton                    = document.querySelector('.next-image-btn'),
          previousButton                = document.querySelector('.previous-image-btn'),
          closeButton                   = document.querySelector('.view-master-close-btn'),
          pagination                    = document.querySelector('.pagination');
var       viewMaster                    = document.querySelector('.view-master'),
          imgReel                       = "";
          setLeftPosition               = 0,
          imgArrayIndex                 = 0;

//Clone images from gallery ul li
//Create a ul, create li
//Insert image into li
//Add ul to imgReel
const createNewImageListNoATag = (function () {
          let ul = document.createElement("ul");
          for (var i = 0; i < imgArray.length; i++) {
                    let li = document.createElement("li");
                    let img = imgArray[i].firstElementChild.firstElementChild.cloneNode(true);
                    li.insertAdjacentElement('afterbegin', img);
                    ul.insertAdjacentElement('beforeend', li);
          }
          viewMaster.insertAdjacentElement('beforeend', ul);
          imgReel = document.querySelector('.view-master ul');
}())

//Find the array index of the clicked on image
//update setLeftPosition which will tell how much to slide the imgReel
findClickedImageIndex = (e) => {
          let galleryclickedImage = e.target.closest('li');
          imgArrayIndex = imgArray.findIndex(img => img === galleryclickedImage);
          setLeftPosition = imgArrayIndex * 100;
}

//Show or hides the view-master 
//Prevents body from scrolling
//Shows or hides the clicked image
toggleViewMaster = () => {
          viewMasterModal.classList.toggle('modal-is-displayed');
          document.querySelector('body').classList.toggle('stopScroll');
          if (imgReel.children[imgArrayIndex].classList == 'viewed-image') {
                    updateImgOpacity();
          }
}

//Slides imgReel to the clicked image
function slideimgReel() {
          imgReel.style.transform = 'translate(-' + setLeftPosition + '%)';
}

//Shows or hides the clicked image
updateImgOpacity = () => {
          imgReel.children[imgArrayIndex].classList.toggle('viewed-image');
}

//Displays next image
displayNextImage = () => {
          if (setLeftPosition != ((imgArray.length-1) * 100)) {
                    setLeftPosition = setLeftPosition + 100;
                    slideimgReel();
                    updateImgOpacity();
                    imgArrayIndex++;
                    updateImgOpacity();
                    updatePagination();
                    addRemoveNextPreviousButtons();
          }
          else return;         
}

//Displays previous image
displayPreviousImage = () => {
          if (setLeftPosition > 0) {
                    setLeftPosition = setLeftPosition - 100;
                    slideimgReel();
                    updateImgOpacity();
                    imgArrayIndex--;
                    updateImgOpacity();
                    updatePagination();
                    addRemoveNextPreviousButtons();
          }
          else return; 
}

//Show or hide next and previous buttons if you hit the beginning or end of the imgReel
addRemoveNextPreviousButtons = () => {
          if (setLeftPosition == ((imgArray.length - 1) * 100)) {
                    nextButton.classList.add('d-none');
          }
          if (setLeftPosition < ((imgArray.length - 1) * 100)) {
                    nextButton.classList.remove('d-none');
          }
          if (setLeftPosition == 0) {
                    previousButton.classList.add('d-none');
          }
          if (setLeftPosition > 0) {
                    previousButton.classList.remove('d-none');
          }
          else return;
}

//Updates pagination based on what image you are viewing
updatePagination = () => {
          pagination.innerHTML = (imgArrayIndex + 1) + ' of ' + (imgArray.length);
}

//Event listeners
nextButton.addEventListener('click', displayNextImage)
previousButton.addEventListener('click', displayPreviousImage)
closeButton.addEventListener('click', toggleViewMaster)

galleryUl.addEventListener('click', function (e) {
          findClickedImageIndex(e);
          toggleViewMaster();
          slideimgReel();
          updateImgOpacity();
          updatePagination();
          addRemoveNextPreviousButtons();
})

document.addEventListener('keyup', function(e) {   
          if (e.keyCode == 39) {displayNextImage();}
          if (e.keyCode == 37) {displayPreviousImage();}
          if (e.keyCode == 27) {
                    if (viewMasterModal.classList == ('view-master-modal modal-is-displayed')) {
                              toggleViewMaster();
                    }
          }
})

let startX = null;
let viewPortWidth = null;
var initialSetLeftPosition = null;


imgReel.addEventListener('touchstart', e => {
          e.preventDefault();
          initialSetLeftPosition = setLeftPosition;
          viewPortWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
          startX = Math.round((e.changedTouches[0].clientX / viewPortWidth) * 100);
}, false)

imgReel.addEventListener('touchmove', e => {
          e.preventDefault();
          var newX = Math.round((e.changedTouches[0].clientX / viewPortWidth) * 100);
          if (newX < startX && newX > 0 && setLeftPosition < ((imgArray.length-1) * 100)) {
                    var dX = startX - newX;
                    setLeftPosition = initialSetLeftPosition + dX;
                    slideimgReel();
          }
          if (newX > startX && newX < 100 && setLeftPosition > 0) {
                    var dX = newX - startX;
                    setLeftPosition = initialSetLeftPosition - dX;
                    slideimgReel();
          }
}, false)
      
imgReel.addEventListener('touchend', e => {
          e.preventDefault();
          lastX = Math.round((e.changedTouches[0].clientX / viewPortWidth) * 100);
          console.log(startX, lastX);
          if (startX < lastX && setLeftPosition > 0) {
                    setLeftPosition = (Math.floor(setLeftPosition / 100)) * 100;
                    slideimgReel();
                    imgArrayIndex--;
                    updatePagination();
                    addRemoveNextPreviousButtons();
          }
          if (startX > lastX && setLeftPosition < ((imgArray.length-1) * 100)) {
                    setLeftPosition = (Math.ceil(setLeftPosition / 100)) * 100;
                    slideimgReel();
                    imgArrayIndex++;
                    updatePagination();
                    addRemoveNextPreviousButtons();
          }
}, false)