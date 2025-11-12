
const cl = console.log;

// Get DOM Elements
//1
const showModalBtn = document.getElementById("showModalBtn");
const movieModal = document.getElementById("movieModal");
const backdrop = document.getElementById("backdrop");
const movieContainer = document.getElementById("movieContainer");
const closeModal = [...document.querySelectorAll(".closeModal")]; 

const movieForm =document.getElementById('movieForm');
const movieNameControl =document.getElementById('movieName');
const movieImgUrlContol =document.getElementById('movieImgUrl');
const movieDescriptionControl =document.getElementById('movieDescription');
const movieRatingControl =document.getElementById('movieRating');
const addMovieBtn = document.getElementById('addMovieBtn');
const updateMovieBtn = document.getElementById('updateMovieBtn')

// ==== MOVIE DATA ====


 let moviesArr = [

  {
    id:1,
    name: "King the Land",
    image: "https://i.mydramalist.com/wJAkqn_4c.jpg?v=1",
    desc: "Amid a tense inheritance fight, a charming heir clashes with his hardworking employee who's known for her irresistible smile, which he cannot stand.",
    rating: 4.2
  },
  {
    id:2,
    name: "Queen of Tears",
    image:"https://i.pinimg.com/736x/bf/00/9e/bf009e58832648ffb2e7bfe3b4700bb1.jpg",
    desc:"The queen of department stores and the prince of supermarkets weather a marital crisis, until love miraculously begins to bloom again.",
    rating:4.7

  },
  {
    id:3,
    name: "Business Proposal",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/1/19/A_Business_Proposal.jpg/250px-A_Business_Proposal.jpg",
    desc: "In disguise as her friend, Ha-ri shows up on a blind date to scare away her friend's prospective suitor. However, plans go awry when he turns out to be Ha-ri's CEO and he makes a proposal.",
    rating: 5
  },
    {
    id:4,
    name: "Beyond the Bar",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs_YnnYylBn4VeCScPtbCKWJivqpUm-H4EZ9Taifx3Fjnx3caYfKQOsqhRFZr3407zB3A&usqp=CAU",
    desc: "A young, rookie lawyer with a strong sense of justice joins a top law firm - navigating the complex legal world under a cold, demanding mentor.",
    rating: 4.5
  },
  {
    id:5,
    name: "extraordinary attorney woo",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9d/Strange_Lawyer_Woo_Young-woo.png/250px-Strange_Lawyer_Woo_Young-woo.png",
    desc: "A brilliant attorney with autism overcomes challenges in her career and personal life.",
    rating: 4.8
  },
  {
    id:6,
    name: "Squid Game",
    image: "https://static.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p2/84/2025/06/27/Squid-Game-3-320689428-2625895550.jpg",
    desc: "Hundreds of cash-strapped contestants accept an invitation to compete in children's games for a tempting prize, but the stakes are deadly.",
    rating: 4.7

  }

];


if(localStorage.getItem('moviesArr')){
  moviesArr = JSON.parse(localStorage.getItem('moviesArr'))
}



// UUID Function

const uuid =() => {
  return String(`xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`).replace(
    /[xy]/g, 
    character => {
      const randomNum = Math.random() * 16 | 0;
      const value = character === "x" ? randomNum : (randomNum & 0x3 | 0x8);
      return value.toString(16);
    } 
  )
}


const Setbadge=(rating)=>{
  if(rating>4){
    return "badge-success";
  }else if(rating>3&&rating<=4){
  return "badge-warning";
  }else{
    return "badge-danger";
  }
}

// ==== CREATE MOVIE CARDS ====


const createMovieCard = (arr) => {
  let result = "";
  arr.forEach(movie => {
    result += `
      <div class="col-md-3 col-sm-6">
        <div class="card movieCard text-white mb-4" id="${movie.id}">
          <div class="card-header">
            <div class="row">
              <div class="col-10">
                <h2 class="m-0">${movie.name}</h2>
              </div>
              <div class="col-2">
                <h3><span class="badge ${Setbadge(movie.rating)}" style="font-size: medium;">${movie.rating}</span>
                </h3>
              </div>
            </div>
          </div>
          <div class="card-body py-0">
            <figure>
              <img src="${movie.image}" alt="${movie.name}" title="${movie.name}" class="img-fluid mb-3">
              <figcaption>
                <h5>${movie.name}</h5>
                <p>${movie.desc}</p>
              </figcaption>
            </figure>
          </div>
          <div class="card-footer d-flex justify-content-between align-items-center">
            <div class="buttons btn btn-sm nfx-sec-btn" onClick="onMovieEdit(this)">Edit</div>
            <div class="buttons btn btn-sm nfx-pri-btn" onClick="onMovieRemove(this)">Remove</div>
          </div>
        </div>
      </div>`;
  });

  movieContainer.innerHTML = result;
};
createMovieCard(moviesArr);



// ==== ADD MOVIE ====


