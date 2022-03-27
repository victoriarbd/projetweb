<template>
<h1> Dépose une annonce ! </h1>
 
<BookSell/>
</template>

<script>
import BookSell from '@/components/BookSell.vue'
//import axios from 'axios'
//import EventService from '@/services/EventService.js'

export default {
  name: 'BookSellView',
  components: {
    BookSell,
  },
  data(){
    return {
      categories: null,
      loading: true,
      errored: false
      //categories : [{}]
    }
  },
  //methods {
    //getAllCategorie = function(){

    //}
    /*
    beforeMount(){
      EventService.axios.get('http://localhost:8080/categorie')
      .then(res => {
        if(res.err){
          console.log('no match')
        }
        else{
          this.categorie = res.data
        }
      })
      .catch(err => console.log(err))
    }
    */
   /*
   mounted () {
    axios
      .get('http://localhost:3300/categorie')
      .then(response => (this.categories = response.data))
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
  }
  */
  /*
    created(){
      EventService.getCategories()
      .then(response => {
        this.categories = response.data
      })
      .catch(error => {
        console.log(error)
      })
    }
    */
  }

</script>

<style scoped>

.form-group {
    width:500px;
}
form{
    margin: auto; 
    float: none; 
    margin-bottom: 50px; 
    margin-top: 10px;
    padding: 25px; 
    width: 50vw;
}

button {
  margin: 20px;
}
h1{
  margin-top:10px;
}
</style>