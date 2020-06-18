$(() => {
  $(document).on("click", ".arrow-btn", event => {
    const arrowID = $(event.target).attr("id");
    const numID = parseInt(arrowID.split("-")[2]);
    const textID = arrowID.split("-")[1];
    if (textID === "project") {
      window.location.href = `/project/view/${numID}`;
    } else if (textID === "story") {
      window.location.href = `/story/view/${numID}`;
    }
  });
  $(document).on("click", event => {
    const clickID = $(event.target).attr("id");
    if (clickID === "search-btn") {
      getSearchResults();
    }
  });
  // gets search results
  function getSearchResults() {
    // pull input from search bar
    const searchInput = $("#search-input")
      .val()
      .trim();
    // data validation for blank entries
    if (
      searchInput === "" ||
      searchInput === null ||
      searchInput === undefined
    ) {
      return;
    }
    $.get("/search/" + searchInput)
      .then(() => {
        window.location.replace("/search/" + searchInput);
      })
      .catch(err => {
        console.log(err);
      });
  }
});
