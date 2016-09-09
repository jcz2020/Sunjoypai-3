<%@ page language="java" pageEncoding="UTF-8"%>

<script type="text/javascript">
<!--
	var basePath = "${pageContext.request.contextPath}";
//-->
</script>

<script type="text/javascript"	src="${pageContext.request.contextPath}/js/ieCommon.js"></script>

  
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/jquery.js"></script>

 <!--
<script type="text/javascript" src="${pageContext.request.contextPath}/jquery-easyui-1.3.2/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/jquery-easyui-1.3.2/jquery.easyui.min.js"></script> 
  -->
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/twitter/bootstrap.min.js"></script>
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/twitter/bootstrap-modal.js"></script>
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/twitter/bootstrap-tooltip.js"></script>

<script type="text/javascript"	src="${pageContext.request.contextPath}/js/plugins/validate/jquery.validate.js"></script>
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/plugins/validate/jquery.metadata.js"></script>
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/plugins/validate/messages_cn.js"></script>

<script type="text/javascript"	src="${pageContext.request.contextPath}/js/date/WdatePicker.js"></script>
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/hubSpot/build/js/messenger.min.js"></script>

<script type="text/javascript"	src="${pageContext.request.contextPath}/js/autocomplete/jquery.autocomplete.min.js"></script>
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/fancyBox/source/jquery.fancybox.js"></script>
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/impromptu/jquery-impromptu.js"></script>
<script type="text/javascript"  src="${pageContext.request.contextPath}/SweetTooltip/sweet-tooltip.js"></script>

 
<script	src="${pageContext.request.contextPath}/js/layer/layer.min.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/js/layer/layer.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/js/layer/extend/layer.ext.js" type="text/javascript"></script>

<script src="${pageContext.request.contextPath}/js/erpjs/jQuery/jquery.form.js" type=text/javascript></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/bootbox.min.js"></script>
 <!--
<script src="${pageContext.request.contextPath}/js/layer/jquery-1.8.0.min.js" type="text/javascript"></script>
-->

<script type="text/javascript" src="${pageContext.request.contextPath}/js/zoneCode.js"></script>
<!-- 
<script type="text/javascript" src="${pageContext.request.contextPath}/js/jQuery/pop/jquery.eBox.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery.ztree.all-3.5.min.js"></script>
 -->
<script type="text/javascript">
	$(document).ready(function() {
		$("#validateForm").validate();
		$("button").filter(".historyBackClass").each(function(i) {
			$(this).bind("click", function() {
				// window.history.go(-1);
				history.back();
			});
		});
	});
</script>
<script type="text/javascript">
		$(function() {
			message("${msg}");
		});
