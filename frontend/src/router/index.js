import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BookSellView from '../views/BookSellView.vue'
import BookDetails from '../views/BookDetails.vue'
import CategorieView from '../views/CategorieView.vue'
import loginView from '../views/loginView.vue'
import AuteursView from '../views/AuteursView.vue'
import GenreView from '../views/GenreView.vue'
import MesAnnoncesView from '../views/MesAnnoncesView.vue'
import UpdateBook from '../components/UpdateBook.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: "/detail/:idlivre/:idcategorie/:idgenre/:idauteur",
    name: "BookDetails",
    props: true,
    component: BookDetails
  },
  {
    path: '/sell',
    name: 'sell',
    component: BookSellView
  },
  {
    path: '/listCat',
    name: 'listCat',
    component: CategorieView
  },
  {
    path: '/login',
    name: 'login',
    component: loginView
  },
  {
    path: '/auteurs',
    name: 'auteurs',
    component: AuteursView
  },
  {
    path: '/genres',
    name: 'genres',
    component: GenreView
  },
  {
    path: '/mesannonces',
    name: 'mesannonces',
    component: MesAnnoncesView
  },
  {
    path: '/updateBook/:id',
    name: 'updateBook',
    component: UpdateBook
  },
  
  

  

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
