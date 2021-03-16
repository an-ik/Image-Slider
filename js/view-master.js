//Variables
const     gallery             = document.querySelector('.gallery'),
          galleryUl           = document.querySelector('.gallery ul'),
          imgArray            = Array.from(galleryUl.children),
          viewMasterModal     = document.querySelector('.view-master-modal'),
          nextButton          = document.querySelector('.next-image-btn'),
          previousButton      = document.querySelector('.previous-image-btn'),
          closeButton         = document.querySelector('.view-master-close-btn'),
          pagination          = document.querySelector('.pagination');
var       viewMaster          = document.querySelector('.view-master'),
          imgReel             = "",
          setLeftPosition     = 0,
          imgArrayIndex       = 0;

//Functions
const createNewImageListNoATag = (function () {                                                     //Clone images from gallery
          let ul = document.createElement("ul");                                                    //Create ul
          for (var i = 0; i < imgArray.length; i++) {                                               
                    let li = document.createElement("li");                                          //Create li
                    let img = imgArray[i].firstElementChild.firstElementChild.cloneNode(true);      //Get image
                    li.insertAdjacentElement('afterbegin', img);                                    //Insert image into li
                    ul.insertAdjacentElement('beforeend', li);                                      //Insert li into ul
          }
          viewMaster.insertAdjacentElement('beforeend', ul);                                        //add ul to viewMaster
          imgReel = document.querySelector('.view-master ul');                                      //get imgReel from newly created ul
}())

findClickedImageIndex = (e) => {                                                                    
          let galleryclickedImage = e.target.closest('li');                                         //find li of clicked image
          imgArrayIndex = imgArray.findIndex(img => img === galleryclickedImage);                   //find index of li
          setLeftPosition = imgArrayIndex * 100;                                                    //scroll imgReel to the li
}

toggleViewMaster = () => {
          viewMasterModal.classList.toggle('modal-is-displayed');                                   //add class to show view master modal
          viewMaster.classList.toggle('show-view-master');                                          //add class to show view master
          document.querySelector('body').classList.toggle('stopScroll');                            //add class to stop background scroll
}

function slideimgReel() {
          imgReel.style.transform = 'translate(-' + setLeftPosition + '%)';                         //slide imgReel based on the value of setLeftPosition
}

displayNextImage = () => {
          if (setLeftPosition != ((imgArray.length - 1) * 100)) {                                   //if setLeftPosition is not equal to the last image
                    setLeftPosition = setLeftPosition + 100;                                        //update setLeftPosition          
                    slideimgReel();                                                                 //call function
                    imgArrayIndex++;                                                                //increment
                    updatePagination();                                                             //call function
                    addRemoveNextPreviousButtons();                                                 //call function
          }
          else return;         
}

displayPreviousImage = () => {
          if (setLeftPosition > 0) {                                                                //if setLeftPosition is not equal to the first image
                    setLeftPosition = setLeftPosition - 100;                                        //update setLeftPosition
                    slideimgReel();                                                                 //call function
                    imgArrayIndex--;                                                                //decrement
                    updatePagination();                                                             //call function
                    addRemoveNextPreviousButtons();                                                 //call function
          }
          else return; 
}

addRemoveNextPreviousButtons = () => {
          if (setLeftPosition == ((imgArray.length - 1) * 100) || setLeftPosition == 0) {           //add class if last image is displayed
                    nextButton.classList.add('d-none');
          }
          if (setLeftPosition < ((imgArray.length - 1) * 100)) {                                    //remove class if last image is not displayed 
                    nextButton.classList.remove('d-none');
          }
          if (setLeftPosition == 0) {
                    previousButton.classList.add('d-none');                                         //add class if last image is displayed
          }
          if (setLeftPosition > 0) {
                    previousButton.classList.remove('d-none');                                      //remove class if last image is not displayed
          }
          else return;
}

updatePagination = () => {
          pagination.innerHTML = (imgArrayIndex + 1) + ' of ' + (imgArray.length);                  //Update pagination based on what image you are viewing
}

//Click Event listeners
nextButton.addEventListener('click', displayNextImage)
previousButton.addEventListener('click', displayPreviousImage)
closeButton.addEventListener('click', toggleViewMaster)
galleryUl.addEventListener('click', function (e) {
          findClickedImageIndex(e);
          toggleViewMaster();
          slideimgReel();
          updatePagination();
          addRemoveNextPreviousButtons();
})
//Key Event listeners
document.addEventListener('keyup', function(e) {   
          if (e.keyCode == 39) {displayNextImage();}
          if (e.keyCode == 37) {displayPreviousImage();}
          if (e.keyCode == 27) {
                    if (viewMasterModal.classList == ('view-master-modal modal-is-displayed')) {
                              toggleViewMaster();
                    }
          }
})

//Touch support
let startX = null;
let viewPortWidth = null;
var initialSetLeftPosition = null;
var clicked = false;

function getStartX(e) {
          e.preventDefault();
          imgReel.classList.remove('smooth');
          initialSetLeftPosition = setLeftPosition;
          viewPortWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
          startX = Math.round((e.clientX / viewPortWidth) * 100);
          clicked = true;
}

function getNewXandMoveSlider(e) {
          e.preventDefault();
          var newX = Math.round((e.clientX / viewPortWidth) * 100);
          if (newX < startX && newX > 0 && setLeftPosition < ((imgArray.length-1) * 100) && clicked) {
                    var dX = startX - newX;
                    setLeftPosition = initialSetLeftPosition + dX;
                    slideimgReel();
          }
          if (newX > startX && newX < 100 && setLeftPosition > 0 && clicked) {
                    var dX = newX - startX;
                    setLeftPosition = initialSetLeftPosition - dX;
                    slideimgReel();
          }
}

function getLastXandPinSlider(e) {
          e.preventDefault();
          lastX = Math.round((e.clientX / viewPortWidth) * 100);
          imgReel.classList.add('smooth');
          if (startX < lastX && setLeftPosition > 0) {
                    setLeftPosition = (Math.floor(setLeftPosition / 100)) * 100;
                    slideimgReel();
                    imgArrayIndex--;
                    updatePagination();
                    addRemoveNextPreviousButtons();
          }
          if (startX > lastX && setLeftPosition < ((imgArray.length - 1) * 100)) {
                    setLeftPosition = (Math.ceil(setLeftPosition / 100)) * 100;
                    slideimgReel();
                    imgArrayIndex++;
                    updatePagination();
                    addRemoveNextPreviousButtons();
          }
          clicked = false;
}

imgReel.addEventListener('touchstart', getStartX, false);
imgReel.addEventListener('mousedown', getStartX, false);
imgReel.addEventListener('touchmove', getNewXandMoveSlider, false);
imgReel.addEventListener('mousemove', getNewXandMoveSlider, false); 
imgReel.addEventListener('touchend', getLastXandPinSlider, false);
imgReel.addEventListener('mouseup', getLastXandPinSlider, false);