var div1 = document.getElementById("div1");
var div2 = document.getElementById("div2");

function showDiv1() {
	var xz1 = document.getElementById("xz1");
	var xz2 = document.getElementById("xz2");
	div1.style.display = 'block';
	xz1.style.backgroundColor = '#B73133';
	xz2.style.backgroundColor = 'rgba(205, 50, 50, 0.8)';
	div2.style.display = 'none';
}

function showDiv2() {
	var xz1 = document.getElementById("xz1");
	var xz2 = document.getElementById("xz2");
	div2.style.display = 'block';
	div1.style.display = 'none';
	xz1.style.backgroundColor = 'rgba(205, 50, 50, 0.8)';
	xz2.style.backgroundColor = '#B73133';
}

$(document).ready(function(){
	 $("#user").blur(function(){
	var name = $("#user").val();
	if(name == null || name == "") {
		document.getElementById("tip1").innerHTML="用户名不能为空!";
		document.getElementById("user").style.borderColor='#d0373a';
 		}
		else{
			document.getElementById("tip1").innerHTML="";
			document.getElementById("user").style.borderColor='rgba(190, 190, 190, 0.5)';
		}
 });
 
 // 检查密码正确
 // document.getElementById("tip2").innerHTML="密码错误请重试";
 //document.getElementById("password").style.borderColor='#d0373a';
 $("#email").blur(function(){
 	var email = $("#email").val();
	var aa = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
 	if(email == null || email == "") {
 		document.getElementById("tip3").innerHTML="邮箱不能为空!";
 		document.getElementById("email").style.borderColor='#d0373a';
 		}
	
	else if(!aa.test(email)){
		document.getElementById("tip3").innerHTML="请写完整的邮箱格式！";
		document.getElementById("email").style.borderColor='#d0373a';
	}
	else{
		document.getElementById("tip3").innerHTML="";
		document.getElementById("email").style.borderColor='rgba(190, 190, 190, 0.5)';
	}
 });
 // 检查验证码
});
$("#login").click(function() {

	if (div1.style.display == 'block') {
		var data = {
			"username": $("#user").val(),
			"password": $("#password").val()

		};
		$.ajax({
			url: "http://localhost:8080/Project_war/UserLoginServlet", //后端给的网址
			type: "POST", //POST,GET
			dataType: "json", //后端给的格式
			contentType: "application/json;charset=UTF-8", //统一，可以不写，但有时会交互失败

			data: JSON.stringify(data),
			//传给后端的内容，无则空
			success: function(data) {
				//data是后端传来的json

			},
			error: function() {
				//失败提醒
				var error = "登录失败！";
				console.log(error);
				//alert(error);
			}
		});
	}
	if (div2.style.display == 'block') {

		var data = {
			"email": $("#email").val(),
			"password": $("#getCode").val()

		};
		$.ajax({
			url: "http://localhost:8080/Project_war/UserLoginServlet", //后端给的网址
			type: "POST", //POST,GET
			dataType: "json", //后端给的格式
			contentType: "application/json;charset=UTF-8", //统一，可以不写，但有时会交互失败

			data: JSON.stringify(data),
			//传给后端的内容，无则空
			success: function(data) {
				//data是后端传来的json

			},
			error: function() {
				//失败提醒
				var error = "邮箱登录失败！";
				console.log(error);
				//alert(error);
			}
		});

	}
})
$("#getit").click(function(){
		var data = {
			"email": $("#email").val(),
		};
		$.ajax({
			url: "http://localhost:8080/Project_war/EmailLoginServlet", //后端给的网址
			type: "POST", //POST,GET
			dataType: "json", //后端给的格式
			contentType: "application/json;charset=UTF-8", //统一，可以不写，但有时会交互失败
		
			data: JSON.stringify(data),
			//传给后端的内容，无则空
			success: function(data) {
				//data是后端传来的json
	
			},
			error: function() {
				//失败提醒
				var error = "获取验证码失败！";
				console.log(error);
				//alert(error);
			}
		});
	});
});
