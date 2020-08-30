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

      async registerUser(email, password) {
        await this.auth.createUserWithEmailAndPassword(email, password);
        return this.auth.currentUser.updateProfile({
            displayName: 'test'
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



  }


  export default new Firebase();