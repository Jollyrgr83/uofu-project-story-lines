$(() => {
  $(() => {
    // click event listener for buttons
    $(document).on("click", "svg", event => {
      const clickID = $(event.target).attr("id");
      const clickClass = $(event.target).attr("class");
      if (clickID === "add-story-btn") {
        // console.log($("#project-title").attr("data-id"));
        window.location.href = `/project/add/${$("#project-title").attr(
          "data-id"
        )}`;
      }
      if (clickClass.indexOf("pencil") !== -1) {
        if (clickID.split("-")[1] === "details") {
          renderDetails("edit");
        } else {
          // $.get("/project/project_id/edit/story_id");
          // const story_id = parseInt(clickID.split("-")[1]);
        }
      }
      if (clickID === "update-details") {
        // insert PUT request and update db object
        renderDetails("static");
        detailsMessage();
      }
    });
    // renders edit story details section
    function renderDetails(inputType) {
      $("#details-section").empty();
      if (inputType === "static") {
        const divEl = htmlEl("div", ["row-container row mx-auto", "none"]);
        const pTitleEl = htmlEl("p", ["section-title", "none"]);
        pTitleEl.text("Details");
        const editBtnEl = createSVG("edit-details", "edit");
        divEl.append(pTitleEl);
        divEl.append(editBtnEl);
        $("#details-section").append(divEl);
        const pTextEl = htmlEl("p", ["story-details mx-auto", "none"]);
        pTextEl.text(db.project[0].details);
        $("#details-section").append(pTextEl);
      } else {
        $("#details-message").empty();
        const divEl = htmlEl("div", ["row-container row mx-auto", "none"]);
        const pTitleEl = htmlEl("p", ["section-title", "none"]);
        pTitleEl.text("Details");
        const editBtnEl = createSVG("update-details", "save");
        divEl.append(pTitleEl);
        divEl.append(editBtnEl);
        $("#details-section").append(divEl);
        const textareaEl = htmlEl("textarea", [
          "story-details mx-auto",
          "details-input"
        ]);
        textareaEl.val(db.project[0].details);
        textareaEl.attr("rows", 6);
        $("#details-section").append(textareaEl);
      }
    }
    // renders message following details update
    function detailsMessage() {
      $("#details-message").empty();
      const messageEl = htmlEl("p", ["section-message", "none"]);
      messageEl.text("Project details updated!");
      $("#details-message").append(messageEl);
    }
    // generates arrowBtn svg elements
    function createSVG(inputID, btnType) {
      const ref = {
        xmlns: "http://www.w3.org/2000/svg",
        fillrule: "evenodd",
        fill: "currentColor",
        width: "1em",
        height: "1em",
        viewBox: "0 0 16 16",
        edit: {
          class: "story-btn bi bi-pencil",
          pathOneD:
            "M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z",
          pathTwoD:
            "M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"
        },
        save: {
          class: "story-btn bi bi-arrow-clockwise",
          pathOneD:
            "M3.17 6.706a5 5 0 0 1 7.103-3.16.5.5 0 1 0 .454-.892A6 6 0 1 0 13.455 5.5a.5.5 0 0 0-.91.417 5 5 0 1 1-9.375.789z",
          pathTwoD:
            "M8.147.146a.5.5 0 0 1 .707 0l2.5 2.5a.5.5 0 0 1 0 .708l-2.5 2.5a.5.5 0 1 1-.707-.708L10.293 3 8.147.854a.5.5 0 0 1 0-.708z"
        },
        add: {
          class: "story-btn bi bi-plus",
          pathOneD:
            "M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z",
          pathTwoD:
            "M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z"
        },
        arrowStory: {
          class: "arrow-btn bi bi-arrow-right-short",
          pathOneD:
            "M8.146 4.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.793 8 8.146 5.354a.5.5 0 0 1 0-.708z",
          pathTwoD:
            "M4 8a.5.5 0 0 1 .5-.5H11a.5.5 0 0 1 0 1H4.5A.5.5 0 0 1 4 8z"
        }
      };
      const svgEl = document.createElementNS(ref.xmlns, "svg");
      svgEl.setAttribute("id", inputID);
      svgEl.setAttribute("class", ref[btnType].class);
      if (btnType === "arrowStory") {
        svgEl.setAttribute("width", "1.5em");
        svgEl.setAttribute("height", "1.5em");
      } else {
        svgEl.setAttribute("width", ref.width);
        svgEl.setAttribute("height", ref.height);
      }
      svgEl.setAttribute("viewBox", ref.viewBox);
      svgEl.setAttribute("fill", ref.fill);
      const pathOneEl = document.createElementNS(ref.xmlns, "path");
      pathOneEl.setAttribute("fill-rule", ref.fillrule);
      pathOneEl.setAttribute("d", ref[btnType].pathOneD);
      const pathTwoEl = document.createElementNS(ref.xmlns, "path");
      pathTwoEl.setAttribute("fill-rule", ref.fillrule);
      pathTwoEl.setAttribute("d", ref[btnType].pathTwoD);
      svgEl.append(pathOneEl);
      svgEl.append(pathTwoEl);
      return svgEl;
    }
    // generates html elements
    function htmlEl(elType, elArr) {
      const el = $(`<${elType}>`);
      if (elArr[0] !== "none") {
        el.attr("class", `${elArr[0]}`);
      }
      if (elArr[1] !== "none") {
        el.attr("id", `${elArr[1]}`);
      }
      return el;
    }
  });
});
