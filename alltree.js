const allTrees = () => {
    const url = "https://openapi.programming-hero.com/api/plants";
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        displayplants(data.plants);
        console.log(data);
    })

};

const displayplants = (plants) => {
    const plantContainer = document.getElementById("plant-container");
    plantContainer.innerHTML = "";

    plants.forEach(plant => {
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="p-[16px] bg-white rounded-lg flex flex-col h-full shadow-md ">
            <figure>
                <img class="w-full h-[186px] rounded-lg shadow-md" src="${plant.image}" />
            </figure>
            <div class="card-body flex-1 ">
                <h2 class="text-xl font-semibold mt-2">${plant.name}</h2>
                <p class="text-sm text-[#1F2937] ">${plant.description}</p>
                <div class="flex justify-between items-center mt-[8px]">
                    <div class="text-[#15803D] bg-[#DCFCE7] px-[12px] py-[4px] rounded-full ">${plant.category}</div>
                    <div class="font-semibold"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${plant.price}</div>
                </div>
                <div>
                    <button class="add-to-cart w-full bg-[#15803D] py-[12px] text-white rounded-full mt-5" 
                        data-name="${plant.name}" data-price="${plant.price}">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>`;
        plantContainer.appendChild(div);
    });

    // button event//
    const addToCartBtn = document.querySelectorAll(".add-to-cart");
    addToCartBtn.forEach(button => {
        button.addEventListener("click", (e) => {
            const name = e.target.getAttribute("data-name");
            const price = parseFloat(e.target.getAttribute("data-price"));
            addToCart({ name, price });
        });
    });
};



const cart = [];

const addToCart = (item) => {
    const existingItem = cart.find(i => i.name === item.name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        item.quantity = 1;
        cart.push(item);
    }
    renderCart();
}

function removeFromCart(itemName) {
    const index = cart.findIndex(item => item.name === itemName);
    if(index !== -1){
        cart.splice(index,1);
    }
    renderCart();
}

function renderCart() {
    const cartContainer = document.getElementById("cart-container");
    const cartTotal = document.getElementById("cart-total");

    cartContainer.innerHTML = "";

    let totalPrice = 0;

    cart.forEach(item => {
        totalPrice += item.price * item.quantity;

        const itemDiv = document.createElement("div");
        itemDiv.className = "bg-green-100 p-1 rounded-lg mb-2 flex justify-between items-center w-full gap-4";

        itemDiv.innerHTML = `
            <div class=" ">
                <div class="font-semibold whitespace-nowrap">${item.name}</div>
                <div>৳${item.price} × ${item.quantity}</div>
            </div>
            <button class="text-gray-700 hover:text-red-600 font-bold text-xl remove-item">&times;</button>
        `;

        itemDiv.querySelector(".remove-item").addEventListener("click", () => {
            removeFromCart(item.name);
        });

        cartContainer.appendChild(itemDiv);
    });

    cartTotal.textContent = `৳  ${totalPrice}`;
}




const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then(res => res.json())
        .then(json => displayCategory(json.categories));
        //console.log(json);
        
};


const loadCategory = (categoryName) => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then(res => res.json())
    .then(data => {
      const filteredPlants = data.plants.filter(plant => plant.category === categoryName);
      displayplants(filteredPlants);
    })
    .catch(err => console.error("Failed to load plants by category:", err));
};






const displayCategory=(categories) => {
  //console.log(categories);

  const categoriesContainer = document.getElementById("categories-container");
  categoriesContainer.innerHTML= "";

  categories.forEach(category=>{
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML= `
    <button class="hover:bg-[#15803D] cursor-pointer hover:text-white px-[19px] whitespace-nowrap" onclick="loadCategory('${category.category_name}')" >${category.category_name}</button>`;

    categoriesContainer.appendChild(btnDiv);
  });

};

const categoriesContainer = document.getElementById("categories-container");


categoriesContainer.addEventListener("click", (e) =>{
  const allBtn= categoriesContainer.querySelectorAll('button')
  allBtn.forEach(button=>{
    button.classList.remove('bg-green-700', 'text-white')
  })

  if(e.target.localName === 'button') {
    console.log(e.target)
    e.target.classList.add('bg-green-700', 'text-white')
  }
});









loadCategories();
allTrees();


