sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",
	"../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageToast",
	"sap/m/MessagePopover",
	"sap/m/MessageItem",
	"sap/m/Button",
	"sap/m/MessageBox",
], function (BaseController, JSONModel, formatter, Filter, FilterOperator, MessageToast, MessagePopover, MessageItem, Button, MessageBox) {
	"use strict";
	var oMessagePopover;
	return BaseController.extend("CreditDebit.UploadCreditDebitMemo.controller.Worklist", {

		formatter: formatter,

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		/**
		 * Called when the worklist controller is instantiated.
		 * @public
		 */
		onInit: function () {
			var cRB = this.byId("cRB");
			var dRB = this.byId("dRB");
			var rgO = this.byId("rgM");
			var ind = rgO.getSelectedIndex();
			this._cIndex = ind;
			if (this._cIndex === 0) {
				var oContent = this.byId("myContainer");
				//	var oFrag = sap.ui.xmlfragment( this.getView().getId(),"CreditDebit.UploadCreditDebitMemo.view.CreditMemo", this);
				var oFrag = sap.ui.xmlfragment(this.createId("cmF"), "CreditDebit.UploadCreditDebitMemo.view.CreditMemo", this);
				this._cmF = oFrag;
				oContent.addContent(oFrag);
			}
			this._tModel = new sap.ui.model.json.JSONModel();
			this._dModel = this.getOwnerComponent().getModel("dMemo");
			this._cModel = this.getOwnerComponent().getModel();
			this._oPromises = [];
			this._msgArr = [];
			this._msgData = {
				"msgs": this._msgArr
			};
			var cBut = this.byId("cUpload");
			cBut.setEnabled(false);
		},

		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */

		/**
		 * Triggered by the table's 'updateFinished' event: after new table
		 * data is available, this handler method updates the table counter.
		 * This should only happen if the update was successful, which is
		 * why this handler is attached to 'updateFinished' and not to the
		 * table's list binding's 'dataReceived' method.
		 * @param {sap.ui.base.Event} oEvent the update finished event
		 * @public
		 */
		onUpdateFinished: function (oEvent) {

		},

		onPress: function (oEvent) {

		},

		/**
		 * Event handler when the share in JAM button has been clicked
		 * @public
		 */
		onShareInJamPress: function () {

		},

		onSearch: function (oEvent) {

		},

		/**
		 * Event handler for refresh event. Keeps filter, sort
		 * and group settings and refreshes the list binding.
		 * @public
		 */
		onRefresh: function () {

		},

		/* =========================================================== */
		/* internal methods                                            */
		/* =========================================================== */

		/**
		 * Shows the selected item on the object page
		 * On phones a additional history entry is created
		 * @param {sap.m.ObjectListItem} oItem selected Item
		 * @private
		 */
		_showObject: function (oItem) {

		},

		_applySearch: function (aTableSearchState) {

		},

		handleUploadPress: function () {

			var that = this;
			var oTable;
			var tarr = [];
			var tdata = {
				"trec": tarr
			};
			var oFileUpload = this.byId("fileUploader");
			//	 var oTable = this.byId("memoTable");
			//	var fID = this.getView().createId("fr1");
			if (this._cIndex === 0) {
				oTable = this.byId(sap.ui.core.Fragment.createId("cmF", "memoTable"));
			}
			if (this._cIndex === 1) {
				oTable = this.byId(sap.ui.core.Fragment.createId("dmF", "memoTable"));
			}

			if (!oFileUpload.getValue()) {

				MessageToast.show("Select the file first!");
				return;
			} else {

				var ofile = oFileUpload.getFocusDomRef();
				var file = ofile.files[0];
				if (file && window.FileReader) {
					var reader = new FileReader();
					reader.onload = function (oEvent) {

						var strCSV = oEvent.target.result;
						//		var arrCSV = strCSV.match(/[\w .]+(?=,?)/g);
						var arrCSV = strCSV.replace(/\n/g, ",").split(",");
						var noOfCols;
						if (that._cIndex === 1) {
							noOfCols = 20;
						} else {
							noOfCols = 16;
						}
						var headerRow = arrCSV.splice(0, noOfCols);
						// arrCSV.length 

						while ((arrCSV.length - 1) > 0) {
							var obj = {};
							var pobj = {};
							var row = arrCSV.splice(0, noOfCols);

							for (var i = 0; i < row.length; i++) {
								obj[headerRow[i]] = row[i].trim();
								if (that._cIndex === 1) {
									switch (i) {
									case 0:
										pobj["NOrder"] = obj[headerRow[i]];
										break;
									case 1:
										pobj["DType"] = obj[headerRow[i]];
										break;

									case 2:
										pobj["Sorg"] = obj[headerRow[i]];
										break;

									case 3:
										pobj["Dchnl"] = obj[headerRow[i]];
										break;

									case 4:

										pobj["Div"] = obj[headerRow[i]];
										break;
									case 5:

										pobj["SParty"] = obj[headerRow[i]];
										break;
									case 6:
										pobj["Cref"] = obj[headerRow[i]];
										break;
									case 7:

										pobj["Oreason"] = obj[headerRow[i]];
										break;
									case 8:
										pobj["Pterm"] = obj[headerRow[i]];
										break;
									case 9:
										pobj["Currency"] = obj[headerRow[i]];
										break;
									case 10:
										pobj["Pmethod"] = obj[headerRow[i]];
										break;
									case 11:

										pobj["HTID"] = obj[headerRow[i]];
										break;
									case 12:
										pobj["Htext"] = obj[headerRow[i]];
										break;
									case 13:

										pobj["Mat"] = obj[headerRow[i]];
										break;
									case 14:
										pobj["Quan"] = obj[headerRow[i]];
										break;
									case 15:
										pobj["CType"] = obj[headerRow[i]];
										break;
									case 16:
										pobj["Cvalue"] = obj[headerRow[i]];
										break;

									case 17:
										pobj["ITID"] = obj[headerRow[i]];
										break;
									case 18:
										pobj["Itext"] = obj[headerRow[i]];
										break;
									case 19:
										pobj["Bblock"] = obj[headerRow[i]];
										break;
									}
								} else {

									switch (i) {
									case 0:
										pobj["NOrder"] = obj[headerRow[i]];
										break;
									case 1:
										pobj["DType"] = obj[headerRow[i]];
										break;

									case 2:
										pobj["Sorg"] = obj[headerRow[i]];
										break;

									case 3:
										pobj["Dchnl"] = obj[headerRow[i]];
										break;

									case 4:

										pobj["Div"] = obj[headerRow[i]];
										break;
									case 5:

										pobj["SParty"] = obj[headerRow[i]];
										break;
									case 6:
										pobj["Cref"] = obj[headerRow[i]];
										break;
									case 7:

										pobj["Oreason"] = obj[headerRow[i]];
										break;
									case 8:
										pobj["Pterm"] = obj[headerRow[i]];
										break;
									case 9:
										pobj["Currency"] = obj[headerRow[i]];
										break;
									case 10:
										pobj["Pmethod"] = obj[headerRow[i]];
										break;

									case 11:

										pobj["Mat"] = obj[headerRow[i]];
										break;
									case 12:
										pobj["Quan"] = obj[headerRow[i]];
										break;
									case 13:
										pobj["CType"] = obj[headerRow[i]];
										break;
									case 14:
										pobj["Cvalue"] = obj[headerRow[i]];
										break;

									case 15:
										pobj["Bblock"] = obj[headerRow[i]];
										break;
									}

								}

							}
							tarr.push(pobj);

						}

						that._tModel.setData(tdata);
						oTable.setModel(that._tModel);
						var sData = that.validateFileData();
						if (sData) {
							var uBut = that.byId("cUpload");
							uBut.setEnabled(true);
							that.byId("fileUploader").setEnabled(false);
							that.byId("tUpload").setEnabled(false);
							that.byId("rgM").setEnabled(false);
						}

					};
					reader.readAsBinaryString(file);
				}
			}

		},

		validateFileData: function () {
			var tData = this._tModel.getData();
			for (var k = 0; k < tData.trec.length; k++) {
				if (tData.trec[k].NOrder === "X") {
					if (this._cIndex === 0 && tData.trec[k].DType !== "CR") {
						MessageBox.error("Template for CreditMemo request is wrong ,Please select proper template");
						return false;
					}
					if (this._cIndex === 1 && tData.trec[k].DType !== "DR") {
						MessageBox.error("Template for DebitMemo request is wrong ,Please select proper template");
						return false;
					}
				}
			}
			return true;
		},
		handleRefresh: function () {
			this._tModel.setData();

			this.byId("cUpload").setEnabled(false);
			this.byId("tUpload").setEnabled(true);
			this.byId("fileUploader").setEnabled(true);
			this.byId("rgM").setEnabled(true);
			this.byId("fileUploader").clear();
			var oBut = sap.ui.getCore().byId("logBut");
			oBut.destroy();
		},
		handlePost: function () {
			var that = this;
			var count = 0;
			sap.ui.core.BusyIndicator.show();
			Promise.allSettled = function (oPromises) {

				oPromises.forEach(function (r) {
					r.then(function (param) {

						count = count + 1;
						if (count === (that._oPromises.length)) {

							if (that._cIndex === 0) {
								sap.ui.core.BusyIndicator.hide();
							}
							//							MessageToast.show(count + "Production Order Confirmation successfully Created");
							that.promiseCompleted();
						}
						return r;

					}, function (error) {
						count = count + 1;
						if (count === (that._oPromises.length)) {

							if (that._cIndex === 0) {
								sap.ui.core.BusyIndicator.hide();
							}
							that.promiseCompleted();
						}
					});

				});
				return oPromises;
			};
			var tPromises = [];
			if (this._cIndex === 1) {
				tPromises = this.createDebitMemos();
			}
			if (this._cIndex === 0) {
				tPromises = this.createCreditMemos();
			}
			var cPromise = Promise.allSettled(tPromises);

		},
		createDebitMemos: function () {
			var tData = this._tModel.getData();
			var obj = {};
			var tObj = {};
			var hTobj = [];
			var gIndex = 0;
			var itemsObj = [];

			var first;
			var allPromises = [];
			var oPromise;
			var groupID = "GRPID";
			for (var j = 0; j < tData.trec.length; j++) {

				var iObj = {};
				var itemPrice = {};
				var itemsPrice = [];
				var itemTObj = {};
				var itemsTObj = [];
				if (j !== 0 && tData.trec[j].NOrder === 'X') {
					//					if (first === "X") {
					obj.to_Item = itemsObj;

					//                        first = " ";
					groupID = groupID + gIndex;
					oPromise = this.createDebitMemo(obj, groupID);
					gIndex = gIndex + 1;
					allPromises.push(oPromise);
					var obj = {};
					var tObj = {};
					var hTobj = [];
					var iObj = {};
					var itemsObj = [];

					//					} else {
					obj.DebitMemoRequestType = tData.trec[j].DType;
					obj.SalesOrganization = tData.trec[j].Sorg;
					obj.DistributionChannel = tData.trec[j].Dchnl;
					obj.OrganizationDivision = tData.trec[j].Div;
					obj.SoldToParty = tData.trec[j].SParty;
					obj.SDDocumentReason = tData.trec[j].Oreason;
					obj.CustomerPaymentTerms = tData.trec[j].Pterm;
					obj.PaymentMethod = tData.trec[j].Pmethod;
					obj.TransactionCurrency = tData.trec[j].Currency;
					obj.PurchaseOrderByCustomer = tData.trec[j].Cref;
					obj.HeaderBillingBlockReason = "";
					tObj.LongTextID = tData.trec[j].HTID;
					tObj.Language = "E";
					tObj.LongText = tData.trec[j].Htext;
					hTobj.push(tObj);
					obj.to_Text = hTobj;
					iObj.Material = tData.trec[j].Mat;
					iObj.RequestedQuantity = tData.trec[j].Quan;
					itemTObj.Language = "E";
					itemTObj.LongTextID = tData.trec[j].ITID;
					itemTObj.LongText = tData.trec[j].Itext;
					itemPrice.ConditionType = tData.trec[j].CType;
					itemPrice.ConditionRateValue = tData.trec[j].Cvalue;
					itemsPrice.push(itemPrice);
					itemsTObj.push(itemTObj);
					iObj.to_Text = itemsTObj;
					iObj.to_PricingElement = itemsPrice;
					itemsObj.push(iObj);
					//					}

				} else {
					if (j == 0) {

						obj.DebitMemoRequestType = tData.trec[j].DType;
						obj.SalesOrganization = tData.trec[j].Sorg;
						obj.DistributionChannel = tData.trec[j].Dchnl;
						obj.OrganizationDivision = tData.trec[j].Div;
						obj.SoldToParty = tData.trec[j].SParty;
						obj.SDDocumentReason = tData.trec[j].Oreason;
						obj.CustomerPaymentTerms = tData.trec[j].Pterm;
						obj.PaymentMethod = tData.trec[j].Pmethod;
						obj.TransactionCurrency = tData.trec[j].Currency;
						obj.HeaderBillingBlockReason = "";
						obj.PurchaseOrderByCustomer = tData.trec[j].Cref;
						tObj.LongTextID = tData.trec[j].HTID;
						tObj.Language = "E";
						tObj.LongText = tData.trec[j].Htext;
						hTobj.push(tObj);
						obj.to_Text = hTobj;
					}
					iObj.Material = tData.trec[j].Mat;
					iObj.RequestedQuantity = tData.trec[j].Quan;
					itemTObj.Language = "E";
					itemTObj.LongTextID = tData.trec[j].ITID;
					itemTObj.LongText = tData.trec[j].Itext;
					itemPrice.ConditionType = tData.trec[j].CType;
					itemPrice.ConditionRateValue = tData.trec[j].Cvalue;
					itemsPrice.push(itemPrice);
					itemsTObj.push(itemTObj);
					iObj.to_Text = itemsTObj;
					iObj.to_PricingElement = itemsPrice;
					itemsObj.push(iObj);

				}

			}
			obj.to_Item = itemsObj;
			gIndex = gIndex + 1;
			groupID = groupID + gIndex;
			oPromise = this.createDebitMemo(obj, groupID);
			allPromises.push(oPromise);
			return allPromises;
		},
		createDebitMemo: function (tObj, gID) {
			var dModel = this._dModel;
			var that = this;
			var tPromise = new Promise(function (resolve, reject) {

				dModel.create('/A_DebitMemoRequest', tObj, {
					success: function (oResponse) {
						var msgObj = {};

						msgObj["Mtype"] = "Success";
						msgObj["Msg"] = "Debit memo request is created with" + " " + oResponse.DebitMemoRequest;
						msgObj["DebitMemoNo"] = oResponse.DebitMemoRequest;
						msgObj["eTag"] = oResponse.__metadata.etag;
						//								oResponse.ConfirmationCount;
						that._msgArr.push(msgObj);
						resolve();

					},
					error: function (oError) {

						var msgObj = {};

						msgObj["Mtype"] = "Error";
						msgObj["Msg"] = oError.responseText;
						that._msgArr.push(msgObj);
						reject();

					},
					groupId: gID
				});
			});
			this._oPromises.push(tPromise);
			return tPromise;

		},
		promiseCompleted: function () {
			//	this._msgData.msgs = this._msgArr;
			//	this._msgModel.setData(this._msgData);
			//	sap.ui.getCore().setModel(this._msgModel, "mModel");
			var that = this;

			var rcount  = 0;
			Promise.allSettled = function (oPromises) {
                
				oPromises.forEach(function (r) {
					r.then(function (param) {

						rcount = rcount + 1;
						if (rcount === (that._bPromises.length)) {

							sap.ui.core.BusyIndicator.hide();
							//							MessageToast.show(count + "Production Order Confirmation successfully Created");
							that.removeBlockCompleted();
						}
						return r;

					}, function (error) {
						rcount = rcount + 1;
						if (rcount === (that._bPromises.length)) {

							sap.ui.core.BusyIndicator.hide();
							that.removeBlockCompleted();
						}
					});

				});
				return oPromises;
			};

			if (this._cIndex === 1)

			{
				var rPromises = this.removeDMBillingBlock();
				var rPromise = Promise.allSettled(rPromises);
			} else {
				this.displayLog();
			}
			// var oMessageTemplate = new MessageItem({
			// 	type: "{type}",
			// 	title: "{title}",
			// 	activeTitle: "{active}",
			// 	description: "{description}",
			// 	subtitle: "{subtitle}",
			// 	counter: "{counter}",

			// });

			// oMessagePopover = new MessagePopover({
			// 	items: {
			// 		path: '/',
			// 		template: oMessageTemplate
			// 	},
			// 	activeTitlePress: function () {

			// 	}
			// });

			// var scount = 0;
			// var ecount = 0;
			// var aMockMessages = [];
			// for (var k = 0; k < this._msgArr.length; k++) {
			// 	var mobj = {};
			// 	if (this._msgArr[k].Mtype == "Success") {
			// 		mobj["type"] = this._msgArr[k].Mtype;
			// 		mobj["title"] = "Success Message";
			// 		mobj["active"] = false;
			// 		mobj["description"] = this._msgArr[k].Msg;
			// 		mobj["subtitle"] = "Debit memo request created successfully";
			// 		scount = scount + 1;
			// 		mobj["conunter"] = scount;
			// 	} else {

			// 		mobj["type"] = this._msgArr[k].Mtype;
			// 		mobj["title"] = "Error Message";
			// 		mobj["active"] = true;
			// 		mobj["description"] = this._msgArr[k].Msg;
			// 		mobj["subtitle"] = "Debit memo request creattion Failed";
			// 		ecount = ecount + 1;
			// 		mobj["conunter"] = scount;
			// 	}
			// 	aMockMessages.push(mobj);
			// }

			// var oModel = new sap.ui.model.json.JSONModel();
			// oModel.setData(aMockMessages);
			// this.getView().setModel(oModel);
			// var oButton = new Button({
			// 	id: "logBut",
			// 	text: "Log",
			// 	type: "Emphasized",
			// 	width: "6rem"
			// });
			// //			oButton.addStyleClass("sapUiMediumMarginTop");
			// oButton.addDependent(oMessagePopover);
			// oButton.attachPress(this.handleMessagePopoverPress);
			// var oTool = this.getView().byId("oToolBar");
			// oTool.addContent(oButton);
			// this.byId("cUpload").setEnabled(false);
			// this.byId("tUpload").setEnabled(false);
			// this.byId("fileUploader").setEnabled(false);

			// //		this.byId("messagePopoverBtn").addDependent(oMessagePopover);

			// //  this.getOwnerComponent().getRouter().navTo("RLog");

		},
		handleMessagePopoverPress: function (oEvent) {
			oMessagePopover.toggle(oEvent.getSource());
		},

		memoSelected: function () {
			var rgO = this.byId("rgM");
			var ind = rgO.getSelectedIndex();
			if (ind === 1) {
				this._cmF.destroy();
				var oContent = this.byId("myContainer");
				var oFrag = sap.ui.xmlfragment(this.createId("dmF"), "CreditDebit.UploadCreditDebitMemo.view.DebitMemo", this);
				this._dmF = oFrag;
				oContent.addContent(oFrag);
				this._cIndex = ind;
			} else {
				this._dmF.destroy();
				var oContent = this.byId("myContainer");
				var oFrag = sap.ui.xmlfragment(this.createId("cmF"), "CreditDebit.UploadCreditDebitMemo.view.CreditMemo", this);
				this._cmF = oFrag;
				oContent.addContent(oFrag);
				this._cIndex = ind;
			}

		},
		createCreditMemos: function () {
			var tData = this._tModel.getData();
			var obj = {};

			var itemsObj = [];

			var first;
			var allPromises = [];
			var oPromise;
			var groupID = "GRPID";
			var count = 0;
			for (var j = 0; j < tData.trec.length; j++) {

				var iObj = {};
				var itemPrice = {};
				var itemsPrice = [];

				if (j !== 0 && tData.trec[j].NOrder === 'X') {
					//					if (first === "X") {
					obj.to_Item = itemsObj;

					//                        first = " ";
					groupID = groupID + count;
					oPromise = this.createCreditMemo(obj, groupID);
					count = count + 1;
					allPromises.push(oPromise);
					var obj = {};

					var iObj = {};
					var itemsObj = [];

					//					} else {
					obj.CreditMemoRequestType = tData.trec[j].DType;
					obj.SalesOrganization = tData.trec[j].Sorg;
					obj.DistributionChannel = tData.trec[j].Dchnl;
					obj.OrganizationDivision = tData.trec[j].Div;
					obj.SoldToParty = tData.trec[j].SParty;
					obj.SDDocumentReason = tData.trec[j].Oreason;
					obj.CustomerPaymentTerms = tData.trec[j].Pterm;
					obj.PaymentMethod = tData.trec[j].Pmethod;
					obj.TransactionCurrency = tData.trec[j].Currency;
					obj.PurchaseOrderByCustomer = tData.trec[j].Cref;
					//	obj.HeaderBillingBlockReason = "";

					iObj.Material = tData.trec[j].Mat;
					iObj.RequestedQuantity = tData.trec[j].Quan;

					itemPrice.ConditionType = tData.trec[j].CType;
					itemPrice.ConditionRateValue = tData.trec[j].Cvalue;
					itemsPrice.push(itemPrice);
					iObj.to_PricingElement = itemsPrice;
					itemsObj.push(iObj);
					//					}

				} else {
					if (j == 0) {

						obj.CreditMemoRequestType = tData.trec[j].DType;
						obj.SalesOrganization = tData.trec[j].Sorg;
						obj.DistributionChannel = tData.trec[j].Dchnl;
						obj.OrganizationDivision = tData.trec[j].Div;
						obj.SoldToParty = tData.trec[j].SParty;
						obj.SDDocumentReason = tData.trec[j].Oreason;
						obj.CustomerPaymentTerms = tData.trec[j].Pterm;
						obj.PaymentMethod = tData.trec[j].Pmethod;
						obj.TransactionCurrency = tData.trec[j].Currency;
						obj.PurchaseOrderByCustomer = tData.trec[j].Cref;
						//	obj.HeaderBillingBlockReason = " ";
					}
					iObj.Material = tData.trec[j].Mat;
					iObj.RequestedQuantity = tData.trec[j].Quan;

					itemPrice.ConditionType = tData.trec[j].CType;
					itemPrice.ConditionRateValue = tData.trec[j].Cvalue;
					itemsPrice.push(itemPrice);
					iObj.to_PricingElement = itemsPrice;
					itemsObj.push(iObj);

				}

			}
			obj.to_Item = itemsObj;
			count = count + 1;
			groupID = groupID + count;
			oPromise = this.createCreditMemo(obj, groupID);
			allPromises.push(oPromise);
			return allPromises;
		},
		createCreditMemo: function (tObj, gID) {
			var cModel = this._cModel;
			var that = this;
			var tPromise = new Promise(function (resolve, reject) {

				cModel.create('/A_CreditMemoRequest', tObj, {
					success: function (oResponse) {
						var msgObj = {};

						msgObj["Mtype"] = "Success";
						msgObj["Msg"] = "Credit memo request is created with" + " " + oResponse.CreditMemoRequest;
						//								oResponse.ConfirmationCount;
						that._msgArr.push(msgObj);
						resolve();

					},
					error: function (oError) {

						var msgObj = {};

						msgObj["Mtype"] = "Error";
						msgObj["Msg"] = oError.responseText;
						that._msgArr.push(msgObj);
						reject();

					},
					groupId: gID
				});
			});
			this._oPromises.push(tPromise);
			return tPromise;

		},
		removeDMBillingBlock: function () {
			var dModel = this._dModel;
			var gId = "GID";
			var lPromises = [];
			for (var i = 0; i < this._msgArr.length; i++) {
				var that = this;
				gId = gId + i;
				var obj = {};
				var eT = this._msgArr[i].eTag;
				var debitMemoNo = this._msgArr[i].DebitMemoNo;
				obj.HeaderBillingBlockReason = " ";
				var lPromise = new Promise(function (resolve, reject) {

					var sPath = dModel.createKey("/A_DebitMemoRequest", {
						DebitMemoRequest: debitMemoNo
					});
					dModel.update(sPath, obj, {
						success: function (oResponse) {
							var msgObj = {};

							resolve();

						},
						error: function (oError) {

							var msgObj = {};

							reject();

						},
						eTag: eT,
						groupId: gId
					});
				});
				lPromises.push(lPromise);
			}
			this._bPromises = lPromises;
			return lPromises;
		},
		removeBlockCompleted: function () {
			this.displayLog();
		},
		displayLog: function () {
			var oMessageTemplate = new MessageItem({
				type: "{type}",
				title: "{title}",
				activeTitle: "{active}",
				description: "{description}",
				subtitle: "{subtitle}",
				counter: "{counter}",

			});

			oMessagePopover = new MessagePopover({
				items: {
					path: '/',
					template: oMessageTemplate
				},
				activeTitlePress: function () {

				}
			});

			var scount = 0;
			var ecount = 0;
			var aMockMessages = [];
			for (var k = 0; k < this._msgArr.length; k++) {
				var mobj = {};
				if (this._msgArr[k].Mtype == "Success") {
					mobj["type"] = this._msgArr[k].Mtype;
					mobj["title"] = "Success Message";
					mobj["active"] = false;
					mobj["description"] = this._msgArr[k].Msg;
					if (this._cIndex === 1) {
						mobj["subtitle"] = "Debit memo request created successfully";
					} else {
						mobj["subtitle"] = "Credit memo request created successfully";
					}
					scount = scount + 1;
					mobj["conunter"] = scount;
				} else {

					mobj["type"] = this._msgArr[k].Mtype;
					mobj["title"] = "Error Message";
					mobj["active"] = true;
					mobj["description"] = this._msgArr[k].Msg;
					if (this._cIndex === 1) {
						mobj["subtitle"] = "Debit memo request creattion Failed";
					} else {
						mobj["subtitle"] = "Credit memo request creattion Failed";
					}

					ecount = ecount + 1;
					mobj["conunter"] = scount;
				}
				aMockMessages.push(mobj);
			}
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(aMockMessages);
			this.getView().setModel(oModel);
			var oButton = new Button({
				id: "logBut",
				text: "Log",
				type: "Emphasized",
				width: "6rem"
			});
			//			oButton.addStyleClass("sapUiMediumMarginTop");
			oButton.addDependent(oMessagePopover);
			oButton.attachPress(this.handleMessagePopoverPress);
			var oTool = this.getView().byId("oToolBar");
			oTool.addContent(oButton);
			this.byId("cUpload").setEnabled(false);
			this.byId("tUpload").setEnabled(false);
			this.byId("fileUploader").setEnabled(false);
		}
	});
});