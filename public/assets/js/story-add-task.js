$(() => {
  // event listener for button
  $(".button").on("click", () => {
    const data = {
      storyID: parseInt($("#story-title").attr("data-id")),
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
    }).then(data => {
      window.location.href = `/story/view/${parseInt(data.story)}`;
    });
  });
});
