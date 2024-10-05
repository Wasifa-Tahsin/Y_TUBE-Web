// fetch the catagory from API 
//loaded the catgorise
const loadbtnCatagory = ()=>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/categories`)
    .then(responce => responce.json())
    .then(data => displayBTnCategories(data.categories))
    .catch((error) => console.log(error));

}
//loaded the videos
const loadVideos = () => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos`) 
    .then(responce => responce.json())
    .then(data => displayVidios(data.videos))
    .catch((error) => console.log(error));
}
//remove btn classs list
const removeClass = () => {
    const removeClassBtn = document.getElementsByClassName('btn-category')
    // console.log(removeClassBtn);
    for (const remove of removeClassBtn) {
        remove.classList.remove('bg-red-500');
    }
}
const loadCategoriseVideos = (id) => {
    // alert(id)
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(responce => responce.json())
    .then(data => {
        removeClass();
        const btnID = document.getElementById(`btn-${id}`)
        btnID.classList.add('bg-red-500');
        displayVidios(data.category)
    })
    .catch((error) => console.log(error));

}

//displayCategories for nav btn
const displayBTnCategories = (catagories) =>{
    const loadCatagorySection = document.getElementById('categories');
        catagories.forEach(item => {
        // console.log(item)

        //create element for btn
        const createButtonSection = document.createElement('div');
        createButtonSection.innerHTML = `
        <button id = "btn-${item.category_id}" onclick ="loadCategoriseVideos(${item.category_id})" 
        class="btn btn-category text-xl font-semibold">${item.category}</button>
        `;
        loadCatagorySection.append(createButtonSection);
    })
}

//display All videos
const displayVidios = (videos) =>{
    const videoSection = document.getElementById('videos');
    videoSection.innerHTML = '';
    // console.log(videos)
    if (videos.length == 0) {
        videoSection.classList.remove('grid')
        videoSection.innerHTML = `
            <div class= "my-32">
                <img class = "w-44 mx-auto"  src = "./asset/Icon.png" />
                <h2 class="pt-5 text-center text-2xl font-bold"> No Content Here in this Category </h2>
            </div>
        `
        console.log('no more content')
    }
    else {
        videoSection.classList.add('grid')
    }
    // console.log(videos.length)
    videos.forEach(video => {
        // console.log(video)
        // create a videos section
        const createVideoSContainer = document.createElement('div');
        createVideoSContainer.classList = ('card card-compact')
        createVideoSContainer.innerHTML = `
        <figure class = "h-[270px] object-cover">
            <img class="w-full h-full"
            src=${video.thumbnail}
            alt="video Thumbanail" />
        </figure>
        <div class="flex my-2">
            <div>
                <img class = "h-10 w-10 rounded-full"
                 src=${video.authors[0].profile_picture} />
            </div>
            <div>
                <h2 class = "pl-2 text-2xl font-bold ">${video.title}</h2>
                <div class = "flex items-center pl-2">
                    <h2 class = "text-lg text-gray-700 ">${video.authors[0].profile_name}</h2>
                    ${video.authors[0].verified == true ? 
                    `<img class = "h-5 w-5 ml-1" src ="./asset/verify.png" />`: ""}
                </div>
            </div>
        </div>
        `;
        videoSection.append(createVideoSContainer);
    })
}
// fucntion calling area 
loadbtnCatagory();
loadVideos();