<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>

	<head>
		<title>新增微信菜单</title>
		<jsp:include page="/common/header.jsp"/>
	</head>

	<body>
	
		<div class="container">
			<div class = "title">
				<b>新增微信菜单</b>
			</div>
			<div>
					
				<form id="validateForm" class="form-horizontal" method="post" action="${pageContext.request.contextPath }/weixinMenu/addMenu">	
					<table class="table table-bordered table-striped">
						<tbody>
							<tr class="th">
								<th class="rth" style="width: 20%;">序号：</th>
								<td class="ltd" style="width: 30%;">
									<input class="input-xlarge required" name="orderBy" type="text"/>
								</td>																
							</tr>						
							<tr class="th">
								<th class="rth">菜单名称：</th>
								<td class="ltd">
									<input class="input-xlarge required" id="title" name="title" type="text"/>
								</td>
							</tr>
							<tr class="th">
								<th class="rth" style="width: 20%;">菜单类型：</th>
								<td class="ltd" style="width: 30%;">
									菜单组:<input class="input-xlarge required " name="type" value="group" type="radio" checked/>
									图文:  <input class="input-xlarge required " name="type" value="click" type="radio"/>
									外链:  <input class="input-xlarge required " name="type" value="view" type="radio"/>
								</td>
							</tr>
							<tr class="th">
								<th class="rth" style="width: 20%;">关键字或URL：</th>
								<td class="ltd" style="width: 30%;">
									<input class="input-xlarge required }" name="value" type="text"/>
								</td>
							</tr>							
							<tr>
								<td colspan="2" align="center">
									<div align="center">
										<button type="submit" class="btn btn-primary">提&nbsp;&nbsp;&nbsp;交</button>
										<button type="button" class="btn btn-primary historyBackClass">返&nbsp;&nbsp;&nbsp;回</button>
									</div>
								</td>
							</tr>							
						</tbody>
					</table>
				</form>	
						
			</div>
		</div>
		
		<jsp:include page="/common/footer.jsp"/>
		
	</body>

</html>