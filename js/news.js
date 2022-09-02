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
    const newLi = document.createElement("li");
    newLi.classList.add("mx-4");
    newLi.innerText = `${category.category_name}`;
    // console.log(category);
    categoryContainer.appendChild(newLi);
  });
};

showCategory();
