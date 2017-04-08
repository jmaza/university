'use strict';

$(document).ready(function(){
      $("#btnLogin").click(function(e){
          e.preventDefault();
        $.ajax({type: "POST",
                url: "/login",
                contentType: "application/json",
                data: JSON.stringify({ username: $("#username").val(), password: $("#password").val() }),
                success:function(result){
                    window.location.href = "/home"
                },
                error: function(result) {
                    alert('error');
                }
            });
      });
});
