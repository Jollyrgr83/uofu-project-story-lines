$(document).ready(() => {
  // Getting references to our form and input
  const resetForm = $("#reset-form");
  const emailInput = $("#email");
  const passwordInput = $("#password");

  resetForm.on("submit", event => {
    event.preventDefault();
    if (emailInput.val() !== undefined) {
      sendEmail(emailInput.val());
    } else if (passwordInput.val() !== undefined) {
      resetPassword(passwordInput.val());
    }
  });

  function sendEmail(email) {
    $.ajax("/api/reset/send", {
      type: "PUT",
      data: { email: email }
    }).then(result => {
      console.log(result);
      $("#alert .msg").html("<span>Email sent</span><br/>");
      $("#alert").fadeIn(500);
    });
  }

  function resetPassword(password) {
    const queryString = window.location.href;
    const id = queryString.split("/")[4];
    const token = queryString.split("/")[5];
    $.ajax("/api/reset/password", {
      type: "PUT",
      data: {
        id: id,
        token: token,
        password: password
      }
    }).then(result => {
      if (result === true) {
        $("#alert .msg").html("<span>Password reset!</span><br/>");
        $("#alert").fadeIn(500);
      } else {
        $("#alert .msg").html(
          "<span>Passowrd reset failed, please check your link</span><br/>"
        );
        $("#alert").fadeIn(500);
      }
    });
  }
});
