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

const $newTable = $("#new-table");

function getMinutesAway(firstTrainTime, frequencyMinutes) {
  return "TODO";
}

function getNextArrival(minutesAway) {
  return "TODO";
}

function getTrimmedValue(id) {
  return $(id)
    .val()
    .trim();
}

//click event
$("#add-train").on("click", function(event) {
  event.preventDefault();
  const trainName = getTrimmedValue("#trainInput");
  const destination = getTrimmedValue("#destinationInput");
  const firstTrainTime = getTrimmedValue("#firstTrainTimeInput");
  const frequencyMinutes = getTrimmedValue("#frequencyInput");

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
    const data = snapshot.val();
    const { trainName, destination, frequencyMinutes, firstTrainTime } = data;
    const minutesAway = getMinutesAway(firstTrainTime, frequencyMinutes);
    const nextArrival = getNextArrival(minutesAway);
    const row = `
      <tr>
        <td>${trainName}</td>
        <td>${destination}</td>
        <td>${frequencyMinutes}</td>
        <td>${nextArrival}</td>
        <td>${minutesAway}</td>
      </tr>
      `;
    $newTable.append(row);
  });

// moment.js
// const diffBetweenCurrentTimeAndFirstTrainTime = currentTime - firstTrainTime
// const timeRemainder = diffBetweenCurrentTimeAndFirstTrainTime % trainFrequency
// // this is your minutes away value
// const minutesAway = trainFrequency - timeRemainder
// // next train time
// const nextTrainTime = minutesAway + currentTime
