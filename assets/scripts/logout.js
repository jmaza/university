'use strict';

$(document).ready(function(){
      $("#btnLogout").click(function(e){
          e.preventDefault();
        $.ajax({type: "POST",
                url: "/logout",
                contentType: "application/json",
                data: JSON.stringify({ req: 'logout' }),
                success:function(result){
                    window.location.href = "/home"
                },
                error: function(result) {
                    alert('error');
                }
            });
      });
});
