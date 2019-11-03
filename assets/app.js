var config = {
  apiKey: "AIzaSyCtKXQM8ZSULQgMZm7hEtNvRObX6haEVsg",
  authDomain: "train-scheduler-9a240.firebaseapp.com",
  databaseURL: "https://train-scheduler-9a240.firebaseio.com",
  projectId: "train-scheduler-9a240",
  storageBucket: "train-scheduler-9a240.appspot.com",
  messagingSenderId: "591108823841",
  appId: "1:591108823841:web:07093c4d74c82d7264fc60"
};

firebase.initializeApp(config);

const $newTable = $("#new-table");

function getMinutesAwayMs(firstTrainTime, frequencyMinutes) {
  const fMinutes = parseInt(frequencyMinutes);
  const freqMs = fMinutes * 60 * 1000;
  const currentTimeMs = moment().valueOf();
  const firstTimeMs = moment(firstTrainTime, "HH:mm").valueOf();
  return freqMs - (Math.abs(currentTimeMs - firstTimeMs) % freqMs);
}

function getNextArrival(minutesAwayMs) {
  return moment()
    .add(minutesAwayMs)
    .format("HH:mm");
}

function getTrimmedValue(id) {
  return $(id)
    .val()
    .trim();
}

$("#add-train").on("click", function(event) {
  event.preventDefault();
  const trainName = getTrimmedValue("#trainInput");
  const destination = getTrimmedValue("#destinationInput");
  let firstTrainTime = getTrimmedValue("#firstTrainTimeInput");
  let frequencyMinutes = getTrimmedValue("#frequencyInput");
  firebase
    .database()
    .ref()
    .push({
      trainName,
      destination,
      firstTrainTime,
      frequencyMinutes
    });
});

firebase
  .database()
  .ref()
  .on("child_added", function(snapshot) {
    const data = snapshot.val();
    const { trainName, destination, frequencyMinutes, firstTrainTime } = data;
    const minutesAwayMs = getMinutesAwayMs(firstTrainTime, frequencyMinutes);
    const minutesAway = moment.duration(minutesAwayMs).humanize();
    const nextArrival = getNextArrival(minutesAwayMs);
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
