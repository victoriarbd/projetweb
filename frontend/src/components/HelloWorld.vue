<template>
  <div class="card bg-light w-75">
            <div class="card-body">
              <h5 class="card-title">Recherche d'un livre </h5>
              <form class="d-flex">
                <input class="form-control" v-model="search" id="ex3" type="search" placeholder="Que recherchez-vous ?">
              </form>  
              <div class="btn-group">
                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                      Catégories
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li><a class="dropdown-item" href="#" v-for="categorie in categories" :key="categorie.id"> {{categorie.nom}} </a></li>
                    </ul>
                  </div>
                  <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                      Genres
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li><a class="dropdown-item" href="#" v-for="genre in genres" :key="genre.id"> {{genre.nom}}</a></li>
                    </ul>
                  </div>
                  <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                      Auteurs
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li><a class="dropdown-item" href="#" v-for="auteur in auteurs" :key="auteur.id">{{auteur.nom}}</a></li>
                    </ul>
                    
                  </div>
              </div>
            </div>
          </div>
</template>





<script>
import EventService from '@/services/EventService.js'

export default {
  name: 'HelloWorld',
  data(){
    return {
      categories: null,
      genres : null,
      auteurs: null,
      search:''
      //categories : [{}]
    }
  },
   created(){
      EventService.getAllCategorie()
      .then(response => {
        this.categories = response.data
      })
      .catch(error => {
        console.log(error)
      })
      EventService.getAllGenre()
      .then(response => {
        this.genres = response.data
      })
      .catch(error => {
        console.log(error)
      })
      EventService.getAllAuteur()
      .then(response => {
        this.auteurs = response.data
      })
      .catch(error => {
        console.log(error)
      })
    },/*
    computed: {
      filteredLivre: function(){
        return this.livres.filter((livre) => 
        return boolean)
      }
    }*/
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
    margin: 0 auto; /* Added */
    float: none; /* Added */
    margin-bottom: 50px; /* Added */
    margin-top: 50px;
    padding: 25px; 
    width: auto;
}

.dropdown {
    padding: 15px;
}

</style>
