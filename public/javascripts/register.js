function register(){
  let username = $('#username').val();
  let password = $('#password').val();
  let confirm_password = $('#confirm_password').val();
  
  if (password !== confirm_password) {
    alert('兩次密碼輸入不一致!');
  } else {
    let data = {'username': username, 'password': password};
    $.ajax({
      url: '/register',
      type: 'POST',
      data: data,
      success: function(return_data, status, xhr){
        alert(return_data['message']);
      },
      error: function(err) {
        alert(err['responseJSON']['message']);
      }
    });
  }
}

