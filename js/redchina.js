$(document).ready(function() {
			var data = {
				"moudle": "hszg",
			}
			$.ajax({
				url: "http://localhost:8080/Project_war/PagetitleServlet", //后端给的网址
				type: "POST", //POST,GET
				dataType: "json", //后端给的格式
				contentType: "application/json;charset=UTF-8", //统一，可以不写，但有时会交互失败
				data: JSON.stringify(data), //传给后端的内容，无则空
				//传给后端的内容，无则空
				success: function(data) {
					//data是后端传来的json
					var jsonObj = eval(data);
					var totalData = jsonObj.totalData;
					var totalPage = jsonObj.totalPage;
					$(function() {

							var initPagination = function() {
								var num_entries = $("totalPage").length;
								// 创建分页
								$("#Pagination").pagination(num_entries, {
									num_edge_entries: 1, //边缘页数
									num_display_entries: 4, //主体页数
									callback: pageselectCallback,
									items_per_page: 10 //每页显示10项
								});
							};

							function pageselectCallback(page_index, jq) {
								var new_content = $("#hiddenresult div.result").clone();
								var div = document.createElement("div"); {
									div.setAttribute("height", "40px");
									div.setAttribute("class", "new");
								}
								$("#Searchresult").empty().append(new_content); //装载对应分页的内容
								var data = {
									nowPage: $(".result").text(page_index)
								};
								$.ajax({
									url: "http://localhost:8080/Project_war/PagetitleServlet", //后台请求的数据，用的是PHP
									dataType: "json", //数据格式
									type: "post", //请求方式
									async: false, //是否异步请求
									contentType: "application/json;charset=UTF-8", //统一，可以不写，但有时会交互失败
									data: JSON.stringify(data),
									success: function(data) { //如果请求成功，返回数据。
										var jsonObj = eval(data);

										var list = new Array(jsonObj.list);
										for (var i = 0; i < list.length; i++) {
											list[i] = jsonObj.list[i];
										}

										var div = document.createElement("div"); {
											div.setAttribute("height", "40px");
											div.setAttribute("class", "new");
										}
										$("#Searchresult").empty().append(
										new_content); //装载对应分页的内容
										for (var i = 0; i < totalPage; i++) {
											for (var j = 0; j < list[i]; j++) {
												new_content.empty().append(div).clone();
												$(div).innerHTML = list[j];
											}
										}
										return false;
									},

									error: function() {
										//失败提醒
										var error = "error！";
										console.log(error);
									}
								});
							};

						})},
						error: function() {
							//失败提醒
							var error = "保存失败！";
							console.log(error);
							//alert(error);
						}
					});

});
