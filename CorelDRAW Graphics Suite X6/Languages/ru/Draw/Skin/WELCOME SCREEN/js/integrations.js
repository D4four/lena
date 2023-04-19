// JavaScript Document

// global variables
var nDefaultPageID;
var bFirstLaunch = false;
var aMruItems = null;
var errorImageTimer = null;
var nErrorImageTimerCounter = 0;
var nVideoPauseTimerCounter = 0;

// Calls path to install directory
var strTutorPath = window.external.TutorialsPath

// Saves dialog's persistent settings
function SaveSettings()
{
  // save current page
	nDefaultPageID = window.external.GetSessionProperty('nDefaultPageID');
	if ( typeof( nDefaultPageID ) == 'undefined' )
		nDefaultPageID = 1;
	window.external.SetPesistentProperty( 'nDefaultPageID', nDefaultPageID );
	
	// save current gallery item position  
	var currentGalleryItem = window.external.GetSessionProperty('currentGalleryItem');
	if ( typeof( currentGalleryItem ) == 'undefined' )
		currentGalleryItem = 0;
	window.external.SetPesistentProperty( 'currentGalleryItem', currentGalleryItem );
}

// Loads dialog's persistent settings
function LoadSettings()
{
	nDefaultPageID = window.external.GetPesistentProperty( 'nDefaultPageID');
	if ( typeof( nDefaultPageID ) == 'undefined' )
	{
    bFirstLaunch = true;  // this is first time WelcomeScreen dialog has been launched
    nDefaultPageID = 1;   // QuickStart is default page
	} 
	window.external.SetSessionProperty('nDefaultPageID', nDefaultPageID ); 
	
	// load current gallery position
	var currentGalleryItem = window.external.GetPesistentProperty( 'currentGalleryItem' );
	if ( typeof( currentGalleryItem ) == 'undefined' )
		currentGalleryItem = 0;
	window.external.SetSessionProperty('currentGalleryItem', currentGalleryItem );
}

// Closes dialog and saves persistent settings
function CloseDialog() 
{
	// save persistent settings
	SaveSettings();
	window.external.CloseDialog();
}

// "Make this my default WelcomeScreen page" checkbox handler
function OnMakePageDefaultToggled( nPageID ) {
	var bState = document.getElementById('defaultscreen_' + nPageID ).checked;
	if ( bState )
	{
		nDefaultPageID = nPageID; 
	}
	else
	{
		// QuickStart always becomes default if previous default page is unchecked
		nDefaultPageID = 1; 
	}
	window.external.SetSessionProperty('nDefaultPageID', nDefaultPageID );
}

// Returns whether "Always show the WelcomeScreen..." box should be checked
function IsAlwaysShowChecked() {
	return window.external.ShowAlways;
}

// "Always show the WelcomeScreen..." checkbox handler
function OnAlwaysShowToggled(nTabID) {
	window.external.ShowAlways = document.getElementById('startuplaunch_' + nTabID ).checked;
}

// "Notify me of available product updates, news and tutorials" checkbox handler
function OnNotifyNewToggled()
{
	var ipm = window.external.IpmDom;
	
	if ( null != ipm )
	{
		ipm.NotifyNew = document.getElementById('showmessages').checked;
	}
}

// "Automatically download product updates and ask me before installing" checkbox handler
function OnAutoDownloadUpdatesToggled()
{
	var ipm = window.external.IpmDom;
	
	if ( null != ipm )
	{
		ipm.AutoDownloadUpdates = document.getElementById('autodownload').checked;
	}
}

// called when user clicks on "Settings" link on Updates page
function OnShowSettings()
{
	var ipm = window.external.IpmDom;
	
	if ( null != ipm )
	{ 
		// set "Notify me of available product updates, news and tutorials" checkbox state
		document.getElementById('showmessages').checked =  ipm.NotifyNew; 
	
		// set "Automatically download product updates and ask me before installing" checkbox state
		document.getElementById('autodownload').checked =  ipm.AutoDownloadUpdates;
	}
	
	ChangeLayerVis('settingspopup','','show');
	ChangeLayerVis('screen','','show')
}

// return app id ( "Draw" or "Photo-Paint" )
function GetAppId()
{
	var strRet = "";
	
	var strAppId = window.external.GetSessionProperty('strAppId');
	
	if ( typeof( strAppId ) != 'undefined' )
	{
		strRet = strAppId;
	}
	
	return strRet.toLowerCase();
}

// sets app id ( "Draw" or "Photo-Paint" )
function SetAppId( appId )
{
	window.external.SetSessionProperty( 'strAppId', appId );
}

