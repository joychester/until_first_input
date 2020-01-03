use 'strict';

let time_to_first_input = function() {
  let perf = window.performance;
  if(perf && perf.timing && perf.getEntriesByType) {
    let user_marks = perf.getEntriesByType('mark');
    let last_user_mark = perf.getEntriesByType('mark')[user_marks.length - 1].startTime;
    let user_start_interactive = perf.now();

    console.log(`user start to see our page at: ${last_user_mark}`);
    console.log(`user start to interactive our page at: ${user_start_interactive}`);

    //remove the eventlistener once user either conduct 'click' or 'scroll' on the page
    window.removeEventListener('scroll', user_monitor_func);
    window.removeEventListener('click', user_monitor_func);
  } else {
    console.log("performance object is not supported by current browser, remove the event listener anyway...");
    window.removeEventListener('scroll', user_monitor_func);
    window.removeEventListener('click', user_monitor_func);
  }
};

window.addEventListener('scroll', time_to_first_input);
window.addEventListener('click', time_to_first_input);
