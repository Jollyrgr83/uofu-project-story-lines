$(() => {
  $(document).on("click", ".button", event => {
    const routes = { home: "/", add: "/add/", browse: "/browse/" };
    if (routes[$(event.target).attr("id")]) {
      window.location.href = routes[$(event.target).attr("id")];
    }
  });
});
