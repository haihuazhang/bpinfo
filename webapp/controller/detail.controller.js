sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"bp/zbpselfservice/model/formatter"
], function (BaseController, JSONModel, MessageToast, formatter) {
	"use strict";
	return BaseController.extend("bp.zbpselfservice.controller.detail", {
		formatter: formatter,

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf view.detail
		 */
		onInit: function () {

		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf view.detail
		 */
		onBeforeRendering: function () {
			// var bpnumber = this.getView().getModel("localModel").getProperty("/bpnumber");
			// var bpnumber = this.getModel("userAttributes").getProperty("/bpnumber");
			// var bpnumber = "226051";
			var bpnumber = this.getOwnerComponent()._bpnumber;
			var path = "/bpHeadSet('" + bpnumber + "')";

			var that = this;
			that.getView().bindElement(path, {
				expand: "head_np_bank/bank_np_banks,head_np_natio,head_np_country,head_np_butype,head_np_idtype,head_np_title,head_np_juming,head_np_region,head_np_commtype"
			});
			// this.getView().getModel().getMetaModel().loaded().then(function () {

			// });

		},
		onEdit: function (oEvent) {
			this.getView().getModel("localModel").setProperty("/editable", true);
			this.getView().getModel("localModel").setProperty("/Zflage", false);
			this.getView().getModel("localModel").setProperty("/Zflagd", true);
		},

		onDisplay: function (oEvent) {
			this.getView().getModel("localModel").setProperty("/editable", false);
			this.getView().getModel("localModel").setProperty("/Zflage", true);
			this.getView().getModel("localModel").setProperty("/Zflagd", false);
		},

		// onDisplay function

		onSave: function (oEvent) {
			var that = this;
			this.getView().getModel("appModel").setProperty("/isBusy", true);
			this.getView().getModel().submitChanges({
				success: function (oData, oResponse) {
					that.getView().getModel("appModel").setProperty("/isBusy", false);
					// MessageToast.show("保存成功");
					// if (oResponse.headers.msg !== undefined) {

					// }
					// oData.getData("")
					// 处理消息
					var bError = false;
					if (oData.__batchResponses) {
						oData.__batchResponses.forEach(function (osResponse) {
							if (osResponse.__changeResponses) {
								osResponse.__changeResponses.forEach(function (oSubResponse) {
									if (oSubResponse.headers.msg) {
										MessageToast.show("保存失败:" + decodeURI(oSubResponse.headers.msg));
										bError = true;
									}
								});
								// break;
							}
						});
					}
					if (!bError) {
						MessageToast.show("保存成功");
					}

				},
				error: function (oError) {
					that.getView().getModel("appModel").setProperty("/isBusy", false);
					MessageToast.show("保存失败，请重试");
				}
			});
			this.getView().getModel("localModel").setProperty("/editable", false);
			this.getView().getModel("localModel").setProperty("/Zflage", true);
			this.getView().getModel("localModel").setProperty("/Zflagd", false);
		}

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf view.detail
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf view.detail
		 */
		//	onExit: function() {
		//
		//	}

	});

});