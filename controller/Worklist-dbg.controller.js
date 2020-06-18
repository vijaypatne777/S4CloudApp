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
	"sap/ui/export/Spreadsheet",
	"sap/ui/core/util/ExportTypeCSV"
], function (BaseController, JSONModel, formatter, Filter, FilterOperator, MessageToast, MessagePopover, MessageItem, Button, MessageBox,
	Spreadsheet, et) {
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

			/* Create the model */
			this._Cuser = " ";
			var oModel = new sap.ui.model.json.JSONModel();
			/* Assign the model to the view */
			//	this.getView().setModel(oModel);
			/* Load the data */
			oModel.loadData("/services/userapi/attributes");
			/* Add a completion handler to log the json and any errors*/
			var that = this;
			oModel.attachRequestCompleted(function onCompleted(oEvent) {
				if (oEvent.getParameter("success")) {
					this.setData({
						"json": this.getJSON(),
						"status": "Success"
					}, true);
					var jdata = this.getData();
					that._Cuser = jdata.name;
					//		console.log(jdata);
			//		alert(jdata.email);
					that.getBusinessUser(jdata);
				} else {
					var msg = oEvent.getParameter("errorObject").textStatus;
					if (msg) {
						this.setData("status", msg);
					} else {
						this.setData("status", "Unknown error retrieving user info");
					}
				}
			});

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
			this._rModel = new sap.ui.model.json.JSONModel();
			this._dModel = this.getOwnerComponent().getModel("dMemo");
			this._cModel = this.getOwnerComponent().getModel();
			this._oPromises = [];
			this._msgArr = [];
			this._aObj = [];
			this._msgData = {
				"msgs": this._msgArr
			};
			this._rData = {
				"trec": this._aObj
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
			var aSticky = [];
			aSticky.push("ColumnHeaders");
			oTable.setSticky(aSticky);
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
						//			var arrCSV = strCSV.match(/[\w .]+(?=,?)/g);
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
							pobj["Memo"] = " ";
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
				if (tData.trec[k].NOrder === "X" || tData.trec[k].NOrder === "x") {
					if (this._cIndex === 0 && tData.trec[k].DType !== "CR" && tData.trec[k].DType !== "Cr" &&
						tData.trec[k].DType !== "cR" && tData.trec[k].DType !== "cr") {
						var cError = this.getView().getModel("i18n").getResourceBundle().getText("TemplateCError");
						MessageBox.error(cError);
						return false;
					}
					if (this._cIndex === 1 && tData.trec[k].DType !== "DR" && tData.trec[k].DType !== "Dr" && tData.trec[k].DType !== "dR" && tData.trec[
							k].DType !== "dr") {
						var dError = this.getView().getModel("i18n").getResourceBundle().getText("TemplateDError");
						MessageBox.error(dError);
						return false;
					}
				}
			}
			return true;
		},
		handleRefresh: function () {
			this._tModel.setData();
			this._rModel.setData();
			this._sMCount = 0;
			this._oPromises = [];
			this._bPromises = [];
			this._msgArr = [];
			this._aObj = [];
			this._msgData.msgs = {};
			this._rData.trec = {};
			//	this._rData = {};
			//	this._msgData = {};

			this.byId("cUpload").setEnabled(false);
			this.byId("tUpload").setEnabled(true);
			this.byId("fileUploader").setEnabled(true);
			this.byId("rgM").setEnabled(true);
			this.byId("fileUploader").clear();
			var oBut = sap.ui.getCore().byId("logBut");
			if (typeof oBut !== "undefined") {
				oBut.destroy();
			}
		},
		handlePost: function () {
			var that = this;
			var count = 0;
			sap.ui.core.BusyIndicator.show();
			Promise.allSettled = function (oPromises) {

				oPromises.forEach(function (r) {
					r.then(function (param) {

						count = count + 1;
						that._sMCount = count;
						if (count === (that._oPromises.length)) {

							//							MessageToast.show(count + "Production Order Confirmation successfully Created");
							that.promiseCompleted();
						}
						return r;

					}, function (error) {
						count = count + 1;
						if (count === (that._oPromises.length)) {

							that.promiseCompleted();
						}
						return r;
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
				if (j !== 0 && (tData.trec[j].NOrder === 'X' || tData.trec[j].NOrder === 'x')) {
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
					obj.YY1_CreditDebitMemoReq_SDH = this._bID;
					obj.DebitMemoRequestType = tData.trec[j].DType;
					obj.DebitMemoRequestType = obj.DebitMemoRequestType.toUpperCase();
					obj.SalesOrganization = tData.trec[j].Sorg;
					obj.SalesOrganization = obj.SalesOrganization.toUpperCase();
					obj.DistributionChannel = tData.trec[j].Dchnl;
					obj.OrganizationDivision = tData.trec[j].Div;
					obj.SoldToParty = tData.trec[j].SParty;
					obj.SoldToParty = obj.SoldToParty.toUpperCase();
					obj.SDDocumentReason = tData.trec[j].Oreason;
					obj.CustomerPaymentTerms = tData.trec[j].Pterm;
					obj.CustomerPaymentTerms = obj.CustomerPaymentTerms.toUpperCase();
					obj.PaymentMethod = tData.trec[j].Pmethod;
					obj.PaymentMethod = obj.PaymentMethod.toUpperCase();
					obj.TransactionCurrency = tData.trec[j].Currency;
					obj.TransactionCurrency = obj.TransactionCurrency.toUpperCase();
					obj.PurchaseOrderByCustomer = tData.trec[j].Cref;
					obj.HeaderBillingBlockReason = tData.trec[j].Bblock;
					obj.HeaderBillingBlockReason = obj.HeaderBillingBlockReason.toUpperCase();
					//					if (tData.trec[j].HTID !== " " &&  tData.trec[j].HTID !== "") {
					tObj.LongTextID = tData.trec[j].HTID;
					tObj.LongTextID = tObj.LongTextID.toUpperCase();
					tObj.Language = "E";
					tObj.LongText = tData.trec[j].Htext;
					hTobj.push(tObj);
					obj.to_Text = hTobj;
					//					}
					iObj.Material = tData.trec[j].Mat;
					iObj.Material = iObj.Material.toUpperCase();
					iObj.RequestedQuantity = tData.trec[j].Quan;
					//					if (tData.trec[j].ITID !== " " && tData.trec[j].ITID !== "") {
					itemTObj.Language = "E";
					itemTObj.LongTextID = tData.trec[j].ITID;
					itemTObj.LongTextID = itemTObj.LongTextID.toUpperCase();
					itemTObj.LongText = tData.trec[j].Itext;
					itemsTObj.push(itemTObj);
					iObj.to_Text = itemsTObj;
					//					}
					itemPrice.ConditionType = tData.trec[j].CType;
					itemPrice.ConditionType = itemPrice.ConditionType.toUpperCase();
					itemPrice.ConditionRateValue = tData.trec[j].Cvalue;
					itemsPrice.push(itemPrice);

					iObj.to_PricingElement = itemsPrice;
					itemsObj.push(iObj);
					//					}

				} else {
					if (j == 0) {

						obj.YY1_CreditDebitMemoReq_SDH = this._bID;
						obj.DebitMemoRequestType = tData.trec[j].DType;
						obj.DebitMemoRequestType = obj.DebitMemoRequestType.toUpperCase();
						obj.SalesOrganization = tData.trec[j].Sorg;
						obj.SalesOrganization = obj.SalesOrganization.toUpperCase();
						obj.DistributionChannel = tData.trec[j].Dchnl;
						obj.OrganizationDivision = tData.trec[j].Div;
						obj.SoldToParty = tData.trec[j].SParty;
						obj.SoldToParty = obj.SoldToParty.toUpperCase();
						obj.SDDocumentReason = tData.trec[j].Oreason;
						obj.CustomerPaymentTerms = tData.trec[j].Pterm;
						obj.CustomerPaymentTerms = obj.CustomerPaymentTerms.toUpperCase();
						obj.PaymentMethod = tData.trec[j].Pmethod;
						obj.PaymentMethod = obj.PaymentMethod.toUpperCase();
						obj.TransactionCurrency = tData.trec[j].Currency;
						obj.TransactionCurrency = obj.TransactionCurrency.toUpperCase();
						obj.HeaderBillingBlockReason = tData.trec[j].Bblock;
						obj.HeaderBillingBlockReason = obj.HeaderBillingBlockReason.toUpperCase();
						obj.PurchaseOrderByCustomer = tData.trec[j].Cref;
						//						if (tData.trec[j].HTID !== " " && tData.trec[j].HTID !== "" ) {
						tObj.LongTextID = tData.trec[j].HTID;
						tObj.LongTextID = tObj.LongTextID.toUpperCase();
						tObj.Language = "E";
						tObj.LongText = tData.trec[j].Htext;
						hTobj.push(tObj);
						obj.to_Text = hTobj;
						//						}
					}
					iObj.Material = tData.trec[j].Mat;
					iObj.Material = iObj.Material.toUpperCase();
					iObj.RequestedQuantity = tData.trec[j].Quan;
					//					if (tData.trec[j].ITID !== " " && tData.trec[j].ITID !== "") {
					itemTObj.Language = "E";
					itemTObj.LongTextID = tData.trec[j].ITID;
					itemTObj.LongTextID = itemTObj.LongTextID.toUpperCase();
					itemTObj.LongText = tData.trec[j].Itext;
					itemsTObj.push(itemTObj);
					iObj.to_Text = itemsTObj;
					//					}
					itemPrice.ConditionType = tData.trec[j].CType;
					itemPrice.ConditionType = itemPrice.ConditionType.toUpperCase();
					itemPrice.ConditionRateValue = tData.trec[j].Cvalue;
					itemsPrice.push(itemPrice);

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
						//	that.updateMemo(oResponse.SoldToParty, oResponse.PurchaseOrderByCustomer, oResponse.DebitMemoRequest, oResponse.__metadata.etag);
						var eFlag = " ";
						that.updateMemo(oResponse, tObj, eFlag);
						resolve();

					},
					error: function (oError) {

						var msgObj = {};

						msgObj["Mtype"] = "Error";
						msgObj["Msg"] = oError.responseText;
						that._msgArr.push(msgObj);
						//			that.updateMemo(oResponse.SoldToParty, oResponse.PurchaseOrderByCustomer, oError.responseText, oResponse.__metadata.etag);
						var eFlag = "X";
						that.updateMemo(oError, tObj, eFlag);
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

			this._rModel.setData(this._rData);
			var that = this;

			var rcount = 0;
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
						return r;
					});

				});
				return oPromises;
			};
			if (this._sMCount > 0) {
				var rPromises = this.removeBillingBlock();
				var rPromise = Promise.allSettled(rPromises);
			} else {
				this.displayLog();
				sap.ui.core.BusyIndicator.hide();
			}

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

				if (j !== 0 && (tData.trec[j].NOrder === 'X' || tData.trec[j].NOrder === 'x')) {
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
					obj.YY1_CreditDebitMemoReq_SDH = this._bID;
					obj.CreditMemoRequestType = tData.trec[j].DType;
					obj.CreditMemoRequestType = obj.CreditMemoRequestType.toUpperCase();
					obj.SalesOrganization = tData.trec[j].Sorg;
					obj.SalesOrganization = obj.SalesOrganization.toUpperCase();
					obj.DistributionChannel = tData.trec[j].Dchnl;
					obj.OrganizationDivision = tData.trec[j].Div;
					obj.SoldToParty = tData.trec[j].SParty;
					obj.SoldToParty = obj.SoldToParty.toUpperCase();
					obj.SDDocumentReason = tData.trec[j].Oreason;
					obj.CustomerPaymentTerms = tData.trec[j].Pterm;
					obj.CustomerPaymentTerms = obj.CustomerPaymentTerms.toUpperCase();
					obj.PaymentMethod = tData.trec[j].Pmethod;
					obj.PaymentMethod = obj.PaymentMethod.toUpperCase();
					obj.TransactionCurrency = tData.trec[j].Currency;
					obj.TransactionCurrency = obj.TransactionCurrency.toUpperCase();
					obj.PurchaseOrderByCustomer = tData.trec[j].Cref;
					obj.HeaderBillingBlockReason = tData.trec[j].Bblock;
					obj.HeaderBillingBlockReason = obj.HeaderBillingBlockReason.toUpperCase();

					iObj.Material = tData.trec[j].Mat;
					iObj.Material = iObj.Material.toUpperCase();
					iObj.RequestedQuantity = tData.trec[j].Quan;

					itemPrice.ConditionType = tData.trec[j].CType;
					itemPrice.ConditionType = itemPrice.ConditionType.toUpperCase();
					itemPrice.ConditionRateValue = tData.trec[j].Cvalue;
					itemsPrice.push(itemPrice);
					iObj.to_PricingElement = itemsPrice;
					itemsObj.push(iObj);
					//					}

				} else {
					if (j == 0) {

						//						obj.YY1_US_Created_By_User_SDH = this._Cuser;
						//			obj.CreatedByUser = "CB9980001654";
						obj.YY1_CreditDebitMemoReq_SDH = this._bID;
						obj.CreditMemoRequestType = tData.trec[j].DType;
						obj.CreditMemoRequestType = obj.CreditMemoRequestType.toUpperCase();
						obj.SalesOrganization = tData.trec[j].Sorg;
						obj.SalesOrganization = obj.SalesOrganization.toUpperCase();
						obj.DistributionChannel = tData.trec[j].Dchnl;
						obj.OrganizationDivision = tData.trec[j].Div;
						obj.SoldToParty = tData.trec[j].SParty;
						obj.SoldToParty = obj.SoldToParty.toUpperCase();
						obj.SDDocumentReason = tData.trec[j].Oreason;
						obj.CustomerPaymentTerms = tData.trec[j].Pterm;
						obj.CustomerPaymentTerms = obj.CustomerPaymentTerms.toUpperCase();
						obj.PaymentMethod = tData.trec[j].Pmethod;
						obj.PaymentMethod = obj.PaymentMethod.toUpperCase();
						obj.TransactionCurrency = tData.trec[j].Currency;
						obj.TransactionCurrency = obj.TransactionCurrency.toUpperCase();
						obj.PurchaseOrderByCustomer = tData.trec[j].Cref;
						obj.HeaderBillingBlockReason = tData.trec[j].Bblock;
						obj.HeaderBillingBlockReason = obj.HeaderBillingBlockReason.toUpperCase();
					}
					iObj.Material = tData.trec[j].Mat;
					iObj.Material = iObj.Material.toUpperCase();
					iObj.RequestedQuantity = tData.trec[j].Quan;

					itemPrice.ConditionType = tData.trec[j].CType;
					itemPrice.ConditionType = itemPrice.ConditionType.toUpperCase();
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
						// that.updateMemo(oResponse.SoldToParty, oResponse.PurchaseOrderByCustomer, oResponse.CreditMemoRequest, oResponse.__metadata
						// 	.etag);
						var eFlag = " ";
						that.updateMemo(oResponse, tObj, eFlag);
						resolve();

					},
					error: function (oError) {

						var msgObj = {};

						msgObj["Mtype"] = "Error";
						msgObj["Msg"] = oError.responseText;
						that._msgArr.push(msgObj);
						var eFlag = "X";
						that.updateMemo(oError, tObj, eFlag);
						reject();

					},
					groupId: gID
				});
			});
			this._oPromises.push(tPromise);
			return tPromise;

		},
		removeBillingBlock: function () {
			var ta = [];
			var tData = {
				"trec": ta
			};
			tData = this._rModel.getData();
			if (this._cIndex === 1) {
				var dModel = this._dModel;
			} else {
				var cModel = this._cModel;
			}

			var gId = "GID";
			var lPromises = [];
			var that = this;
			for (var i = 0; i < tData.trec.length; i++) {
				if ((tData.trec[i].NOrder === "X" || tData.trec[i].NOrder === "x") && tData.trec[i].Memo != " ") {

					gId = gId + i;
					var obj = {};
					var eT = tData.trec[i].Etag;
					var memoNo = tData.trec[i].Memo;
					obj.HeaderBillingBlockReason = tData.trec[i].Bblock;
					obj.HeaderBillingBlockReason = obj.HeaderBillingBlockReason.toUpperCase();
					if (this._cIndex === 1) {
						var lPromise = new Promise(function (resolve, reject) {

							var sPath = dModel.createKey("/A_DebitMemoRequest", {
								DebitMemoRequest: memoNo
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

					} else {
						var lPromise = new Promise(function (resolve, reject) {

							var sPath = cModel.createKey("/A_CreditMemoRequest", {
								CreditMemoRequest: memoNo
							});
							cModel.update(sPath, obj, {
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
					}

					lPromises.push(lPromise);
				}
			}
			this._bPromises = lPromises;
			return lPromises;
		},
		removeBlockCompleted: function () {
			this.displayLog();
		},
		displayLog: function () {
			var oTable;

			if (this._cIndex === 0) {
				oTable = this.byId(sap.ui.core.Fragment.createId("cmF", "memoTable"));
			}
			if (this._cIndex === 1) {
				oTable = this.byId(sap.ui.core.Fragment.createId("dmF", "memoTable"));
			}

			this._rData.trec = this._aObj;
			this._msgData.msgs = this._msgArr;
			oTable.setModel(this._rModel);
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
						mobj["subtitle"] = this.getView().getModel("i18n").getResourceBundle().getText("sDMsg");
					} else {
						mobj["subtitle"] = this.getView().getModel("i18n").getResourceBundle().getText("sCMsg");
					}
					scount = scount + 1;
					mobj["conunter"] = scount;
				} else {

					mobj["type"] = this._msgArr[k].Mtype;
					mobj["title"] = "Error Message";
					mobj["active"] = true;
					mobj["description"] = this._msgArr[k].Msg;
					if (this._cIndex === 1) {
						mobj["subtitle"] = this.getView().getModel("i18n").getResourceBundle().getText("eDMsg");
					} else {
						mobj["subtitle"] = this.getView().getModel("i18n").getResourceBundle().getText("eCMsg");
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
		},
		updateMemo: function (oRes, tObj, eFlag) {

			var obj = {};
			if (eFlag !== "X") {

				obj["NOrder"] = "X";
				if (this._cIndex === 1) {
					obj["Memo"] = oRes.DebitMemoRequest;
					obj["DType"] = oRes.DebitMemoRequestType;

				} else {
					obj["Memo"] = oRes.CreditMemoRequest;
					obj["DType"] = oRes.CreditMemoRequestType;
				}
				obj["Etag"] = oRes.__metadata.etag;

				obj["Sorg"] = oRes.SalesOrganization;
				obj["Dchnl"] = oRes.DistributionChannel;
				obj["Div"] = oRes.OrganizationDivision;
				obj["SParty"] = oRes.SoldToParty;
				obj["Cref"] = oRes.PurchaseOrderByCustomer;
				obj["Oreason"] = oRes.SDDocumentReason;
				obj["Pterm"] = oRes.CustomerPaymentTerms;
				obj["Currency"] = oRes.TransactionCurrency;
				obj["Pmethod"] = oRes.PaymentMethod;
				obj["Bblock"] = tObj.HeaderBillingBlockReason;
				if (this._cIndex === 1) {
					obj["HTID"] = tObj.to_Text[0].LongTextID;
					obj["Htext"] = tObj.to_Text[0].LongText;
				}
				for (var j = 0; j < tObj.to_Item.length; j++) {
					tObj.to_Item[j].Material = tObj.to_Item[j].Material.toUpperCase();
					obj["Mat"] = tObj.to_Item[j].Material;
					obj["Quan"] = tObj.to_Item[j].RequestedQuantity;
					obj["CType"] = tObj.to_Item[j].to_PricingElement[0].ConditionType;
					obj["Cvalue"] = tObj.to_Item[j].to_PricingElement[0].ConditionRateValue;
					if (this._cIndex === 1) {
						obj["ITID"] = tObj.to_Item[j].to_Text[0].LongTextID;
						obj["Itext"] = tObj.to_Item[j].to_Text[0].LongText;
					}
					this._aObj.push(obj);
					if (j !== (tObj.to_Item.length - 1)) {
						var obj = {};

						if (this._cIndex === 1) {
							obj["Memo"] = oRes.DebitMemoRequest;
							obj["DType"] = oRes.DebitMemoRequestType;

						} else {
							obj["Memo"] = oRes.CreditMemoRequest;
							obj["DType"] = oRes.CreditMemoRequestType;
						}
						obj["Etag"] = oRes.__metadata.etag;

						obj["Sorg"] = oRes.SalesOrganization;
						obj["Dchnl"] = oRes.DistributionChannel;
						obj["Div"] = oRes.OrganizationDivision;
						obj["SParty"] = oRes.SoldToParty;
						obj["Cref"] = oRes.PurchaseOrderByCustomer;
						obj["Oreason"] = oRes.SDDocumentReason;
						obj["Pterm"] = oRes.CustomerPaymentTerms;
						obj["Currency"] = oRes.TransactionCurrency;
						obj["Pmethod"] = oRes.PaymentMethod;
						obj["Bblock"] = tObj.HeaderBillingBlockReason;
						if (this._cIndex === 1) {
							obj["HTID"] = tObj.to_Text[0].LongTextID;
							obj["Htext"] = tObj.to_Text[0].LongText;
						}
					}
				}
			} else {
				obj["Memo"] = " ";
				obj["NOrder"] = "X";
				if (this._cIndex === 1) {

					obj["DType"] = tObj.DebitMemoRequestType;

				} else {

					obj["DType"] = tObj.CreditMemoRequestType;
				}

				obj["Sorg"] = tObj.SalesOrganization;
				obj["Dchnl"] = tObj.DistributionChannel;
				obj["Div"] = tObj.OrganizationDivision;
				obj["SParty"] = tObj.SoldToParty;
				obj["Cref"] = tObj.PurchaseOrderByCustomer;
				obj["Oreason"] = tObj.SDDocumentReason;
				obj["Pterm"] = tObj.CustomerPaymentTerms;
				obj["Currency"] = tObj.TransactionCurrency;
				obj["Pmethod"] = tObj.PaymentMethod;
				obj["Bblock"] = tObj.HeaderBillingBlockReason;
				if (this._cIndex === 1) {
					obj["HTID"] = tObj.to_Text[0].LongTextID;
					obj["Htext"] = tObj.to_Text[0].LongText;
				}
				for (var j = 0; j < tObj.to_Item.length; j++) {
					tObj.to_Item[j].Material = tObj.to_Item[j].Material.toUpperCase();
					obj["Mat"] = tObj.to_Item[j].Material;
					obj["Quan"] = tObj.to_Item[j].RequestedQuantity;
					obj["CType"] = tObj.to_Item[j].to_PricingElement[0].ConditionType;
					obj["Cvalue"] = tObj.to_Item[j].to_PricingElement[0].ConditionRateValue;
					if (this._cIndex === 1) {
						obj["ITID"] = tObj.to_Item[j].to_Text[0].LongTextID;
						obj["Itext"] = tObj.to_Item[j].to_Text[0].LongText;
					}
					this._aObj.push(obj);
					if (j !== (tObj.to_Item.length - 1)) {
						var obj = {};

						if (this._cIndex === 1) {

							obj["DType"] = tObj.DebitMemoRequestType;

						} else {

							obj["DType"] = tObj.CreditMemoRequestType;
						}

						obj["Sorg"] = tObj.SalesOrganization;
						obj["Dchnl"] = tObj.DistributionChannel;
						obj["Div"] = tObj.OrganizationDivision;
						obj["SParty"] = tObj.SoldToParty;
						obj["Cref"] = tObj.PurchaseOrderByCustomer;
						obj["Oreason"] = tObj.SDDocumentReason;
						obj["Pterm"] = tObj.CustomerPaymentTerms;
						obj["Currency"] = tObj.TransactionCurrency;
						obj["Pmethod"] = tObj.PaymentMethod;
						obj["Bblock"] = tObj.HeaderBillingBlockReason;
						if (this._cIndex === 1) {
							obj["HTID"] = tObj.to_Text[0].LongTextID;
							obj["Htext"] = tObj.to_Text[0].LongText;
						}
					}
				}
			}
			this._rData.trec = this._aObj;
		},
		downloadData: function () {
			var ta = [];
			var oSet;
			var tData = {
				"trec": ta
			};
			var tData = this._rModel.getData();
			var nData;
			if (typeof tData === "undefined") {
				nData = true;
			} else {
				if (Object.keys(tData).length === 0) {
					nData = true;
				}
			}

			if (nData) {
				var noRecordMsg = this.getView().getModel("i18n").getResourceBundle().getText("oTableNoDataText");
				sap.m.MessageBox.warning(noRecordMsg);

			} else {

				var m = new Date();
				var oCurrentTimeStamp = m.getUTCDate() + "-" + (m.getUTCMonth() + 1) + "-" + m.getUTCFullYear() + " " + m.getUTCHours() + ":" + m.getUTCMinutes() +
					":" + m.getUTCSeconds();
				var oFileName = "Memo_".concat(oCurrentTimeStamp);
				if (this._cIndex === 0) {
					var oExport = new sap.ui.core.util.Export({
						exportType: new et({
							separatorChar: ",",
							charset: "utf-8"
						}),

						models: this._rModel,
						rows: {
							path: "/trec"
						},
						columns: [{
							name: this.getView().getModel("i18n").getResourceBundle().getText("NewOrderTitle"), //"Document Type",
							template: {
								content: "{NOrder}"
							}
						}, {
							name: this.getView().getModel("i18n").getResourceBundle().getText("DocTypeE"), //"Document Type",
							template: {
								content: "{DType}"
							}
						}, {
							name: this.getView().getModel("i18n").getResourceBundle().getText("SalesOrgE"),
							template: {
								content: "{Sorg}"
							}
						}, {
							name: this.getView().getModel("i18n").getResourceBundle().getText("DistChannelE"),
							template: {
								content: "{Dchnl}"
							}
						}, {
							name: this.getView().getModel("i18n").getResourceBundle().getText("Division"),
							template: {
								content: "{Div}"
							}
						}, {
							name: this.getView().getModel("i18n").getResourceBundle().getText("SoldParty"),
							template: {
								content: "{SParty}"
							}
						}, {
							name: this.getView().getModel("i18n").getResourceBundle().getText("CReferenceE"),
							template: {
								content: "{Cref}"
							}
						}, {
							name: this.getView().getModel("i18n").getResourceBundle().getText("Oreason"),
							template: {
								content: "{Oreason}"
							}
						}, {
							name: this.getView().getModel("i18n").getResourceBundle().getText("PTermE"),
							template: {
								content: "{Pterm}"
							}
						}, {
							name: this.getView().getModel("i18n").getResourceBundle().getText("Currency"),
							template: {
								content: "{Currency}"
							}
						}, {
							name: this.getView().getModel("i18n").getResourceBundle().getText("PMethodE"),
							template: {
								content: "{Pmethod}"
							}
						}, {
							name: this.getView().getModel("i18n").getResourceBundle().getText("Mat"),
							template: {
								content: "{Mat}"
							}
						}, {
							name: this.getView().getModel("i18n").getResourceBundle().getText("Quan"),
							template: {
								content: "{Quan}"
							}
						}, {
							name: this.getView().getModel("i18n").getResourceBundle().getText("CType"),
							template: {
								content: "{CType}"
							}
						}, {
							name: this.getView().getModel("i18n").getResourceBundle().getText("CValueE"),
							template: {
								content: "{Cvalue}"
							}
						}, {
							name: this.getView().getModel("i18n").getResourceBundle().getText("Bblock"),
							template: {
								content: "{Bblock}"
							}
						}, {
							name: this.getView().getModel("i18n").getResourceBundle().getText("CreditMemo"),
							template: {
								content: "{Memo}"
							}
						}]

					});

				} else {

					var oExport = new sap.ui.core.util.Export({
						exportType: new et({
							separatorChar: ",",
							charset: "utf-8"
						}),

						models: this._rModel,
						rows: {
							path: "/trec"
						},
						columns: [{
								name: this.getView().getModel("i18n").getResourceBundle().getText("NewOrderTitle"), //"Document Type",
								template: {
									content: "{NOrder}"
								}
							}, {
								name: this.getView().getModel("i18n").getResourceBundle().getText("DocTypeE"), //"Document Type",
								template: {
									content: "{DType}"
								}
							}, {
								name: this.getView().getModel("i18n").getResourceBundle().getText("SalesOrgE"),
								template: {
									content: "{Sorg}"
								}
							}, {
								name: this.getView().getModel("i18n").getResourceBundle().getText("DistChannelE"),
								template: {
									content: "{Dchnl}"
								}
							}, {
								name: this.getView().getModel("i18n").getResourceBundle().getText("Division"),
								template: {
									content: "{Div}"
								}
							}, {
								name: this.getView().getModel("i18n").getResourceBundle().getText("SoldParty"),
								template: {
									content: "{SParty}"
								}
							}, {
								name: this.getView().getModel("i18n").getResourceBundle().getText("CReferenceE"),
								template: {
									content: "{Cref}"
								}
							}, {
								name: this.getView().getModel("i18n").getResourceBundle().getText("Oreason"),
								template: {
									content: "{Oreason}"
								}
							}, {
								name: this.getView().getModel("i18n").getResourceBundle().getText("PTermE"),
								template: {
									content: "{Pterm}"
								}
							}, {
								name: this.getView().getModel("i18n").getResourceBundle().getText("Currency"),
								template: {
									content: "{Currency}"
								}
							}, {
								name: this.getView().getModel("i18n").getResourceBundle().getText("PMethodE"),
								template: {
									content: "{Pmethod}"
								}
							}, {
								name: this.getView().getModel("i18n").getResourceBundle().getText("Mat"),
								template: {
									content: "{Mat}"
								}
							}, {
								name: this.getView().getModel("i18n").getResourceBundle().getText("Quan"),
								template: {
									content: "{Quan}"
								}
							}, {
								name: this.getView().getModel("i18n").getResourceBundle().getText("HTextID"),
								template: {
									content: "{HTID}"
								}
							}, {
								name: this.getView().getModel("i18n").getResourceBundle().getText("HText"),
								template: {
									content: "{Htext}"
								}
							}, {
								name: this.getView().getModel("i18n").getResourceBundle().getText("CType"),
								template: {
									content: "{CType}"
								}
							}, {
								name: this.getView().getModel("i18n").getResourceBundle().getText("CValueE"),
								template: {
									content: "{Cvalue}"
								}
							}, {
								name: this.getView().getModel("i18n").getResourceBundle().getText("ITextID"),
								template: {
									content: "{ITID}"
								}
							},

							{
								name: this.getView().getModel("i18n").getResourceBundle().getText("IText"),
								template: {
									content: "{Itext}"
								}
							}, {
								name: this.getView().getModel("i18n").getResourceBundle().getText("Bblock"),
								template: {
									content: "{Bblock}"
								}
							}, {
								name: this.getView().getModel("i18n").getResourceBundle().getText("DebitMemo"),
								template: {
									content: "{Memo}"
								}
							}
						]

					});
				}

				// download exported file
				oExport.saveFile(oFileName).catch(function (oError) {
					var eText = this.getView().getModel("i18n").getResourceBundle().getText("eText");
					MessageBox.error(eText + oError);
				}).then(function () {
					oExport.destroy();
				});
			}

		},
		createColumns: function () {
			var oColumns = [];

			oColumns.push({
				label: "Document Type",
				property: "DType",
				width: 10,
				type: "string"
			});
			oColumns.push({
				label: "Sales Organization",
				property: "Sorg",
				width: 10,
				type: "string"
			});
			oColumns.push({
				label: "Distrubution Channel",
				property: "Dchnl",
				width: 10,
				type: "string"
			});
			oColumns.push({
				label: "Division",
				property: "Div",
				width: 10,
				type: "string"
			});
			oColumns.push({
				label: "Sold To Party",
				property: "SParty",
				width: 10,
				type: "string"
			});
			oColumns.push({
				label: "Customer Reference",
				property: "Cref",
				width: 10,
				type: "string"
			});
			oColumns.push({
				label: "Order Reason",
				property: "Oreason",
				width: 10,
				type: "string"
			});
			oColumns.push({
				label: "Payment Term",
				property: "Pterm",
				width: 10,
				type: "string"
			});
			oColumns.push({
				label: "Currency",
				property: "Currency",
				width: 10,
				type: "string"
			});
			oColumns.push({
				label: "Payment Method",
				property: "Pmethod",
				width: 10,
				type: "string"
			});
			oColumns.push({
				label: "Material",
				property: "Mat",
				width: 10,
				type: "string"
			});
			oColumns.push({
				label: "Quanitity",
				property: "Quan",
				width: 10,
				type: "string"
			});
			oColumns.push({
				label: "Condition Type",
				property: "Ctype",
				width: 10,
				type: "string"
			});
			oColumns.push({
				label: "Condition Value",
				property: "Cvalue",
				width: 10,
				type: "string"
			});
			oColumns.push({
				label: "Billing Block",
				property: "Bblock",
				width: 10,
				type: "string"
			});
			oColumns.push({
				label: "Credit Memo Request",
				property: "Memo",
				width: 10,
				type: "string"
			});
			return oColumns;
		},
		getBusinessUser: function (jdata) {
			var that = this;
			var name = "name";
			var email = "email";
			console.log(jdata);
			if (email in jdata) {
				email = jdata.email;
				console.log("email");
				console.log(email);
			} else {
				email = jdata.name;
				console.log("name");
				console.log(email);
		
			}
			this._email = email;
			console.log(this._email);
			var names = [];
			names = email.split(".");
			var flen = names[0].length;
			var llen = names[1].length;
			var fc = names[0].charAt(0);
			var lc = names[1].charAt(0);
			var fnamec = names[0].substr(1,flen);
		    var lnamec = names[1].substr(1,llen);
			fc = fc.toUpperCase();
			lc = lc.toUpperCase();
			var nemail = fc + fnamec + "." + lc + lnamec + "." + names[2] ;
			var oFltr = [];
			var emailF = new Filter("DefaultEmailAddress", FilterOperator.EQ, nemail);
			oFltr.push(emailF);
			var bModel = new sap.ui.model.odata.v2.ODataModel("/S4HC/sap/opu/odata/sap/YY1_BU_EMAIL_ADDRESS_CDS/");
			bModel.read("/YY1_BU_Email_Address", {
				filters: oFltr,
				async: false,
				success: function (oRes) {
				 if(oRes.results.length > 0 )	
				 {
				 that._bID = oRes.results[0].UserID;
				 }else{
				 	that._bID = that._email;
				 }
				 
              //   alert("success");
				},
				error: function () {
              //   alert("failed");
				}
			});
		if ( email !== " ")
		{
			
		}
		}
	});
});