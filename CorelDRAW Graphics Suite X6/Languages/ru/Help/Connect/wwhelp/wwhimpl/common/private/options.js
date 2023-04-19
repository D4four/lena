// Copyright (c) 2000-2001 Quadralay Corporation.  All rights reserved.
//

function  WWHCommonSettings_Object()
{
  this.mbForceJavaScript = true;

  this.mbSyncContentsEnabled  = true;
  this.mbPrevEnabled          = true;
  this.mbNextEnabled          = true;
  this.mbRelatedTopicsEnabled = false;
  this.mbEmailEnabled         = false;
  this.mbPrintEnabled         = true;
  this.mbBookmarkEnabled      = false;

  this.mEmailAddress = "";

  this.mRelatedTopics = new WWHCommonSettings_RelatedTopics_Object();
  this.mPopup         = new WWHCommonSettings_Popup_Object();

  this.mbHighlightingEnabled        = true;
  this.mHighlightingForegroundColor = "#FCFEFF";
  this.mHighlightingBackgroundColor = "#9BC2DB";
}

function  WWHCommonSettings_RelatedTopics_Object()
{
  this.mTitleFontStyle       = "font-family: Arial, Verdana, sans-serif ; font-size: 0.8em";
  this.mTitleForegroundColor = "#FFFFFF";
  this.mTitleBackgroundColor = "#72849E";

  this.mFontStyle = "font-family: Arial, Verdana, sans-serif ; font-size: 0.8em";

  this.mWidth = 250;

  this.mForegroundColor = "#FF9900";
  this.mBackgroundColor = "#72849E";
  this.mBorderColor     = "#666666";

  this.mbInlineEnabled = false;

  this.mInlineFontStyle = "font-family: Arial, Verdana, sans-serif ; font-size: 0.8em";

  this.mInlineForegroundColor = "#003366";
}

function  WWHCommonSettings_Popup_Object()
{
  this.mWidth = 200;

  this.mBackgroundColor = "#FBFCFF";
  this.mBorderColor     = "#999999";
}
