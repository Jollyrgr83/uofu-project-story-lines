$(() => {
  // event listener for button
  $(".button").on("click", () => {
    const storyID = parseInt($("#story-title").attr("data-id"));
    const data = {
      storyID: storyID,
      title: $("#task-title")
        .val()
        .trim(),
      owner: parseInt($("#owner-select").val()),
      time: parseFloat(
        $("#time")
          .val()
          .trim()
      ),
      status: parseInt($("#status-select").val()),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    $.ajax("/api/add/task", {
      type: "POST",
      data: data
    }).then(() => {
      window.location.href = `/story/view/${storyID}`;
    });
  });
});
