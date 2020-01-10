'use strict';

let time_to_first_input = function(event) {
    
      const connection = navigator.connection;
      if(connection) {
        console.log(`network condition: ${connection.effectiveType} + ${connection.rtt}ms rtt`);
      }

    const perf = window.performance;

    if (perf && perf.getEntriesByType) {

        const current_time = Math.floor(perf.now());
        console.log(`User first input [${event.type}] since page navigation start: ${current_time}`);


        let fcp_entry = perf.getEntriesByName('first-contentful-paint');
        if (fcp_entry.length > 0) {
            let fcp_time = Math.floor(fcp_entry[0].startTime);
            console.log(`First contentful paint(FCP) duration since page navigation start: ${fcp_time}`);
            console.log(`User first input [${event.type}] since first contentful piant: ${current_time - fcp_time}`);
        }

        let user_marks = perf.getEntriesByType('mark');
        if (user_marks.length > 0) {
            let last_user_mark_time = Math.floor(user_marks[user_marks.length - 1].startTime);
            console.log(`Performance mark duration since page navigation start: ${last_user_mark_time}`);
            console.log(`User first input [${event.type}] since lastest performance mark: ${current_time - last_user_mark_time}`);
        }

        setTimeout(() => {
            let fid_time = perf.getEntriesByType('first-input');
            if (fid_time.length > 0) { // scoll is not included in 'first-input' event
                let fid_start_time = Math.floor(fid_time[0].startTime);
                let fid_process_start = Math.floor(fid_time[0].processingStart);
                let fid_process_end = Math.floor(fid_time[0].processingEnd);
                console.log(`First input event [${event.type}] since page navigation start: ${fid_start_time}`);
                console.log(`First input delay(FID): ${fid_process_start-fid_start_time}`);
                console.log(`First input processing time: ${fid_process_end-fid_process_start}`);
                console.log(`First ux input [${event.type}] delay: ${current_time-fid_process_start}`);
            }
        }, 1000);

    } else {
        console.log("performance object is not supported by current browser, remove the event listener anyway...");
    }
    //remove the eventlistener once user either conduct 'click' or 'scroll' on the page
    window.removeEventListener('scroll', time_to_first_input);
    window.removeEventListener('click', time_to_first_input);
    window.removeEventListener('keydown', time_to_first_input);

    // To-DO: will use the fetch API to bring those data back to logging server

};

window.addEventListener('scroll', time_to_first_input);
window.addEventListener('click', time_to_first_input);
window.addEventListener('keydown', time_to_first_input);
