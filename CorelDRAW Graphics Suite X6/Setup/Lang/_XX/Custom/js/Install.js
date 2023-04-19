// JScript File
// Setup.js
//  -- stores common files scripts

var g_Setup         = window.external;


function LoadFeatures()
{
    var pInstall = document.body.ownerDocument.getElementById("idInstallDiv");
    var pFeatures = document.body.ownerDocument.getElementById("idFeaturesDiv");
    var pOptions = document.body.ownerDocument.getElementById("idOptionsDiv");
    var pTab1 = document.body.ownerDocument.getElementById("idTab1");
    var pTab2 = document.body.ownerDocument.getElementById("idTab2");
    var pTab3 = document.body.ownerDocument.getElementById("idTab3");
    if (null != pInstall)
        pInstall.style.display = "none";    
        
    if (null != pFeatures)
        pFeatures.style.display = "block";
        
    if (null != pOptions)
        pOptions.style.display = "none";

    if (null != pTab1)
        pTab1.className = "TabOff";

    if (null != pTab2)
        pTab2.className = "TabOn";

    if (null != pTab3)
        pTab3.className = "TabOff";

    LoadButtons("features");
    ConfigFeaturesUI();

    if ("1" == g_Setup.GetProperty("Disable.GPL"))
    {
        idChkGPL.checked = false;
        idChkGPL.disabled = true;
        idChkGPLLabel.innerHTML = g_Setup.GetProperty("Str.Feature.Filters.GhostscriptGPL.Installed.Text");
        idChkGPLLabel.style.color = "gray";
        idChkGPLDiv.style.color = "gray";
    }
    
    //Verify VSTA can be installed
    if ("1" == g_Setup.GetProperty("VisualStudio9RTM_Installed"))
    {
        idVSTA.checked = false;
        idVSTA.disabled = true;
        idVSTA.style.color = "gray";
        idVSTALabel.disabled = true;
        idVSTALabel.style.color = "gray";

    }
    
    MenuUpdateSelectors();
    SetInstallNowButtonState();
    g_RequiredText = g_Setup.GetProperty("Str.Text.RequiredFeature");
    window.setTimeout(UpdateWTFeatureSelectors, 5);
    
}

function LoadPrograms()
{
    var pInstall = document.body.ownerDocument.getElementById("idInstallDiv");
    var pFeatures = document.body.ownerDocument.getElementById("idFeaturesDiv");
    var pOptions = document.body.ownerDocument.getElementById("idOptionsDiv");
    var pTab1 = document.body.ownerDocument.getElementById("idTab1");
    var pTab2 = document.body.ownerDocument.getElementById("idTab2");
    var pTab3 = document.body.ownerDocument.getElementById("idTab3");
    if (null != pInstall)
        pInstall.style.display = "block";    
        
    if (null != pFeatures)
        pFeatures.style.display = "none";
        
    if (null != pOptions)
        pOptions.style.display = "none";

    if (null != pTab1)
        pTab1.className = "TabOn";

    if (null != pTab2)
        pTab2.className = "TabOff";

    if (null != pTab3)
        pTab3.className = "TabOff";
    
    LoadButtons("programs");
}

function LoadOptions()
{
    var pInstall = document.body.ownerDocument.getElementById("idInstallDiv");
    var pFeatures = document.body.ownerDocument.getElementById("idFeaturesDiv");
    var pOptions = document.body.ownerDocument.getElementById("idOptionsDiv");
    var pTab1 = document.body.ownerDocument.getElementById("idTab1");
    var pTab2 = document.body.ownerDocument.getElementById("idTab2");
    var pTab3 = document.body.ownerDocument.getElementById("idTab3");
    if (null != pInstall)
        pInstall.style.display = "none";    
        
    if (null != pFeatures)
        pFeatures.style.display = "none";
        
    if (null != pOptions)
        pOptions.style.display = "block";

    if (null != pTab1)
        pTab1.className = "TabOff";

    if (null != pTab2)
        pTab2.className = "TabOff";

    if (null != pTab3)
        pTab3.className = "TabOn";

    LoadButtons("options");

    if (!g_bInstalled)
    {
        DisplayOptionsNotInstalledUI();
    }
    else
    {
        DisplayOptionsInstalledUI();
    }
    
}

