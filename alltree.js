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


   plants.forEach(plant=>{
    //console.log(plant);
    const div= document.createElement("div");
    div.innerHTML=`<div class=" p-[16px] bg-white rounded-lg flex flex-col h-full shadow-md ">
  <figure>
    <img class="w-full h-[186px] rounded-lg shadow-md" 
      src="${plant.image}" 
      
  </figure>
  <div class="card-body flex-1 ">
    <h2 class="text-xl font-semibold mt-2">${plant.name}</h2>
    <p class="text-sm text-[#1F2937]">${plant.description}</p>
    <div class="flex justify-between items-center mt-[8px]">
    <div class="text-[#15803D] bg-[#DCFCE7] px-[12px] py-[4px] rounded-full ">${plant.category}</div>
    <div class="font-semibold"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${plant.price}</div>
   </div>
    <div class="">
      <button class="w-full bg-[#15803D] py-[12px] text-white rounded-full mt-5">Add to Cart</button>
    </div>
  </div>
</div>`
    console.log(div);

    plantContainer.appendChild(div);
   })
};

