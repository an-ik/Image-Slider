// Variables
const     viewMasterModal     = document.querySelector('.view-master-modal'),
          nextButton          = document.querySelector('.next-image-btn'),
          previousButton      = document.querySelector('.previous-image-btn'),
          closeButton         = document.querySelector('.view-master-close-btn'),
          gallery             = document.querySelector('.gallery'),
          galleryArray        = Array.from(gallery.children),
          reel                = document.querySelector('.reel-images'),
          pagination          = document.querySelector('.pagination');
var       galleryImageindex   = 0;

// Functions
const findClickedImageIndex = (e) => {
          const galleryclickedImage = e.target.closest('a'); 
          galleryImageIndex = galleryArray.findIndex(image => image === galleryclickedImage);
}

const toggleViewMaster = () => {
          viewMasterModal.classList.toggle('modal-is-displayed');
}

const displayImageInViewMaster = () => {
          insertCurrentImage();
          updatePagination();
}

const insertCurrentImage = () => {
          reel.innerHTML = (galleryArray[galleryImageIndex].innerHTML);
}

const displayNextImage = () => {
          if (galleryImageIndex >= galleryArray.length - 1) {
                    galleryImageIndex = 0;
                    insertCurrentImage();
                    updatePagination();
          }
          else {
                    galleryImageIndex++;
                    insertCurrentImage();
                    updatePagination();
          }
}

const displayPreviousImage = () => {
          if (galleryImageIndex === 0) {
                    galleryImageIndex = galleryArray.length - 1;
                    insertCurrentImage();
                    updatePagination();
          }
          else {
                    galleryImageIndex--;
                    insertCurrentImage();
                    updatePagination();
          }
}

const updatePagination = () => {
          pagination.innerHTML = (galleryImageIndex + 1) + ' / ' + (galleryArray.length);
}

// Events
gallery.addEventListener('click', e => {
          findClickedImageIndex(e);
          toggleViewMaster(); 
          displayImageInViewMaster();
})

nextButton.addEventListener('click', () => {
          displayNextImage()
})
previousButton.addEventListener('click', () => {
          displayPreviousImage();
})

closeButton.addEventListener('click', () => {
          toggleViewMaster();
})

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