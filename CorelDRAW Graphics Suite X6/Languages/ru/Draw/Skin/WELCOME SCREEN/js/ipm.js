// JavaScript Document
// Called by the app; must return the "current" message ID 
// to enable message tracking
var oCurrentMessageID = null;
function GetCurrentMsgID() 
{
  return oCurrentMessageID;
}

function setMsgRotation() 
{
}

// display updates available message in tab footers
function DisplayUpdatesAvaialble( nTabId )
{ 
  // Determine if it is a network install and messages were opted out during the setup
  var bNetworkInstallAndMsgOptOut = false;
  var ipm = window.external.IpmDom;
  if ( null != ipm ) 
  {
	bNetworkInstallAndMsgOptOut = (ipm.IsNetworkInstall && ipm.IsMsgOptOutAtSetup);
  }

  var updateControl = document.getElementById( "ipm_updatesavailable_" + nTabId );

  if ( null != updateControl )
  {
    if ( UpdatesAvailable() && !bNetworkInstallAndMsgOptOut )
    {
      updateControl.innerText = GetStringByID( 'Updates' );
      updateControl.className = "bullet_star";
      
  		updateControl.onclick = function(){ OnTabNavigate(5); DisplayUpdateMessage() };
  		updateControl.onmouseover = function(){ ClassSwitch( 'ipm_updatesavailable_' + nTabId, 'li_over bullet_star'); };
  		updateControl.onmouseout = function(){ ClassSwitch('ipm_updatesavailable_'  + nTabId, 'bullet_star'); };
    }
    else
    {
      updateControl.innerText = "";
      updateControl.className = "";
     
  		updateControl.onclick = null;
  		updateControl.onmouseover = null;
  		updateControl.onmouseout = null;
    }
  }

  // Hide the settings button if it is a network install and messages are not to be shown
  if (nTabId == 5)
  {
	if (bNetworkInstallAndMsgOptOut)
	{
		var settingsControl = document.getElementById("settingsButton");
		if (null != settingsControl)
		{
			settingsControl.innerText = "";
			settingsControl.className = "";

			settingsControl.onclick = null;
			settingsControl.onmouseover = null;
			settingsControl.onmouseout = null;
		}
	}
  }
}


// prepare message container for Tips messages
function PrepareTipsContainer( nNumTips )
{
  // dynamically construct tips message list
  var oMessageList = document.getElementById( 'ipm_tips_list' );

  if ( null != oMessageList )
  {
    if ( oMessageList.hasChildNodes )
    {
      var oChildNodes = oMessageList.childNodes;
      
      var nNodesToAdd = nNumTips - oChildNodes.length;
      
      if ( nNodesToAdd >= 0 )
      {
        // add extra nodes
        for ( var i = oChildNodes.length; i < nNumTips; i++ )
        {
           var oNewNode = document.createElement("li");
           
           oMessageList.appendChild(oNewNode);
          
           // create HTML formatting inside the <li> element 
           oNewNode.className = "inactive";
           oNewNode.innerHTML = "<span id='ipm_tips_title_0" + ( i + 1 ) + "' class='bullettitlestatic' onclick=''><//span>";
           oNewNode.innerHTML += "<div><iframe id='ipm_tips_body_0" + ( i + 1 ) + "' class='tipframe' allowtransparency='1' scrolling='no' src=''><//iframe><//div>";
        }
      }
      else
      {
        // there are already too many nodes ( list elements )
        // remove extra ones
        for ( var i = nNodesToAdd; i < 0; i++ )
        {
          var oLastChild = oMessageList.lastChild;
          
          if ( null != oLastChild )
          {
            oMessageList.removeChild( oLastChild );
          }
        } 
      }
    }
  }
}