</script>
<script type="text/javascript">
	var msg;
	function message(msg) {
		if (msg.length > 0) {
			msg = $.globalMessenger().post({
				message : msg,
				actions : {
					cancel : {
						label : '关闭',
						action : function() {
							return msg.cancel();
						}
					}
				}
			});
		}
	}
	
	function getNowDate(id){
		 var now = new Date();
	     var year = now.getFullYear();       
	     var month = now.getMonth() + 1;    
	     var day = now.getDate();           
	     var strDate = year + "-";
	     if(month < 10)
	    	 strDate += "0";
	     strDate += month + "-";
	     if(day < 10)
	    	 strDate += "0";
	     strDate += day + " ";
		$("#"+id).val(strDate);
	}
	var customerNames;
	function getCustomerName(id, targetId) {
		var from = $("#"+id);
		from.autocomplete("${pageContext.request.contextPath}/customer/getCustomer", {
			matchContains: true,
			dataType : 'json',//返回的数据类型为JSON类型
			matchSubset : false,
			delay : 130,
			parse : function(data) {//解释返回的数据，把其存在数组里
				var parsed = [];
				for ( var i = 0; i < data.length; i++) {
					parsed[parsed.length] = {
						data : data[i],
						value : data[i].customerId,
						result : data[i].customerName
					};
				}
				customerNames = parsed;
				return parsed;
			},
			formatItem : function(item) {//显示下拉列表的内容
				return item.customerName;
			}
		});
	}
	function checkCustomerName(id, targetId){
		var from = $("#" + id);
		var target = $("#" + targetId);
		if (customerNames == null)
			return true;
		for (var i = 0; i < customerNames.length; i++) {
			if (from.val() == customerNames[i].result) {
				target.val(customerNames[i].value);
				return true;
			}
		}
		message("客户名称不存在！");
		return false;
	}
	function getNowDate(id){
		 var now = new Date();
	     var year = now.getFullYear();       
	     var month = now.getMonth() + 1;    
	     var day = now.getDate();           
	     var strDate = year + "-";
	     if(month < 10)
	    	 strDate += "0";
	     strDate += month + "-";
	     if(day < 10)
	    	 strDate += "0";
	     strDate += day + " ";
		$("#"+id).val(strDate);
	}
	
	function ajaxHandler(url, method, data, dataType, callback) {
		$.ajax({
			type : method,
			data : data,
			url : url,
			dataType : dataType,
			success : callback
		});
	}

	function showDialog(msg) {
		if (msg.length < 1) 
			return;
		$("<div>", {
			id : "inline",
			html : msg,
			css : {
				textAlign : "center",
				width : 500,
				height : 360
			}
		}).appendTo("body");
		$("<a>", {
			id : "showdiv",
			href : "#inline"
		}).appendTo("body");
		$("#showdiv").fancybox();
		$("#showdiv").click();
	}
	function prompt(content, title, subId) {
		$.prompt(content, {
			title: title,
			buttons: { "确认": true, "取消": false },
			submit: function(e,v,m,f){
			if(v)
				$("#"+subId).click();
		}
		});
	}
	function createLoading() {
		var container = $(".container");
		$("<div>")
				.attr("id", "loading")
				.css({
					width : container.width(),
					height : container.height(),
					position : "absolute",
					textAlign : "center",
					zIndex : 100,
					lineHeight : $(window).height() / 10
				})
				.append(
						$("<img src='${pageContext.request.contextPath }/images/loading.gif' />"))
				.prependTo(container);
	}
	
	function examine(url, obj, func){
		ajaxHandler(url, "GET", null, "text", function(data) {
			func(data, obj);
		});
	}
	function isExamine(url, obj, func){
		$.prompt("确认是否审核？", {
			buttons: { "确认": true, "取消": false },
			submit: function(e,v,m,f){
				if(v) {
					examine(url, obj, func);
				}
			}
		});
	}
	function examineInSingle(data, obj){
		if (data == 1) {
			$(obj).parent().parent().find("td:first").html("<img src='${pageContext.request.contextPath}/images/ico_lock-32.png' width='20' height='20' />");
			$(obj).parent().html("已审核");
		} else {
			message("审核失败！");
		}
	}
	function examineInMany(data, obj) {
		if (data == 1) {
			$(obj).replaceWith("<img src='${pageContext.request.contextPath}/images/ico_lock-16.png' />");
		} else {
			message("审核失败！");
		}
	}
