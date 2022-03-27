<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
            <a class="navbar-brand" href="#">
              <router-link to="/" style="text-decoration: none" >BookStore</router-link>
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item">
    
                    <a class="nav-link" href="#" v-if="user">
                       <router-link to="/sell" style="text-decoration: none">Déposer une annonce</router-link>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" v-if="user">
                      <router-link to="/" style="text-decoration: none">Rechercher un livre</router-link>
                    </a>
                </li>
                <li v-if="user?.isAdmin" class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Administration
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <li><a class="dropdown-item" href="#">
                      <router-link to="/listCat" style="text-decoration: none">Gestion catégories</router-link>
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        <router-link to="/genres" style="text-decoration: none">Gestion genres</router-link>
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        <router-link to="/auteurs" style="text-decoration: none">Gestion auteurs</router-link>
                      </a>
                    </li>
                  </ul>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" v-if="user">
                     <router-link to="/mesannonces" style="text-decoration: none">Mes annonces</router-link>
                    </a>
                </li>
                <li class="nav-item" v-if="!user">
                    <a class="nav-link" href="#">
                      <router-link to="/login" style="text-decoration: none">Se connecter</router-link>
                    </a>
                </li>
                 <li class="nav-item" v-if="user">
                    <a @click="deconnect()" class="nav-link" style="{{'color':'red'}}" href="#">
                    Se déconnecter
                    </a>
                </li>
              </ul>
              
            </div>
          </div>
          </nav>

  <router-view/> 
</template>


<script>
import "bootstrap/dist/css/bootstrap.min.css"
export default{
  data() {
    return {
     user : null 
    }
  },
  mounted() {
    setInterval(() => {
       this.user = JSON.parse(localStorage.getItem("user"))
       
    }, 500);
   
  },
  methods: {
    deconnect: function (){
      localStorage.removeItem("user")
      this.$router.push("/login")
      this.user = null
    }
  },


}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}


</style>