// display single Tips message
// index is a message number in the sequence
// message is a XML node object for IPM message
function DisplayTipMessage( index, message )
{
  var strTipTitle = message.getAttribute("title");
  var strMessageId = message.getAttribute("id");
  oCurrentMessageID = strMessageId;

  var ipm = window.external.IpmDom;
  var strMessageFolder = ipm.GetMessageFolder( strMessageId );
	var strMessageHtmlBodyPath = strMessageFolder + '\\detail.htm';
			  
  // display message title
  var messageTitle = document.getElementById( 'ipm_tips_title_0' + ( index + 1 ) );
  if ( null != messageTitle )
  {
    messageTitle.innerText = strTipTitle;
  }
  
  // display message body
  var messageBody = document.getElementById( 'ipm_tips_body_0' + ( index + 1 ) );
  if ( null != messageBody )
  {
    // display message HTML snippet located at strMessageHtmlBodyPath
    messageBody.src = strMessageHtmlBodyPath;
    
    var strHeight = "80px";
    
    messageBody.style.height = strHeight;
  }
}

// display tips and tricks message history ( i.e. all tips messages available )
function DisplayTipsHistory()
{
  var tipsMessages = GetMessagesByType( 'Tip' );
  
  if ( null != tipsMessages && tipsMessages.length > 0 )
  {
    // prepare HTML container to display Tips messages
    PrepareTipsContainer( tipsMessages.length );
  
    for ( var i = 0; i < tipsMessages.length; i++ ) 
    {
      DisplayTipMessage( i, tipsMessages[i] );
    }
  }
}

// display tips and triks messages with rotation ( when there are more messages then
// space available we will rotate messages every launch )
function DisplayTipsWithRotation()
{
  var nMaxTips = 4; // max number of tips on the page, 4 by default
  
  // Display 3 tips per page
  nMaxTips = 3;
 
  var tipsMessages = GetMessagesByType( 'Tip' );
  var aPrevMessages = new Array();
  var strPrevMessages = window.external.GetPesistentProperty( 'TipsMessagesIds' );
  
  if ( typeof( strPrevMessages ) != 'undefined' && ( null != strPrevMessages ) )
  {
    aPrevMessages = strPrevMessages.split(";");
  }
  
  // to store IDs of tips that will be displayed
  var aCurrentMessages = new Array();
  
  var nCurrentMessageId = 0;
  var i = 0;
  
  // do we need to rotate
  var bRotate = ( nMaxTips < tipsMessages.length );
  
  // limit max tips to the number of available tips messages
  if ( nMaxTips > tipsMessages.length )
  {
    nMaxTips = tipsMessages.length;
  }
  
  // prepare HTML container to display Tips messages
  PrepareTipsContainer( nMaxTips );
  
  while ( ( nCurrentMessageId < nMaxTips ) && ( i < tipsMessages.length ) )
  {
    var strMessageId = tipsMessages[i].getAttribute( 'id' );

    // check if message has been displayed last session, if yes, skip
    var bSkipMessage = false;
    
    if ( bRotate )
    {
      for ( var j = 0; j < aPrevMessages.length; j++ )
      {
        if ( aPrevMessages[j] == strMessageId )
        {
          // remove j-th message, already checked, do not need anymore
          aPrevMessages.splice( j, 1 );
          
          bSkipMessage = true;
          
          break;
        }
      }
    }
    
    if ( !bSkipMessage )
    {  
      DisplayTipMessage( nCurrentMessageId, tipsMessages[i] );
      aCurrentMessages[nCurrentMessageId] = strMessageId;
      nCurrentMessageId++;
    }
  
    i++;
      
    // not enough messages to display ( i.e. still nSlotsUsed <= nMaxTips )
    // reset index, we have to revisit message from the start
    // to get required number of messages to display 
    if ( i >= tipsMessages.length )
    {
      i = 0;
      
      strPrevMessages = "";
      aPrevMessages.splice( 0, aPrevMessages.length );
    }
  }
  
  if ( ( null != aCurrentMessages ) && ( aCurrentMessages.length > 0 ) )
  {
    // create new array of displayed messages, remove duplicaitons
    if ( typeof( strPrevMessages ) != 'undefined' && ( null != strPrevMessages ) )
    {
      aPrevMessages = strPrevMessages.split(";");
    }
    
    for ( i = 0; i > aCurrentMessages.length; i++ )
    {
      for ( j = 0; j > aPrevMessages.length; j++ )
      {
        if ( aPrevMessages[j] == aCurrentMessages[i] )
        {
          // remove j-th message - duplication
          aPrevMessages.splice( j, 1 );
          
          break;
        }
      }
    }
    
    window.external.SetPesistentProperty( 'TipsMessagesIds', aCurrentMessages.join(";") + ";" +  aPrevMessages.join(";") );
  }
}

