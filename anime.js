// import {API_URL} from './config'

const API_URL = "https://api.jikan.moe/v3"

function searchAnime(e){

  e.preventDefault()

  const form = new FormData(this)
  const query = form.get('search')
  console.log(query);

  fetch(`${API_URL}/search/anime?q=${query}&page=1`)
  .then(res=>res.json())
  .then(updateDom)
  .catch(err=>console.error(err))


}

function updateDom(data){

  const searchResults = document.getElementById('search-results')
  
  const animeByCategories = data.results
    .reduce((acc, anime)=>{

      const{type} = anime;
      if(acc[type] === undefined) acc[type] = [];
      acc[type].push(anime);
      return acc;

    }, {});
    searchResults.innerHTML = Object.keys(animeByCategories).map(key=>{

      const animesHTML = animeByCategories[key]
      .sort((a,b)=>a.episodes-b.episodes)
      .map(anime=>{
        return `
           
            <div class="col s12 m7">
              <div class="card">
                <div class="card-image">
                    <img src="${anime.image_url}">
                    <span class="card-title">${anime.title}</span>
                </div>
                <div class="card-content">
                  <p>${anime.synopsis}.</p>
                </div>
                <div class="card-action">
                  <a href="${anime.url}" target="_blank">Learn more</a>
                </div>
              </div>
            </div>
          
            
        
        `
        
      }).join("")  

      return `
        <section>
          <h3>${key.toUpperCase()}</h3>
          <div class="kemicofa-row">${animesHTML}</div>
        </section>
      `

    }).join("")

    

}

function pageLoaded(){
    const form = document.getElementById('search_form');
    form.addEventListener('submit', searchAnime)
   

}





window.addEventListener('load', pageLoaded)