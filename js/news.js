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
        toggleSpinner(true);
        // start the spinner
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
  displayNews.textContent = "";
  newses.forEach((news) => {
    // console.log(news);
    const newDiv = document.createElement("div");
    newDiv.classList.add("card", "my-5", "border-0", "shadow-lg", "rounded-3");
    newDiv.innerHTML = `
    <div class="row g-0">
      <div class="col-md-4">
        <img
          id="news-img"
          style="height: 250px; width: 250px"
          src=${news.image_url}
          class="img-fluid rounded-start p-3"
          alt="..."
        />
      </div>
      <div class="col-md-8">
        <div class="card-body pt-5">
          <h5 id="news-heading" class="card-title">${news.title}</h5>
          <p id="news-text" class="card-text">
           ${news.details.slice(0, 300)}
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
                <h6 class="m-0">${news.author.name}</h6>
                <p class="mt-1" style="color:#718797;font-size:14px;">${
                  news.author.published_date
                }</p>
              </div>
            </div>
            <div id="views">
              <div class="count-people">
                <i class="fa-regular fa-eye me-2"></i> 1.5M
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
  console.log("all data loaded");
  toggleSpinner(false);
};

const showNewsDetails = async (news_id) => {
  const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
  const res = await fetch(url);
  const data = await res.json();
  loadNewsDetails(data.data[0]);
};
const loadNewsDetails = (details) => {
  console.log(details);
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

showCategory();