// populates Updates page
// displays Updates available message, if exists
// and/or list of available tutorials
function PopulateUpdatesPage( appId )
{
  // set app id as messages can be different for every application
  SetAppId( appId );
  
  document.writeln( '<ul class="actions vc">' );

	if ( UpdatesAvailable() ) {
    var strUpdatesLink = GetStringByID( 'UpdatesAvailable' );
    document.writeln( "<li id='ipm_updateavailable' class='pointer'><span onclick='DisplayUpdateMessage()'>" + strUpdatesLink + "</span></li>" );
  }
	
  if ( TutorialsAvailable() )  {
    var strTutorialsLink = GetStringByID( 'TutorialsAvailable' );
    document.writeln( "<li id='ipm_tutorialsavailable'>" + strTutorialsLink + "<ul>" );
  
    var tutorialMessages = GetMessagesByType( 'Tutorial' );

    if ( null != tutorialMessages ) {
      for ( var i = 0; i < tutorialMessages.length; i++ )	{
        var message = tutorialMessages[ i ];
      
					if ( null != message ) {
          var strTitle = message.getAttribute('title');
			    document.writeln( "<li><span class='pointer' onclick='DisplayTutorialMessage(" + i + ")'>" +  strTitle + "</span></li>" );
				  }
				}
		  }
	document.writeln( "</ul>" );
	document.writeln( "</li>" );
	}

  if ( CorelOfferAvailable() )  {
    var strTutorialsLink = GetStringByID( 'CorelOffersAvailable' );
    document.writeln( "<li id='ipm_coreloffersavailable'>" + strTutorialsLink + "<ul>" );
  
    var corelofferMessages = GetMessagesByType( 'Corel Offer' );

    if ( null != corelofferMessages ) {
      for ( var i = 0; i < corelofferMessages.length; i++ )	{
        var message = corelofferMessages[ i ];
      
					if ( null != message ) {
          var strTitle = message.getAttribute('title');
			    document.writeln( "<li><span class='pointer' onclick='DisplayCorelOfferMessage(" + i + ")'>" +  strTitle + "</span></li>" );
				  }
				}
		  }
	document.writeln( "</ul>" );
	document.writeln( "</li>" );
	}

  if ( NewsAvailable() )  {
    var strTutorialsLink = GetStringByID( 'NewsAvailable' );
    document.writeln( "<li id='ipm_newsavailable'>" + strTutorialsLink + "<ul>" );
  
    var newsMessages = GetMessagesByType( 'News' );

    if ( null != newsMessages ) {
      for ( var i = 0; i < newsMessages.length; i++ )	{
        var message = newsMessages[ i ];
      
					if ( null != message ) {
          var strTitle = message.getAttribute('title');
			    document.writeln( "<li><span class='pointer' onclick='DisplayNewsMessage(" + i + ")'>" +  strTitle + "</span></li>" );
				  }
				}
		  }
	document.writeln( "</ul>" );
	document.writeln( "</li>" );
	}
	
	document.writeln( "</ul>" );
}
 
