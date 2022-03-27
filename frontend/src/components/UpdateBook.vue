<template>
  <h2>Modifie ton annonce</h2>
  <form>
    <div class="form-group">
      <label for="exampleFormControlInput1">Nom du livre</label>
      <input
        type="text"
        class="form-control"
        id="exampleFormControlInput1"
        v-model="formLivre.nom"
      />
    </div>
    <div class="form-group">
      <label for="exampleFormControlInput1">Ville de dépot de l'annonce</label>
      <input
        type="text"
        class="form-control"
        id="exampleFormControlInput1"
        v-model="formLivre.ville"
      />
    </div>
    <div class="form-group">
      <label for="exampleFormControlInput1">Prix</label>
      <input
        type="number"
        class="form-control"
        id="exampleFormControlInput1"
        min="0"
        max="1000"
        v-model="formLivre.prix"
      />
    </div>
    <div class="form-group">
      <label for="exampleFormControlInput1">Image</label>
      <input
        type="text"
        class="form-control"
        id="exampleFormControlInput1"
        v-model="formLivre.image"
      />
    </div>
    <div class="form-group">
      <label for="exampleFormControlSelect1">Catégories</label>
      <select
        class="form-control"
        id="categoriePost"
        v-model="formLivre.idcategorie"
      >
        <option
          v-for="categorie in categories"
          :key="categorie.id"
          :value="categorie.idcategorie"
        >
          {{ categorie.nom }}
        </option>
      </select>
    </div>
    <div class="form-group">
      <label for="exampleFormControlSelect1">Genre</label>
      <select
        class="form-control"
        id="exampleFormControlSelect1"
        v-model="formLivre.idgenre"
      >
        <option v-for="genre in genres" :key="genre.id" :value="genre.idgenre">
          {{ genre.nom }}
        </option>
      </select>
    </div>
    <div class="form-group">
      <label for="exampleFormControlSelect1">Nom de l'auteur</label>
      <select
        class="form-control"
        id="exampleFormControlSelect1"
        v-model="formLivre.idauteur"
      >
        <option
          v-for="auteur in auteurs"
          :key="auteur.id"
          :value="auteur.idauteur"
        >
          {{ auteur.nom }}
        </option>
      </select>
    </div>
    <div class="form-group">
      <label for="exampleFormControlInput1">Etat du livre</label>
      <input
        type="text"
        class="form-control"
        id="exampleFormControlInput1"
        v-model="formLivre.etat"
      />
    </div>
    <div class="form-group">
      <label for="exampleFormControlTextarea1">Description</label>
      <textarea
        class="form-control"
        id="exampleFormControlTextarea1"
        rows="3"
        v-model="formLivre.description"
      ></textarea>
      <button
        type="button"
        v-on:click="updateFormLivre"
        class="btn btn-primary"
      >
        Modifier l'annonce
      </button>
    </div>
  </form>
</template>

<script>
//import axios from 'axios'
import EventService from '@/services/EventService.js'
import axios from 'axios'
export default {
  name: 'UpdateBook',
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
      livre: {},
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
        iduser : '',
      },
      auteurs: '',
      categorie: '',
      genre:'',
      categories: null,
      genres : null,
      loading: true,
      errored: false
      //categories : [{}]
    }
  },
  async mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    console.log("ok",this.user.token)
    console.log(localStorage.getItem("token"))
    if(this.user == null){
       this.$router.push('/login')
    }
    const result = await axios.get('http://localhost:3300/livre/'+this.$route.params.id)
    //console.warn(this.$route.params.id)
    //console.warn(result.data)
    this.formLivre=result.data
  },
    created(){
      EventService.getBookById(this.$route.params.id)
      .then(response => {
        this.livre = response.data
        this.formLivre.iduser = this.livre.iduser
        //console.log(this.formLivre.iduser)
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
    },
    methods : {

          async updateFormLivre(){
            if(confirm("Do you really want to update?")){
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
                method: 'put',
                url: 'http://localhost:3300/livre/'+this.$route.params.id,
                headers: {
                  'Authorization': `Bearer ${this.user.token}`,
                  'Content-Type': 'application/json'
                },
                data : data
              };

              const result = await axios(config)
              if (result.status == 200){
                this.$router.push('/mesannonces')
              } else {
              alert("Impossible de modifier l'annonce.")
              }
            /*
              axios(config)
              .then(function (response) {
                console.log(JSON.stringify(response.data))
                alert("Modification(s) bien effectuée(s)!")
              })
              .catch(function (error) {
                alert("Impossible de modifier l'annonce.")
                console.log(error);
              })
              */
            }
          }
            /*
            async updateFormLivre(){
              //const config = {
                //headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`,
                 //'Content-Type': 'application/json'
                          //}
            //};
            //console.log("nom",this.formLivre.nom)
            //console.log('id', this.$route.params.id)
            if(confirm("Do you really want to update?")){
            const result = await axios.put("http://localhost:3300/livre/"+this.$route.params.id,
             headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json'},
             {
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
            if (result.status == 200){
                this.$router.push('/')
            } else {
              alert("Impossible de modifier l'annonce.")
            }

            }
      },*/


      },



}
</script>

<style scoped>
.form-group {
  margin: auto; /* Added */
  width: 500px;
}
form {
  margin-top: 20px;
}

button {
  margin: auto;
  margin-top: 20px;
}
</style>
