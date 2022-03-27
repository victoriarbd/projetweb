import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://localhost:3300',
    withCredentials: false,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  
  export default {
      //requetes get
    getAllCategorie(){
        return apiClient.get('/api/categorie')
    },
    getAllGenre(){
        return apiClient.get('/genre')
    },
    getAllAuteur(){
        return apiClient.get('/auteur')
    },
    getAllLivre(){
        return apiClient.get('/livre')
    },
    //requetes get by something
    getBookById(idlivre){
        return apiClient.get('/livre/' + idlivre)
    },
    getLivreByIdCategorie(idcategorie){
        return apiClient.get('/livre/categorie' + idcategorie)
    },
    getAuteurById(idauteur){
        return apiClient.get('/auteur/' + idauteur)
    },
    getGenreById(idgenre){
        return apiClient.get('/genre/' + idgenre)
    },
    getUserById(iduser){
        return apiClient.get('/user/' + iduser)
    },
    getCategorieById(idcategorie){
        return apiClient.get('/api/categorie/' + idcategorie)
    },
    //requetes post
    postCategorie(formCategorie){
        return apiClient.post('/api/categorie', formCategorie)
    },
    postGenre(formGenre){
        return apiClient.post('/genre', formGenre)
    },
    postAuteur(formAuteur){
        return apiClient.post('/auteur', formAuteur)
    },
    postLivre(formLivre){
        console.log("ooooooo")
        return apiClient.post('/livre', formLivre)
    },
    //requetes delete by something
    deleteCategorie(formCat){
        return apiClient.delete('/api/categorie/' + formCat)
    },
    deleteGenre(formGenre){
        return apiClient.delete('/genre/' + formGenre)
    },
    deleteAuteur(formAuteur){
        return apiClient.delete('/auteur/'+ formAuteur)
    },
    deleteLivre(formLivre){
        return apiClient.delete('/livre/'+ formLivre)
    },
    //requete put by something
    updateCategorie(id,nom){
        console.log(nom)
        return apiClient.put('/api/categorie/'+ id, nom)
    },
    updateGenre(id, nom){
        console.log("iddddd", id)
        console.log("nommmmmm", nom)
        return apiClient.put('/genre/'+ id, nom)
    },
    updateAuteur(id, nom, prenom){
        console.log("iddddd", id)
        console.log("nommmmmm", nom)
        return apiClient.put('/auteur/'+ id, nom, prenom)
    },
    updateLivre(id, nom, description, image, prix, etat, ville, idcategorie, idgenre, idauteur, iduser){
        console.log("iddddd", id)
        console.log("nomm", nom)
        return apiClient.put('/livre/'+ id, nom, description, image, prix, etat, ville, idcategorie, idgenre, idauteur, iduser)
    }
    
    
}
