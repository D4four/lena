// Copyright (c) 2000-2001 Quadralay Corporation.  All rights reserved.
//

function  WWHJavaScriptSettings_Object()
{
  this.mHoverText = new WWHJavaScriptSettings_HoverText_Object();

  this.mTabs   = new WWHJavaScriptSettings_Tabs_Object();
  this.mTOC    = new WWHJavaScriptSettings_TOC_Object();
  this.mIndex  = new WWHJavaScriptSettings_Index_Object();
  this.mSearch = new WWHJavaScriptSettings_Search_Object();
}

function  WWHJavaScriptSettings_HoverText_Object()
{
  this.mbEnabled = false;

  this.mFontStyle = "font-family: Arial, Verdana, sans-serif ; font-size: 0.8em";

  this.mWidth = 200;

  this.mForegroundColor = "#000000";
  this.mBackgroundColor = "#FBFCFF";
  this.mBorderColor     = "#999999";
}

function  WWHJavaScriptSettings_Tabs_Object()
{
  this.mFontStyle = "font-family: Arial, Verdana, sans-serif ; font-size: 12px; color: #24355b;";

  this.mSelectedTabColor       = "#FFFFFF";
  this.mSelectedTabBorderColor = "#536980";
  this.mSelectedTabTextColor   = "#324f85";

  this.mDefaultTabColor       = "#9cc5e0";
  this.mDefaultTabBorderColor = "#536980";
  this.mDefaultTabTextColor   = "#324f85";
}

function  WWHJavaScriptSettings_TOC_Object()
{
  this.mbShow = true;

  this.mFontStyle = "font-family: Arial, Verdana, sans-serif ; font-size: 12px; color: #24355b;";

  this.mEnabledColor  = "#000000";
  this.mDisabledColor = "#000000";

  this.mIndent = 5;
}

function  WWHJavaScriptSettings_Index_Object()
{
  this.mbShow = true;

  this.mFontStyle = "font-family: Arial, Verdana, sans-serif ; font-size: 12px; color: #24355b;";

  this.mEnabledColor  = "#000000";
  this.mDisabledColor = "#000000";

  this.mIndent = 5;

  this.mNavigationFontStyle     = "font-family: Arial, Verdana, sans-serif ; font-size: 0.8em ; font-weight: normal";
  this.mNavigationCurrentColor  = "black";
  this.mNavigationEnabledColor  = "#000000";
  this.mNavigationDisabledColor = "#999999";
}

function  WWHJavaScriptSettings_Index_DisplayOptions(ParamIndexOptions)
{
  ParamIndexOptions.fSetThreshold(500);

  ParamIndexOptions.fSetSeperator(" - ");

  ParamIndexOptions.fGroup("", true, true, "ABCDEFGHIJKLMNOPQRSTUVWXYZ");
  ParamIndexOptions.fGroup("Numerics", false, true, "1234567890");
  ParamIndexOptions.fGroup("Symbols", false, true, "!@#$%^&*(){}[]<>\"|\\.,;-?+");
}

function  WWHJavaScriptSettings_Search_Object()
{
  this.mbShow = true;

  this.mFontStyle = "font-family: Arial, Verdana, sans-serif ; font-size: 0.8em ; font-weight: normal";

  this.mEnabledColor  = "#000000";
  this.mDisabledColor = "#000000";

  this.mIndent = 5;

  this.mbShowBook = false;
  this.mbShowRank = false;
}
