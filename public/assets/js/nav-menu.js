$(() => {
  $(document).on("click", event => {
    let id;
    const a =
      event.target.getAttribute("class") === null
        ? "none"
        : event.target.getAttribute("class");
    const b =
      event.target.parentElement.getAttribute("class") === null
        ? "none"
        : event.target.parentElement.getAttribute("class");
    const c =
      event.target.parentElement.parentElement.getAttribute("class") === null
        ? "none"
        : event.target.parentElement.parentElement.getAttribute("class");
    if (
      a.indexOf("nav-btn") !== -1 ||
      b.indexOf("nav-btn") !== -1 ||
      c.indexOf("nav-btn") !== -1
    ) {
      if (a.indexOf("nav-btn") !== -1) {
        id = event.target.getAttribute("id");
      } else if (b.indexOf("nav-btn") !== -1) {
        id = event.target.parentElement.getAttribute("id");
      } else {
        id = event.target.parentElement.parentElement.getAttribute("id");
      }
      const routes = { home: "/dash", add: "/add/", search: "/search/" };
      if (routes[id]) {
        window.location.href = routes[id];
      }
    }
  });
});
