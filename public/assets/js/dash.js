$(() => {
  // event listener for arrow button clicks
  $(document).on("click", ".arrow-btn", event => {
    const arrowID = $(event.target).attr("id");
    const numID = parseInt(arrowID.split("-")[2]);
    const textID = arrowID.split("-")[1];
    if (textID === "project") {
      window.location.href = `/project/view/${numID}`;
    } else if (textID === "story") {
      window.location.href = "/story/";
    }
  });
});
