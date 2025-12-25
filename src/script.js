
let apiUrl1="https://www.themealdb.com/api/json/v1/1/search.php?s="
let apiUrl2="https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}"
let apiUrl3="https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}"


async function favFood (){
    let  response = await fetch(apiUrl1)
    let data = await response.json()
    console.log(data.meals[1])
   data.meals.forEach((e)=>{
    console.log(e)
   })
}
favFood()