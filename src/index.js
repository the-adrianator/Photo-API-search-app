const button = document.querySelector('.btn');
const description = document.querySelector('.description');
const photoContainer = document.querySelector('#photo-container');
const photoDivs = document.querySelectorAll('.photo-div');
const photoDiv1 = document.querySelector('#photo-div1');
const photoDiv2 = document.querySelector('#photo-div2');
const photoDiv3 = document.querySelector('#photo-div3');
let nextPage;
let photoColumnCounter = 0;
let slideIndex = 0
showSlides()

function showSlides() {
    let i;
    let slides = document.getElementsByClassName('slides')
    for (i =0; i < slides.length; i++) {
        slides[i].style.display = 'none'
    }
    slideIndex++
    if (slideIndex > slides.length) {slideIndex = 1}
    slides[slideIndex-1].style.display = 'block'
    setTimeout(showSlides, 5000)
}


var searchForm = document.querySelector('#search-form')
searchForm.addEventListener('submit', function(e) {
    e.preventDefault()
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            const res = JSON.parse(xhttp.responseText);
            const photoData = res.photos;
            
            nextPage = res.next_page;
            photoDiv1.innerHTML = '';
            photoDiv2.innerHTML = '';
            photoDiv3.innerHTML = '';
            button.classList.add('hide');
            
            description.innerHTML = `Displaying image results for ${textValue}`;
            photoData.forEach(photo => {
                photoDiv = document.createElement('div');
                photoDiv.classList.add('photo');
                photoDiv.innerHTML = `
                    <div class='zoom'>
                        <img class='image' src=${photo.src.large}>
                        <p class='photographer-info'>${photo.photographer}</p>    
                    </div>
                `;
                photoDivs[photoColumnCounter].appendChild(photoDiv);
                if (photoColumnCounter < photoContainer.childElementCount-1){photoColumnCounter++}
                else {photoColumnCounter = 0};
                button.classList.remove('hide');
            })
        }
    };
    var textValue = document.querySelector('#search-bar').value
    xhttp.open("GET", `https://api.pexels.com/v1/search/?query=${textValue}`, true);
    xhttp.setRequestHeader('Authorization', '563492ad6f91700001000001a6f44877d6ff44f7a9f8997f0e7ef552');
    xhttp.send();
});
button.addEventListener('click', () => {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const loadMore = JSON.parse(request.responseText);
            nextPage = loadMore.next_page;
            const loadMoreData = loadMore.photos
            loadMoreData.forEach(photo => {
                photoDiv = document.createElement('div');
                photoDiv.classList.add('photo');
                photoDiv.innerHTML = `
                <div class='zoom'>
                    <img class='image' src=${photo.src.large}>
                    <p class='photographer-info'>${photo.photographer}</p>    
                    </div>
                    `;
                    photoDivs[photoColumnCounter].appendChild(photoDiv);
                    if (photoColumnCounter < photoContainer.childElementCount-1){photoColumnCounter++}
                    else {photoColumnCounter = 0};
                })
            }
        };
    request.open("GET", `${nextPage}`, true);
    request.setRequestHeader('Authorization', '563492ad6f91700001000001a6f44877d6ff44f7a9f8997f0e7ef552');
    request.send();
})