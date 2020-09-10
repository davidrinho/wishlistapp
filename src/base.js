import firebase from 'firebase';



const firebaseConfig = {
    apiKey: "AIzaSyAmnA4lNTDaTJ4_N5JUR3B-mP6h8jU7P7Q",
    authDomain: "wishlist-9bddd.firebaseapp.com",
    databaseURL: "https://wishlist-9bddd.firebaseio.com",
    projectId: "wishlist-9bddd",
    storageBucket: "wishlist-9bddd.appspot.com",
    messagingSenderId: "929548929948",
    appId: "1:929548929948:web:67fccbbd075ae701fc5659"
  };




  class Firebase {
      constructor() {
        firebase.initializeApp(firebaseConfig);
        this.auth = firebase.auth();
        this.db = firebase.database();
        this.ref = this.db.ref('lists');
        
      }


      signIn(email, password) {
          return this.auth.signInWithEmailAndPassword(email, password);
      }

      signOut() {
        return this.auth.signOut();
      }

      async registerUser(email, password) {
        await this.auth.createUserWithEmailAndPassword(email, password);
        return this.auth.currentUser.updateProfile({
            displayName: email.split("@")[0]
        });
      }

      getCurrentUsername() {
        return this.auth.currentUser && this.auth.currentUser.displayName;
      }

      updateStatus(person, item, status) {
        console.log(person);
        return this.db.ref('lists/' + person + '/' + item).update({
          status: status
        });
      }

      updateBoughtBy(person, item) {
        return this.db.ref('lists/' + person + '/' + item).update({
          boughtBy: this.auth.currentUser.displayName        
        })
      }

      removeBoughtBy(person, item) {
        return this.db.ref('lists/' + person + '/' + item + "/boughtBy").remove()
          .then(() => {
            console.log("Removed successfully!");
          })
          .catch((error) => {
            console.log("Remove failed: " + error.message);
          });
      }

      addItem(person, item) {
        return this.db.ref('lists/' + person).update({
          [item] : {
            status: "notdone"
          }
        })
      }

      removeItem(person, item) {
        console.log(item)
        return this.db.ref('lists/' + person + '/' + item).remove()
          .then(() => {
            console.log(`Successfully removed ${item}!`);
          })
          .catch((error) => {
            console.log(`Could not remove ${item}: ${error.message}`)
          })
      }



  }


  export default new Firebase();