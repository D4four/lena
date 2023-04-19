// JScript File
// Setup.js
//  -- stores common files scripts

var g_Setup         = window.external;

var g_bInstalled    = true;
var g_bIsAdmin      = false;
var g_bIsTrial      = false;
var g_bIsAdminPackage = false;
var g_bCoExists     = false;
var g_bShowLaunchers = false;
var g_sLang         = "EN";
var g_bShowContent = "true";

try
{
    if ("" == g_Setup.GetProperty("Installed"))
        g_bInstalled = false;
      
    if ("ADMIN" == g_Setup.GetProperty("ACTION"))
        g_bIsAdmin = true;
        
    if ("1" == g_Setup.GetProperty("IsAdminPackage"))
        g_bIsAdminPackage = true;

    if ("1" == g_Setup.GetProperty("CGS_R_INSTALLED"))
        g_bCoExists = true;

    if ("{CE9E23F5-E6B1-49D3-9898-0AFB2C7C7DB8}" == g_Setup.GetProperty("Script.RT.GUID"))
        g_bIsTrial = true;

    if ("1" == g_Setup.GetProperty("NO_CONTENT_UI"))
        g_bShowContent = false;
        
    if ("1" == g_Setup.GetProperty("SHOW_LAUNCHERS"))
        g_bShowLaunchers = true


    g_sLang = g_Setup.GetProperty("SETUP_LANG");        
}
catch(err) {}

    

/**
*   \remarks    Determines if tabs should be displayed
*/
function DisplayTabs()
{
    var pTab1 = document.body.ownerDocument.getElementById("idTab1");
    var pTab2 = document.body.ownerDocument.getElementById("idTab2");
    var pTab3 = document.body.ownerDocument.getElementById("idTab3");
    
    if (null != pTab1)
        pTab1.style.display = "block";  //always tab1
    
    if (null != pTab2)
        pTab2.style.display = "block";  //always tab2
        
    if (null != pTab3)
    {
        pTab3.style.display = "block";
    }

        
} //function DisplayTabs()


/**
*   \remarks    Opens TARGETDIR and ends the setup
*/
function OnAdminOpenFolder()
{
    g_Setup.ExecuteFN("JS_OpenTargetDir");
    g_Setup.EndModalLoop(0);
    
} //OnAdminOpenFolder()

/**
*   \remarks    Tells Setup to launch an application
*/
function LaunchIt(str)
{
    if ("dr" == str)
    {
        g_Setup.SetProperty("apptolaunch", "CorelDrw.exe");
    }
    else if ("pp" == str)
    {
        g_Setup.SetProperty("apptolaunch", "CorelPP.exe");
    }
    else if ("co" == str)
    {
        g_Setup.SetProperty("apptolaunch", "Connect.exe");
    }
    g_Setup.ExecuteFN("JS_LaunchApplication");
    g_Setup.EndModalLoop(0);
    
} //LaunchIt()
function WriteIt(sLine)
{
    var pEl = document.body.ownerDocument.getElementById("idDebugMsg");
    if (null != pEl)
    {
        pEl.innerText = pEl.innerText + sLine + " - ";
    }
}


function MenuShow(sId)
{
    var pEl = document.body.ownerDocument.getElementById(sId);
    if (null != pEl)
    {
        pEl.style.visibility = "visible";
        pEl.style.display = "block";
    }
}

function MenuHide(sId)
{
    var pEl = document.body.ownerDocument.getElementById(sId);
    if (null != pEl)
    {
        pEl.style.visibility = "hidden";
        pEl.style.display = "none";
    }
}


/**
*   \remarks    -   Sets the height of the 'language selector' menu
*               -   Returns true if more than one language is avaliable
*/
function SetMenuHeight_Languages(strMenuId)
{
    var items_displayed_max = 12;   //max items that can be displayed in menu
    var iChkHeight = 20;            //20 is the height required for 1
    var iSize = 2;                  //2 is padding above item(s) in list
            
    var pEl = null;
    var sId;
    var x = 0;
    var items_displayed = 0;
            
    for (var x = 0 ; x < 20 ; x++)
    {
        sId = "id" + x;
        //pEl = window.document.getElementById(sId);
        pEl = document.body.ownerDocument.getElementById(sId);
        if (null != pEl)
        {
            if ("none" != pEl.style.display)
            {
                if (items_displayed < items_displayed_max)
                {
                    iSize = iSize + iChkHeight;
                    items_displayed++;
                }
            }
        }
        
    }

    iSize = iSize + 2;                  //2 is padding below item(s) in list
    var sHeight = iSize + "px";
    
    //pEl = window.document.getElementById(strMenuId);
    pEl = document.body.ownerDocument.getElementById(strMenuId);
    if (null != pEl)
    {
        pEl.style.height = sHeight;
    }
    
    if (items_displayed > 1)
        return true;
        
    return false;
    
} //function SetMenuHeight_Languages()

/*  function HighLightButton() ************************************
*
*   -   Hightlight buttons
*   -   Called onMouseover of a button
*******************************************************************/

function HighLightButton(sId)
{
        var pEl = document.body.ownerDocument.getElementById(sId);
        if (null == pEl)
        {
            return;
        }
    	pEl.style.color = "#ffffff";
        pEl.style.filter = "progid:DXImageTransform.Microsoft.gradient(startColorstr='#2e2e2e', endColorstr='#4F4F4F')";
}
/*  function UnHighLightButton() ************************************
*
*   -   UnHightlight buttons
*   -   Called onMouseout of a button
*******************************************************************/
function UnHighLightButton(sId)
{
        var pEl = document.body.ownerDocument.getElementById(sId);
        if (null == pEl)
        {
            return;
        }
        pEl.style.filter = "progid:DXImageTransform.Microsoft.gradient(startColorstr='#333333', endColorstr='#505050')";
        pEl.style.color = "#c0c0c0";
}

function HighLightDesc(sID) {
    var pEl = document.body.ownerDocument.getElementById(sID);
    if (null == pEl) {
        return;
    }
    pEl.style.color = "white";

} //function HighLightDesc(pEl)

function UnHighLightDesc(sID) {
    var pEl = document.body.ownerDocument.getElementById(sID);
    if (null == pEl) {
        return;
    }

    pEl.style.color = "#c0c0c0";
} //function UnHighLightDesc(pEl)

