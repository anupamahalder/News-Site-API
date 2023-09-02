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
}
handleCategory();