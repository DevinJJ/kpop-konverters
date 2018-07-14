var addParagraphBtn = document.getElementById("add-paragraph-btn");
var addVideoBtn = document.getElementById("add-video-btn");
var addPictureBtn = document.getElementById("add-picture-btn");
var addPictureCaptionBtn = document.getElementById("add-picture-caption-btn");

var videoField = document.getElementById("vid");
var pictureField = document.getElementById("picture");
var pictureCaptionField = document.getElementById("pictureCaption");

var paragraphToAdd = document.getElementsByClassName("new-paragraph");

var numParagraphsAdded = 0;

addParagraphBtn.addEventListener("click", function(){
    if(numParagraphsAdded <= paragraphToAdd.length -1)
    {
           paragraphToAdd[numParagraphsAdded].style.display = ""; 
           numParagraphsAdded ++;
    }
    else
    {
        alert("Max Number of Paragraphs Reached");
    }
});

addVideoBtn.addEventListener("click", function(){
    videoField.style.display = "";
});
addPictureBtn.addEventListener("click", function(){
    pictureField.style.display = "";
});
addPictureCaptionBtn.addEventListener("click", function(){
    pictureCaptionField.style.display = "";
});