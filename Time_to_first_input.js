'use strict';

let time_to_first_input = function() {

  const perf = window.performance;
  const current_time = Math.floor(perf.now());

  console.log(`user first input since navigating to the page: ${current_time}`);

  if(perf && perf.timing && perf.getEntriesByType) {
    if (perf.getEntriesByType('mark')) {
      const user_marks = perf.getEntriesByType('mark');
      const last_user_mark_time = Math.floor(user_marks[user_marks.length - 1].startTime);

      console.log(`Performance mark duration since page navigation start: ${last_user_mark_time}`);
      console.log(`User first input since lastest performance mark: ${current_time - last_user_mark_time}`)
    }


    const fcp_time = Math.floor(perf.getEntriesByName('first-contentful-paint')[0].startTime);
    console.log(`First contentful paint duration since page navigation start: ${fcp_time}`);
    console.log(`User first input since first contentful piant: ${current_time - fcp_time}`);

  } else {
    console.log("performance object is not supported by current browser, remove the event listener anyway...");
  }
  //remove the eventlistener once user either conduct 'click' or 'scroll' on the page
  window.removeEventListener('scroll', time_to_first_input);
  window.removeEventListener('click', time_to_first_input);

  // will use the fetch API to bring those data back to logging server

};

window.addEventListener('scroll', time_to_first_input);
window.addEventListener('click', time_to_first_input);
