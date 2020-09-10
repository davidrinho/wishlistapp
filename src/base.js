import firebase from 'firebase';
import firebaseConfig from './config';


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