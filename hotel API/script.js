const API_URL = "https://demohotelsapi.pythonanywhere.com/hotels/";

const hotelContainer = document.getElementById("hotelContainer");

async function getHotels() {

    hotelContainer.innerHTML = "<h2>Loading Hotels...</h2>";

    try {

        const response = await fetch(API_URL);

        const hotels = await response.json();

        displayHotels(hotels);

    }

    catch(error){

        hotelContainer.innerHTML = "<h2>Failed to Load Hotels</h2>";

        console.log(error);

    }

}

function displayHotels(hotels){

    hotelContainer.innerHTML = "";

    hotels.forEach(hotel => {

        hotelContainer.innerHTML += `

        <div class="hotel-card">

            <img src="${hotel.image}" alt="${hotel.name}">

            <div class="hotel-info">

                <h3>${hotel.name}</h3>

                <p>📍 ${hotel.location}</p>

                <p class="price">₹${hotel.price}</p>

                <p class="rating">⭐ ${hotel.rating}</p>

                <button onclick="viewHotel(${hotel.id})">
                    View Details
                </button>

            </div>

        </div>

        `;

    });

}

function viewHotel(id){

    alert("Hotel ID : " + id);

}

getHotels();
// ================= API =================

const API_URL = "https://demohotelsapi.pythonanywhere.com/hotels/";

const hotelContainer = document.getElementById("hotelContainer");
const searchInput = document.getElementById("search");
const citySelect = document.getElementById("city");
const sortSelect = document.getElementById("sort");

let hotels = [];
let filteredHotels = [];

// ================= GET HOTELS =================

async function getHotels(){

    hotelContainer.innerHTML="<h2>Loading...</h2>";

    try{

        const response = await fetch(API_URL);

        hotels = await response.json();

        filteredHotels = hotels;

        displayHotels(filteredHotels);

    }

    catch(error){

        hotelContainer.innerHTML="<h2>Failed to Load Hotels</h2>";

        console.log(error);

    }

}

// ================= DISPLAY =================

function displayHotels(data){

    hotelContainer.innerHTML="";

    if(data.length===0){

        hotelContainer.innerHTML="<h2>No Hotel Found</h2>";

        return;

    }

    data.forEach(hotel=>{

        hotelContainer.innerHTML+=`

        <div class="hotel-card">

            <img src="${hotel.image}" alt="${hotel.name}">

            <div class="hotel-info">

                <h3>${hotel.name}</h3>

                <p>📍 ${hotel.location}</p>

                <p class="price">₹${hotel.price}</p>

                <p class="rating">⭐ ${hotel.rating}</p>

                <button onclick="viewHotel(${hotel.id})">
                View Details
                </button>

            </div>

        </div>

        `;

    });

}

// ================= SEARCH =================

searchInput.addEventListener("keyup",()=>{

    const value = searchInput.value.toLowerCase();

    filteredHotels = hotels.filter(hotel=>

        hotel.name.toLowerCase().includes(value) ||

        hotel.location.toLowerCase().includes(value)

    );

    displayHotels(filteredHotels);

});

// ================= CITY FILTER =================

citySelect.addEventListener("change",()=>{

    const city = citySelect.value;

    if(city==="All Cities"){

        filteredHotels = hotels;

    }

    else{

        filteredHotels = hotels.filter(hotel=>

        hotel.location===city);

    }

    displayHotels(filteredHotels);

});
// ================= SORT =================

sortSelect.addEventListener("change", () => {

    let value = sortSelect.value;

    let temp = [...filteredHotels];

    if (value === "low") {

        temp.sort((a, b) => a.price - b.price);

    }

    else if (value === "high") {

        temp.sort((a, b) => b.price - a.price);

    }

    else if (value === "rating") {

        temp.sort((a, b) => b.rating - a.rating);

    }

    displayHotels(temp);

});

// ================= PRICE FILTER =================

const minPrice = document.getElementById("minPrice");
const maxPrice = document.getElementById("maxPrice");
const priceBtn = document.getElementById("priceBtn");

priceBtn.addEventListener("click", () => {

    const min = Number(minPrice.value);
    const max = Number(maxPrice.value);

    let result = hotels.filter(hotel => {

        return hotel.price >= min && hotel.price <= max;

    });

    filteredHotels = result;

    displayHotels(result);

});

// ================= RATING FILTER =================

const rating = document.getElementById("rating");

rating.addEventListener("change", () => {

    if (rating.value == "") {

        displayHotels(filteredHotels);

        return;

    }

    let result = filteredHotels.filter(hotel => {

        return hotel.rating >= Number(rating.value);

    });

    displayHotels(result);

});

// ================= RESET FILTER =================

function resetFilters() {

    searchInput.value = "";

    citySelect.value = "All Cities";

    sortSelect.value = "";

    minPrice.value = "";

    maxPrice.value = "";

    rating.value = "";

    filteredHotels = hotels;

    displayHotels(filteredHotels);

}
// ================= PAGINATION =================

let currentPage = 1;
const hotelsPerPage = 6;

function paginateHotels(data) {

    const start = (currentPage - 1) * hotelsPerPage;
    const end = start + hotelsPerPage;

    displayHotels(data.slice(start, end));

}

function nextPage() {

    if (currentPage * hotelsPerPage < filteredHotels.length) {

        currentPage++;

        paginateHotels(filteredHotels);

    }

}

function prevPage() {

    if (currentPage > 1) {

        currentPage--;

        paginateHotels(filteredHotels);

    }

}

// ================= VIEW DETAILS =================

function viewHotel(id) {

    localStorage.setItem("hotelId", id);

    window.location.href = "details.html";

}

// ================= LOADING =================

function showLoading() {

    hotelContainer.innerHTML = `
        <div class="loading">
            <h2>Loading Hotels...</h2>
        </div>
    `;

}

// ================= ERROR =================

function showError() {

    hotelContainer.innerHTML = `
        <div class="loading">
            <h2>Something Went Wrong</h2>
        </div>
    `;

}

// ================= START =================

getHotels();
const API_URL = "https://demohotelsapi.pythonanywhere.com/hotels/";

const hotelId = localStorage.getItem("hotelId");

const details = document.getElementById("hotelDetails");

async function getHotelDetails() {

    details.innerHTML = "<h2>Loading...</h2>";

    try {

        const response = await fetch(API_URL + hotelId + "/");

        const hotel = await response.json();

        details.innerHTML = `

        <div class="detail-card">

            <img src="${hotel.image}" alt="${hotel.name}">

            <h1>${hotel.name}</h1>

            <h3>📍 ${hotel.location}</h3>

            <h2>₹${hotel.price}</h2>

            <p>⭐ ${hotel.rating}</p>

            <p>${hotel.description || "Best luxury hotel with premium facilities."}</p>

            <button onclick="bookHotel()">
                Book Now
            </button>

        </div>

        `;

    } catch (error) {

        details.innerHTML = "<h2>Hotel Not Found</h2>";

        console.log(error);

    }

}

function bookHotel() {

    alert("Booking Successful 🎉");

}

getHotelDetails();