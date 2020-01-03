'use strict';

let time_to_first_input = function() {
  const perf = window.performance;
  const start_time = perf.timing.navigationStart;
  const current_time = perf.now();

  if(perf && perf.timing && perf.getEntriesByType) {
    let user_marks = perf.getEntriesByType('mark');
    let last_user_mark = user_marks[user_marks.length - 1].startTime;

    console.log(`user start to see our page at: ${last_user_mark}`);
    console.log(`user start to interactive our page at: ${current_time}`);

  } else {
    console.log("performance object is not supported by current browser, remove the event listener anyway...");
  }
  //remove the eventlistener once user either conduct 'click' or 'scroll' on the page
  window.removeEventListener('scroll', time_to_first_input);
  window.removeEventListener('click', time_to_first_input);

};

window.addEventListener('scroll', time_to_first_input);
window.addEventListener('click', time_to_first_input);
