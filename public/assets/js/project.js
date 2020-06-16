$(() => {
  const projectID = $("#project-title").attr("data-id");
  // click event listener for arrow buttons
  $(document).on("click", "svg", event => {
    const clickID = $(event.target).attr("id");
    const numID = parseInt(clickID.split("-")[2]);
    window.location.href = `/story/view/${numID}`;
  });
  // click event listener for buttons
  $(document).on("click", ".button", event => {
    const clickID = $(event.target).attr("id");
    if (clickID === "add-story-btn") {
      window.location.href = `/project/add/${projectID}`;
    } else if (clickID === "edit-project-btn") {
      window.location.href = `/project/edit/${projectID}`;
    }
  });
});
