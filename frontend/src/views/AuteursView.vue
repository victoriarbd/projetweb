<template>
<h4> Gestion des auteurs </h4>
<div class="row">
    <div class="col-4">
      <div class="container">
      <form>
            <div class="form-group">
                <h4>Ajout d'un auteur</h4>
                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="prenom de l'auteur" v-model="formAuteur.prenom">
                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="nom de l'auteur" v-model="formAuteur.nom">
            </div>
            <button type="button" class="btn btn-success" v-on:click="submitFormAuteur" :class="{ disabled: !validatedFields }">Ajouter l'auteur</button>
        </form>
        </div>
    </div>
    <div class="col-6">
      <form>
            <div class="form-group">
                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Recherche d'un auteur par nom..." v-model="search">
            </div>
        </form>
      <div class="container">
      <table class="table">
        <thead>
            <tr> 
            <th scope="col">Prénom</th>
            <th scope="col">Nom</th>
            <th scope="col">Action(s)</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="auteur in filteredAuteur" v-bind:key="auteur.idauteur">
            <td scope="row">
                {{auteur.prenom}}
            </td>
            <td scope="row">
                {{auteur.nom}}
            </td>
            <td>
              <div v-on:click="toggleModale(auteur)" class="btn btn-warning btn-sm">Modifier</div>
            </td>
            <td>
                <button v-on:click="deleteAuteurList(auteur.idauteur)" type="submit" class="btn btn-danger btn-sm">Supprimer</button>
            </td>
            </tr>
        </tbody>
    </table>
    </div>
    </div>
      <ModaleAuteur  :revele="revele" :toggleModale="toggleModale" :idauteur="upAuteur.idauteur" :nomAuteur="upAuteur.nom"  :prenomAuteur="upAuteur.prenom"/>
</div>
</template>

<script>
//import EventService from '@/services/EventService.js'
import ModaleAuteur from '@/views/ModaleAuteur.vue'
import axios from 'axios'

export default {
  name: 'AuteursView',
  
  components: {
    ModaleAuteur
  },
  
  data(){
    return {
       revele: false,
       auteurs : null,
       user : {},
       formAuteur: {
         nom :'',
         prenom: ''
         },
         upAuteur: {
           idauteur: 0,
           nom:'',
           prenom:''
         },
         search:''
    }
  },
  mounted: function() {
    this.user = JSON.parse(localStorage.getItem('user'))
    if(this.user){
      if(!this.user.isAdmin){
        this.$router.push('/')
      }
    }else{
      this.$router.push('/login')
    }
  },
  beforeMount(){
    this.getAuteurs()
  },
  /*
  created(){
      EventService.getAllAuteur()
      .then(response => {
        this.auteurs = response.data
      })
      .catch(error => {
        console.log(error)
      })
  },*/
  computed: {
    filteredAuteur: function(){
      if (this.search != ''){
        return this.auteurs.filter((auteur) => {
          return auteur.nom.toLowerCase().match(this.search.toLowerCase())
        })
      }else{
        return this.auteurs
      }
    },
    validatedFields: function (){
        if (
          this.formAuteur.nom != "" 
        ){
          return true;
        }else {
          return false;
        }
      }
  },
  methods: {
    async getAuteurs(){
      await axios.get("http://localhost:3300/auteur")
            .then(response => {
            this.auteurs = response.data
          })
          .catch(error => {
            console.log(error)
          })
    },
    /*
      submitFormAuteur(){
        EventService.postAuteur(this.formAuteur)
        .then(function (response) {
            console.log('Response', response)
        })
        .catch(function (err) {
          console.log('Erreur', err);
        })
        this.formAuteur.nom = ''
        this.formAuteur.prenom = ''
        window.location.reload()
      },*/
      async submitFormAuteur(){
          var config = {
                method: 'post',
                url: 'http://localhost:3300/auteur',
                headers: {
                  'Authorization': `Bearer ${this.user.token}`,
                  'Content-Type': 'application/json'
                },
                data : this.formAuteur
              };

          const result = await axios(config)
              if (result.status == 201){
                alert("Auteur ajouté!")
              } else {
              alert("Impossible d'ajouter l'auteur.")
              }
          this.formAuteur.nom = ''
          this.formAuteur.prenom = ''
          window.location.reload()
      },
      say : function (message) {
      alert(message) 
      },
      async deleteAuteurList(id) {
      if (confirm("Voulez-vous vraiment supprimer cet auteur ?")) {
        var data = "";

        var config = {
          method: "delete",
          url: "http://localhost:3300/auteur/" + id,
          headers: {
            Authorization: `Bearer ${this.user.token}`,
          },
          data: data,
        };

        const result = await axios(config);
        if (result.status == 200) {
          alert("Suppression effectuée!");
          window.location.reload()
        } else {
          alert("Impossible de supprimer l'auteur.");
        }
      }
    },
      toggleModale: function(data) {
      this.revele = !this.revele;
      this.upAuteur = data
    },
      
  }
      
  


}
</script>


<style scoped>

.form-group {
    margin: auto; /* Added */
    width: 250px;
    
}
form {
    margin-top: 10px;
}

#inputPassword6 {
    width: 150px;
}

button {
  margin: 10px;
}

input {
    margin : 20px;
}

h4 {
    margin: 20px;
}

</style>