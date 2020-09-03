$(document).ready(function () {
  console.log("startUp is firing");
  wireHandlers();
});

function wireHandlers() {
  console.log("wireHandlers is firing");

  $("#submit").on("click", validateInput);
}

function validateInput() {
  console.log("clicked submit!");
  const title = $("#title").value();
    const rating = $("#rating").value();
    
    
}
