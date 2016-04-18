function check_server() {
    var serwer = localStorage.getItem("server");
    if (serwer) {
        $("#login_form").css("display", "block");
        $("#serwer_name").append(serwer);
    } else {
        $("#serwer_form").css("display", "block");
    }
}

function add_serwer() {
    window.serwer_data = $("#serwer_form").serializeArray();
    var server_name = serwer_data[0].value;
    localStorage.setItem("server", server_name);
    check_server();
}


function log_in() {

    window.login_data = $("#login_form").serializeArray();
    window.username = login_data[0].value.toUpperCase();
    window.password = login_data[1].value;
    if (window.password == "" && window.username == "") {
        window.username = ".";
    }
    $(function () {

        var url = "https://" + window.username + ":" + window.password + "@system.fastdata.com.pl:4567/rin/leady?";

        $.ajax(url,
            {
                beforeSend: load_start(),
                statusCode: {
                    401: function () {
                        console.log("nie autoryzowano");
                        $("#login_error").css("display", "block");
                        $("#password").val('');
                        $("#username").val('');
                        $("#contact_info_load").remove();


                    },
                    200: function () {
                        console.log("autoryzowano");
                        $("#login_error").css("display", "none");
                        $("#leeds-content").load('auth_app.html');
                        $("#leeds-content").css("display", "block");
                        $("#login").css('display', "none");


                    }
                }
            });
    });
}

function load_start() {
    $("#login_form").append(' <div id="contact_info_load" class="col-centered" style="text-align: center; padding-top: 15px;"><img src="ajax-loader.gif" ></div>');
}