function LoadButtons(sPage)
{
    var pIdInstall = document.body.ownerDocument.getElementById("idInstall");
    var pIdNextPrograms = document.body.ownerDocument.getElementById("idNextPrograms");
    var pIdNextFeatures = document.body.ownerDocument.getElementById("idNextFeatures");
    var pIdReset = document.body.ownerDocument.getElementById("idReset");
    var pIdBackFeatures = document.body.ownerDocument.getElementById("idBackFeatures");
    var pIdBackOptions = document.body.ownerDocument.getElementById("idBackOptions");
    var pIdBack = document.body.ownerDocument.getElementById("idBack");
    if (sPage == "programs")
    {
        if (null != pIdNextPrograms)
            pIdNextPrograms.style.display = "block";
        if (null != pIdNextFeatures)
            pIdNextFeatures.style.display = "none";
        if (null != pIdBackFeatures)
            pIdBackFeatures.style.display = "none";
        if (null != pIdBackOptions)
            pIdBackOptions.style.display = "none";
        if (null != pIdInstall)
            pIdInstall.style.display = "none";
        if (g_bInstalled)
        {
	        if (null != pIdBack)
	            pIdBack.style.display = "block";

        }
            
    }
    else if (sPage == "features")
    {
        if (null != pIdNextFeatures)
            pIdNextFeatures.style.display = "block";
        if (null != pIdBackFeatures)
            pIdBackFeatures.style.display = "block";
        if (null != pIdNextPrograms)
            pIdNextPrograms.style.display = "none";
        if (null != pIdBackOptions)
            pIdBackOptions.style.display = "none";
        if (null != pIdInstall)
            pIdInstall.style.display = "none";
        if (null != pIdBack)
        	pIdBack.style.display = "none";
    }
    else if (sPage == "options")
    {        
        if (null != pIdInstall)
            pIdInstall.style.display = "block";
        if (null != pIdBackOptions)
            pIdBackOptions.style.display = "block";
        if (null != pIdNextFeatures)
            pIdNextFeatures.style.display = "none";
        if (null != pIdBackFeatures)
            pIdBackFeatures.style.display = "none";
        if (null != pIdNextPrograms)
            pIdNextPrograms.style.display = "none";
        if (null != pIdBack)
        	pIdBack.style.display = "none";
            
    }
}

function ConfigFeaturesUI()
{
    var ui_action = g_Setup.GetProperty("HIDE_SHELLEXT_UI");
    var shellLabelNoVBA = document.body.ownerDocument.getElementById("idShellExtLabelNoVBA");
    var shellNoVBA = document.body.ownerDocument.getElementById("idShellExtNoVBA");
    var shellLabel = document.body.ownerDocument.getElementById("idShellExtLabel");
    var shell = document.body.ownerDocument.getElementById("idShellExt");

    var VBAMenu = document.body.ownerDocument.getElementById("idUtilitiesMenu");
    var noVBABlock = document.body.ownerDocument.getElementById("idUtilitiesNoVBABlock");
    var VBABlock = document.body.ownerDocument.getElementById("idUtilitiesVBABlock");
    var noVBAMenu = document.body.ownerDocument.getElementById("idUtilitiesMenuNoVBA");

    if ("0" == g_Setup.GetProperty("INCLUDE_VBA")) //remove VBA from the list
    {          
        g_Setup.SetProperty("VBAFILES", "0");
        g_Setup.SetProperty("VSTA", "0");
        noVBABlock.style.display = "block";
        noVBAMenu.style.height = "45px";
        if ("disable" == ui_action)
        {
            g_Setup.SetProperty("SHELLEXT", "1");
            shellLabelNoVBA.style.color = "gray";
            shellNoVBA.checked = true;
            shellNoVBA.disabled = true;
            noVBAMenu.style.width = "300px";           
            
        }
        else if ("hide" == ui_action)
        {
            g_Setup.SetProperty("SHELLEXT", "0");
            shellLabelNoVBA.style.display = "none";
            shellNoVBA.style.display = "none";
        }
    }
	else
	{
        VBABlock.style.display = "block";
        VBAMenu.style.height = "85px";
        if ("disable" == ui_action)
        {
            g_Setup.SetProperty("SHELLEXT", "1");
            shellLabel.style.color = "gray";
            shell.checked = true;
            shell.disabled = true;
            VBAMenu.style.width = "300px";           
        }
        else if ("hide" == ui_action)
        {
            g_Setup.SetProperty("SHELLEXT", "0");
            shellLabel.style.display = "none";
            shell.style.display = "none";
        }            
	}
 
} //function ConfigFeaturesUI()    

function OnMenuToggleFeatureWT(sId)
{
    OnMenuToggleFeature(sId);
    window.setTimeout(UpdateWTFeatureSelectors, 5);
    
} //function OnMenuToggleFeatureWT()

