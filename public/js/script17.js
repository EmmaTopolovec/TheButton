// Your web app's Firebase configuration
// Hidden because I assume I shouldn't put this info on a public repo
var firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log(firebase);
firebase.analytics();

var number = 0;
var pressed = false;
var button = document.getElementsByTagName("img")[0];
var counter = document.getElementById("counter");
var wikiLink = document.getElementById("wiki_link");

var db = firebase.firestore();
var counterRef = db.collection('counter').doc('counter');

var num;

function setNum(doc) {
    num = doc.data().counter;
}

db.collection("counter").get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        setNum(doc);
    })
});

button.addEventListener("click", onClick);
function onClick() {
    if (!pressed) {
        $(".button" ).remove();
        pressed = true;
        title.innerText = "You lost The Game!";
        counter.style.display = "block";
        wikiLink.style.display = "block";
        document.body.style.backgroundColor = "rgb(255, 153, 153)";

        counterRef.update({
            counter: firebase.firestore.FieldValue.increment(1)
        });

        counter.innerText = num + " people have pressed the button.";
    }
};
