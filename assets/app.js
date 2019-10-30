var config = {
  apiKey: "AIzaSyCtKXQM8ZSULQgMZm7hEtNvRObX6haEVsg",
  authDomain: "train-scheduler-9a240.firebaseapp.com",
  databaseURL: "https://train-scheduler-9a240.firebaseio.com",
  projectId: "train-scheduler-9a240",
  storageBucket: "train-scheduler-9a240.appspot.com",
  messagingSenderId: "591108823841",
  appId: "1:591108823841:web:07093c4d74c82d7264fc60"
};
//initialize Firbase
firebase.initializeApp(config);

var trainName = "";
var destination = "";
var firstTrainTimeInput = "";
var frequencyMinutes = 0;
var nextArrival = "";
var minutesAway = 0;

//click event
$("#add-train").on("click", function() {
  trainName = $("#trainInput")
    .val()
    .trim();
  destination = $("#destinationInput")
    .val()
    .trim();
  firstTrainTime = $("#firstTrainTimeInput")
    .val()
    .trim();
  frequencyMinutes = $("#frequencyInput")
    .val()
    .trim();

  //next arrival and minutes away are to be calculated elsewhere

  //event listener
  firebase
    .database()
    .ref()
    .on("value", function(snapshot) {
      trainName: trainName;
      destination: destination;
      firstTrainTime: firstTrainTime;
      frequencyMinutes: frequencyMinutes;
    });
});

firebase
  .database()
  .ref()
  .on("value", function(snapshot) {
    $("#trainInput").html(snapshot.val().trainName);
    $("#destinationInput").html(snapshot.val().destination);
    $("#firstTrainTimeInput").html(snapshot.val().firstTrainTime);
    $("#frequencyInput").html(snapshot.val().frequencyMinutes);
  });