// call this function on "onload" event
function OnWelcomeScreenLoad( appId )
{
	SetAppId( appId );
	ImagePreload('mask_01.png','mask_02.png','mask_03.png','mask_04.png','mask_05.png');
	LoadSettings();
	preloadGallery();

	// turn off text string explaining blank MRU list -->
	if ( aMruItems.Count > 0 )
	{
		ClassSwitch('mru_sanscontent','off');
	}
	
	switch( window.external.InvokeOption ) {
		case 2 : {
			// Invoke WelcomeScreen on Learning Tools/Insights from the Experts page, disregard "Make this my default WelcomeScreen page" settings
			OnTabNavigate(3);
			dactive('bullet_insights');
			dshow('body_right3_02');
			$('NeedReaderAdvisory').style.display='block';
			break;
		}
		case 3 : {
			// Invoke WelcomeScreen on What Is New page, disregard "Make this my default WelcomeScreen page" settings
			OnTabNavigate(2);
			break;
		}
		case 4 : {
			// Invoke WelcomeScreen on Updates page, disregard "Make this my default WelcomeScreen page" settings
			OnTabNavigate(5);
			break;
		}
		case 5 : {
			// Invoke WelcomeScreen on Learning Tools page, Corel Tutor section selected, disregard "Make this my default WelcomeScreen page" settings
			OnTabNavigate(3);
			dactive('bullet_coreltutor');
			dshow('body_right3_01');
			$('NeedReaderAdvisory').style.display='block';
			break;
		}
		case 1 : 
		case 0 : 
		default :
		{
			// Invoke WelcomeScreen with default settings, i.e. launch page user selected as default by "Make this my default WelcomeScreen page"
			// in last session
			
			if ( bFirstLaunch )
			{
				// first launch, open on Cover page
				window.external.SetShapeMask('main.png');
			}
			else
			{
				// subsequent launches, open on default page
				if ( typeof( nDefaultPageID ) == 'undefined' )
					nDefaultPageID = 1
				OnTabNavigate(nDefaultPageID);
			}
			break;    
		}
	 }
	 window.external.ShowDialog(true);
}

// For Open button on MRU
function OnNewDocument()
{
  window.external.UnregisterEventListener("SignalWelcomeScreenClose");
	window.external.DismissDialog();
	if(g_app == "PP") {
	  window.external.Application.FrameWork.Automation.InvokeItem("9bd65327-bf95-4798-9351-0168f78ceb92");	
	} else {
	  window.external.Application.FrameWork.Automation.InvokeItem("fa65d0c1-879b-4ef5-9465-af09e00e91ab");
	}
	CloseDialog();
}

function SubDialogHelperCallback() {
	window.external.DismissDialog();
	CloseDialog();
}

// Handles "Open other..." button on QuickStart page
window.external.RegisterEventListener("SignalWelcomeScreenClose","SubDialogHelperCallback");
function OnOpenDocument() {
	if(g_app == "PP") {
  	window.external.Application.FrameWork.Automation.InvokeItem("cc33a19a-b097-4890-80f8-89e06df880f5");
	} else {
	  window.external.Application.FrameWork.Automation.InvokeItem("f5a570a9-645e-4abb-a70b-6a45e2a18ef2");
  }
}

// Handles "New from template..." button on QuickStart page
function OnNewFromTemplate() {
    window.external.UnregisterEventListener("SignalWelcomeScreenClose");
    window.external.DismissDialog();
    window.external.Application.FrameWork.Automation.InvokeItem("f8179d03-81a7-47d7-8880-2f75cdef35fa");
    CloseDialog();
}

// Handles "New from clipboard..." button on QuickStart page
function OnNewFromClipboard() {
  window.external.UnregisterEventListener("SignalWelcomeScreenClose");
	window.external.DismissDialog();
	window.external.Application.FrameWork.Automation.InvokeItem("561f60e8-8c1d-4cfc-aff2-23d9428347a3");
	CloseDialog();
}

// Handles "Acquire an image..." button on QuickStart page
function OnAcquireImage() {
  window.external.UnregisterEventListener("SignalWelcomeScreenClose");
	window.external.DismissDialog();
	window.external.Application.FrameWork.Automation.InvokeItem("df0dcf7e-5926-4173-a9cc-4133afb28c2a");
	CloseDialog();
}

// actions required on cover page navigation event 
function OnCoverPageNavigate()
{
	ResetAll();
	CoverSpreadFlip('container_cover');
	window.external.SetShapeMask('main.png');
}

