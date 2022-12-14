// get api data for categories
const showCategory = async () => {
  const url = "https://openapi.programming-hero.com/api/news/categories";
  try {
    const res = await fetch(url);
    const data = await res.json();
    loadCategory(data.data.news_category);
  } catch (error) {
    console.log(error);
  }
};
// add home li on the ul container
const categoryContainer = document.getElementById("category-container");
const newLi = document.createElement("li");
newLi.classList.add("mx-4");
newLi.innerText = "Home";
categoryContainer.appendChild(newLi);

// show categories by id
const loadCategory = (categories) => {
  categories.forEach((category) => {
    categoryContainer.addEventListener("click", function (e) {
      if (e.target.innerText === category.category_name) {
        // start the spinner
        toggleSpinner(true);
        showCategoryData(category.category_id);
        showNewsCounter(category.category_id);
      }
    });
    // create new li
    const newLi = document.createElement("li");
    newLi.classList.add("mx-4");
    newLi.innerText = `${category.category_name}`;
    categoryContainer.appendChild(newLi);
  });
};

// show News-Counter
const showNewsCounter = async (count_id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${count_id} `;
  try {
    const res = await fetch(url);
    const data = await res.json();
    loadNewsCounter(data.data);
  } catch (error) {
    console.log(error);
  }
};
const newsCounter = document.getElementById("news-counter");
const noMsgFound = document.getElementById("no-found-message");
const loadNewsCounter = (counter) => {
  if (counter.length == 0) {
    noMsgFound.classList.remove("d-none");
    newsCounter.value = ` 0 items found`;
  } else {
    newsCounter.value = `${counter.length} items found`;
    noMsgFound.classList.add("d-none");
  }
};
const showCategoryData = async (category_id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    loadCategoryData(data.data);
  } catch (error) {
    console.log(error);
  }
};

// display news to the UI
const loadCategoryData = (newses) => {
  function compare(b, a) {
    if (a.total_view < b.total_view) {
      return -1;
    }
    if (a.last_nom > b.last_nom) {
      return 1;
    }
    return 0;
  }
  newses.sort(compare);
  const displayNews = document.getElementById("display-news");
  displayNews.textContent = "";
  newses.forEach((news) => {
    const newDiv = document.createElement("div");
    newDiv.classList.add("card", "my-5", "border-0", "shadow-lg", "rounded-3");
    newDiv.innerHTML = `
    <div class="row g-0">
      <div  id="news-img" class="col-md-4">
      <div>
        <img
          style="height: 250px; width: 250px"
          src=${news.image_url}
          class="img-fluid rounded-start p-3"
          alt="..."
        />
      </div>
      </div>
      <div class="col-md-8">
        <div class="card-body pt-5">
          <h5 id="news-heading" class="card-title">${news.title}</h5>
          <p id="news-text" class="card-text">
           ${news.details.slice(0, 300)}...
          </p>
          <div class="d-flex align-items-center">
            <div id="viewers" class="d-flex me-5 pe-5">
              <div class="me-2">
                <img
                  style="height: 30px; border-radius: 50%; width: 30px"
                  src=${news.author.img}
                  alt=""
                />
              </div>
              <div>
                <h6 class="m-0 author-name">${
                  news.author.name ? news.author.name : "No data found"
                }</h6>
                <p class="mt-1" style="color:#718797;font-size:14px;">${
                  news.author.published_date
                    ? news.author.published_date
                    : "No data found"
                }</p>
              </div>
            </div>
            <div id="views">
              <div class="count-people">
                <i class="fa-regular fa-eye me-2"></i> ${
                  news.total_view ? news.total_view : "No data found"
                }
              </div>
            </div>
            <button id="show-details" class="btn btn-primary ms-5" onclick="showNewsDetails('${
              news._id
            }')"  data-bs-toggle="modal"
            data-bs-target="#newsModal">Show Details</button>
          </div>
        </div>
      </div>
    </div>
    `;
    displayNews.appendChild(newDiv);
  });
  // stop the spinner
  toggleSpinner(false);
};

// show Details on clicking show details button
const showNewsDetails = async (news_id) => {
  const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    loadNewsDetails(data.data[0]);
  } catch (error) {
    console.log(error);
  }
};

const loadNewsDetails = (details) => {
  const modalTitle = document.getElementById("modal-title");
  modalTitle.innerHTML = ` ${details.title}`;
  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `
  Author : ${details.author.name}</br>
  Released Date : ${details.author.published_date}</br>
  Rating : ${details.rating.badge}</br>
  Point :  ${details.rating.number}</br>
  Views : ${details.total_view}
  `;
};

// function for spinner
const toggleSpinner = (isLoading) => {
  const spinnerIcon = document.getElementById("spinner-icon");
  if (isLoading) {
    spinnerIcon.classList.remove("d-none");
  } else {
    spinnerIcon.classList.add("d-none");
  }
};
// show one category by default
showCategoryData("08");
// call the whole function
showCategory();
