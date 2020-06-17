$(() => {
  const storyID = $("#story-title").attr("data-id");
  // click event listener for buttons
  $(document).on("click", ".button", event => {
    const clickID = $(event.target).attr("id");
    if (clickID === "add-task-btn") {
      window.location.href = `/story/add/${storyID}`;
    } else if (clickID === "edit-story-btn") {
      window.location.href = `/story/edit/${storyID}`;
    }
  });
  // event listener for task status menu change
  $(document).on("change", ".task-status", event => {
    const clickID = $(event.target).attr("id");
    const numID = parseInt(clickID.split("-")[3]);
    const status = parseInt($(event.target).val());
    $.ajax("/api/edit/task", {
      type: "PUT",
      data: { id: numID, status: status }
    }).then(data => {
      window.location.href = `/story/view/${data[0]}`;
    });
  });
});