// actions required on tab navigate event
function OnTabNavigate(nTabID)
{
	// reset tabs
	ResetAll();
	
	// set new dialog shape
	window.external.SetShapeMask('mask_0' + nTabID + '.png');
	
	// set "Always show the WelcomeScreen..." checkbox state
	document.getElementById('startuplaunch_' + nTabID ).checked =  window.external.ShowAlways;

	// set "Make this my default WelcomeScreen page" checkbox state
	document.getElementById('defaultscreen_' + nTabID ).checked = (nDefaultPageID == nTabID);
 
	CoverSpreadFlip('container_spread');
	
	DisplayUpdatesAvaialble( nTabID );
		
	switch( nTabID )
	{
		case 2:
		{
			TabFlip('tab_readyleft_1','tab_offright_1','tab_focus_2','tab_offleft_2','tab_readyright_3','tab_offleft_3','tab_readyright_4','tab_offleft_4','tab_readyright_5','tab_offleft_5','container_page_2');
			break;
		}
		case 3:
		{
			TabFlip('tab_readyleft_1','tab_offright_1','tab_readyleft_2','tab_offright_2','tab_focus_3','tab_offleft_3','tab_readyright_4','tab_offleft_4','tab_readyright_5','tab_offleft_5','container_page_3');
			break;
		}
		case 4:
		{
			TabFlip('tab_readyleft_1','tab_offright_1','tab_readyleft_2','tab_offright_2','tab_readyleft_3','tab_offright_3','tab_focus_4','tab_offleft_4','tab_readyright_5','tab_offleft_5','container_page_4');
			loadGallery();
			break;
		}
		case 5:
		{
			TabFlip('tab_readyleft_1','tab_offright_1','tab_readyleft_2','tab_offright_2','tab_readyleft_3','tab_offright_3','tab_readyleft_4','tab_offright_4','tab_focus_5','tab_offleft_5','container_page_5');
			break;
		}
		case 0:
		case 1:
		default:
		{
			TabFlip('tab_focus_1','tab_offleft_1','tab_readyright_2','tab_offleft_2','tab_readyright_3','tab_offleft_3','tab_readyright_4','tab_offleft_4','tab_readyright_5','tab_offleft_5','container_page_1');
			break;
		}
	}
}

// display information about MRU item
function DisplayEmptyMruItem() 
{
	var filenameControl = document.getElementById( 'mru_filename' );
	if ( null != filenameControl )
		filenameControl.innerText = "";

	var filedateControl = document.getElementById( 'mru_filedate' );
	if ( null != filedateControl )
		filedateControl.innerText = "";

	var filepathControl = document.getElementById( 'mru_filepath' );
	if ( null != filepathControl )
		filepathControl.innerText = "";

	var filesizeControl = document.getElementById( 'mru_filesize' );
	if ( null != filesizeControl )
		filesizeControl.innerText = "";

	var previewControl = document.getElementById( 'mru_previewimage' );
	if ( null != previewControl )
		previewControl.src = "images/tempfilepreview.png";
}

// populate MRU list
function PopulateMruList()
{
	aMruItems = window.external.MRUList;
	
	// iterate over MRU items, max is 12
	for ( i=1; i<=(aMruItems.Count) && i <= 12; i++ )
	{
		var Item = aMruItems.Item(i);
		// add MRU item to list
		document.write("<li id='mru0" + i + "' onclick='OpenMruItem(" + i + ")' onmouseover='DisplayMruItemInfo(" + i + ");ClassSwitch(" + ' "filepreview_thumb_sanscontent","vc_middle sanscontent off","filepreview_details_sanscontent","vc_middle sanscontent off","mru0' + i + '","li_over"' + ")' onmouseout='DisplayEmptyMruItem(); ClassSwitch(" + '"filepreview_thumb_sanscontent","vc_middle sanscontent on","filepreview_details_sanscontent","vc_middle sanscontent on","mru0' + i + '",""' + ")'>" + Item.DocumentName + "</li>" );
	}

	// now add empty list elements to preserve formatting
	for ( i = ( aMruItems.Count + 1); i <= 12; i++ )
	{
		document.write("<li class='off'></li>" );
	}
	
	if ( aMruItems.Count > 0 ) {
		// by default display a blank
		DisplayEmptyMruItem();
		
		// or instead by default display the first item by using this instead:
		// DisplayMruItemInfo(1);
	} 
}

