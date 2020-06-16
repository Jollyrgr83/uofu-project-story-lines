$(() => {
  // event listener for arrow button clicks
  $(document).on("click", ".arrow-btn", event => {
    const arrowID = $(event.target).attr("id");
    const numID = parseInt(arrowID.split("-")[1]);
    const textID = arrowID.split("-")[0];
    console.log("textID", textID);
    console.log("numID", numID);
    if (textID === "arrowProject") {
      window.location.href = "/project/" + numID;
    } else if (textID === "arrowStory") {
      window.location.href = "/story/";
    }
  });
});
