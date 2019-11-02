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
  let firstTrainTime = getTrimmedValue("#firstTrainTimeInput");
  let frequencyMinutes = getTrimmedValue("#frequencyInput");
  console.log(firstTrainTime);
  //event listener
  firebase
    .database()
    .ref()
    .push({
      trainName,
      destination,
      firstTrainTime,
      frequencyMinutes
    });

  //moment.js-calculate times

  const currentTime = moment().format("HH:mm");

  const cHours = currentTime.split(":");
  console.log(cHours);

  console.log(currentTime);

  // moment coding for the game:
  console.log(firstTrainTime);
  let firstTrain = moment(firstTrainTime, "HH:mm").format("HH:mm");
  console.log(firstTrain);
  const fHours = firstTrain.split(":");
  console.log(fHours);
  //.subtract
  const currentMinusFirstTrainTime = moment(currentTime).diff(
    moment(firstTrain)
  );
  console.log(currentMinusFirstTrainTime);

  const fMinutes = moment(frequencyMinutes).format("mm");
  console.log(fMinutes);
  const timeLeft = currentMinusFirstTrainTime % frequencyMinutes;

  // minutes away value
  minutesAway = frequencyMinutes - timeLeft;

  //next train time
  nextArrival = minutesAway + currentTime;
});

//add child to firebase
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

// //moment.js-calculate times
// const currentTime = moment().format("HH:mm");
// console.log(currentTime);

// // moment coding for the game:
// let firstTrain = moment(firstTrainTime).format("HH:mm");
// const currentMinusFirstTrainTime = currentTime - firstTrain;
// console.log(currentMinusFirstTrainTime);

// const timeLeft = currentMinusFirstTrainTime % frequencyMinutes;

// // minutes away value
// minutesAway = frequencyMinutes - timeLeft;

// //next train time
// nextArrival = minutesAway + currentTime;
