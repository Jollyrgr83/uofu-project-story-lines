$(() => {
  $(document).on("click", event => {
    const id = $(event.target).attr("id");
    console.log(event.target);
    console.log("id", id);
    const routes = {
      home: "/dash",
      add: "/add/",
      search: "/search/",
      project: "/project/id/project_id",
      arrow: "/story/"
    };
    if (routes[id]) {
      window.location.href = routes[id];
    }
  });
});
