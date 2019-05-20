sap.ui.define([], function () {
	"use strict";
	return {
		approvalStatus: function (sValue) {
			switch (sValue) {
			case "F":
				return "Success";
				// break; //已完成
			case "R":
				return "Warning";
				// break; //	运行中
			default:
				return "None";
			}
		},
		approvalText: function (sValue) {
			switch (sValue) {
			case "F":
				return "已完成";
				// break; //已完成
			case "R":
				return "运行中";
				// break; //	运行中
			default:
				return "";
			}
		},
		approvalCriticality: function (sValue) {
			switch (sValue) {
			case "F":
				return "sap-icon://status-positive";
				// break; //已完成
			case "R":
				return "sap-icon://status-critical";
				// break; //	运行中
			default:
				return "";
			}
		},
		approvalIcon: function (sValue) {
			switch (sValue) {
			case "F":
				return "sap-icon://complete";
				// break; //已完成
			case "R":
				return "sap-icon://create";
				// break; //	运行中
			default:
				return "";
			}
		},
		approvalYJ: function (sValue) {
			switch (sValue) {
			case "A":
				return "退回修改";
			case "B":
				return "拒绝";
			case "C":
				return "审批通过";
			case "D":
				return "通知确认";
			case "E":
				return "发起流程";
			default:
				return "";
			}
		},
		checkPersonal: function (sType) {
			if (sType == '1') {
				return true;
			} else {
				return false;
			}
		},
		checkOrg: function (sType) {
			if (sType == '2') {
				return true;
			} else {
				return false;
			}
		}

	};

});