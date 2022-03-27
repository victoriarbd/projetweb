<template>
<h4> Gestion des genres </h4>
<div class="row">
    <div class="col-4">
      <form>
            <div class="form-group">
                <h4>Ajout d'un genre</h4>
                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="nom de du genre" v-model="formGenre.nom">
            </div>
            <button type="submit" class="btn btn-success" v-on:click="submitFormGenre" :class="{ disabled: !validatedFields }">Ajouter le genre</button>
        </form>
    </div>
    <div class="col-6">
        <form>
            <div class="form-group">
                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Recherche d'un genre..." v-model="search">
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
            <tr v-for="genre in filteredGenre" v-bind:key="genre.idgenre">
            <td scope="row">
                {{genre.nom}}
            </td>
            <td>
              <div v-on:click="toggleModale(genre)" class="btn btn-warning btn-sm">Modifier</div>
            </td>
            <td>
                <button v-on:click="deleteGenreList(genre.idgenre)" type="submit" class="btn btn-danger btn-sm">Supprimer</button>
            </td>
            </tr>
        </tbody>
    </table>
    </div>
    <ModaleGenre  :revele="revele" :toggleModale="toggleModale" :idgenre="putGenre.idgenre" :nomGenre="putGenre.nom"/>
</div>
</template>

<script>
import EventService from '@/services/EventService.js'
import ModaleGenre from '@/views/ModaleGenre.vue'
import axios from 'axios'
export default {
  name: 'GenreView',
  components: {
    ModaleGenre
  },
  data(){
    return {
      user : {},
      revele: false,
       genres: null,
       formGenre: {
         nom :''
         },
       deleteGenre : {
          nom: '',
        },
       putGenre: {
          idgenre: 0,
          nom: ''
        },
        search: ''
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
  created(){
      EventService.getAllGenre()
      .then(response => {
        this.genres = response.data
      })
      .catch(error => {
        console.log(error)
      })
  },
  computed: {
    filteredGenre: function(){
      if (this.search != ''){
        return this.genres.filter((genre) => {
        return genre.nom.toLowerCase().match(this.search.toLowerCase()) 
      })
      }
      else{
        return this.genres
      }
      
    },
    validatedFields: function (){
        if (
          this.formGenre.nom != "" 
        ){
          return true;
        }else {
          return false;
        }
      }
  },
  methods: {
      //requetes post
      async submitFormGenre(){
          var config = {
                method: 'post',
                url: 'http://localhost:3300/genre',
                headers: {
                  'Authorization': `Bearer ${this.user.token}`,
                  'Content-Type': 'application/json'
                },
                data : this.formGenre
              };

          const result = await axios(config)
              if (result.status == 201){
                alert("Genre ajouté!")
              } else {
              alert("Impossible d'ajouter le genre.")
              }
          this.formCatgorie.nom = ''
          window.location.reload()
      },
      say : function (message) {
      alert(message) },
      //requete delete
      deleteGenreList2(id){
        console.log(id)
          if(confirm("Do you really want to delete?")){
            EventService.deleteGenre(id)
            .then(function (response) {
                console.log('Response', response)
            })
            .catch(function (error) {
            console.log(error);
            alert("Impossible de supprimer le genre.")
            });
            window.location.reload()
            
        }
      },
      async deleteGenreList(id) {
      if (confirm("Voulez-vous vraiment supprimer ce genre ?")) {
        var data = "";

        var config = {
          method: "delete",
          url: "http://localhost:3300/genre/" + id,
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
          alert("Impossible de supprimer le genre.");
        }
      }
    },
      toggleModale: function(data) {
      this.revele = !this.revele;
      this.putGenre = data
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