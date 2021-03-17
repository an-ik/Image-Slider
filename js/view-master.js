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
const createNewImageListNoATag = (function () {                                                     //Clone images from gallery and builds imgReel
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
          viewMasterModal.classList.toggle('display-modal');                                        //add class to show view master modal
          viewMaster.classList.toggle('display-view-master');                                       //add class to show view master
          document.querySelector('body').classList.toggle('stop-scroll');                           //add class to stop background scroll
}

slideimgReel = () => {
          imgReel.classList.add('slide-effect');
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
          if (setLeftPosition == ((imgArray.length - 1) * 100)) {                                   //add class if last image is displayed
                    nextButton.classList.add('disable-button');
          }
          if (setLeftPosition < ((imgArray.length - 1) * 100)) {                                    //remove class if last image is not displayed 
                    nextButton.classList.remove('disable-button');
          }
          if (setLeftPosition == 0) {
                    previousButton.classList.add('disable-button');                                 //add class if last image is displayed
          }
          if (setLeftPosition > 0) {
                    previousButton.classList.remove('disable-button');                              //remove class if last image is not displayed
          }
          else return;
}

updatePagination = () => {
          pagination.innerHTML = (imgArrayIndex + 1) + ' of ' + (imgArray.length);                  //Update pagination based on what image you are viewing
}

//Click Event listeners
nextButton.addEventListener('click', displayNextImage)                                              //display next image
previousButton.addEventListener('click', displayPreviousImage)                                      //display previous image
closeButton.addEventListener('click', toggleViewMaster)                                             //close view master
galleryUl.addEventListener('click', function (e) {                                                  //when a gallery image is clicked
          findClickedImageIndex(e);
          toggleViewMaster();
          slideimgReel();
          updatePagination();
          addRemoveNextPreviousButtons();
})
//Key Event listeners
document.addEventListener('keyup', function(e) {   
          if (e.keyCode == 39) {displayNextImage();}                                                //right arrow display next image
          if (e.keyCode == 37) {displayPreviousImage();}                                            //left arrow display previous image
          if (e.keyCode == 27) {                                                                    //esc close view master
                    if (viewMasterModal.classList == ('view-master-modal display-modal')) {         //prevent toggle when view master is not displayed
                              toggleViewMaster();
                    }
          }
})

//Touch support
let startX = null;                                          
let viewPortWidth = null;
var initialSetLeftPosition = null;

function getStartX(e) {
          e.preventDefault();
          initialSetLeftPosition = setLeftPosition;
          viewPortWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);        //get viewport width
          startX = Math.round((e.changedTouches[0].clientX / viewPortWidth) * 100);                           //get x position from initial touch and convert to percent of screen (1-100)
}

function getNewXandMoveSlider(e) {
          e.preventDefault();
          var newX = Math.round((e.changedTouches[0].clientX / viewPortWidth) * 100);                         //get x position from moving touch and convert to percent of screen (1-100)
          if (newX < startX && newX > 0 && setLeftPosition < ((imgArray.length-1) * 100)) {                   //if left swipe direction, in viewport, and not the last slide
                    var dX = startX - newX;                                                                   //calculate difference
                    setLeftPosition = initialSetLeftPosition + dX;                                            //calculate new setLeftPosition
                    slideimgReel();                                                                           //call function
          }
          if (newX > startX && newX < 100 && setLeftPosition > 0) {                                           //if right swipe direction, in viewport, and not first slide
                    var dX = newX - startX;                                                                   //calculate difference
                    setLeftPosition = initialSetLeftPosition - dX;                                            //calculate new setLeftPosition
                    slideimgReel();                                                                           //call function
          }
}

function getLastXandPinSlider(e) {
          e.preventDefault();
          lastX = Math.round((e.changedTouches[0].clientX / viewPortWidth) * 100);                            //get x position of last touch and convert to percent of screen (1-100)
          if (startX < lastX && setLeftPosition > 0) {                                                        //if right swipe direction and not first slide 
                    setLeftPosition = (Math.floor(setLeftPosition / 100)) * 100;                              //floor setLeftPosition       
                    slideimgReel();
                    imgArrayIndex--;
                    updatePagination();
                    addRemoveNextPreviousButtons();
          }
          if (startX > lastX && setLeftPosition < ((imgArray.length-1) * 100)) {                              //if left swipe direction and not last slide
                    setLeftPosition = (Math.ceil(setLeftPosition / 100)) * 100;                               //ceil setLeftPosition
                    slideimgReel();                                                                           
                    imgArrayIndex++;
                    updatePagination();
                    addRemoveNextPreviousButtons();
          }
}

imgReel.addEventListener('touchstart', getStartX, false)
imgReel.addEventListener('touchmove', getNewXandMoveSlider, false)
imgReel.addEventListener('touchend', getLastXandPinSlider, false)