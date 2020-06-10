sap.ui.define(["sap/ui/test/opaQunit","sap/ui/Device","./pages/Worklist","./pages/App"],function(e,t){"use strict";var i=t.browser.msie||t.browser.edge?1500:1e3;QUnit.module("Worklist");e("Should see the table with all entries",function(e,t,i){e.iStartMyFLPApp({intent:"UploadCreditDebitMemoRequest-display"});i.onTheWorklistPage.theTableShouldHaveAllEntries().and.theTitleShouldDisplayTheTotalAmountOfItems()});e("Search for the First object should deliver results that contain the firstObject in the name",function(e,t,i){t.onTheWorklistPage.iSearchForTheFirstObject();i.onTheWorklistPage.theTableShowsOnlyObjectsWithTheSearchStringInTheirTitle()});e("Entering something that cannot be found into search field and pressing search field's refresh should leave the list as it was",function(e,t,i){t.onTheWorklistPage.iTypeSomethingInTheSearchThatCannotBeFoundAndTriggerRefresh();i.onTheWorklistPage.theTableHasEntries()});e("Should open the share menu and display the share buttons",function(e,t,i){t.onTheWorklistPage.iPressOnTheShareButton();i.onTheWorklistPage.iShouldSeeTheShareEmailButton();i.iLeaveMyFLPApp()});e("Should see the busy indicator on app view while worklist view metadata is loaded",function(e,t,a){e.iStartMyFLPApp({intent:"UploadCreditDebitMemoRequest-display",delay:i,autoWait:false});a.onTheAppPage.iShouldSeeTheBusyIndicatorForTheWholeApp()});e("Should see the busy indicator on worklist table after metadata is loaded",function(e,t,i){t.onTheAppPage.iWaitUntilTheAppBusyIndicatorIsGone();i.onTheWorklistPage.iShouldSeeTheWorklistTableBusyIndicator();i.iLeaveMyFLPApp()})});