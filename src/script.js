
let apiUrl1="https://www.themealdb.com/api/json/v1/1/search.php?s="
let apiUrl2="https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}"
let apiUrl3="https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}"


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
        return card
}                



async function favFood (){
    let  response = await fetch(apiUrl1)
    let data = await response.json()


   data.meals.forEach((e,index)=>{
         let title =data.meals[index].strMeal
         let url = data.meals[index].strMealThumb
         let details= data.meals[index].strInstructions.replace(/\s+/g, " ").trim().split(" ").slice(0, 16).join(" ") + "..."
         let nCard = newCard(url,title,details)
        let card_header = document.querySelector(".card_header")
         card_header.appendChild(nCard)
         
   })
     
}
favFood()