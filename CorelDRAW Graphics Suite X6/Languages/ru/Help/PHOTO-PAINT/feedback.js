function popUp(URL) {
day = new Date();
id = day.getTime();
eval("page" + id + " = window.open(URL, '" + id + "', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,width=415,height=515');");
}

function pageload1()
{
            // help topic is the same as HTML help file name, parse the path
            var sPath = window.location.pathname;
            var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
            var sTopic = sPage.substring( 0, sPage.lastIndexOf('.') );
            

             var cookieFrame = document.getElementById('setcookiefrm');
            if ( null != cookieFrame )
            {
           
                 cookieFrame.src="http://www.corel.com/servlet/Satellite?pagename=Development/CookieSet&hfile=PHOTO-PAINTCDGSX6&lang=EN&topic=" + sTopic;
 
            }
}
