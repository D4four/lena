/*SDOC************************************************************************
*
* Author:      Gennady Petrov
*
* Description: WelcomeScreen javascript interface to work with content
*              resources
*
************************************************************************EDOC*/

var oWelcomeScreenResourceDom = null;

// init resource XML DOM
function InitResourceDom()
{
  var bRet = false;
  
  try
  {
    if ( oWelcomeScreenResourceDom == null )
    {
         oWelcomeScreenResourceDom = new ActiveXObject("Msxml2.DOMDocument.3.0");
    }
      
    if ( oWelcomeScreenResourceDom != null )
    {
       oWelcomeScreenResourceDom.async = false;
       bRet = oWelcomeScreenResourceDom.load("Resources.xml");
       oWelcomeScreenResourceDom.setProperty("SelectionLanguage", "XPath");
    }
 }
 catch(e)
 {
    oWelcomeScreenResourceDom = null;
 }
 
 return bRet;
}

InitResourceDom();
  
// get resource string by ID
function GetStringByID( id )
{
  var sString = "";
	
	var oStringNode = oWelcomeScreenResourceDom.selectSingleNode("/WelcomeScreen/StringList/String[@ID='"+id+"']");
	
	if( null != oStringNode )
	{
    sString = oStringNode.text;
  }
  
  return sString;
}