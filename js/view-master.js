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

//Functions
const createNewImageListNoATag = (function () {
          let ul = document.createElement("ul");
          for (var i = 0; i < imgArray.length; i++) {
                    let li = document.createElement("li");
                    let img = imgArray[i].firstElementChild.firstElementChild.cloneNode(true);
                    li.insertAdjacentElement('afterbegin', img);
                    ul.insertAdjacentElement('beforeend', li);
          }
          viewMaster.insertAdjacentElement('beforeend', ul);
          imgReel = document.querySelector('.view-master ul')
}())

findClickedImageIndex = (e) => {
          let galleryclickedImage = e.target.closest('li');
          imgArrayIndex = imgArray.findIndex(img => img === galleryclickedImage);
          setLeftPosition = imgArrayIndex * 100;
}

toggleViewMaster = () => {
          viewMasterModal.classList.toggle('modal-is-displayed');
          document.querySelector('body').classList.toggle('stopScroll');
          if (imgReel.children[imgArrayIndex].classList == 'viewed-image') {
                    imgReel.children[imgArrayIndex].classList.toggle('viewed-image');
          }
}

slideimgReel = () => {
          imgReel.style.left = '-' + setLeftPosition + '%';
}

updateImgOpacity = () => {
          imgReel.children[imgArrayIndex].classList.toggle('viewed-image');
}

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
          if (e.keyCode == 27) {toggleViewMaster();}
})