// returns true if updates avaialable
function UpdatesAvailable()
{
  var bRet = false;
  
  var updateMessages = GetMessagesByType( 'Update' );
  
  if ( null != updateMessages )
  {
    bRet = ( updateMessages.length > 0 );
  }
  
  return( bRet );
}

// display update messages
function DisplayUpdateMessage() {
    var bRet = false;
  var updateMessages = GetMessagesByType( 'Update' );

  if ( null != updateMessages )
  {
    // we display update messages one by one, so take whatever is on top
    var message = updateMessages[0];
    
      var strTitle = message.getAttribute("title");
      var strMessageId = message.getAttribute("id");
      oCurrentMessageID = strMessageId;
      window.external.NotifyMessageTracking(strMessageId, "View");

			var ipm = window.external.IpmDom;
			var strMessageFolder = ipm.GetMessageFolder( strMessageId );
			var strMessageHtmlBodyPath = strMessageFolder + '\\detail.htm';
						
			// display message title
			var messageTitle = document.getElementById( 'ipm_updates_title' );
			if ( null != messageTitle )
			{
				messageTitle.innerText = strTitle;
			}
			
			var messageBody = document.getElementById( 'updatesbodyframe' );
			if ( null != messageBody )
			{
				// display message HTML snippet located at strMessageHtmlBodyPath
				messageBody.src = strMessageHtmlBodyPath;
			}
  }
}

// returns true if tutorial messages are avaialable
function TutorialsAvailable() {
  var bRet = false;
  var tutorialMessages = GetMessagesByType( 'Tutorial' );

  if ( null != tutorialMessages ) {
    bRet = ( tutorialMessages.length > 0 );
  }
  
  return( bRet );
}

// returns true if news messages are avaialable
function NewsAvailable() {
  var bRet = false;
  var newsMessages = GetMessagesByType( 'News' );

  if ( null != newsMessages ) {
    bRet = ( newsMessages.length > 0 );
  }
  
  return( bRet );
}

// returns true if corel offer messages are avaialable
function CorelOfferAvailable() {
  var bRet = false;
  var corelofferMessages = GetMessagesByType( 'Corel Offer' );

  if ( null != corelofferMessages ) {
    bRet = ( corelofferMessages.length > 0 );
  }
  
  return( bRet );
}


// display nIndex-th tutorial message
function DisplayTutorialMessage( nIndex ) {
  var bRet = false;
  var tutorialMessages = GetMessagesByType( 'Tutorial' );

  if ( null != tutorialMessages ) {
    // we display tutorial messages one by one, so take whatever is on top
    var message = tutorialMessages[ nIndex ];
    
    if ( null != message ) {
      var strTitle = message.getAttribute("title");
      var strMessageId = message.getAttribute("id");
      oCurrentMessageID = strMessageId;
      window.external.NotifyMessageTracking(strMessageId, "View");

      var ipm = window.external.IpmDom;
      var strMessageFolder = ipm.GetMessageFolder( strMessageId );
			var strMessageHtmlBodyPath = strMessageFolder + '\\detail.htm';
						
			// display message title
			var messageTitle = document.getElementById( 'ipm_updates_title' );
			if ( null != messageTitle )
			{
				messageTitle.innerText = strTitle;
			}
			
			// display message body
			var messageBody = document.getElementById( 'updatesbodyframe' );
			if ( null != messageBody )
			{
				// display message HTML snippet located at strMessageHtmlBodyPath
				messageBody.src = strMessageHtmlBodyPath;
			}
    }
  }
} 

