$(() => {
  // event listener for arrow button clicks
  $(document).on("click", ".arrow-btn", event => {
    const arrowID = $(event.target).attr("id");
    const numID = parseInt(arrowID.split("-")[1]);
    const textID = arrowID.split("-")[0];
    if (textID === "arrowProject") {
      window.location.href = `/project/view/${numID}`;
    } else if (textID === "arrowStory") {
      window.location.href = "/story/";
    }
  });
});
