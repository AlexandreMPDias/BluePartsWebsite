function startFirebase(){
    var config = {
        apiKey: "AIzaSyDtxKDjRTk5xEmE-AP0Iw8utrQ1Z5faRZU",
        authDomain: "part-database.firebaseapp.com",
        databaseURL: "https://part-database.firebaseio.com",
        projectId: "part-database",
        storageBucket: "part-database.appspot.com",
        messagingSenderId: "336768052827"
      };
      firebase.initializeApp(config);
}
/*
function populateListOfParts(ref){
    ref.on("child_added", data => {
        if(data.val().name != undefined)
            pTable.addPartFromDB(data.val());
    });
}
*/

startFirebase();
//var ref = firebase.database().ref("/");
//ref.orderByChild('Side').on('child_added', data => console.log(data.val().name));
//populateListOfParts(ref);
//pTable.listParts();