const base_url = "https://api.jikan.moe/v3";


function searchAnime(event){

    event.preventDefault();

    const formulario = new FormData(this);
    const busqueda = formulario.get("busqueda");

    fetch(`${base_url}/search/anime?q=${busqueda}&page=1`)
    .then(res=>res.json())
    .then(updateDom)
    .catch(err=>console.warn(err.message));
}

function updateDom(data){

    const buscar = document.getElementById('buscar-resultados');

    const anime = data.results
        .reduce((acc, anime)=>{

            const {type} = anime;
            if(acc[type] === undefined) acc[type] = [];
            acc[type].push(anime);
            return acc;

        }, {

            
            

        });


        buscar.innerHTML = Object.keys(anime).map(key=>{

            const animesHTML = anime[key]
            .sort((a,b)=>a.episodes-b.episodes)
            .map(anime=>{
                return `
                    <div class="carta">
                        <div class="imagen-carta">
                            <img src="${anime.image_url}">
                        </div>
                        <div class="contenido-carta">
                            <span class="titulo-carta">${anime.title}</span>
                            <p>${anime.synopsis}</p>f
                        </div>
                        <div class="accion-carta">
                            <a href="${anime.url}">Mas Info</a>
                        </div>
                    </div>
                `
            }).join("");


            return `
                <section>
                    <h3>${key.toUpperCase()}</h3>
                    <div class="animeshtml">${animesHTML}</div>
                </section>
            `
        }).join("");
}

function pageLoaded(){
    const form = document.getElementById('formulario_busqueda');
    form.addEventListener("submit", searchAnime);
}


window.addEventListener("load", pageLoaded);