// open MRU document
function OpenMruItem( ItemId )
{
	if ( aMruItems != null )
	{
		var Item = aMruItems.Item( ItemId );
		if ( typeof( Item ) != 'undefined' )
		{
      window.external.UnregisterEventListener("SignalWelcomeScreenClose");
			window.external.DismissDialog();
			window.external.OpenDocument( Item.DocumentPath );
			CloseDialog();
		}
	}
}

// display information about MRU item
function DisplayMruItemInfo( ItemId )
{
	if ( aMruItems != null )
	{
		var Item = aMruItems.Item( ItemId );
		if ( typeof( Item ) != 'undefined' )
		{
			var filenameControl = document.getElementById( 'mru_filename' );
			if ( null != filenameControl )
				filenameControl.innerText = Item.DocumentName;
			
			var filedateControl = document.getElementById( 'mru_filedate' );
			if ( null != filedateControl )
				filedateControl.innerText = Item.DateAsString( '%A, %B %d, %Y' );
			
			var filepathControl = document.getElementById( 'mru_filepath' );
			if ( null != filepathControl )
				filepathControl.innerText = Item.DocumentFolder;
			
			var filesizeControl = document.getElementById( 'mru_filesize' );
			if ( null != filesizeControl )
			{
				var strSize = GetSizeString( Item.Size );
				filesizeControl.innerText = strSize;
			}

			if ( null != errorImageTimer )
			{
				// clear out error timer, it is possible that previous image
				// is set to be reload on timer
				clearTimeout( errorImageTimer );
				errorImageTimer = null;
			}
			
			nErrorImageTimerCounter = 0;
			LoadImage( 'mru_previewimage', Item.PreviewPath );      
		}
	}
}

// load image, on load error displays temp image and makes 5 attempts
// to load image with interval of 1 sec 
function LoadImage( imageID, strImagePath )
{
	var imageControl = document.getElementById( imageID );
	
	if ( null != imageControl )
	{
		imageControl.src = strImagePath;
	}
}

// image load error handler, called on error at image loading, sets displays
// temp image and tries to reload initial image again on timer, 10 attempts
// with interval of 1 sec
function ImageLoadErrorHandler( imageID, strTempImagePath )
{
	var imageControl = document.getElementById( imageID );
	var strImagePath = "";
	
	// increase counter
	nErrorImageTimerCounter++;
	
	if ( null != imageControl )
	{
		// save original image source
		strImagePath = imageControl.src;
			
		// display temp image meanwhile
		imageControl.src = strTempImagePath;
	}
	
	var strTimerHandler = "LoadImage( '" + imageID + "', '" + strImagePath + "' )";
	
	if ( nErrorImageTimerCounter < 10 )
	{
		// call timer handler function in 1 sec ( 1000 ms )
		errorImageTimer = setTimeout( strTimerHandler, 1000 );
	}
	else
	{
		// reset counter, it is taking too long to load image, abandon attempt
		nErrorImageTimerCounter = 0;
	}
}

// convert size numeric value into string
function GetSizeString( size )
{ 
	var strSize = "";
	var strUnits = "";

	if ( size > 0 && size < 1000 )
	{
		strUnits = GetStringByID('Bytes');
		strSize = size.toFixed() + " " + strUnits;
	}
	else if ( size >= 1000 && size < 1000000 )
	{
		size = size / 1000;
		strUnits = GetStringByID('Kilobytes');
		strSize = size.toFixed(2) + " " + strUnits;
	}
	else if ( size >= 1000000 && size < 1000000000 )
	{
		size = size / 1000000;
		strUnits = GetStringByID('Megabytes');
		strSize = size.toFixed(2) + " " + strUnits;
	}
	else if ( size >= 1000000000 )
	{
		size = size / 1000000000;
		strUnits = GetStringByID('Gigabytes');
		strSize = size.toFixed(2) + " " + strUnits;
	}
 
	return strSize;
}

// load video file
function LaunchVideoBrowser(videoName) { window.external.OpenVideoBrowser(videoName); }

// load video hints
function OpenVideoHints()
{
	if (g_app == "PP") {
		window.external.OpenVideoHints('1c56c2ec-07c1-46f0-baf7-441a555d595c');
	} else {
		window.external.OpenVideoHints('bc1e2f70-3b58-41cd-8406-aaa550482972');
	}
}

function GetLangId()
{
	var strLangId = "en";
	var strUrl = document.URL.toLowerCase();
	var strLangTag = "languages\\";
	var nLangIndex = strUrl.lastIndexOf( strLangTag );  
	if ( nLangIndex != -1 ) {
		nLangIndex += strLangTag.length;
		strLangId = strUrl.substr( nLangIndex, 2 );
	}
	return strLangId;
}