$(() => {
  // event listener for arrow button clicks
  $(".button").on("click", () => {
    const data = {
      projectID: parseInt($("#project-title").attr("data-id")),
      storyTitle: $("#story-title")
        .val()
        .trim(),
      storyDesc: $("#story-description")
        .val()
        .trim(),
      ownerID: parseInt($("#owner-select").val()),
      assigneeID: parseInt($("#assignee-select").val()),
      statusID: parseInt($("#status-select").val())
    };
    $.ajax("/api/add/story", {
      type: "POST",
      data: data
    }).then(data => {
      console.log(data);
    });
  });
});