// display nIndex-th corel offer message
function DisplayCorelOfferMessage( nIndex )
{
  var bRet = false;
  var corelofferMessages = GetMessagesByType( 'Corel Offer' );

  if ( null != corelofferMessages ) {
    // we display corel offer messages one by one, so take whatever is on top
    var message = corelofferMessages[ nIndex ];
    
    if ( null != message ) {
      var strTitle = message.getAttribute("title");
      var strMessageId = message.getAttribute("id");
      oCurrentMessageID = strMessageId;
      window.external.NotifyMessageTracking(strMessageId, "View");

      var ipm = window.external.IpmDom;
      var strMessageFolder = ipm.GetMessageFolder( strMessageId );
	  var strMessageHtmlBodyPath = strMessageFolder + '\\body.htm';	
						
			// display message title
			var messageTitle = document.getElementById( 'ipm_updates_title' );
			if ( null != messageTitle )
			{
				messageTitle.innerText = strTitle;
			}
			
			// display message body
			var messageBody = document.getElementById( 'updatesbodyframe' );
			if ( null != messageBody )
			{
				// display message HTML snippet located at strMessageHtmlBodyPath
				messageBody.src = strMessageHtmlBodyPath;
			}
		}
  }
} 

// display nIndex-th news message
function DisplayNewsMessage( nIndex )
{
  var bRet = false;
  var newsMessages = GetMessagesByType( 'News' );

  if ( null != newsMessages )
  {
    // we display corel offer messages one by one, so take whatever is on top
    var message = newsMessages[ nIndex ];
    
    if ( null != message )
    {
      var strTitle = message.getAttribute("title");
      var strMessageId = message.getAttribute("id");
      oCurrentMessageID = strMessageId;
      window.external.NotifyMessageTracking(strMessageId, "View");

      var ipm = window.external.IpmDom;
      var strMessageFolder = ipm.GetMessageFolder( strMessageId );
      var strMessageHtmlBodyPath = strMessageFolder + '\\detail.htm';
			
			// display message title
			var messageTitle = document.getElementById( 'ipm_updates_title' );
			if ( null != messageTitle )
			{
				messageTitle.innerText = strTitle;
			}
			
			// display message body
			var messageBody = document.getElementById( 'updatesbodyframe' );
			if ( null != messageBody )
			{
				// display message HTML snippet located at strMessageHtmlBodyPath
				messageBody.src = strMessageHtmlBodyPath;
			}
    }
  }
} 

// determines whether to filter message
function FilterMessage( node )
{
  var bFilter = false;

  var strAppId = GetAppId();
  
  var childNodes = node.childNodes;
 
  if ( null != childNodes )
  {
    for ( var i=0; i< childNodes.length; i++ )
    {
      var subNode = childNodes[i];
      
      if ( subNode.tagName == "contexts" )
      {
        var contextNodes = subNode.childNodes;
        
        var bHasAContext = false;
        var bHasSameContextId = false;

        for (var j = 0; j < contextNodes.length; j++) 
        {
          var contextNode = contextNodes[j];

          var contextId = contextNode.getAttribute("id");

          contextId = contextId.toLowerCase();

          // Check if this message is restricted to a particular context          
          if ((contextId == "draw") || (contextId == "photo-paint") || (contextId == "designer")) 
          {
            bHasAContext = true;

            // Check if it is the same context as the current app
            if (strAppId == contextId)
            {
              bHasSameContextId = true;
            }
          }
        }

        // If this message is restricted to a particular context, and it didn't match the app's context then filter it.
        if (bHasAContext && !bHasSameContextId) 
        {
          bFilter = true;
        }
      }
    }
  }
  
  return bFilter;
}

// get array of messages of requested type
function GetMessagesByType( sType )
{
  var ipm = window.external.IpmDom;
  var messagesResult = new Array;
  
  if ( null != ipm ) 
  {
    var messages = ipm.GetMessagesOfType(sType, true);
    
    if ( null != messages )
    {
      for ( var i=0; i<messages.length; i++)
      {
        var oMessageNode = messages.item(i);
        
        if ( null != oMessageNode )
        {
          var bFilter = FilterMessage( oMessageNode );

          if ( !bFilter )
          {
            messagesResult.push( oMessageNode );
          }
        }
      }
    }
  }
  
  return messagesResult;
}


