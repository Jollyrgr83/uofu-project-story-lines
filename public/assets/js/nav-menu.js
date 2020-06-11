$(() => {
  $(document).on("click", event => {
    const id = $(event.target).attr("id");
    const routes = {
      home: "/dash",
      add: "/add/",
      search: "/search/",
      project: "/project/id/project_id",
      arrowStory: "/story/",
      arrowProject: "/project/",
      logout: "/logout/"
    };
    if (routes[id]) {
      window.location.href = routes[id];
    }
  });
});
