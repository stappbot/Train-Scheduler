var config = {
  apiKey: "AIzaSyCtKXQM8ZSULQgMZm7hEtNvRObX6haEVsg",
  authDomain: "train-scheduler-9a240.firebaseapp.com",
  databaseURL: "https://train-scheduler-9a240.firebaseio.com",
  projectId: "train-scheduler-9a240",
  storageBucket: "train-scheduler-9a240.appspot.com",
  messagingSenderId: "591108823841",
  appId: "1:591108823841:web:07093c4d74c82d7264fc60"
};
//initialize Firebase
firebase.initializeApp(config);

var trainName = "";
var destination = "";
var firstTrainTimeInput = "";
var frequencyMinutes = 0;
var nextArrival = "";
var minutesAway = 0;

//click event
$("#add-train").on("click", function(event) {
  event.preventDefault();
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
  console.log("Click event occurred");

  //next arrival and minutes away are to be calculated elsewhere

  //event listener
  firebase
    .database()
    .ref()
    .push({
      trainName: trainName,
      destination: destination,
      firstTrainTime: firstTrainTime,
      frequencyMinutes: frequencyMinutes
    });
});

firebase
  .database()
  .ref()
  .on("child_added", function(snapshot) {
    let data = snapshot.val();
    console.log(data);
    //collect inputs into variables
    let train1 = data.trainName;
    let destination1 = data.destination;
    let frequency1 = data.frequencyMinutes;
    let firstTrain1 = data.firstTrainTime;
    console.log(train1);
    console.log(destination1);
    console.log(frequency1);
    console.log(firstTrain1);

    // $("#trainInput").html(snapshot.val().trainName);
    // $("#destinationInput").html(snapshot.val().destination);
    // $("#firstTrainTimeInput").html(snapshot.val().firstTrainTime);
    // $("#frequencyInput").html(snapshot.val().frequencyMinutes);
  });

// moment.js
// const diffBetweenCurrentTimeAndFirstTrainTime = currentTime - firstTrainTime
// const timeRemainder = diffBetweenCurrentTimeAndFirstTrainTime % trainFrequency
// // this is your minutes away value
// const minutesAway = trainFrequency - timeRemainder
// // next train time
// const nextTrainTime = minutesAway + currentTime
