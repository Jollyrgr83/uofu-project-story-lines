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
});
