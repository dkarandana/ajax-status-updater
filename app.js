import $ from 'jquery';
import StatChecker from './StatChecker';
import './style.css';

let data = [
 ["0001","Notification 1","Notification Body","fail"],
 ["00021","Notification 2","Notification Body","fail"] ,
 ["0003","Notification 3","Notification Body","queued"],
 ["0004","Notification 4","Notification Body","fail"],
 ["0005","Notification 5","Notification Body","fail"],
 ["0006","Notification 6","Notification Body","fail"],
 ["0007","Notification 7","Notification Body","fail"],
 ["0008","Notification 8","Notification Body","queued"],
 ["0009","Notification 9","Notification Body","fail"],
 ["0010","Notification 10","Notification Body","queued"]  
];

let statRunner = new StatChecker(
 {
    min:1000*5,
    max:1000*10
  }
);

let $rootEle = $('#app');
let $table = $(`<table border=1></table>`);

data.forEach(( record )=>{
  $table.append(`
  <tr>
    <td>${record[0]}</td>
    <td>${record[1]}</td>
    <td>${record[2]}</td>
    <td class="stat">${record[3]}</td>
  </tr>`)
// Add watch

  if( record[3] == "queued" ){
    statRunner.addWatch("pushnotification", record[0] );
  }

});

console.log("current Queue", statRunner.currentQueue());

$rootEle.append( $table );
