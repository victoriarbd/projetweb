<template>
      
  
  <div class="card" style="max-width: 18rem;" v-if="user.iduser == livre.iduser">
    <router-link class="event-link" :to="{ name: 'BookDetails', params: {idlivre: livre.idlivre, idcategorie:livre.idcategorie, idgenre:livre.idgenre, idauteur:livre.idauteur}}">
  <img v-bind:src="livre.image" class="card-img-top">
  <div class="card-body">
    <p class="card-text"> Prix : {{livre.prix}} euros </p> 
    <p class="card-text">{{livre.nom}}</p>
  </div>
  </router-link>
</div>


  
</template>




<script>
import EventService from '@/services/EventService.js'
export default {
  name: 'MesAnnonces',
  props: {
    livre:{
        type: Object,
        required: true
    }
  },
  data() {
    return {
      user : {},
      auteurs : null,
    }
  },
  mounted: function () {
    this.user = JSON.parse(localStorage.getItem("user"));
    if(this.user == null){
       this.$router.push('/login')
    }
    // this.livre = await EventService.getBookById(this.idlivre).data[[0]],
    // console.log(this.livre.nom)
    // console.log("ihihiohihiuhioh")
  },
  created(){
    EventService.getAllAuteur()
      .then(response => {
        this.auteurs = response.data
      })
      .catch(error => {
        console.log(error)
      })
  },
  
  
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

.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-img-top{
  width: 200px; 
  height: auto; 
  padding:auto; 
  margin:auto
}
</style>