const onMovieAdd = eve =>{
  eve.preventDefault();
  //get new movie obj
  let movieObj = {
    name : movieNameControl.value,
    image  :movieImgUrlContol.value,
    desc :movieDescriptionControl.value,
    rating : movieRatingControl.value,
    id : uuid()
  }
  cl(movieObj); 
  // add object in array
  moviesArr.unshift(movieObj)
  //update/add array in ls/db
localStorage.setItem("moviesArr", JSON.stringify(moviesArr))
eve.target.reset()
 
  // add new card in ui
  let col3 = document.createElement('div');
  col3.className = "col-md-3 col-sm-6";
  col3.innerHTML = `<div class="card movieCard text-white mb-4" id="${movieObj.id}">
          <div class="card-header">
            <div class="row">
              <div class="col-10">
                <h2 class="m-0">${movieObj.name}</h2>
              </div>
              <div class="col-2">
                <h3><span class="badge ${Setbadge(movieObj.rating)}" style="font-size: medium;">${movieObj.rating}</span>
                </h3>
              </div>
            </div>
          </div>
          <div class="card-body py-0">
            <figure>
              <img src="${movieObj.image}" alt="${movieObj.name}" title="${movieObj.name}" class="img-fluid mb-3">
              <figcaption>
                <h5>${movieObj.name}</h5>
                <p>${movieObj.desc}</p>
              </figcaption>
            </figure>
          </div>
          <div class="card-footer d-flex justify-content-between align-items-center">
            <div class="buttons btn btn-sm nfx-sec-btn" onClick="onMovieEdit(this)">Edit</div>
            <div class="buttons btn btn-sm nfx-pri-btn" onClick="onMovieRemove(this)">Remove</div>
          </div>
        </div>
      </div>`
  movieContainer.prepend(col3)
  onModalToggle();

  Swal.fire({
    title :`The new movie ${movieObj.name} is added successfull`,
    icon : "success",
    timer : 3000
  })
}





// ==== REMOVE MOVIE ====



const onMovieRemove = (ele) =>{
Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
// get REMOVE_ID
 let REMOVE_ID = ele.closest('.card').id
cl(REMOVE_ID)
//remove object from array
let getIndex = moviesArr.findIndex(m => m.id == REMOVE_ID);
moviesArr.splice(getIndex, 1)
//update array in LS
localStorage.setItem("moviesArr", JSON.stringify(moviesArr))
//remove from UI
 ele.closest('.card').parentElement.remove()
  

    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success",
      timer: 3000
    });
  }

});
}





// ==== EDIT MOVIE ====



const onMovieEdit = (ele) =>{

  let EDIT_ID = ele.closest('.card').id;
 
  localStorage.setItem("EDIT_ID", EDIT_ID)
  
// EDIT_OBJ

let EDIT_OBJ = moviesArr.find(m => m.id == EDIT_ID)



onModalToggle();
addMovieBtn.classList.add('d-none')
updateMovieBtn.classList.remove('d-none')

movieNameControl.value = EDIT_OBJ.name;
movieDescriptionControl.value = EDIT_OBJ.desc;
movieImgUrlContol.value = EDIT_OBJ.image;
movieRatingControl.value = EDIT_OBJ.rating;
}


// ==== UPDATE MOVIE ====

const onMovieUpdate =()=>{

  //UDATE_ID
  let UDATE_ID = localStorage.getItem('EDIT_ID');
  localStorage.removeItem('EDIT_ID')


  //UPDATED_OBJ
  let UPDATED_OBJ ={
    name : movieNameControl.value,
    image  :movieImgUrlContol.value,
    desc :movieDescriptionControl.value,
    rating : movieRatingControl.value,
    id : UDATE_ID
  }
  onModalToggle()
  
  //update obje in array
let GET_INDEX = moviesArr.findIndex(m => m.id == UDATE_ID)

moviesArr[GET_INDEX] = UPDATED_OBJ
  //then update array in ls

localStorage.setItem("moviesArr", JSON.stringify(moviesArr)) 
//udate on ui

let card = document.getElementById(UDATE_ID)
card.innerHTML =`<div class="card-header">
            <div class="row">
              <div class="col-10">
                <h2 class="m-0">${UPDATED_OBJ.name}</h2>
              </div>
              <div class="col-2">
                <h3><span class="badge ${Setbadge(UPDATED_OBJ.rating)}" style="font-size: medium;">${UPDATED_OBJ.rating}</span>
                </h3>
              </div>
            </div>
          </div>
          <div class="card-body py-0">
            <figure>
              <img src="${UPDATED_OBJ.image}" alt="${UPDATED_OBJ.name}" title="${UPDATED_OBJ.name}" class="img-fluid mb-3">
              <figcaption>
                <h5>${UPDATED_OBJ.name}</h5>
                <p>${UPDATED_OBJ.desc}</p>
              </figcaption>
            </figure>
          </div>
          <div class="card-footer d-flex justify-content-between align-items-center">
            <div class="buttons btn btn-sm nfx-sec-btn" onClick="onMovieEdit(this)">Edit</div>
            <div class="buttons btn btn-sm nfx-pri-btn" onClick="onMovieRemove(this)">Remove</div>
          </div>
        </div>`


}


// Show Function

// function onMovieModalShow(){
//   movieModal.classList.add("active");
//   backdrop.classList.add("active");
// }
// Hide Function
// 
// function onModalHide(){
//   movieModal.classList.remove("active");
//   backdrop.classList.remove("active");
// }



function onModalToggle(){
  movieModal.classList.toggle("active");
  backdrop.classList.toggle("active");

  movieForm.reset();
  addMovieBtn.classList.remove('d-none')
  updateMovieBtn.classList.add('d-none')

}




// Event Listeners


showModalBtn.addEventListener("click", onModalToggle);
movieForm.addEventListener("submit", onMovieAdd);
updateMovieBtn.addEventListener("click", onMovieUpdate);



closeModal.forEach(btn => {
  btn.addEventListener("click", onModalToggle)
  
})
