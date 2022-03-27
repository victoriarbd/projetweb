<template>
    <form v-on:submit.prevent="submitFormAnnonce">
  <div class="form-group">
    <label for="exampleFormControlInput1">Nom du livre</label>
    <input type="text" class="form-control" id="exampleFormControlInput1" v-model ="formLivre.nom">
  </div>
  <div class="form-group">
    <label for="exampleFormControlInput1">Ville de dépot de l'annonce</label>
    <input type="text" class="form-control" id="exampleFormControlInput1" v-model ="formLivre.ville">
  </div>
  <div class="form-group">
    <label for="exampleFormControlInput1">Prix</label>
    <input type="number" class="form-control" id="exampleFormControlInput1"
       min="0" step="0.01" v-model ="formLivre.prix">
  </div>
  <div class="form-group">
    <label for="exampleFormControlInput1">Image (url)</label>
    <input type="text" class="form-control" id="exampleFormControlInput1" v-model ="formLivre.image">
  </div>
  <div class="form-group">
    <label for="exampleFormControlSelect1">Catégories</label>
    <select class="form-control" id="categoriePost" v-model="formLivre.idcategorie">
      <option v-for="categorie in categories" :key="categorie.id" :value="categorie.idcategorie"> {{categorie.nom}}</option>
    </select>
  </div>
  <div class="form-group">
    <label for="exampleFormControlSelect1">Genre</label>
    <select class="form-control" id="exampleFormControlSelect1" v-model="formLivre.idgenre">
      <option v-for="genre in genres" :key="genre.id" :value="genre.idgenre"> {{genre.nom}}</option>
    </select>
  </div>
  <div class="form-group">
    <label for="exampleFormControlSelect1">Nom de l'auteur</label>
    <select class="form-control" id="exampleFormControlSelect1" v-model="formLivre.idauteur">
      <option v-for="auteur in auteurs" :key="auteur.id" :value="auteur.idauteur"> {{auteur.prenom}} {{auteur.nom}}</option>
    </select>
  </div>
  <div class="form-group">
    <label for="exampleFormControlInput1">Etat du livre</label>
    <input type="text" class="form-control" id="exampleFormControlInput1" v-model ="formLivre.etat">
  </div>
  <div class="form-group">
    <label for="exampleFormControlTextarea1">Description</label>
    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model ="formLivre.description"></textarea>
    <button type="submit" class="btn btn-primary" :class="{ disabled: !validatedFields }">Déposer l'annonce</button>
  </div>
  
</form>
</template>





<script>
//import axios from 'axios'
import EventService from '@/services/EventService.js'
import axios from 'axios'
export default {
  name: 'BookSell',
  /*
  props: {
    categorie: {
      type: Object,
      required: true
    }
  },*/
  data(){
    return {
      user : {},
      formLivre : {
        nom : '',
        description : '',
        image : '',
        prix : '',
        etat : '',
        ville : '',
        idcategorie : '',
        idgenre : '',
        idauteur : '',
      },
      auteurs: '',
      categorie: '',
      genre:'',
      categories: null,
      genres : null,
      //loading: true,
      //errored: false
      //categories : [{}]
    }
  },
  mounted: function () {
    this.user = JSON.parse(localStorage.getItem("user"));
    console.log(this.user.token)
    if(this.user == null){
       this.$router.push('/login')
    }
  },
  /*
  mounted () {
    axios
      .get('http://localhost:3300/categorie')
      .then(response => (this.categories = response.data))
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false),
      axios
      .get('http://localhost:3300/genre')
      .then(response => (this.genres = response.data))
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
  }
  */
  
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
    },
    computed : {
      validatedFields: function (){
        if (
          this.formLivre.nom != "" &&
          this.formLivre.description != "" &&
          this.formLivre.image != "" &&
          this.formLivre.prix != "" &&
          this.formLivre.etat != "" &&
          this.formLivre.ville != "" &&
          this.formLivre.idcategorie != "" &&
          this.formLivre.idgenre != "" &&
          this.formLivre.idauteur != ''
        ){
          return true;
        }else {
          return false;
        }
      }
    },
    methods : {
      async submitFormAnnonce(){
        var data = JSON.stringify({
              nom: this.formLivre.nom,
              description : this.formLivre.description,
              image : this.formLivre.image,
              prix : this.formLivre.prix,
              etat : this.formLivre.etat,
              ville : this.formLivre.ville,
              idcategorie : this.formLivre.idcategorie,
              idgenre : this.formLivre.idgenre,
              idauteur : this.formLivre.idauteur,
              iduser : this.user.iduser,
        });
        var config = {
                method: 'post',
                url: 'http://localhost:3300/livre',
                headers: {
                  'Authorization': `Bearer ${this.user.token}`,
                  'Content-Type': 'application/json'
                },
                data : data
              };

        const result = await axios(config)
        console.log(result.status)
        if (result.status == 201) {
          console.log(result.status)
          this.$router.push("/mesannonces");
        } else {
          alert("Impossible d'ajouter l'annonce.");
        }
        this.formLivre.nom = ''
        this.formLivre.description = ''
        this.formLivre.image = '',
        this.formLivre.prix = '',
        this.formLivre.etat = '',
        this.formLivre.ville = '',
        this.formLivre.idcategorie = '',
        this.formLivre.idgenre = '',
        this.formLivre.idauteur = ''
        
        
        
      },
      say : function (message) {
      alert(message) 
      }
      
      },
      
    
  
}
</script>

<style scoped>

.form-group {
    margin: auto; /* Added */
    width: 500px;
    
    
}
form {
    margin-top: 5px;
}

button {
  margin: auto;
  margin-top: 20px;
}
</style>