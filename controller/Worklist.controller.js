sap.ui.define(["./BaseController","sap/ui/model/json/JSONModel","../model/formatter","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/m/MessageToast","sap/m/MessagePopover","sap/m/MessageItem","sap/m/Button","sap/m/MessageBox","sap/ui/export/Spreadsheet","sap/ui/core/util/ExportTypeCSV"],function(e,t,r,a,n,i,o,s,c,l,d,u){"use strict";var g;return e.extend("CreditDebit.UploadCreditDebitMemo.controller.Worklist",{formatter:r,onInit:function(){var e=this.byId("cRB");var t=this.byId("dRB");var r=this.byId("rgM");var a=r.getSelectedIndex();this._cIndex=a;if(this._cIndex===0){var n=this.byId("myContainer");var i=sap.ui.xmlfragment(this.createId("cmF"),"CreditDebit.UploadCreditDebitMemo.view.CreditMemo",this);this._cmF=i;n.addContent(i)}this._tModel=new sap.ui.model.json.JSONModel;this._dModel=this.getOwnerComponent().getModel("dMemo");this._cModel=this.getOwnerComponent().getModel();this._oPromises=[];this._msgArr=[];this._msgData={msgs:this._msgArr};var o=this.byId("cUpload");o.setEnabled(false)},onUpdateFinished:function(e){},onPress:function(e){},onShareInJamPress:function(){},onSearch:function(e){},onRefresh:function(){},_showObject:function(e){},_applySearch:function(e){},handleUploadPress:function(){var e=this;var t;var r=[];var a={trec:r};var n=this.byId("fileUploader");if(this._cIndex===0){t=this.byId(sap.ui.core.Fragment.createId("cmF","memoTable"))}if(this._cIndex===1){t=this.byId(sap.ui.core.Fragment.createId("dmF","memoTable"))}if(!n.getValue()){i.show("Select the file first!");return}else{var o=n.getFocusDomRef();var s=o.files[0];if(s&&window.FileReader){var c=new FileReader;c.onload=function(n){var i=n.target.result;var o=i.replace(/\n/g,",").split(",");var s;if(e._cIndex===1){s=20}else{s=16}var c=o.splice(0,s);while(o.length-1>0){var l={};var d={};var u=o.splice(0,s);for(var g=0;g<u.length;g++){l[c[g]]=u[g].trim();if(e._cIndex===1){switch(g){case 0:d["NOrder"]=l[c[g]];break;case 1:d["DType"]=l[c[g]];break;case 2:d["Sorg"]=l[c[g]];break;case 3:d["Dchnl"]=l[c[g]];break;case 4:d["Div"]=l[c[g]];break;case 5:d["SParty"]=l[c[g]];break;case 6:d["Cref"]=l[c[g]];break;case 7:d["Oreason"]=l[c[g]];break;case 8:d["Pterm"]=l[c[g]];break;case 9:d["Currency"]=l[c[g]];break;case 10:d["Pmethod"]=l[c[g]];break;case 11:d["HTID"]=l[c[g]];break;case 12:d["Htext"]=l[c[g]];break;case 13:d["Mat"]=l[c[g]];break;case 14:d["Quan"]=l[c[g]];break;case 15:d["CType"]=l[c[g]];break;case 16:d["Cvalue"]=l[c[g]];break;case 17:d["ITID"]=l[c[g]];break;case 18:d["Itext"]=l[c[g]];break;case 19:d["Bblock"]=l[c[g]];break}}else{switch(g){case 0:d["NOrder"]=l[c[g]];break;case 1:d["DType"]=l[c[g]];break;case 2:d["Sorg"]=l[c[g]];break;case 3:d["Dchnl"]=l[c[g]];break;case 4:d["Div"]=l[c[g]];break;case 5:d["SParty"]=l[c[g]];break;case 6:d["Cref"]=l[c[g]];break;case 7:d["Oreason"]=l[c[g]];break;case 8:d["Pterm"]=l[c[g]];break;case 9:d["Currency"]=l[c[g]];break;case 10:d["Pmethod"]=l[c[g]];break;case 11:d["Mat"]=l[c[g]];break;case 12:d["Quan"]=l[c[g]];break;case 13:d["CType"]=l[c[g]];break;case 14:d["Cvalue"]=l[c[g]];break;case 15:d["Bblock"]=l[c[g]];break}}}d["Memo"]=" ";r.push(d)}e._tModel.setData(a);t.setModel(e._tModel);var h=e.validateFileData();if(h){var m=e.byId("cUpload");m.setEnabled(true);e.byId("fileUploader").setEnabled(false);e.byId("tUpload").setEnabled(false);e.byId("rgM").setEnabled(false)}};c.readAsBinaryString(s)}}},validateFileData:function(){var e=this._tModel.getData();for(var t=0;t<e.trec.length;t++){if(e.trec[t].NOrder==="X"){if(this._cIndex===0&&e.trec[t].DType!=="CR"){var r=this.getView().getModel("i18n").getResourceBundle().getText("TemplateCError");l.error(r);return false}if(this._cIndex===1&&e.trec[t].DType!=="DR"){var a=this.getView().getModel("i18n").getResourceBundle().getText("TemplateDError");l.error(a);return false}}}return true},handleRefresh:function(){this._tModel.setData();this._sMCount=0;this._oPromises=[];this._bPromises=[];this._msgArr=[];this.byId("cUpload").setEnabled(false);this.byId("tUpload").setEnabled(true);this.byId("fileUploader").setEnabled(true);this.byId("rgM").setEnabled(true);this.byId("fileUploader").clear();var e=sap.ui.getCore().byId("logBut");if(typeof e!=="undefined"){e.destroy()}},handlePost:function(){var e=this;var t=0;sap.ui.core.BusyIndicator.show();Promise.allSettled=function(r){r.forEach(function(r){r.then(function(a){t=t+1;e._sMCount=t;if(t===e._oPromises.length){e.promiseCompleted()}return r},function(a){t=t+1;if(t===e._oPromises.length){e.promiseCompleted()}return r})});return r};var r=[];if(this._cIndex===1){r=this.createDebitMemos()}if(this._cIndex===0){r=this.createCreditMemos()}var a=Promise.allSettled(r)},createDebitMemos:function(){var e=this._tModel.getData();var t={};var r={};var a=[];var n=0;var i=[];var o;var s=[];var c;var l="GRPID";for(var d=0;d<e.trec.length;d++){var u={};var g={};var h=[];var m={};var p=[];if(d!==0&&e.trec[d].NOrder==="X"){t.to_Item=i;l=l+n;c=this.createDebitMemo(t,l);n=n+1;s.push(c);var t={};var r={};var a=[];var u={};var i=[];t.DebitMemoRequestType=e.trec[d].DType;t.SalesOrganization=e.trec[d].Sorg;t.DistributionChannel=e.trec[d].Dchnl;t.OrganizationDivision=e.trec[d].Div;t.SoldToParty=e.trec[d].SParty;t.SDDocumentReason=e.trec[d].Oreason;t.CustomerPaymentTerms=e.trec[d].Pterm;t.PaymentMethod=e.trec[d].Pmethod;t.TransactionCurrency=e.trec[d].Currency;t.PurchaseOrderByCustomer=e.trec[d].Cref;t.HeaderBillingBlockReason="";r.LongTextID=e.trec[d].HTID;r.Language="E";r.LongText=e.trec[d].Htext;a.push(r);t.to_Text=a;u.Material=e.trec[d].Mat;u.RequestedQuantity=e.trec[d].Quan;m.Language="E";m.LongTextID=e.trec[d].ITID;m.LongText=e.trec[d].Itext;g.ConditionType=e.trec[d].CType;g.ConditionRateValue=e.trec[d].Cvalue;h.push(g);p.push(m);u.to_Text=p;u.to_PricingElement=h;i.push(u)}else{if(d==0){t.DebitMemoRequestType=e.trec[d].DType;t.SalesOrganization=e.trec[d].Sorg;t.DistributionChannel=e.trec[d].Dchnl;t.OrganizationDivision=e.trec[d].Div;t.SoldToParty=e.trec[d].SParty;t.SDDocumentReason=e.trec[d].Oreason;t.CustomerPaymentTerms=e.trec[d].Pterm;t.PaymentMethod=e.trec[d].Pmethod;t.TransactionCurrency=e.trec[d].Currency;t.HeaderBillingBlockReason="";t.PurchaseOrderByCustomer=e.trec[d].Cref;r.LongTextID=e.trec[d].HTID;r.Language="E";r.LongText=e.trec[d].Htext;a.push(r);t.to_Text=a}u.Material=e.trec[d].Mat;u.RequestedQuantity=e.trec[d].Quan;m.Language="E";m.LongTextID=e.trec[d].ITID;m.LongText=e.trec[d].Itext;g.ConditionType=e.trec[d].CType;g.ConditionRateValue=e.trec[d].Cvalue;h.push(g);p.push(m);u.to_Text=p;u.to_PricingElement=h;i.push(u)}}t.to_Item=i;n=n+1;l=l+n;c=this.createDebitMemo(t,l);s.push(c);return s},createDebitMemo:function(e,t){var r=this._dModel;var a=this;var n=new Promise(function(n,i){r.create("/A_DebitMemoRequest",e,{success:function(e){var t={};t["Mtype"]="Success";t["Msg"]="Debit memo request is created with"+" "+e.DebitMemoRequest;t["DebitMemoNo"]=e.DebitMemoRequest;t["eTag"]=e.__metadata.etag;a._msgArr.push(t);a.updateMemo(e.SoldToParty,e.PurchaseOrderByCustomer,e.DebitMemoRequest,e.__metadata.etag);n()},error:function(e){var t={};t["Mtype"]="Error";t["Msg"]=e.responseText;a._msgArr.push(t);i()},groupId:t})});this._oPromises.push(n);return n},promiseCompleted:function(){var e=this;var t=0;Promise.allSettled=function(r){r.forEach(function(r){r.then(function(a){t=t+1;if(t===e._bPromises.length){sap.ui.core.BusyIndicator.hide();e.removeBlockCompleted()}return r},function(a){t=t+1;if(t===e._bPromises.length){sap.ui.core.BusyIndicator.hide();e.removeBlockCompleted()}return r})});return r};if(this._sMCount>0){var r=this.removeBillingBlock();var a=Promise.allSettled(r)}else{this.displayLog();sap.ui.core.BusyIndicator.hide()}},handleMessagePopoverPress:function(e){g.toggle(e.getSource())},memoSelected:function(){var e=this.byId("rgM");var t=e.getSelectedIndex();if(t===1){this._cmF.destroy();var r=this.byId("myContainer");var a=sap.ui.xmlfragment(this.createId("dmF"),"CreditDebit.UploadCreditDebitMemo.view.DebitMemo",this);this._dmF=a;r.addContent(a);this._cIndex=t}else{this._dmF.destroy();var r=this.byId("myContainer");var a=sap.ui.xmlfragment(this.createId("cmF"),"CreditDebit.UploadCreditDebitMemo.view.CreditMemo",this);this._cmF=a;r.addContent(a);this._cIndex=t}},createCreditMemos:function(){var e=this._tModel.getData();var t={};var r=[];var a;var n=[];var i;var o="GRPID";var s=0;for(var c=0;c<e.trec.length;c++){var l={};var d={};var u=[];if(c!==0&&e.trec[c].NOrder==="X"){t.to_Item=r;o=o+s;i=this.createCreditMemo(t,o);s=s+1;n.push(i);var t={};var l={};var r=[];t.CreditMemoRequestType=e.trec[c].DType;t.SalesOrganization=e.trec[c].Sorg;t.DistributionChannel=e.trec[c].Dchnl;t.OrganizationDivision=e.trec[c].Div;t.SoldToParty=e.trec[c].SParty;t.SDDocumentReason=e.trec[c].Oreason;t.CustomerPaymentTerms=e.trec[c].Pterm;t.PaymentMethod=e.trec[c].Pmethod;t.TransactionCurrency=e.trec[c].Currency;t.PurchaseOrderByCustomer=e.trec[c].Cref;l.Material=e.trec[c].Mat;l.RequestedQuantity=e.trec[c].Quan;d.ConditionType=e.trec[c].CType;d.ConditionRateValue=e.trec[c].Cvalue;u.push(d);l.to_PricingElement=u;r.push(l)}else{if(c==0){t.CreditMemoRequestType=e.trec[c].DType;t.SalesOrganization=e.trec[c].Sorg;t.DistributionChannel=e.trec[c].Dchnl;t.OrganizationDivision=e.trec[c].Div;t.SoldToParty=e.trec[c].SParty;t.SDDocumentReason=e.trec[c].Oreason;t.CustomerPaymentTerms=e.trec[c].Pterm;t.PaymentMethod=e.trec[c].Pmethod;t.TransactionCurrency=e.trec[c].Currency;t.PurchaseOrderByCustomer=e.trec[c].Cref}l.Material=e.trec[c].Mat;l.RequestedQuantity=e.trec[c].Quan;d.ConditionType=e.trec[c].CType;d.ConditionRateValue=e.trec[c].Cvalue;u.push(d);l.to_PricingElement=u;r.push(l)}}t.to_Item=r;s=s+1;o=o+s;i=this.createCreditMemo(t,o);n.push(i);return n},createCreditMemo:function(e,t){var r=this._cModel;var a=this;var n=new Promise(function(n,i){r.create("/A_CreditMemoRequest",e,{success:function(e){var t={};t["Mtype"]="Success";t["Msg"]="Credit memo request is created with"+" "+e.CreditMemoRequest;a._msgArr.push(t);a.updateMemo(e.SoldToParty,e.PurchaseOrderByCustomer,e.CreditMemoRequest,e.__metadata.etag);n()},error:function(e){var t={};t["Mtype"]="Error";t["Msg"]=e.responseText;a._msgArr.push(t);i()},groupId:t})});this._oPromises.push(n);return n},removeBillingBlock:function(){var e=[];var t={trec:e};t=this._tModel.getData();if(this._cIndex===1){var r=this._dModel}else{var a=this._cModel}var n="GID";var i=[];var o=this;for(var s=0;s<t.trec.length;s++){if(t.trec[s].NOrder==="X"&&t.trec[s].Memo!=" "){n=n+s;var c={};var l=t.trec[s].Etag;var d=t.trec[s].Memo;c.HeaderBillingBlockReason=t.trec[s].Bblock;if(this._cIndex===1){var u=new Promise(function(e,t){var a=r.createKey("/A_DebitMemoRequest",{DebitMemoRequest:d});r.update(a,c,{success:function(t){var r={};e()},error:function(e){var r={};t()},eTag:l,groupId:n})})}else{var u=new Promise(function(e,t){var r=a.createKey("/A_CreditMemoRequest",{CreditMemoRequest:d});a.update(r,c,{success:function(t){var r={};e()},error:function(e){var r={};t()},eTag:l,groupId:n})})}i.push(u)}}this._bPromises=i;return i},removeBlockCompleted:function(){this.displayLog()},displayLog:function(){var e=new s({type:"{type}",title:"{title}",activeTitle:"{active}",description:"{description}",subtitle:"{subtitle}",counter:"{counter}"});g=new o({items:{path:"/",template:e},activeTitlePress:function(){}});var t=0;var r=0;var a=[];for(var n=0;n<this._msgArr.length;n++){var i={};if(this._msgArr[n].Mtype=="Success"){i["type"]=this._msgArr[n].Mtype;i["title"]="Success Message";i["active"]=false;i["description"]=this._msgArr[n].Msg;if(this._cIndex===1){i["subtitle"]=this.getView().getModel("i18n").getResourceBundle().getText("sDMsg")}else{i["subtitle"]=this.getView().getModel("i18n").getResourceBundle().getText("sCMsg")}t=t+1;i["conunter"]=t}else{i["type"]=this._msgArr[n].Mtype;i["title"]="Error Message";i["active"]=true;i["description"]=this._msgArr[n].Msg;if(this._cIndex===1){i["subtitle"]=this.getView().getModel("i18n").getResourceBundle().getText("eDMsg")}else{i["subtitle"]=this.getView().getModel("i18n").getResourceBundle().getText("eCMsg")}r=r+1;i["conunter"]=t}a.push(i)}var l=new sap.ui.model.json.JSONModel;l.setData(a);this.getView().setModel(l);var d=new c({id:"logBut",text:"Log",type:"Emphasized",width:"6rem"});d.addDependent(g);d.attachPress(this.handleMessagePopoverPress);var u=this.getView().byId("oToolBar");u.addContent(d);this.byId("cUpload").setEnabled(false);this.byId("tUpload").setEnabled(false);this.byId("fileUploader").setEnabled(false)},updateMemo:function(e,t,r,a){var n=[];var i={trec:n};i=this._tModel.getData();var o=i.trec.findIndex(function(r){return r.SParty===e&&r.Cref===t&&r.NOrder==="X"});var s=i.trec[o];s["Memo"]=r;s["Etag"]=a;this._tModel.setData(i)},downloadData:function(){var e=[];var t;var r={trec:e};var r=this._tModel.getData();var a;if(typeof r==="undefined"){a=true}else{if(Object.keys(r).length===0){a=true}}if(a){var n=this.getView().getModel("i18n").getResourceBundle().getText("oTableNoDataText");sap.m.MessageBox.warning(n)}else{var i=new Date;var o=i.getUTCDate()+"-"+(i.getUTCMonth()+1)+"-"+i.getUTCFullYear()+" "+i.getUTCHours()+":"+i.getUTCMinutes()+":"+i.getUTCSeconds();var s="Memo_".concat(o);if(this._cIndex===0){var c=new sap.ui.core.util.Export({exportType:new u({separatorChar:",",charset:"utf-8"}),models:this._tModel,rows:{path:"/trec"},columns:[{name:this.getView().getModel("i18n").getResourceBundle().getText("DocTypeE"),template:{content:"{DType}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("SalesOrgE"),template:{content:"{Sorg}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("DistChannelE"),template:{content:"{Dchnl}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("Division"),template:{content:"{Div}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("SoldParty"),template:{content:"{SParty}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("CReferenceE"),template:{content:"{Cref}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("Oreason"),template:{content:"{Oreason}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("PTermE"),template:{content:"{Pterm}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("Currency"),template:{content:"{Currency}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("PMethodE"),template:{content:"{Pmethod}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("Mat"),template:{content:"{Mat}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("Quan"),template:{content:"{Quan}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("CType"),template:{content:"{CType}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("CValueE"),template:{content:"{Cvalue}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("Bblock"),template:{content:"{Bblock}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("CreditMemo"),template:{content:"{Memo}"}}]})}else{var c=new sap.ui.core.util.Export({exportType:new u({separatorChar:",",charset:"utf-8"}),models:this._tModel,rows:{path:"/trec"},columns:[{name:this.getView().getModel("i18n").getResourceBundle().getText("DocTypeE"),template:{content:"{DType}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("SalesOrgE"),template:{content:"{Sorg}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("DistChannelE"),template:{content:"{Dchnl}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("Division"),template:{content:"{Div}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("SoldParty"),template:{content:"{SParty}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("CReferenceE"),template:{content:"{Cref}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("Oreason"),template:{content:"{Oreason}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("PTermE"),template:{content:"{Pterm}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("Currency"),template:{content:"{Currency}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("PMethodE"),template:{content:"{Pmethod}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("Mat"),template:{content:"{Mat}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("HTextID"),template:{content:"{HTID}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("HText"),template:{content:"{Htext}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("CType"),template:{content:"{CType}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("CValueE"),template:{content:"{Cvalue}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("ITextID"),template:{content:"{ITID}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("IText"),template:{content:"{Itext}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("Bblock"),template:{content:"{Bblock}"}},{name:this.getView().getModel("i18n").getResourceBundle().getText("DebitMemo"),template:{content:"{Memo}"}}]})}c.saveFile(s).catch(function(e){var t=this.getView().getModel("i18n").getResourceBundle().getText("eText");l.error(t+e)}).then(function(){c.destroy()})}},createColumns:function(){var e=[];e.push({label:"Document Type",property:"DType",width:10,type:"string"});e.push({label:"Sales Organization",property:"Sorg",width:10,type:"string"});e.push({label:"Distrubution Channel",property:"Dchnl",width:10,type:"string"});e.push({label:"Division",property:"Div",width:10,type:"string"});e.push({label:"Sold To Party",property:"SParty",width:10,type:"string"});e.push({label:"Customer Reference",property:"Cref",width:10,type:"string"});e.push({label:"Order Reason",property:"Oreason",width:10,type:"string"});e.push({label:"Payment Term",property:"Pterm",width:10,type:"string"});e.push({label:"Currency",property:"Currency",width:10,type:"string"});e.push({label:"Payment Method",property:"Pmethod",width:10,type:"string"});e.push({label:"Material",property:"Mat",width:10,type:"string"});e.push({label:"Quanitity",property:"Quan",width:10,type:"string"});e.push({label:"Condition Type",property:"Ctype",width:10,type:"string"});e.push({label:"Condition Value",property:"Cvalue",width:10,type:"string"});e.push({label:"Billing Block",property:"Bblock",width:10,type:"string"});e.push({label:"Credit Memo Request",property:"Memo",width:10,type:"string"});return e}})});