<template>
  <div class="product-display">
    <div class="product-container">
      <div class="livre-image">
        <img v-bind:src="livre.image" />
      </div>

      <div class="card h-25 " style="width: 18rem">
        <div class="card-body">
          <h5 class="card-title">{{ livre.nom }}</h5>
          <h6 class="card-text">prix : {{ livre.prix }} €</h6>
          <br />
          <p class="card-text">
            {{ livre.description }}
          </p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            Ville où est postée l'annonce : {{ livre.ville }}
          </li>
          <li class="list-group-item">Catégorie : {{ this.categorie.nom }}</li>
          <li class="list-group-item">Genre : {{ this.genre.nom }}</li>
          <li class="list-group-item">
            écrit par : {{ this.auteur.prenom }} {{ this.auteur.nom }}
          </li>
          <li class="list-group-item">état : "{{ livre.etat }}"</li>
        </ul>
        <div class="card-body">
          <button class="btn btn-primary" v-on:click="afficherEmailUser()">
            adresse mail du vendeur
          </button>
          <br />
          <h6 class="card-subtitle mb-2 text-muted">
            {{ this.userBook.email }}
          </h6>
          <button
            v-if="user.iduser == livre.iduser"
            @click="$router.push('/updateBook/' + livre.idlivre)"
            class="btn btn-warning"
          >
            Modifier
          </button>
          <button
            v-if="user.iduser == livre.iduser"
            v-on:click="deleteLivre(livre.idlivre)"
            class="btn btn-danger"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventService from "@/services/EventService.js";
import axios from "axios";
export default {
  props: ["idlivre", "idcategorie", "idgenre", "idauteur"],
  data() {
    return {
      livre: {},
      user: {},
      userBook: {},
      categorie: {},
      genre: {},
      auteur: {},
    };
  },

  mounted: function () {
    console.log(this.idcategorie);
    console.log("test this", this);
    this.user = JSON.parse(localStorage.getItem("user"));
    if (this.user == null) {
      this.$router.push("/login");
    }
    EventService.getBookById(this.idlivre)
      .then((response) => {
        this.livre = response.data;
        //console.log("livre", response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // this.livre = await EventService.getBookById(this.idlivre).data[[0]],
    // console.log(this.livre.nom)
    // console.log("ihihiohihiuhioh")
  },
  created() {
    console.log(this.idcategorie);
    console.log("id genre", this.idgenre);
    EventService.getCategorieById(this.idcategorie)
      .then((response) => {
        this.categorie = response.data;
        console.log("la categorie", this.categorie);
      })
      .catch((error) => {
        console.log(error);
      });
    EventService.getGenreById(this.idgenre)
      .then((response) => {
        this.genre = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    EventService.getAuteurById(this.idauteur)
      .then((response) => {
        this.auteur = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  //peut etre a modifier car on recupere un tableau de tableau

  methods: {
    /*
    getLivre() {
      EventService.getBookById(this.idlivre)
        .then((response) => {
          this.livre = response.data;
          console.log("livre", response.data);
          this.getCategorie();
        })
        .catch((error) => {
          console.log(error);
        });
    },*/
    getCategorie() {
      EventService.getCategorieById(this.idcategorie)
        .then((response) => {
          this.categories = response.data;
          console.log("la categorie", this.categories);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async deleteLivre2(id) {
      if (confirm("Do you really want to delete?")) {
        await axios
          .delete("http://localhost:3300/livre/" + id)
          .then(function (response) {
            console.log("Response", response);
          })
          .catch(function (err) {
            console.log("Erreur", err);
          });
        this.$router.push("/mesannonces");
      }
    },
    async deleteLivre(id) {
      if (confirm("Voulez-vous vraiment supprimer cette annonce ?")) {
        var data = "";

        var config = {
          method: "delete",
          url: "http://localhost:3300/livre/" + id,
          headers: {
            Authorization: `Bearer ${this.user.token}`,
          },
          data: data,
        };

        const result = await axios(config);
        if (result.status == 200) {
          this.$router.push("/mesannonces");
        } else {
          alert("Impossible de supprimer l'annonce.");
        }
      }
    },
    afficherEmailUser() {
      EventService.getUserById(this.livre.iduser)
        .then((response) => {
          this.userBook = response.data;
          //console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      console.log(this.userBook);
    },
  },
};
</script>

<style scoped>
.livre-image{
  width: 40%;
}
.card{
  width: 20px
}
p {
  font-size: 22px;
}

.product-display {
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

.product-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
img {
  border: 2px solid #d8d8d8;
  width: 65%;
  margin: 40px;
  padding: 15px;
  -webkit-box-shadow: 0px 2px 15px -12px rgba(0, 0, 0, 0.57);
  -moz-box-shadow: 0px 2px 15px -12px rgba(0, 0, 0, 0.57);
  box-shadow: 2px 15px -12px rgba(0, 0, 0, 0.57);
}
button {
  margin: 5px;
}
@media only screen and (max-width: 600px) {
  .product-image,
  .card {
    margin-left: 10px;
    width: 100%;
  }
}
</style>
