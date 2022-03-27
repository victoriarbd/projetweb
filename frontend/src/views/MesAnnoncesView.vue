<template>
    <h2> Mes annonces </h2>
    <div class = "container-fluid">
    <div class="row row-cols-5 row-cols-lg-5 g-2 g-lg-2">
    <MesAnnonces v-for="livre in livres" :key="livre.id" :livre="livre"/>
  </div>
    </div>
</template>

<script>
// @ is an alias to /src
import MesAnnonces from '@/components/MesAnnonces.vue'
//import axios from 'axios'
import EventService from '@/services/EventService.js'
export default {
  name: 'MesAnnoncesView',
  components: {
    MesAnnonces
  },
  data(){
    return {
       livres: null
    }
  },
  created(){
      EventService.getAllLivre()
      .then(response => {
        this.livres = response.data,
        console.log(this.livres)
      })
      .catch(error => {
        console.log(error)
      })
  },
  mounted: function () {
      if (!localStorage.getItem('user')){
        this.$router.push('/login')
      }

  },
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

</style>
