<template>
      <div class="card" style="max-width: 18rem;">
        <router-link class="event-link" :to="{ name: 'BookDetails', params: {idlivre: livre.idlivre, idcategorie:livre.idcategorie, idgenre:livre.idgenre, idauteur:livre.idauteur}}">
        <img v-bind:src="livre.image" class="card-img-top embed-responsive-item">
        <div class="card-body">
          
            
            <p class="card-text">{{livre.nom}}
              <br>
              Prix : {{livre.prix}} €
              <br>
              Postée à {{livre.ville}} </p>
            
            

        </div>
        </router-link>
      </div>
  


  
</template>




<script>
import EventService from '@/services/EventService.js'
export default {
  name: 'BookList',
  props: {
    livre:{
        type: Object,
        required: true
    },
    auteurs:{
      type: Object,
      required: true
    },
    idcategorie : Number,
    idgenre : Number,
    idauteur : Number
  },
  data() {
    return {
      auteurBook : {},
      //test: '',
      categorieBook: {},
      genreBook: {},
      
    }
  },
  
  mounted(){
    EventService.getCategorieById(this.idcategorie)
        .then((response) => {
          this.categorieBook = response.data;
          
        })
        .catch((error) => {
          console.log(error);
        })
        EventService.getGenreById(this.idgenre)
        .then((response) => {
          this.genreBook = response.data;
          //console.log(response.data);
          //console.log("test", this.genreBook);
        })
        .catch((error) => {
          console.log(error);
        })
        console.log(this.idauteur)
        EventService.getAuteurById(this.idauteur)
        .then((response) => {
          this.auteurBook = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
  },
  methods:{
    getSomething(){
      
      this.test = "coucou"
    },
    /*
    afficherCategorie(){
      EventService.getCategorieById(this.idcategorie)
        .then((response) => {
          this.categorieBook = response.data;
          console.log(response.data);
          console.log("test", this.categorieBook);
        })
        .catch((error) => {
          console.log(error);
        })
    },*/
    afficherGenre(){
      
    },
    afficherAuteur(){
      EventService.getAuteurById(this.livre.idauteur)
        .then((response) => {
          this.auteurBook = response.data;
          //console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }
}
</script>

<style scoped>
.book-list {
  padding: 30px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #748294;
  margin-bottom: 30px;
}

.card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}

.event-link{
  color: #2c3e50;
  text-decoration: none;
}

img{
 
  height: 40; 
  
}
.card-img-top{
  width: 200px; 
  height: auto; 
  padding:auto; 
  margin:auto;
  object-fit: cover;

}
</style>
