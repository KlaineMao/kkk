$(document).ready(function() {
	var fals = false;
	var sex = '男';
	$("#user").blur(function() {
		var name = $("#user").val();
		var varreg =  /^(?=.*[a-zA-Z]+)(?=.*[0-9]+)[a-zA-Z0-9]+$/;
		if (name == null || name == "") {
			document.getElementById("arr1").innerHTML = "用户名不能为空!";
			document.getElementById("user").style.borderColor = '#d0373a';
			fals = false;
		} 
		else if(!varreg.test(name)){
			document.getElementById("arr1").innerHTML = "用户名同时含字母及数字且不含特殊字符！";
			document.getElementById("user").style.borderColor = '#d0373a';
			fals = false;
		}
		else{
			document.getElementById("arr1").innerHTML = "";
			document.getElementById("user").style.borderColor = 'rgba(190, 190, 190, 0.5)';
			fals = true;
		}
	});
	$("#password").blur(function(){
		var password = $("#password").val();
		var p = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/;
		if(password == null ||password == ""){
			document.getElementById("arr2").innerHTML = "密码不能为空!";
			document.getElementById("password").style.borderColor = '#d0373a';
			fals = false;
		}
		else if(!p.test(password)){
			document.getElementById("arr2").innerHTML = "密码应8-10位同时含有大小写字母数字且不允许特殊字符!";
			document.getElementById("password").style.borderColor = '#d0373a';
			fals = false;
		}
		else{
			document.getElementById("arr2").innerHTML = "";
			document.getElementById("password").style.borderColor = 'rgba(190, 190, 190, 0.5)';
			fals = true;
		}
	});
	$("#password2").blur(function(){
		var pass = $("#password").val();
		var password = $("#password2").val();
		if(password != pass ){
			document.getElementById("arr3").innerHTML = "与密码不同请重试!";
			document.getElementById("password2").style.borderColor = '#d0373a';
			fals = false;
		}
		else{
			document.getElementById("arr3").innerHTML = "";
			document.getElementById("password2").style.borderColor = 'rgba(190, 190, 190, 0.5)';
			fals = true;
		}
	});
	$("#email").blur(function() {
		var email = $("#email").val();
		var aa = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
		if (email == null || email == "") {
			document.getElementById("arr4").innerHTML = "邮箱不能为空!";
			document.getElementById("email").style.borderColor = '#d0373a';
			fals = false;
		} else if (!aa.test(email)) {
			document.getElementById("arr4").innerHTML = "请写完整的邮箱格式！";
			document.getElementById("email").style.borderColor = '#d0373a';
			fals = false;
		} else {
			document.getElementById("arr4").innerHTML = "";
			document.getElementById("email").style.borderColor = 'rgba(190, 190, 190, 0.5)';
			fals = true;
		}
	});
	$("#male").click(function(){
		sex = '男';
	});
	$("#famale").click(function(){
		sex = '女';
	});
	// 获取验证码
	$("#getit").click(function(){
		var data = {
			"email": $("#email").val(),
		};
		$.ajax({
			url: "http://localhost:8080/Peoject_war/UpdateEmailServlet", //后端给的网址
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
	$("#zhuce").click(function(){
			// alert("成功");
			// 检查验证码正确
			var data1 = {
				"email": $("#email").val(),
				"code":  $("#getCode").val(),
			}
			$.ajax({
				url: "localhost:8080/System/RegisterServlet", //后端给的网址
				type: "POST", //POST,GET
				dataType: "json", //后端给的格式
				contentType: "application/json;charset=UTF-8", //统一，可以不写，但有时会交互失败
			
				data: JSON.stringify(data1),
				//传给后端的内容，无则空
				success: function(data) {
					//data是后端传来的json
			
				},
				error: function() {
					//失败提醒
					var error = "验证码错误注册失败！";
					console.log(error);
					//alert(error);
					flas = false;
				}
			});
			if(flas== true) {
			// 保存数据
			var data = {
				"username": $("#user").val(),
				"password":  $("#password").val(),
				"email": $("#email").val(),
				"code":  $("#getCode").val(),
				"gender" : sex,
				"age" : $("#age").val(),
				"name" : $("#name").val(),
			}
			$.ajax({
					url: "http://localhost:8080/Project_war/UserRegisterServlet",//后端给的网址
					type: "POST",//POST,GET
					dataType: "json",//后端给的格式
					contentType: "application/json;charset=UTF-8",//统一，可以不写，但有时会交互失败
					data: JSON.stringify(data),//传给后端的内容，无则空
					//传给后端的内容，无则空
					success: function(data) {
						//data是后端传来的json
						var jsonObj = eval(data);
						if(jsonObj.success != null){
							alert("保存成功！");
							location.reload();
						}else{
							alert(jsonObj.error);
						}
					},
					error: function() {
						//失败提醒
						var error = "保存失败！";
						console.log(error);
						//alert(error);
					}
				});
		} else {
			alert("失败");
		}
				 });
		
});
