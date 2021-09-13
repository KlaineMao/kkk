var count = 0 ; //定义全局变量count来表示当前图片
function run(){
count++;
count = count ==4?0:count;
$('#flash>img').eq(count).fadeIn(500).siblings('img').fadeOut(500); //利用eq来遍历img，并将count位图片显示，其他兄弟元素隐藏，fadeIN位淡入显示，fadeOut为淡出
}
function reverserun(){
count--;
count = count == -1?3:count;
$('#flash>img').eq(count).fadeIn(500).siblings('img').fadeOut(500);
}
var timer = setInterval(run,2000); //设置定时器
$('#flash').hover(function(){ //设置鼠标移入移出事件
clearInterval(timer);
},function(){
timer = setInterval(run,2000);
})
$('#flash .right').click(function(){ //设置右键按钮点击事件
run();
})
$('#flash .left').click(function(){ //设置左键按钮点击事件
reverserun();
});
$(document).ready(function(){
	// 获取用户名
	$.ajax({
		url: "", //后端给的网址(首页)
		type: "POST", //POST,GET
		dataType: "json", //后端给的格式
		contentType: "application/json;charset=UTF-8", //统一，可以不写，但有时会交互失败
		//传给后端的内容，无则空
		success: function (data) {
			//data是后端传来的json
			var jsonObj = eval(data);
			$("#see").text(jsonObj.username);
			document.getElementById("see").setAttribute('value',jsonObj.username);
		},
		error: function () {
			//失败提醒
			var error = "error！";
			console.log(error);
		}
	});
	// 弹出搜索框
	$("#sousuo").click(function(){
		var input = document.getElementById("inpu");
		input.style.zIndex= '99';
	});
	// 关闭搜索
	$("#close").click(function(){
		var input = document.getElementById("inpu");
		input.style.zIndex= '-1';
	});
	// 修改密码界面出现
	$("#xiu").click(function(){
		var inp = document.getElementById("inp");
		inp.style.zIndex= '99';
	});
	// 取消修改
	$("#canc").click(function(){
		var inp = document.getElementById("inp");
		inp.style.zIndex= '-1';
	});
	// 修改
	$("#see").text(localStorage.getItem("username"));
	$.ajax({
		url: "http://localhost:8080/Project_war/UserUpdateServlet", //后端给的网址
		type: "POST", //POST,GET
		dataType: "json", //后端给的格式
		contentType: "application/json;charset=UTF-8", //统一，可以不写，但有时会交互失败
		data: JSON.stringify({
			"username" : localStorage.getItem("username")
	}),//传给后端的内容，无则空
		success: function (data) {
			//data是后端传来的json
			var jsonObj = eval(data);
			$("#username").text(jsonObj.username);
			document.getElementById("see").setAttribute('value',localStorage.getItem("username"));
		},
		error: function () {
			//失败提醒
			var error = "error！";
			console.log(error);
		}
	});
	$("#sureit").click(function(){
		
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
				$("#oldpassword").text(jsonObj.password);
				$.ajax({
					url: "http://localhost:8080/Project_war/UserUpdateServlet", //后端给的网址
					type: "POST", //POST,GET
					dataType: "json", //后端给的格式
					contentType: "application/json;charset=UTF-8", //统一，可以不写，但有时会交互失败
					data: JSON.stringify({
						"password" : $("#oldpassword").val(),
						"newPassword" : $("#passwordchange").val(),
					}),
					//传给后端的内容，无则空
					success: function (data) {
						//data是后端传来的json
					
						
					},
					error: function () {
						//失败提醒
						var error = "error！";
						console.log(error);
					}
				});
			},
			error: function () {
				//失败提醒
				var error = "error！";
				console.log(error);
			}
		});
	});
	
});