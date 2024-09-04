function register() {
  let username = $("#username").val();
  let password = $("#password").val();

  let data = { username: username, password: password };
  $.ajax({
    url: "/register",
    type: "POST",
    data: data,
    success: function (return_data, status, xhr) {
      alert(return_data["message"]);
    },
    error: function (err) {
      alert(err["responseJSON"]["message"]);
    },
  });
}
