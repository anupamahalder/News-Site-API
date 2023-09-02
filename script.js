const loadCategory = () =>{
    fetch("https://openapi.programming-hero.com/api/news/categories")
    .then(res => res.json())
    .then(data => console.log(data))
    //catch the error
    .catch(err => console.log(err));
}
//another way to write above code with async keyword then we do not need chaining of .then
const loadCategory2 = async () =>{
    // await keyword will help to wait until the data is not fetched then it can goes down otherwise not
    const response = await fetch("https://openapi.programming-hero.com/api/news/categories");
    const data = response.json();
    console.log(data);
}

// loadCategory();
// loadCategory2();


// ----------------------------OUR JS STARTS HERE ---------------------------
const handleCategory=async()=>{
    const response = await fetch("https://openapi.programming-hero.com/api/news/categories");
    const data = await response.json();
    //object to object
    console.log(data.data.news_category);

    //get the tab container
    const tabContainer = document.getElementById('tab-container');
    //run for each loop on an array and slice(start index,end index) for required number of tabs
    const trimedData = data.data.news_category.slice(0,8);
    trimedData.forEach((category) => {
        // create a div for each category 
        const div = document.createElement('div');
        // we will use string to put dynamic value in innerHTML
        div.innerHTML = `
        <a onclick="handleLoadNews('${category.category_id}')" class="tab">${category.category_name}</a> 
        `
        //appned the div container to tabContainer
        tabContainer.appendChild(div);
    });
};

// create a function 
const handleLoadNews= async(categoryId)=>{
    console.log(categoryId);
    // fetch the news from news category by category id 
    // to put any dynamic value use template string
    const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`);
    const data = await response.json();
    //get the card container
    const cardContainer = document.getElementById('card-container');
    // clear the div 
    cardContainer.innerHTML = "";
    //run loop to each data 
    data.data?.forEach((news) => {
        const div = document.createElement('div');
        // create innerHTML 
        div.innerHTML = `
        <div class="card w-96 mx-auto bg-base-100 shadow-xl">
        <figure><img src=${news?.image_url} alt="news" /></figure>
        <div class="card-body">
          <h2 class="card-title">
            ${news.title.slice(0,40)}
            <div class="badge badge-secondary">${news?.rating?.badge}</div>
          </h2>
          <p>${news.details.slice(0,100)}</p>
          <h3>Total Views: ${news.total_view?news.total_view:"No view"}</h3>
          <div class="px-2 flex justify-between">
          <div class="flex">
            <div class="avatar online pr-2">
                <div class="w-10 rounded-full">
                    <img src=${news?.author?.img} />
                </div>
            </div>
            <div>
              <p>${news?.author?.name}</p>
              <p>${news?.author?.published_date}</p>
            </div>
          </div>
          <div>
            <button onclick="handleModal('${news._id}')" class="btn btn-active btn-neutral">DETAILS</button>
          </div>
        </div>
        </div>
      </div>
        `;
        cardContainer.appendChild(div);
    });
};
//Handle modal
const handleModal = async(newsId) =>{
    const response = await fetch(`https://openapi.programming-hero.com/api/news/${newsId}`);
    const data = await response.json();
    console.log(data.data[0]);
    const modalContainer = document.getElementById('modal-container');
    const div = document.createElement('div');
    div.innerHTML = `
        <button class="btn" onclick="my_modal_1.showModal()">open modal</button>
        <dialog id="my_modal_1" class="modal">
        <form method="dialog" class="modal-box">
            <img class="mx-auto" src=${data.data[0]?.thumbnail_url} alt="">    
            <div class="p-4">
                <h1 class="text-2xl font-bold py-2">${data.data[0]?.title}</h1>
                <p>${data.data[0]?.details}</p>
            </div>
            <div class="modal-action">
                <button class="btn mx-auto">Close</button>
            </div>
        </form>
        </dialog>
    `;
    modalContainer.appendChild(div);
    //call the modal
    const modal = document.getElementById("my_modal_1");
    modal.showModal();
}



handleCategory();
//globally call to see default data
handleLoadNews("01");