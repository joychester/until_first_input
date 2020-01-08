const iterations = 1000;
const multiplier = 1000000000;

/**
 * Doing the pointless computations.
 */
var pointlessComputationsButton = document.getElementById("pointless-computations");
pointlessComputationsButton.addEventListener("click", doPointlessComputations, false);

function doPointlessComputations() {

  doPointlessComputationsWithBlocking();
}

/**
 * Start/stop animation
 */
var started = false;
var startStopButton = document.getElementById("start-stop");

startStopButton.addEventListener("click", startStop, false);

function startStop() {
  started = !started;
  if (started) {
    container.classList.add("started");
  }
  else {
   container.classList.remove("started");
  }
}
