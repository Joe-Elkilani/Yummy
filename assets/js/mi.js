$(document).ready(() => {
  $(".inner-loading-screen").fadeOut(1000, () => {
    $("body").removeClass("overflow-hidden");
    $(".inner-loading-screen").remove();
  });

  function toggleSideNav(open) {
    const sideNav = $(".side-nav-menu");
    const icon = $(".open-close-icon");
    const links = $(".links li");

    if (open) {
      sideNav.animate({ left: 0 }, 500);
      icon.removeClass("fa-align-justify").addClass("fa-x");
      links.each(function (i) {
        $(this).animate({ top: 0 }, (i + 5) * 100);
      });
    } else {
      const boxWidth = $(".side-nav-menu .nav-tab").outerWidth();
      sideNav.animate({ left: -boxWidth }, 500);
      icon.addClass("fa-align-justify").removeClass("fa-x");
      links.animate({ top: 300 }, 500);
    }
  }
  toggleSideNav(false);
  $(".side-nav-menu i.open-close-icon").click(() => {
    const isOpen = $(".side-nav-menu").css("left") === "0px";
    toggleSideNav(!isOpen);
  });
});

// async function getImages() {
//   let response = await fetch(
//     `https://www.themealdb.com/api/json/v1/1/categories.php`
//   );
//   response = await response.json();
//   let content = `
//         <div class="cardItem overflow-hidden mb-4 col-lg-3 w-25 col-sm-6">
//             <img
//                 src="${response.categories[0].strCategoryThumb}"
//                 class="w-100"
//                 alt="Image 1"
//             />
//         </div>
//     `;
// }

// async function getCategoryMeals() {
//   let response = await fetch(
//     `https://www.themealdb.com/api/json/v1/1/categories.php`
//   );
//   response = await response.json();

//   let content = "";

//   for (let i = 0; i < response.categories.length; i++) {
//     let category = response.categories[i];
//     content += `
//       <div class="col-md-3">
//         <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
//             <img class="w-100" src="${category.strCategoryThumb}" alt="">
//             <div class="meal-layer position-absolute text-center text-black p-2">
//                 <h3>${category.strCategory}</h3>
//             </div>
//         </div>
//       </div>
//     `;
//   }

//   document.getElementById("rowData").innerHTML = content;
// }

// getCategoryMeals();

function createMealCard({ idMeal, strMeal, strMealThumb }) {
  return `
      <div class="col-md-3">
        <div onclick="getMealDetails('${idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
          <img class="w-100" src="${strMealThumb}" alt="">
          <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
            <h3>${strMeal}</h3>
          </div>
        </div>
      </div>`;
}

function displayMeals(arr) {
  rowData.innerHTML = arr.map(createMealCard).join("");
}

async function getCategories() {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let data = await response.json();
  console.log(data.categories);

  displayCategories(data.categories);
  $(".inner-loading-screen").fadeOut(300);
}

function createCategoryCard({
  strCategory,
  strCategoryThumb,
  strCategoryDescription,
}) {
  return `
      <div class="col-md-3">
        <div onclick="getCategoryMeals('${strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
          <img class="w-100" src="${strCategoryThumb}" alt="">
          <div class="meal-layer position-absolute text-center text-black p-2">
            <h3>${strCategory}</h3>
            <p>${strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
          </div>
        </div>
      </div>`;
}

function displayCategories(arr) {
  document.getElementById("rowData").innerHTML = arr
    .map(createCategoryCard)
    .join("");
}
getCategories();