function UpdateWTFeatureSelectors()
{
    //disable the 'required' ones, if they are checked
    var pEl = document.getElementById("idWTMenu");
    if (null == pEl)
    {
        return;
    }
   
    var str;
    var pElCheckbox = null;
    var Item = 0;
    var pCollection = pEl.getElementsByTagName("LABEL");
    if (pCollection != null)
    {
        for (Item in pCollection)
        {
            if ( (null != pCollection[Item].innerHTML) &&
                 (undefined != pCollection[Item].innerHTML) )
            {
                str = pCollection[Item].innerHTML;
                
                pElCheckbox = document.getElementById(pCollection[Item].htmlFor);
                if (null != pElCheckbox)
                {
                    //default enabled
                    pCollection[Item].disabled = false;
                    pElCheckbox.disabled = false;
                    
                    if (-1 != str.search(g_RequiredText))
                    {
                        //found a required one, if it is selected, disable it
                        if (true == pElCheckbox.checked)
                        {
                            pCollection[Item].disabled = true;
                            pElCheckbox.disabled = true;
                        }
                    }
                    
                } //if (null != pElCheckbox)
            } //got the elements innerHTML
        } //for (Item in pCollection)
    } //if (pCollection != null)
    
} //function UpdateWTFeatureSelectors()

function DisplayOptionsInstalledUI()
{
    idCopyCabsBlock.style.display = "none";
    idInstall.style.visibility = "visible";
    idInstall.style.display = "block";
    SetInstallNowButtonState(); 
    
    if (true == SetMenuHeight_Languages())
    {
        //more than 1 language is included, show the list
        idAdditionalOptions.style.top = idSelectLangBlock.style.top;
        idSelectLangBlock.style.top = "10px";
        idSelectLangBlock.style.visibility = "visible";
        idAdditionalOptions.style.top = "80px";
    }
    else
    {
        idAdditionalOptions.style.top = "20px";
    }
    
} //DisplayInstalledUI()

function DisplayOptionsNotInstalledUI()
{
    idInstallFolderDiv.style.display = "block";
    
   //Program Languages...
    if (true == SetMenuHeight_Languages())
    {
        //more than 1 language is included, show the list
        idSelectLangBlock.style.visibility = "visible";
    }
   
    if ("visible" != idSelectLangBlock.style.visibility)
    {
        idAdditionalOptions.style.top = idSelectLangBlock.style.top;
    }
    
    if (!g_bIsAdminPackage)
    {
        idProductUpdatesBlock.style.display = "block";  //allow product updates option
    }
    else
    {
        idProductUpdatesBlock.style.display = "none";   //disallow product updates option
    }

    SetInstallNowButtonState();
   
    try
    {
        var str = window.external.GetProperty("DESKTOPSHORTCUTS");
        if ("disable" == str.toLocaleLowerCase())
        {
            idShortcutBlock.style.display = "none";
        }
        
        str = window.external.GetProperty("CACHE_SETUP_SOURCE_SHOWUI");
        if ("hide" == str.toLocaleLowerCase())
        {
            idCopyCabsBlock.style.display = "none";
        }
        
    }
    catch(err) {}
    
} //function DisplayNotInstalledUI()


/**
*   \remarks    -   Sets the height of the 'language selector' menu
*               -   Returns true if more than one language is avaliable
*/
function SetMenuHeight_Languages()
{
    var items_displayed_max = 12;   //max items that can be displayed in menu
    var iChkHeight = 20;            //20 is the height required for 1
    var iSize = 2;                  //2 is padding above item(s) in list
            
    var pEl = null;
    var sId, sProp;
    var x = 0;
    var items_displayed = 0;
            
    for (var x = 1 ; x < 20 ; x++)  //max 20 languages (id1 to id20)
    {
        sId = "id" + x;

        pEl = document.getElementById(sId);
        if (null != pEl)
        {
            //title has the property to check that will
            //determine if this sku contains the language
            sProp = "Include." + pEl.title;
            
            if ("1" == g_Setup.GetProperty(sProp))
            {
                pEl.style.display = "block";
                if (items_displayed < items_displayed_max)
                {
                    iSize = iSize + iChkHeight;
                    items_displayed++;
                }
            }
            else
            {
                pEl.style.display = "none"; //not included
            }
        }
        
    }

    iSize = iSize + 2;                  //2 is padding below item(s) in list
    var sHeight = iSize + "px";
    
    pEl = document.getElementById("idLangMenu");
    if (null != pEl)
    {
        pEl.style.height = sHeight;
    }
    
    if (items_displayed > 1)
        return true;
        
    return false;
    
} //function SetMenuHeight_Languages()


/**
*   \remarks
*/


function OnResetDefaultsBtn()
{
    idResetBtn.disabled = true;
    
    OnResetDefaults()
           
    idResetBtn.disabled = false;
    
} //function OnResetDefaultsBtn()



function OnPathChange()
{
    g_Setup.CalculateDiskSpace(true);
    g_Setup.ResolveICAHtmlAttributes();

} //function OnPathChange()
