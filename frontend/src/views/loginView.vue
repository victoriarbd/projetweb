<template>
  <section class="vh-100 gradient-custom">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card bg-dark text-white" style="border-radius: 1rem">
            <div class="card-body p-5 text-center">
              <div class="mb-md-5 mt-md-4 pb-5">
                <h2 class="fw-bold mb-2 text-uppercase" v-if="mode == 'login'">
                  Connexion
                </h2>
                <h2 class="fw-bold mb-2 text-uppercase" v-else>Inscription</h2>
                <p class="text-white-50 mb-5">
                  Entrez votre email et mot de passe!
                </p>

                <div class="form-outline form-white mb-4">
                  <input
                    v-model="email"
                    type="email"
                    id="typeEmailX"
                    class="form-control form-control-lg"
                    placeholder="Adresse mail"
                  />
                </div>
                <div
                  class="form-outline form-white mb-4"
                  v-if="mode == 'create'"
                >
                  <div class="form-outline form-white mb-4">
                  <input
                    v-model="email"
                    type="text"
                    class="form-control form-control-lg"
                    placeholder="Nom"
                  />
                </div>
                  
                 <div class="form-outline form-white mb-4">
                  <input
                    v-model="email"
                    type="text"
                    class="form-control form-control-lg"
                    placeholder="Prénom"
                  />
                </div>
                </div>

                <div class="form-outline form-white mb-4">
                  <input
                    v-model="password"
                    type="password"
                    id="typePasswordX"
                    class="form-control form-control-lg"
                    placeholder="Mot de passe"
                  />
                </div>

                <button
                  class="btn btn-outline-light btn-lg px-5"
                  type="submit"
                  @click.prevent="login()"
                  v-if="mode == 'login'"
                  :class="{ disabled: !validatedFields }"
                >
                  Se connecter
                </button>
                <button
                  @click="signup()"
                  class="btn btn-outline-light btn-lg px-5"
                  type="submit"
                  :class="{ disabled: !validatedFields }"
                  v-else
                >
                  Créer mon compte
                </button>
              </div>

              <div>
                <p class="mb-0" v-if="mode == 'login'">
                  Tu n'as pas de compte ?
                  <a
                    href="#!"
                    @click="switchToCreateAccount()"
                    class="text-white-50 fw-bold"
                    >Inscris toi!</a
                  >
                </p>
                <p class="mb-0" v-else>
                  T'as déjà un compte ?
                  <a
                    href="#!"
                    @click="switchToLogin()"
                    class="text-white-50 fw-bold"
                    >Se connecter</a
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
export default {
  name: "LoginView",
  data: function () {
    return {
      mode: "login",
      email: "",
      prenom: "",
      nom: "",
      password: "",
      isAdmin : 0,
      //erreur : ''
    };
  },
  mounted: function () {
      if(localStorage.getItem('user')){
        this.$router.push('/')
      }

  },
  computed: {
    validatedFields: function () {
      if (this.mode == "create") {
        if (
          this.email != "" &&
          this.nom != "" &&
          this.prenom != "" &&
          this.password != ""
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.email != "" && this.password != "") {
          return true;
        } else {
          return false;
        }
      }
    },
  },
  methods: {
    login : function (){

          var data = JSON.stringify({
      email: this.email,
      password: this.password,
    });

    var config = {
      method: "post",
      url: "http://localhost:3300/user/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then( (response)=> {
        
        localStorage.setItem("user",JSON.stringify(response.data));
        localStorage.setItem("token",JSON.stringify(response.data.token));
        
        this.$router.push('/')
      })
      .catch(function (error) {
        console.log(error);
        alert("Mauvais email ou mot de passe, "+ error)
      });

    },
    signup : function () {
      var data = JSON.stringify({
      nom : this.nom,
      prenom : this.prenom,
      email : this.email,
      password : this.password,
      isAdmin : this.isAdmin
      });

      var config = {
        method: 'post',
        url: 'http://localhost:3300/user/signup',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };

    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
      this.nom = '',
      this.prenom = '',
      this.email = '',
      this.password = ''
    },
    switchToCreateAccount: function () {
      this.mode = "create";
    },
    switchToLogin: function () {
      this.mode = "login";
    },
  },
};
</script>

<style scoped></style>
