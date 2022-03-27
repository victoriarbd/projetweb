<template>
  <div class="card bg-light w-75">
            <div class="card-body">
              <h5 class="card-title">Recherche d'un livre </h5>
              <form class="d-flex">
                <input class="form-control" v-model="search" id="ex3" type="search" placeholder="Recherche par nom et ville...">
              </form>  
              <div class="btn-group">
                <div class="dropdown">
                    <button class="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                      Catégories
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li><a class="dropdown-item" href="#" v-for="categorie in categories" :key="categorie.id" @click="searchCategorie(categorie.idcategorie)"> {{categorie.nom}} </a></li>
                    </ul>
                  </div>
                  <div class="dropdown">
                    <button class="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                      Genres
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li><a class="dropdown-item" href="#" v-for="genre in genres" :key="genre.id" @click="searchGenre(genre.idgenre)"> {{genre.nom}}</a></li>
                    </ul>
                  </div>
                  <div class="dropdown">
                    <button class="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                      Auteurs
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li><a class="dropdown-item" href="#" v-for="auteur in auteurs" :key="auteur.id" @click="searchAuteur(auteur.idauteur)">{{auteur.prenom}} {{auteur.nom}}</a></li>
                    </ul>
                    
                  </div>
              </div>
            </div>
          </div>
  <div class="home">
    
    <h2> Annonces en ligne </h2>
    
    <div class = "container-fluid">
    <div class="row row-cols-5 row-cols-lg-5 g-2 g-lg-2">
    <BookList v-for="livre in filteredBooks" :key="livre.id" :livre="livre" :auteurs="auteurs" v-bind:idcategorie="livre.idcategorie" v-bind:idgenre="livre.idgenre" v-bind:idauteur="livre.idauteur"/>
    </div>
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import BookList from '@/components/BookList.vue'
import axios from 'axios'
import EventService from '@/services/EventService.js'
export default {
  name: 'HomeView',
  components: {
    //HelloWorld,
    BookList
  },
  data(){
    return {
       livres: null,
       search : '',
       categories: null,
       genres : null,
       auteurs: null,
       livreCat : null,
       livreGenre : null,
       livreAuteur : null
    }
  },
  created(){
      EventService.getAllLivre()
      .then(response => {
        this.livres = response.data
        
      })
      .catch(error => {
        console.log(error)
      })
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
      /*
      EventService.getLivreByIdCategorie()
      .then(response => {
        this.livreCat = response.data
      })
      .catch(error => {
        console.log(error)
      })
      */
      
  },
  /*
  mounted: function () {
      if (!localStorage.getItem('user')){
        this.$router.push('/login')
      }

  },*/
  computed: {
    /*
    filteredBooks: function(){
      
      return this.livres.filter((livre) => {
        console.log(this.livreCat)
        return livre.nom.toLowerCase().match(this.search.toLowerCase()) || livre.ville.toLowerCase().match(this.search.toLowerCase()) || this.livreCat
      }) 
    }*/
    filteredBooks: function(){
        if (this.search != ''){
          return this.livres.filter(livre => {
            return (livre.nom.toLowerCase().indexOf(this.search.toLowerCase()) > -1) || (livre.ville.toLowerCase().indexOf(this.search.toLowerCase()) > -1) 
          })
        }else if (this.livreCat != null){
          return this.livreCat
        } else if (this.livreGenre != null){
          console.log("les livres",this.livreGenre)
          return this.livreGenre
        } else if (this.livreAuteur != null){
          console.log("les livres",this.livreAuteur)
          return this.livreAuteur
        }else {
          return this.livres
        }
    }
  },
  methods: {
    searchCategorie(id){
      console.log(id)
      axios.get('http://localhost:3300/livre/categorie/' + id)
      .then(response => {
        this.livreCat = response.data
      })
      .catch(error => {
        console.log(error)
      })
      
    },
    searchGenre(id){
      axios.get('http://localhost:3300/livre/genre/' + id)
      .then(response => {
        this.livreGenre = response.data
        console.log("le resultat",response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    searchAuteur(id){
      axios.get('http://localhost:3300/livre/auteur/' + id)
      .then(response => {
        this.livreAuteur = response.data
        console.log("le resultat",response.data)
      })
      .catch(error => {
        console.log(error)
      })
    }

  }
  /*
  mounted () {
    axios
      .get('http://localhost:3300/livre')
      .then(response => (this.livres = response.data))
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
  }
  */

}
</script>


<style scooped>
.card {
    margin: 0 auto; /* Added */
    
    
    margin-top: 50px;
    padding: 10px; 
    width: auto;
}

h2{
  margin-top: 20px
}

button{
  margin: 10px;
}
</style>