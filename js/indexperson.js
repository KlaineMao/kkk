window.onload=function() {
	// 显示个人信息
	$("#username").text(localStorage.getItem("username"));
	$.ajax({
		url: "http://localhost:8080/Project_war/UserUpdateServlet", //后端给的网址
		type: "POST", //POST,GET
		dataType: "json", //后端给的格式
		contentType: "application/json;charset=UTF-8", //统一，可以不写，但有时会交互失败
		data: JSON.stringify({
			"username" : localStorage.getItem("username")
		}),
		//传给后端的内容，无则空
		success: function (data) {
			//data是后端传来的json
			var jsonObj = eval(data);
			$("#username").text(jsonObj.username);
			$("#name").text(jsonObj.name);
			$("#email").text(jsonObj.email);
			$("#sex").text(jsonObj.gender);
			$("#age").text(jsonObj.age);

			document.getElementById("username").setAttribute('value',localStorage.getItem("username"));
			document.getElementById("name").setAttribute('value',jsonObj.name);
			document.getElementById("email").setAttribute('value',jsonObj.email);
			document.getElementById("sex").setAttribute('value',jsonObj.gender);
			document.getElementById("age").setAttribute('value',jsonObj.age);
		},
		error: function () {
			//失败提醒
			var error = "error！";
			console.log(error);
		}
	});
}
$(document).ready(function() {
	var sex ="男";
	$("#emailchange").blur(function() {
		var email = $("#emailchange").val();
		var aa = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
		if (email == null || email == "") {
			document.getElementById("arr2").innerHTML = "邮箱不能为空!";
			document.getElementById("emailchange").style.borderColor = '#d0373a';
		} else if (!aa.test(email)) {
			document.getElementById("arr2").innerHTML = "请写完整的邮箱格式！";
			document.getElementById("emailchange").style.borderColor = '#d0373a';
		} else {
			document.getElementById("arr2").innerHTML = "";
			document.getElementById("emailchange").style.borderColor = 'rgba(190, 190, 190, 0.5)';
		}
	});
	$("#agechange").blur(function(){
		var age = $("#agechange").val();
		var a = /^[0-9]/;
		if(!a.test(age)){
			document.getElementById("arr1").innerHTML = "年龄只能为数字!";
			document.getElementById("agechange").style.borderColor = '#d0373a';
		}
		else if(age>130){
			document.getElementById("arr1").innerHTML = "年龄无效!";
			document.getElementById("agechange").style.borderColor = '#d0373a';
		}
		else{
			document.getElementById("arr1").innerHTML = "";
			document.getElementById("agechange").style.borderColor = 'rgba(190, 190, 190, 0.5)';
		}
	});
	$("#cancel").click(function(){
		var box = document.getElementById("input");
		box.style.zIndex = '-1';
	});
	$("#click").click(function(){
		var box = document.getElementById("input");
		box.style.zIndex = '99';
	});
	$("#male").click(function(){
		var male = document.getElementById("male");
		var famale = document.getElementById("famale");
		male.style.backgroundColor = '#a22b2d';
		famale.style.backgroundColor = 'rgba(205, 50, 50, 0.8)';
		sex = '男';
	});
	$("#famale").click(function(){
		var male = document.getElementById("male");
		var famale = document.getElementById("famale");
		famale.style.backgroundColor = '#a22b2d';
		male.style.backgroundColor = 'rgba(205, 50, 50, 0.8)';
		sex = '男';
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
	// 编辑个人信息
	$("sure").click(function(){
		// 检查验证码
		var fals = true;
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
		if(fals == true){$.ajax({
	 		url: "http://localhost:8080/Project_war/UserUpdateServlet", //后端给的网址
	 		type: "POST", //POST,GET
	 		dataType: "json", //后端给的格式
	 		contentType: "application/json;charset=UTF-8", //统一，可以不写，但有时会交互失败
	 		data: JSON.stringify({
				"name": $("#namechange").val(),
				"email": $("#emailchange").val(),
				"gender": sex,
				"age" : $("#agechange").val(),
				"username" : localStorage.getItem("username")
			}),
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
	 };
});
});