<template>
  <div class="bloc-modale" v-if="revele">
    <div class="overlay" v-on:click="toggleModale"></div>

    <div class="modale card">
      <div v-on:click="toggleModale" class="btn-modale btn btn-danger">X</div>
      <h4>Modification du genre</h4>
      <form>
            <div class="form-group">
                
                <input type="text" v-model="newnom" class="form-control" id="exampleFormControlInput1" placeholder="nom de la catégorie">
            </div>
            <button v-on:click="updateFormCategorie()" type="submit" class="btn btn-success" :class="{ disabled: !validatedFields }">Modifier</button>
        </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {

    name: 'ModaleGenre',
    props: ["revele", "toggleModale", "idcategorie","nomCategorie"],
    data(){
        return {
          user : {},
          newnom : '',
        }
        
    },
    mounted: function() {
    this.user = JSON.parse(localStorage.getItem('user'))
  },
    computed: {
    validatedFields: function (){
        if (
          this.newnom != "" 
        ){
          return true;
        }else {
          return false;
        }
      }
  },
    methods : {
      updateFormCategorie(){
        if(confirm("Voulez-vous vraiment modifier ? Cela affectera les annonces publiées.")){
          var data = JSON.stringify({
              nom:this.newnom,
              });
          var config = {
                method: 'put',
                url: 'http://localhost:3300/api/categorie/'+this.idcategorie,
                headers: {
                  'Authorization': `Bearer ${this.user.token}`,
                  'Content-Type': 'application/json'
                },
                data : data
              };
            axios(config)
            .then(function (response) {
              console.log('Response', response)
            })
            .catch(function (err) {
            console.log('Erreur', err);
            })
        }
      },
    }
}
</script>

<style scoped>

.bloc-modale {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay {
  background: rgba(66, 66, 66, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.modale {
  background: #f1f1f1;
  color: #333;
  padding: 50px;
  position: fixed;
  top: 30%;
}

.btn-modale {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
