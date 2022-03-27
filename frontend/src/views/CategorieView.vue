<template>
<h4> Gestion des catégories </h4>
<div class="row">
    <div class="col-4">
      <form>
            <div class="form-group">
                <label for="exampleFormControlInput1">Ajout d'une catégorie</label>
                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Nom de la catégorie" v-model="formCatgorie.nom" required>
            </div>
            <button type="button" class="btn btn-success" v-on:click="submitFormCategorie" :class="{ disabled: !validatedFields }">Ajouter la catégorie</button>
          </form>
    </div>
    <div class="col-6">
        <form>
            <div class="form-group">
                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Recherche d'une catégorie..." v-model="search">
            </div>
        </form>
      <table class="table">
        <thead>
            <tr> 
            <th scope="col">Nom</th>
            <th scope="col">Action(s)</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="categorie in filteredCategorie" v-bind:key="categorie.idcategorie">
            <td scope="row">
                {{categorie.nom}}
            </td>
            <td>
              <div v-on:click="toggleModale(categorie)" class="btn btn-warning btn-sm">Modifier</div>
            </td>
            <td>
                <button v-on:click="deleteFormCategorie(categorie.idcategorie)" type="submit" class="btn btn-danger btn-sm">Supprimer</button>
            </td>
            </tr>
        </tbody>
    </table>
    </div>
    <ModaleCategorie  :revele="revele" :toggleModale="toggleModale" :idcategorie="putCategorie.idcategorie" :nomCategorie="putCategorie.nom"/>
</div>
</template>

<script>
// @ is an alias to /src

import EventService from '@/services/EventService.js'
import ModaleCategorie from '@/views/ModaleCategorie.vue'
import axios from 'axios'
/*
const header = {
    "Access-Control-Allow-Origin": "*"
  }

 axios.post(URL, headers:header
    })

*/
export default {
  name: 'CategorieView',
  components: {
    ModaleCategorie
  },
  data(){
    return {
      revele: false,
      user : {},
       categories: null,
       formCatgorie : {
         nom: ''
        },
       deleteCat : {
          nom: '',
        },
       putCategorie: {
          idcategorie: 0,
          nom: ''
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
  computed: {
    filteredCategorie: function(){
      if (this.search != ''){
        return this.categories.filter((categorie) => {
        return categorie.nom.toLowerCase().match(this.search.toLowerCase()) 
      })
      }else {
        return this.categories
      }
      
    },
    validatedFields: function (){
        if (
          this.formCatgorie.nom != "" 
        ){
          return true;
        }else {
          return false;
        }
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
  },
  methods: {
      //requetes post
      async submitFormCategorie(){
          var config = {
                method: 'post',
                url: 'http://localhost:3300/api/categorie',
                headers: {
                  'Authorization': `Bearer ${this.user.token}`,
                  'Content-Type': 'application/json'
                },
                data : this.formCatgorie
              };

          const result = await axios(config)
              if (result.status == 201){
                alert("Catégorie ajouté!")
              } else {
              alert("Impossible d'ajouter la catégorie.")
              }
          this.formCatgorie.nom = ''
          window.location.reload()
      },
      say : function (message) {
      alert(message) },
      //requete delete
      async deleteFormCategorie(id) {
      if (confirm("Voulez-vous vraiment supprimer cette catégorie ?")) {
        var data = "";

        var config = {
          method: "delete",
          url: "http://localhost:3300/api/categorie/" + id,
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
          alert("Impossible de supprimer la catégorie.");
        }
      }
    },
      toggleModale: function(data) {
      this.revele = !this.revele;
      this.putCategorie = data
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