</script>
<script type="text/javascript">
		function editDepotOut(id){
			var href='${pageContext.request.contextPath}/depotOut/editDepotOut/'+id;
			$.layer({
			    type: 2,
			    title: false,
			    iframe: {src: href},
			    area : ['650px' , '250px'],
			    offset : ['100px','']
			});
		}
		function editCardCodeOut(id){
			var href='${pageContext.request.contextPath}/cardCodeOut/editCardCodeOut/'+id;
			$.layer({
			    type: 2,
			    title: false,
			    iframe: {src: href},
			    area : ['650px' , '250px'],
			    offset : ['100px','']
			});
		}
		
		function showPurchaseOrder(id){
			var href='${pageContext.request.contextPath}/purchase/showPurchaseOrder/'+id;
			$.layer({
			    type: 2,
			    title: false,
			    iframe: {src: href},
			    area : ['650px' , '366px'],
			    offset : ['100px','']
			});
		}
		function showCardCodeOrder(id){
			var href='${pageContext.request.contextPath}/cardCodeOrder/showCardCodeOrder/'+id;
			$.layer({
			    type: 2,
			    title: false,
			    iframe: {src: href},
			    area : ['650px' , '366px'],
			    offset : ['100px','']
			});
		}
		function showDepotOut(id){
			var href='${pageContext.request.contextPath}/depotOut/showDepotOut/'+id;
			$.layer({
			    type: 2,
			    title: false,
			    iframe: {src: href},
			    area : ['650px' , '366px'],
			    offset : ['100px','']
			});
		}
		
		function showDepotOutReturn(id){
			var href='${pageContext.request.contextPath}/depotOut/showDepotOutReturn/'+id;
			$.layer({
			    type: 2,
			    title: false,
			    iframe: {src: href},
			    area : ['650px' , '366px'],
			    offset : ['100px','']
			});
		}
		
		function doShowCard(id){
			var href='${pageContext.request.contextPath}/cardCode/doShowCard/'+id;
			$.layer({
			    type: 2,
			    title: false,
			    iframe: {src: href},
			    area : ['650px' , '366px'],
			    offset : ['100px','']
			});
		}
		
		function showCardCodeOut(id){
			var href='${pageContext.request.contextPath}/cardCodeOut/showCardCodeOut/'+id;
			$.layer({
			    type: 2,
			    title: false,
			    iframe: {src: href},
			    area : ['650px' , '366px'],
			    offset : ['100px','']
			});
		}
		
		function ismoney(obj){
			var re = /^([1-9]{1}[0-9]{0,2}(\,[0-9]{3})*(\.[0-9]{0,2})?|[1-9]{1}\d*(\.[0-9]{0,2})?|0(\.[0-9]{0,2})?|(\.[0-9]{1,2})?)$/;
	        var str = obj.value;

	        if (str != "") {
	            if(re.test(str) == false) {
	                message("格式不正确,请输入有效的金额！");
	                }else if("."==str.charAt(str.length - 1)||"."==str.charAt(0)){
	            	message("格式不正确,请输入有效的金额！");
	            	}
	        }
		}
		
		function isqty(obj){
			var re = /^(?:[1-9]\d*|0)$/;
	        var str = obj.value;

	        if (str != "") {
	            if(re.test(str) == false) {
	                message("格式不正确,请输入有效的数量！");
	                }
	        }
		}
		function isnumber(str){
			var re = /^(?:[1-9]\d*|0)$/;
			str = str + "";
	        if (str != "") {
	            if(re.test(str) == false) {
	                message("格式不正确,请输入有效的数量！");
	                return false;
	                }
	            else return true;
	        }
	        else return false;
		}
		function isprice(str){
			str = str+"";
			var re = /^([1-9]{1}[0-9]{0,2}(\,[0-9]{3})*(\.[0-9]{0,2})?|[1-9]{1}\d*(\.[0-9]{0,2})?|0(\.[0-9]{0,2})?|(\.[0-9]{1,2})?)$/;

	        if (str != "") {
	            if(re.test(str) == false) {
	                message("格式不正确,请输入有效的金额！");
	                return false;
	                }else if("."==str.charAt(str.length - 1)||"."==str.charAt(0)){
	            	message("格式不正确,请输入有效的金额！");
	            	return false;
	            	}
	                else return true;
	        }else return false;

		}
		function isEmpty(v) {
			return !v || v.length == 0 || /^\s+$/.test(v);
		}
		function cancelcfm() {
	        if (!confirm("确认要取消？")) {
	            window.event.returnValue = false;
	        }
	    }
		function submitfm() {
	        if (!confirm("确认提交？")) {
	            window.event.returnValue = false;
	        }
	    }
		function delcfm() {
	        if (!confirm("确认要删除？")) {
	            window.event.returnValue = false;
	        }
	    }
		function completecfm() {
	        if (!confirm("确认要完成？")) {
	            window.event.returnValue = false;
	        }
	    }
		function doListSubmit(){
			if(!isEmpty($('#tableView').html()))
				document.getElementById("validateForm").submit();
			else
				message("请选择商品");
		}
		function showContactContent(id){
			var href='${pageContext.request.contextPath}/contact/showContactContent/'+id;
			$.layer({
			    type: 2,
			    title: false,
			    iframe: {src: href},
			    area : ['650px' , '366px'],
			    offset : ['100px','']
			});
		}
		
		/* getTips(); */
		function getTips(){
			$.get("/tip/getTip?"+Math.random(),function(data){
				var stockLackCount=0;
				var arr = new Array();
				stockLackCount = data;
				arr.push("<p class='info_cont'>");
				arr.push("<a title='库存预警' style='float:left' href='/tip/listStockLack'>低量警报<br/>报警商品数："+(stockLackCount)+"种</a>");
				arr.push("</p>");
				if(isNaN(parseInt(stockLackCount)) || parseInt(stockLackCount) < 1){
					$("#eBoxWrap").empty().remove(); 
					eBoxOpenFlag = false;
					eBoxMinFlag = false;
					return;
				}
				if(!eBoxMinFlag){
					
				}
				if(!eBoxOpenFlag){
					$.eBox({
					      title:{html: refreshImg()+"  库存预警"},
					      content:{html:arr.join('')},
					      effect:{type:"slide",speed:500},
						  openOnce:false
					});
					eBoxOpenFlag = true;
				}else{
					$(".eBox-title").html(refreshImg() +"  库存预警");
					$(".eBox-content").html(arr.join(""));
				}
			});
			setTimeout("getTips()",60000);
		}
		function refreshImg(){
			return "<img style='cursor:pointer;vertical-align:middle;*margin-bottom:-3px;margin-right:5px' src='${pageContext.request.contextPath}/js/jQuery/pop/images/pop_refresh.png' onclick='getMyMessage()'/>";
		}
		
		function showOrder(id){
			var href='${pageContext.request.contextPath}/orders/showOrder/'+id;
			$.layer({
			    type: 2,
			    title: false,
			    iframe: {src: href},
			    area : ['850px' , '566px'],
			    offset : ['100px','']
			});
		}
		function showErrorOrder(id){
			var href='${pageContext.request.contextPath}/errorOrder/showOrder/'+id;
			$.layer({
			    type: 2,
			    title: false,
			    iframe: {src: href},
			    area : ['1050px' , '566px'],
			    offset : ['100px','']
			});
		}
</script>
