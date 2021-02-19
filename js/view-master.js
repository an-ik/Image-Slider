// Variables
const     
          imageReel                     = document.querySelector('.gallery ul'),
          gallery                       = document.querySelector('.gallery'),
          imageArray                    = Array.from(imageReel.children),
          viewMaster                    = document.querySelector('.view-master'),
          AddViewMasterImageReel        = viewMaster.innerHTML += imageReel.outerHTML,
          ViewMasterImageReel           = document.querySelector('.view-master ul'),
          nextButton                    = document.querySelector('.next-image-btn'),
          previousButton                = document.querySelector('.previous-image-btn'),
          closeButton                   = document.querySelector('.view-master-close-btn'),
          pagination                    = document.querySelector('.pagination'),
          viewMasterModal               = document.querySelector('.view-master-modal');
var       setLeftPosition               = 0,
          imageArrayIndex               = 0;
          
//logic
gallery.addEventListener('click', e => {
          findClickedImageIndex(e);
          toggleViewMaster();
          slideImageReelLeft();
          updateImgOpacity();
          updatePagination();
          addRemoveNextPreviousButtons();
})

nextButton.addEventListener('click', () => {
          displayNextImage()
})

previousButton.addEventListener('click', () => {
          displayPreviousImage();
})

closeButton.addEventListener('click', () => {
          toggleViewMaster();
          ViewMasterImageReel.children[imageArrayIndex].classList.toggle('viewed-image');
})

//touch


//Functions
const findClickedImageIndex = (e) => {
          const galleryclickedImage = e.target.closest('li'); 
          imageArrayIndex = imageArray.findIndex(img => img === galleryclickedImage);
          setLeftPosition = imageArrayIndex * 100;
}

const toggleViewMaster = () => {
          viewMasterModal.classList.toggle('modal-is-displayed');
          document.querySelector('body').classList.toggle('stopScroll');
}

const slideImageReelLeft = () => {
          ViewMasterImageReel.style.left = '-' + setLeftPosition + '%';
}

const updateImgOpacity = () => {
          ViewMasterImageReel.children[imageArrayIndex].classList.toggle('viewed-image');
}

const displayNextImage = () => {
          if (setLeftPosition != ((imageArray.length-1) * 100)) {
                    setLeftPosition = setLeftPosition + 100;
                    slideImageReelLeft();
                    updateImgOpacity();
                    imageArrayIndex++;
                    updateImgOpacity();
                    updatePagination();
                    addRemoveNextPreviousButtons();
          }
          else return;         
}

const displayPreviousImage = () => {
          if (setLeftPosition > 0) {
                    setLeftPosition = setLeftPosition - 100;
                    slideImageReelLeft();
                    updateImgOpacity();
                    imageArrayIndex--;
                    updateImgOpacity();
                    updatePagination();
                    addRemoveNextPreviousButtons();
          }
          else return; 
}

const addRemoveNextPreviousButtons = () => {
          if (setLeftPosition == ((imageArray.length - 1) * 100)) {
                    nextButton.classList.add('d-none');
          }
          if (setLeftPosition < ((imageArray.length - 1) * 100)) {
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

const updatePagination = () => {
          pagination.innerHTML = (imageArrayIndex + 1) + ' / ' + (imageArray.length);
}

//Event listeners
document.addEventListener('keyup', e => {   
          if (e.keyCode == 39) {
                    displayNextImage();    
          }
          if (e.keyCode == 37) {
                    displayPreviousImage();    
          }
          if (e.keyCode == 27) {
                    if (viewMasterModal.className === 'view-master-modal modal-is-displayed') {
                              toggleViewMaster();   
                    }
          }
})