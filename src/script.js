
let apiUrl1="https://www.themealdb.com/api/json/v1/1/search.php?s="


let cardArray =[]
let resultArray =[]

let searchBtn = document.getElementById("btn")
let card_header = document.querySelector(".card_header")
const modal = document.getElementById("cardModal");
const modal_img = document.getElementById("modalImg");
const modal_title = document.getElementById("modalTitle");
const modal_details = document.getElementById("modalDetails");
const closeModal = document.getElementById("closeModal");
                    // <div class="card ">
                    //     <img src="https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg" >
                    //     <div class="card_text ">
                    //         <h2 >Susi</h2>
                    //         <p >Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
                    //               repellat totam molestiae libero magnam ratione. </p>
                    //         <div class=" card_btn_div ">
                    //             <button  class=" card_btn  ">view Details</button>
                    //         </div>
                    //     </div>
                    // </div>
   
const newCard =(url,title,details)=>{
        let card = document.createElement("div")
        card.setAttribute("class","card")
        let img = document.createElement("img")
        img.setAttribute("src",url)
        let cardText = document.createElement("div")
        cardText.setAttribute("class","card_text")
        let h2 = document.createElement("h2")
        h2.innerText = title
        let p = document.createElement("p")
        p.innerText = details
        let card_btn_div = document.createElement("div")
        card_btn_div.setAttribute("class","card_btn_div")
        let button = document.createElement("button") 
        button.innerText = "view Details"
        button.setAttribute("class","card_btn")
        card_btn_div.appendChild(button)
        cardText.append(h2,p,card_btn_div)
        card.append(img,cardText)
        button.addEventListener("click", () => {
        modal_img.src = url;
        modal_title.innerText = title;
        modal_details.innerText = details;
        modal.classList.remove("hidden"); 
    });

    return card
}                

function filterArray(searchText) {
  searchText = searchText.toLowerCase().trim()
  if (searchText === "") {
    return 
  }
   resultArray = cardArray.filter(item => {
    return (
      item.titel_.toLowerCase().includes(searchText))
  })

}

async function favFood (){
     card_header.innerHTML ="Loading.........."
    let  response = await fetch(apiUrl1)
    let data = await response.json()
     card_header.innerHTML =""
   data.meals.forEach((e,index)=>{
         let title =data.meals[index].strMeal
         let url = data.meals[index].strMealThumb
         let details= data.meals[index].strInstructions.replace(/\s+/g, " ").trim().split(" ").slice(0, 16).join(" ") + "..."
         let nCard = newCard(url,title,details)
        let cardData = {
                        titel_: e.strMeal,
                        url_: e.strMealThumb,
                        details_: e.strInstructions
                    }
         cardArray.push(cardData)
         card_header.appendChild(nCard)  
   })
     
}
favFood()
searchBtn.addEventListener("click",()=>{
    let searchText = document.getElementById("inputText").value.toLowerCase().trim()
    filterArray(searchText)
    card_header.innerHTML =" "
    if(resultArray.length == 0){
        card_header.innerText = "Data not Found"
    }else{
        resultArray.forEach((element)=>{
         let titel = element.titel_
         let url = element.url_
         let details = element.details_.replace(/\s+/g, " ").trim().split(" ").slice(0, 16).join(" ") + "..."
        let card = newCard(url,titel,details)
        card_header.append(card)
    })
    }
    
})


closeModal.addEventListener("click", () => modal.classList.add("hidden"));

modal.addEventListener("click", (e) => {
    if(e.target === modal) modal.classList.add("hidden");
});


