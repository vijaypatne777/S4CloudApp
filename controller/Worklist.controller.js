sap.ui.define(["./BaseController","sap/ui/model/json/JSONModel","../model/formatter","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/m/MessageToast","sap/m/MessagePopover","sap/m/MessageItem","sap/m/Button","sap/m/MessageBox","sap/ui/export/Spreadsheet","sap/ui/core/util/ExportTypeCSV"],function(e,t,r,a,o,n,i,s,l,c,d,u){"use strict";var g;return e.extend("CreditDebit.UploadCreditDebitMemo.controller.Worklist",{formatter:r,onInit:function(){var e=new sap.ui.model.json.JSONModel;e.loadData("/services/userapi/attributes");e.attachRequestCompleted(function e(t){if(t.getParameter("success")){this.setData({json:this.getJSON(),status:"Success"},true);var r=this.getData();alert(r)}else{var a=t.getParameter("errorObject").textStatus;if(a){this.setData("status",a)}else{this.setData("status","Unknown error retrieving user info")}}});var t=this.byId("cRB");var r=this.byId("dRB");var a=this.byId("rgM");var o=a.getSelectedIndex();this._cIndex=o;if(this._cIndex===0){var n=this.byId("myContainer");var i=sap.ui.xmlfragment(this.createId("cmF"),"CreditDebit.UploadCreditDebitMemo.view.CreditMemo",this);this._cmF=i;n.addContent(i)}this._tModel=new sap.ui.model.json.JSONModel;this._rModel=new sap.ui.model.json.JSONModel;this._dModel=this.getOwnerComponent().getModel("dMemo");this._cModel=this.getOwnerComponent().getModel();this._oPromises=[];this._msgArr=[];this._aObj=[];this._msgData={msgs:this._msgArr};this._rData={trec:this._aObj};var s=this.byId("cUpload");s.setEnabled(false)},onUpdateFinished:function(e){},onPress:function(e){},onShareInJamPress:function(){},onSearch:function(e){},onRefresh:function(){},_showObject:function(e){},_applySearch:function(e){},handleUploadPress:function(){var e=this;var t;var r=[];var a={trec:r};var o=this.byId("fileUploader");if(this._cIndex===0){t=this.byId(sap.ui.core.Fragment.createId("cmF","memoTable"))}if(this._cIndex===1){t=this.byId(sap.ui.core.Fragment.createId("dmF","memoTable"))}var i=[];i.push("ColumnHeaders");t.setSticky(i);if(!o.getValue()){n.show("Select the file first!");return}else{var s=o.getFocusDomRef();var l=s.files[0];if(l&&window.FileReader){var c=new FileReader;c.onload=function(o){var n=o.target.result;var i=n.replace(/\n/g,",").split(",");var s;if(e._cIndex===1){s=20}else{s=16}var l=i.splice(0,s);while(i.length-1>0){var c={};var d={};var u=i.splice(0,s);for(var g=0;g<u.length;g++){c[l[g]]=u[g].trim();if(e._cIndex===1){switch(g){case 0:d["NOrder"]=c[l[g]];break;case 1:d["DType"]=c[l[g]];break;case 2:d["Sorg"]=c[l[g]];break;case 3:d["Dchnl"]=c[l[g]];break;case 4:d["Div"]=c[l[g]];break;case 5:d["SParty"]=c[l[g]];break;case 6:d["Cref"]=c[l[g]];break;case 7:d["Oreason"]=c[l[g]];break;case 8:d["Pterm"]=c[l[g]];break;case 9:d["Currency"]=c[l[g]];break;case 10:d["Pmethod"]=c[l[g]];break;case 11:d["HTID"]=c[l[g]];break;case 12:d["Htext"]=c[l[g]];break;case 13:d["Mat"]=c[l[g]];break;case 14:d["Quan"]=c[l[g]];break;case 15:d["CType"]=c[l[g]];break;case 16:d["Cvalue"]=c[l[g]];break;case 17:d["ITID"]=c[l[g]];break;case 18:d["Itext"]=c[l[g]];break;case 19:d["Bblock"]=c[l[g]];break}}else{switch(g){case 0:d["NOrder"]=c[l[g]];break;case 1:d["DType"]=c[l[g]];break;case 2:d["Sorg"]=c[l[g]];break;case 3:d["Dchnl"]=c[l[g]];break;case 4:d["Div"]=c[l[g]];break;case 5:d["SParty"]=c[l[g]];break;case 6:d["Cref"]=c[l[g]];break;case 7:d["Oreason"]=c[l[g]];break;case 8:d["Pterm"]=c[l[g]];break;case 9:d["Currency"]=c[l[g]];break;case 10:d["Pmethod"]=c[l[g]];break;case 11:d["Mat"]=c[l[g]];break;case 12:d["Quan"]=c[l[g]];break;case 13:d["CType"]=c[l[g]];break;case 14:d["Cvalue"]=c[l[g]];break;case 15:d["Bblock"]=c[l[g]];break}}}d["Memo"]=" ";r.push(d)}e._tModel.setData(a);t.setModel(e._tModel);var m=e.validateFileData();if(m){var p=e.byId("cUpload");p.setEnabled(true);e.byId("fileUploader").setEnabled(false);e.byId("tUpload").setEnabled(false);e.byId("rgM").setEnabled(false)}};c.readAsBinaryString(l)}}},validateFileData:function(){var e=this._tModel.getData();for(var t=0;t<e.trec.length;t++){if(e.trec[t].NOrder==="X"||e.trec[t].NOrder==="x"){if(this._cIndex===0&&e.trec[t].DType!=="CR"&&e.trec[t].DType!=="Cr"&&e.trec[t].DType!=="cR"&&e.trec[t].DType!=="cr"){var r=this.getView().getModel("i18n").getResourceBundle().getText("TemplateCError");c.error(r);return false}if(this._cIndex===1&&e.trec[t].DType!=="DR"&&e.trec[t].DType!=="Dr"&&e.trec[t].DType!=="dR"&&e.trec[t].DType!=="dr"){var a=this.getView().getModel("i18n").getResourceBundle().getText("TemplateDError");c.error(a);return false}}}return true},handleRefresh:function(){this._tModel.setData();this._rModel.setData();this._sMCount=0;this._oPromises=[];this._bPromises=[];this._msgArr=[];this._aObj=[];this._msgData.msgs={};this._rData.trec={};this.byId("cUpload").setEnabled(false);this.byId("tUpload").setEnabled(true);this.byId("fileUploader").setEnabled(true);this.byId("rgM").setEnabled(true);this.byId("fileUploader").clear();var e=sap.ui.getCore().byId("logBut");if(typeof e!=="undefined"){e.destroy()}},handlePost:function(){var e=this;var t=0;sap.ui.core.BusyIndicator.show();Promise.allSettled=function(r){r.forEach(function(r){r.then(function(a){t=t+1;e._sMCount=t;if(t===e._oPromises.length){e.promiseCompleted()}return r},function(a){t=t+1;if(t===e._oPromises.length){e.promiseCompleted()}return r})});return r};var r=[];if(this._cIndex===1){r=this.createDebitMemos()}if(this._cIndex===0){r=this.createCreditMemos()}var a=Promise.allSettled(r)},createDebitMemos:function(){var e=this._tModel.getData();var t={};var r={};var a=[];var o=0;var n=[];var i;var s=[];var l;var c="GRPID";for(var d=0;d<e.trec.length;d++){var u={};var g={};var m=[];var p={};var h=[];if(d!==0&&(e.trec[d].NOrder==="X"||e.trec[d].NOrder==="x")){t.to_Item=n;c=c+o;l=this.createDebitMemo(t,c);o=o+1;s.push(l);var t={};var r={};var a=[];var u={};var n=[];t.DebitMemoRequestType=e.trec[d].DType;t.DebitMemoRequestType=t.DebitMemoRequestType.toUpperCase();t.SalesOrganization=e.trec[d].Sorg;t.SalesOrganization=t.SalesOrganization.toUpperCase();t.DistributionChannel=e.trec[d].Dchnl;t.OrganizationDivision=e.trec[d].Div;t.SoldToParty=e.trec[d].SParty;t.SoldToParty=t.SoldToParty.toUpperCase();t.SDDocumentReason=e.trec[d].Oreason;t.CustomerPaymentTerms=e.trec[d].Pterm;t.CustomerPaymentTerms=t.CustomerPaymentTerms.toUpperCase();t.PaymentMethod=e.trec[d].Pmethod;t.PaymentMethod=t.PaymentMethod.toUpperCase();t.TransactionCurrency=e.trec[d].Currency;t.TransactionCurrency=t.TransactionCurrency.toUpperCase();t.PurchaseOrderByCustomer=e.trec[d].Cref;t.HeaderBillingBlockReason=e.trec[d].Bblock;t.HeaderBillingBlockReason=t.HeaderBillingBlockReason.toUpperCase();r.LongTextID=e.trec[d].HTID;r.LongTextID=r.LongTextID.toUpperCase();r.Language="E";r.LongText=e.trec[d].Htext;a.push(r);t.to_Text=a;u.Material=e.trec[d].Mat;u.Material=u.Material.toUpperCase();u.RequestedQuantity=e.trec[d].Quan;p.Language="E";p.LongTextID=e.trec[d].ITID;p.LongTextID=p.LongTextID.toUpperCase();p.LongText=e.trec[d].Itext;h.push(p);u.to_Text=h;g.ConditionType=e.trec[d].CType;g.ConditionType=g.ConditionType.toUpperCase();g.ConditionRateValue=e.trec[d].Cvalue;m.push(g);u.to_PricingElement=m;n.push(u)}else{if(d==0){t.DebitMemoRequestType=e.trec[d].DType;t.DebitMemoRequestType=t.DebitMemoRequestType.toUpperCase();t.SalesOrganization=e.trec[d].Sorg;t.SalesOrganization=t.SalesOrganization.toUpperCase();t.DistributionChannel=e.trec[d].Dchnl;t.OrganizationDivision=e.trec[d].Div;t.SoldToParty=e.trec[d].SParty;t.SoldToParty=t.SoldToParty.toUpperCase();t.SDDocumentReason=e.trec[d].Oreason;t.CustomerPaymentTerms=e.trec[d].Pterm;t.CustomerPaymentTerms=t.CustomerPaymentTerms.toUpperCase();t.PaymentMethod=e.trec[d].Pmethod;t.PaymentMethod=t.PaymentMethod.toUpperCase();t.TransactionCurrency=e.trec[d].Currency;t.TransactionCurrency=t.TransactionCurrency.toUpperCase();t.HeaderBillingBlockReason=e.trec[d].Bblock;t.HeaderBillingBlockReason=t.HeaderBillingBlockReason.toUpperCase();t.PurchaseOrderByCustomer=e.trec[d].Cref;r.LongTextID=e.trec[d].HTID;r.LongTextID=r.LongTextID.toUpperCase();r.Language="E";r.LongText=e.trec[d].Htext;a.push(r);t.to_Text=a}u.Material=e.trec[d].Mat;u.Material=u.Material.toUpperCase();u.RequestedQuantity=e.trec[d].Quan;p.Language="E";p.LongTextID=e.trec[d].ITID;p.LongTextID=p.LongTextID.toUpperCase();p.LongText=e.trec[d].Itext;h.push(p);u.to_Text=h;g.ConditionType=e.trec[d].CType;g.ConditionType=g.ConditionType.toUpperCase();g.ConditionRateValue=e.trec[d].Cvalue;m.push(g);u.to_PricingElement=m;n.push(u)}}t.to_Item=n;o=o+1;c=c+o;l=this.createDebitMemo(t,c);s.push(l);return s},createDebitMemo:function(e,t){var r=this._dModel;var a=this;var o=new Promise(function(o,n){r.create("/A_DebitMemoRequest",e,{success:function(t){var r={};r["Mtype"]="Success";r["Msg"]="Debit memo request is created with"+" "+t.DebitMemoRequest;r["DebitMemoNo"]=t.DebitMemoRequest;r["eTag"]=t.__metadata.etag;a._msgArr.push(r);var n=" ";a.updateMemo(t,e,n);o()},error:function(t){var r={};r["Mtype"]="Error";r["Msg"]=t.responseText;a._msgArr.push(r);var o="X";a.updateMemo(t,e,o);n()},groupId:t})});this._oPromises.push(o);return o},promiseCompleted:function(){this._rModel.setData(this._rData);var e=this;var t=0;Promise.allSettled=function(r){r.forEach(function(r){r.then(function(a){t=t+1;if(t===e._bPromises.length){sap.ui.core.BusyIndicator.hide();e.removeBlockCompleted()}return r},function(a){t=t+1;if(t===e._bPromises.length){sap.ui.core.BusyIndicator.hide();e.removeBlockCompleted()}return r})});return r};if(this._sMCount>0){var r=this.removeBillingBlock();var a=Promise.allSettled(r)}else{this.displayLog();sap.ui.core.BusyIndicator.hide()}},handleMessagePopoverPress:function(e){g.toggle(e.getSource())},memoSelected:function(){var e=this.byId("rgM");var t=e.getSelectedIndex();if(t===1){this._cmF.destroy();var r=this.byId("myContainer");var a=sap.ui.xmlfragment(this.createId("dmF"),"CreditDebit.UploadCreditDebitMemo.view.DebitMemo",this);this._dmF=a;r.addContent(a);this._cIndex=t}else{this._dmF.destroy();var r=this.byId("myContainer");var a=sap.ui.xmlfragment(this.createId("cmF"),"CreditDebit.UploadCreditDebitMemo.view.CreditMemo",this);this._cmF=a;r.addContent(a);this._cIndex=t}},createCreditMemos:function(){var e=this._tModel.getData();var t={};var r=[];var a;var o=[];var n;var i="GRPID";var s=0;for(var l=0;l<e.trec.length;l++){var c={};var d={};var u=[];if(l!==0&&(e.trec[l].NOrder==="X"||e.trec[l].NOrder==="x")){t.to_Item=r;i=i+s;n=this.createCreditMemo(t,i);s=s+1;o.push(n);var t={};var c={};var r=[];t.CreditMemoRequestType=e.trec[l].DType;t.CreditMemoRequestType=t.CreditMemoRequestType.toUpperCase();t.SalesOrganization=e.trec[l].Sorg;t.SalesOrganization=t.SalesOrganization.toUpperCase();t.DistributionChannel=e.trec[l].Dchnl;t.OrganizationDivision=e.trec[l].Div;t.SoldToParty=e.trec[l].SParty;t.SoldToParty=t.SoldToParty.toUpperCase();t.SDDocumentReason=e.trec[l].Oreason;t.CustomerPaymentTerms=e.trec[l].Pterm;t.CustomerPaymentTerms=t.CustomerPaymentTerms.toUpperCase();t.PaymentMethod=e.trec[l].Pmethod;t.PaymentMethod=t.PaymentMethod.toUpperCase();t.TransactionCurrency=e.trec[l].Currency;t.TransactionCurrency=t.TransactionCurrency.toUpperCase();t.PurchaseOrderByCustomer=e.trec[l].Cref;t.HeaderBillingBlockReason=e.trec[l].Bblock;t.HeaderBillingBlockReason=t.HeaderBillingBlockReason.toUpperCase();c.Material=e.trec[l].Mat;c.Material=c.Material.toUpperCase();c.RequestedQuantity=e.trec[l].Quan;d.ConditionType=e.trec[l].CType;d.ConditionType=d.ConditionType.toUpperCase();d.ConditionRateValue=e.trec[l].Cvalue;u.push(d);c.to_PricingElement=u;r.push(c)}else{if(l==0){t.CreditMemoRequestType=e.trec[l].DType;t.CreditMemoRequestType=t.CreditMemoRequestType.toUpperCase();t.SalesOrganization=e.trec[l].Sorg;t.SalesOrganization=t.SalesOrganization.toUpperCase();t.DistributionChannel=e.trec[l].Dchnl;t.OrganizationDivision=e.trec[l].Div;t.SoldToParty=e.trec[l].SParty;t.SoldToParty=t.SoldToParty.toUpperCase();t.SDDocumentReason=e.trec[l].Oreason;t.CustomerPaymentTerms=e.trec[l].Pterm;t.CustomerPaymentTerms=t.CustomerPaymentTerms.toUpperCase();t.PaymentMethod=e.trec[l].Pmethod;t.PaymentMethod=t.PaymentMethod.toUpperCase();t.TransactionCurrency=e.trec[l].Currency;t.TransactionCurrency=t.TransactionCurrency.toUpperCase();t.PurchaseOrderByCustomer=e.trec[l].Cref;t.HeaderBillingBlockReason=e.trec[l].Bblock;t.HeaderBillingBlockReason=t.HeaderBillingBlockReason.toUpperCase()}c.Material=e.trec[l].Mat;c.Material=c.Material.toUpperCase();c.RequestedQuantity=e.trec[l].Quan;d.ConditionType=e.trec[l].CType;d.ConditionType=d.ConditionType.toUpperCase();d.ConditionRateValue=e.trec[l].Cvalue;u.push(d);c.to_PricingElement=u;r.push(c)}}t.to_Item=r;s=s+1;i=i+s;n=this.createCreditMemo(t,i);o.push(n);return o},createCreditMemo:function(e,t){var r=this._cModel;var a=this;var o=new Promise(function(o,n){r.create("/A_CreditMemoRequest",e,{success:function(t){var r={};r["Mtype"]="Success";r["Msg"]="Credit memo request is created with"+" "+t.CreditMemoRequest;a._msgArr.push(r);var n=" ";a.updateMemo(t,e,n);o()},error:function(t){var r={};r["Mtype"]="Error";r["Msg"]=t.responseText;a._msgArr.push(r);var o="X";a.updateMemo(t,e,o);n()},groupId:t})});this._oPromises.push(o);return o},removeBillingBlock:function(){var e=[];var t={trec:e};t=this._rModel.getData();if(this._cIndex===1){var r=this._dModel}else{var a=this._cModel}var o="GID";var n=[];var i=this;for(var s=0;s<t.trec.length;s++){if((t.trec[s].NOrder==="X"||t.trec[s].NOrder==="x")&&t.trec[s].Memo!=" "){o=o+s;var l={};var c=t.trec[s].Etag;var d=t.trec[s].Memo;l.HeaderBillingBlockReason=t.trec[s].Bblock;l.HeaderBillingBlockReason=l.HeaderBillingBlockReason.toUpperCase();if(this._cIndex===1){var u=new Promise(function(e,t){var a=r.createKey("/A_DebitMemoRequest",{DebitMemoRequest:d});r.update(a,l,{success:function(t){var r={};e()},error:function(e){var r={};t()},eTag:c,groupId:o})})}else{var u=new Promise(function(e,t){var r=a.createKey("/A_CreditMemoRequest",{CreditMemoRequest:d});a.update(r,l,{success:function(t){var r={};e()},error:function(e){var r={};t()},eTag:c,groupId:o})})}n.push(u)}}this._bPromises=n;return n},removeBlockCompleted:function(){this.displayLog()},displayLog:function(){var e;if(this._cIndex===0){e=this.byId(sap.ui.core.Fragment.createId("cmF","memoTable"))}if(this._cIndex===1){e=this.byId(sap.ui.core.Fragment.createId("dmF","memoTable"))}this._rData.trec=this._aObj;this._msgData.msgs=this._msgArr;e.setModel(this._rModel);var t=new s({type:"{type}",title:"{title}",activeTitle:"{active}",description:"{description}",subtitle:"{subtitle}",counter:"{counter}"});g=new i({items:{path:"/",template:t},activeTitlePress:function(){}});var r=0;var a=0;var o=[];for(var n=0;n<this._msgArr.length;n++){var c={};if(this._msgArr[n].Mtype=="Success"){c["type"]=this._msgArr[n].Mtype;c["title"]="Success Message";c["active"]=false;c["description"]=this._msgArr[n].Msg;if(this._cIndex===1){c["subtitle"]=this.getView().getModel("i18n").getResourceBundle().getText("sDMsg")}else{c["subtitle"]=this.getView().getModel("i18n").getResourceBundle().getText("sCMsg")}r=r+1;c["conunter"]=r}else{c["type"]=this._msgArr[n].Mtype;c["title"]="Error Message";c["active"]=true;c["description"]=this._msgArr[n].Msg;if(this._cIndex===1){c["subtitle"]=this.getView().getModel("i18n").getResourceBundle().getText("eDMsg")}else{c["subtitle"]=this.getView().getModel("i18n").getResourceBundle().getText("eCMsg")}a=a+1;c["conunter"]=r}o.push(c)}var d=new sap.ui.model.json.JSONModel;d.setData(o);this.getView().setModel(d);var u=new l({id:"logBut",text:"Log",type:"Emphasized",width:"6rem"});u.addDependent(g);u.attachPress(this.handleMessagePopoverPress);var m=this.getView().byId("oToolBar");m.addContent(u);this.byId("cUpload").setEnabled(false);this.byId("tUpload").setEnabled(false);this.byId("fileUploader").setEnabled(false)},updateMemo:function(e,t,r){var a={};if(r!=="X"){a["NOrder"]="X";if(this._cIndex===1){a["Memo"]=e.DebitMemoRequest;a["DType"]=e.DebitMemoRequestType}else{a["Memo"]=e.CreditMemoRequest;a["DType"]=e.CreditMemoRequestType}a["Etag"]=e.__metadata.etag;a["Sorg"]=e.SalesOrganization;a["Dchnl"]=e.DistributionChannel;a["Div"]=e.OrganizationDivision;a["SParty"]=e.SoldToParty;a["Cref"]=e.PurchaseOrderByCustomer;a["Oreason"]=e.SDDocumentReason;a["Pterm"]=e.CustomerPaymentTerms;a["Currency"]=e.TransactionCurrency;a["Pmethod"]=e.PaymentMethod;a["Bblock"]=t.HeaderBillingBlockReason;if(this._cIndex===1){a["HTID"]=t.to_Text[0].LongTextID;a["Htext"]=t.to_Text[0].LongText}for(var o=0;o<t.to_Item.length;o++){t.to_Item[o].Material=t.to_Item[o].Material.toUpperCase();a["Mat"]=t.to_Item[o].Material;a["Quan"]=t.to_Item[o].RequestedQuantity;a["CType"]=t.to_Item[o].to_PricingElement[0].ConditionType;a["Cvalue"]=t.to_Item[o].to_PricingElement[0].ConditionRateValue;if(this._cIndex===1){a["ITID"]=t.to_Item[o].to_Text[0].LongTextID;a["Itext"]=t.to_Item[o].to_Text[0].LongText}this._aObj.push(a);if(o!==t.to_Item.length-1){var a={};if(this._cIndex===1){a["Memo"]=e.DebitMemoRequest;a["DType"]=e.DebitMemoRequestType}else{a["Memo"]=e.CreditMemoRequest;a["DType"]=e.CreditMemoRequestType}a["Etag"]=e.__metadata.etag;a["Sorg"]=e.SalesOrganization;a["Dchnl"]=e.DistributionChannel;a["Div"]=e.OrganizationDivision;a["SParty"]=e.SoldToParty;a["Cref"]=e.PurchaseOrderByCustomer;a["Oreason"]=e.SDDocumentReason;a["Pterm"]=e.CustomerPaymentTerms;a["Currency"]=e.TransactionCurrency;a["Pmethod"]=e.PaymentMethod;a["Bblock"]=t.HeaderBillingBlockReason;if(this._cIndex===1){a["HTID"]=t.to_Text[0].LongTextID;a["Htext"]=t.to_Text[0].LongText}}}}else{a["Memo"]=" ";a["NOrder"]="X";if(this._cIndex===1){a["DType"]=t.DebitMemoRequestType}else{a["DType"]=t.CreditMemoRequestType}a["Sorg"]=t.SalesOrganization;a["Dchnl"]=t.DistributionChannel;a["Div"]=t.OrganizationDivision;a["SParty"]=t.SoldToParty;a["Cref"]=t.PurchaseOrderByCustomer;a["Oreason"]=t.SDDocumentReason;a["Pterm"]=t.CustomerPaymentTerms;a["Currency"]=t.TransactionCurrency;a["Pmethod"]=t.PaymentMethod;a["Bblock"]=t.HeaderBillingBlockReason;if(this._cIndex===1){a["HTID"]=t.to_Text[0].LongTextID;a["Htext"]=t.to_Text[0].LongText}for(var o=0;o<t.to_Item.length;o++){t.to_Item[o].Material=t.to_Item[o].Material.toUpperCase();a["Mat"]=t.to_Item[o].Material;a["Quan"]=t.to_Item[o].RequestedQuantity;a["CType"]=t.to_Item[o].to_PricingElement[0].ConditionType;a["Cvalue"]=t.to_Item[o].to_PricingElement[0].ConditionRateValue;if(this._cIndex===1){a["ITID"]=t.to_Item[o].to_Text[0].LongTextID;a["Itext"]=t.to_Item[o].to_Text[0].LongText}this._aObj.push(a);if(o!==t.to_Item.length-1){var a={};if(this._cIndex===1){a["DType"]=t.DebitMemoRequestType}else{a["DType"]=t.CreditMemoRequestType}a["Sorg"]=t.SalesOrganization;a["Dchnl"]=t.DistributionChannel;a["Div"]=t.OrganizationDivision;a["SParty"]=t.SoldToParty;a["Cref"]=t.PurchaseOrderByCustomer;a["Oreason"]=t.SDDocumentReason;a["Pterm"]=t.CustomerPaymentTerms;a["Currency"]=t.TransactionCurrency;a["Pmethod"]=t.PaymentMethod;a["Bblock"]=t.HeaderBillingBlockReason;if(this._cIndex===1){a["HTID"]=t.to_Text[0].LongTextID;a["Htext"]=t.to_Text[0].LongText}}}}this._rData.trec=this._aObj},downloadData:function(){var e=[];var t;var r={trec:e};var r=this._rModel.getData();var a;if(typeof r==="undefined"){a=true}else{if(Object.keys(r).length===0){a=true}}if(a){var o=this.getView().getModel("i18n").getResourceBundle().getText("oTableNoDataText");sap.m.MessageBox.warning(o)}else{var n=new Date;var i=n.getUTCDate()+"-"+(n.getUTCMonth()+1)+"-"+n.getUTCFullYear()+" "+n.getUTCHours()+":"+n.getUTCMinutes()+":"+n.getUTCSeconds();var s="Memo_".concat(i);if(this._cIndex===0){var l=new sap.ui.core.util.Export({exportType:new u({separatorChar:",",charset:"utf-8"}),models:this._rModel,rows:{path:"/trec"},columns:[{name:this.getView().getModel("i18n").getResourceBundle().getText("NewOrderTitle"),template:{content:"{NOrder}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("DocTypeE"),template:{content:"{DType}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("SalesOrgE"),template:{content:"{Sorg}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("DistChannelE"),template:{content:"{Dchnl}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("Division"),template:{content:"{Div}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("SoldParty"),template:{content:"{SParty}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("CReferenceE"),template:{content:"{Cref}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("Oreason"),template:{content:"{Oreason}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("PTermE"),template:{content:"{Pterm}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("Currency"),template:{content:"{Currency}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("PMethodE"),template:{content:"{Pmethod}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("Mat"),template:{content:"{Mat}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("Quan"),template:{content:"{Quan}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("CType"),template:{content:"{CType}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("CValueE"),template:{content:"{Cvalue}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("Bblock"),template:{content:"{Bblock}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("CreditMemo"),template:{content:"{Memo}"}}]})}else{var l=new sap.ui.core.util.Export({exportType:new u({separatorChar:",",charset:"utf-8"}),models:this._rModel,rows:{path:"/trec"},columns:[{name:this.getView().getModel("i18n").getResourceBundle().getText("NewOrderTitle"),template:{content:"{NOrder}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("DocTypeE"),template:{content:"{DType}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("SalesOrgE"),template:{content:"{Sorg}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("DistChannelE"),template:{content:"{Dchnl}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("Division"),template:{content:"{Div}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("SoldParty"),template:{content:"{SParty}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("CReferenceE"),template:{content:"{Cref}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("Oreason"),template:{content:"{Oreason}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("PTermE"),template:{content:"{Pterm}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("Currency"),template:{content:"{Currency}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("PMethodE"),template:{content:"{Pmethod}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("Mat"),template:{content:"{Mat}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("Quan"),template:{content:"{Quan}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("HTextID"),template:{content:"{HTID}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("HText"),template:{content:"{Htext}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("CType"),template:{content:"{CType}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("CValueE"),template:{content:"{Cvalue}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("ITextID"),template:{content:"{ITID}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("IText"),template:{content:"{Itext}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("Bblock"),template:{content:"{Bblock}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("DebitMemo"),template:{content:"{Memo}"}}]})}l.saveFile(s).catch(function(e){var t=this.getView().getModel("i18n").getResourceBundle().getText("eText");c.error(t+e)}).then(function(){l.destroy()})}},createColumns:function(){var e=[];e.push({label:"Document Type",property:"DType",width:10,type:"string"});e.push({label:"Sales Organization",property:"Sorg",width:10,type:"string"});e.push({label:"Distrubution Channel",property:"Dchnl",width:10,type:"string"});e.push({label:"Division",property:"Div",width:10,type:"string"});e.push({label:"Sold To Party",property:"SParty",width:10,type:"string"});e.push({label:"Customer Reference",property:"Cref",width:10,type:"string"});e.push({label:"Order Reason",property:"Oreason",width:10,type:"string"});e.push({label:"Payment Term",property:"Pterm",width:10,type:"string"});e.push({label:"Currency",property:"Currency",width:10,type:"string"});e.push({label:"Payment Method",property:"Pmethod",width:10,type:"string"});e.push({label:"Material",property:"Mat",width:10,type:"string"});e.push({label:"Quanitity",property:"Quan",width:10,type:"string"});e.push({label:"Condition Type",property:"Ctype",width:10,type:"string"});e.push({label:"Condition Value",property:"Cvalue",width:10,type:"string"});e.push({label:"Billing Block",property:"Bblock",width:10,type:"string"});e.push({label:"Credit Memo Request",property:"Memo",width:10,type:"string"});return e}})});