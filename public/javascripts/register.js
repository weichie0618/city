function register() {
  var lineUsername = window.lineUsername || "";
  var userId = window.userId || "";
  var liffId = window.liffId || "";

  // 現在您可以使用 username 變量

  let username = $("#username").val();
  let password = $("#password").val();

  let data = {
    userId: userId,
    liffId: liffId,
    lineUsername: lineUsername,
    username: username,
    password: password,
  };
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
