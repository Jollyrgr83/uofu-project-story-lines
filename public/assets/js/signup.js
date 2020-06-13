$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("#signup-form");
  const emailInput = $("#email-input");
  const passwordInput = $("#password-input");
  const nameInput = $("#name-input");
  const phoneInput = $("#phone-input");
  const roleInput = $("#role-select");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      name: nameInput.val().trim(),
      phone: phoneInput.val(),
      role: parseInt(roleInput.val())
    };

    if (
      !userData.email ||
      !userData.password ||
      !userData.name ||
      !userData.phone ||
      !userData.role
    ) {
      $("#alert .msg").text("Missing user details");
      $("#alert").fadeIn(500);
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(
      userData.email,
      userData.password,
      userData.name,
      userData.phone,
      userData.role
    );
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the dashboard page
  // Otherwise we log any errors
  function signUpUser(email, password, name, phone, role) {
    $.post("/api/signup", {
      email: email,
      password: password,
      name: name,
      phone: phone,
      role: role
    })
      .then(() => {
        window.location.replace("/dash");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    console.log(err.responseJSON.errors);
    $("#alert .msg").empty();
    for (const i in err.responseJSON.errors) {
      $("#alert .msg").append(
        `<span>${err.responseJSON.errors[i].message}</span><br/>`
      );
    }
    $("#alert").fadeIn(500);
  }
});
