const showCategory = async () => {
  const url = "https://openapi.programming-hero.com/api/news/categories";
  const res = await fetch(url);
  const data = await res.json();
  loadCategory(data.data.news_category);
};
const categoryContainer = document.getElementById("category-container");

const newLi = document.createElement("li");
newLi.innerText = "Home";
categoryContainer.appendChild(newLi);
const loadCategory = (categories) => {
  categories.forEach((category) => {
    categoryContainer.addEventListener("click", function (e) {
      if (e.target.innerText === category.category_name) {
        showCategoryData(category.category_id);
      }
    });
    const newLi = document.createElement("li");
    newLi.classList.add("mx-4");
    newLi.innerText = `${category.category_name}`;
    // console.log(category);
    categoryContainer.appendChild(newLi);
  });
};

const showCategoryData = async (category_id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
  const res = await fetch(url);
  const data = await res.json();
  loadCategoryData(data.data);
};

const loadCategoryData = (newses) => {
  const displayNews = document.getElementById("display-news");
  newses.forEach((news) => {
    // console.log(news);
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `
    
    `
  });
};

showCategory();
