// JavaScript Document

// Opens file on local system
function OpenFile(filename) {
	window.external.OpenExternalDocument(filename)
}

function _(sid) { document.write(GetStringByID(sid)); }
function _app(sid) { document.write(GetStringByID(g_app + sid)); }
function $(id) { return document.getElementById(id); }
function dshow(id) {
  var obj = $(id);
  var parent = obj.parentNode;
  var sibling = parent.firstChild;
  while(sibling != null) {
    sibling.style.display = (sibling.id != id) ? "none" : "block";
    sibling = sibling.nextSibling;
  }
}
function dactive(id) {
  var obj = $(id);
  var parent = obj.parentNode;
  var sibling = parent.firstChild;
  while(sibling != null) {
    sibling.className = (sibling.id != id) ? "inactive" : "active";
    sibling = sibling.nextSibling;
  }
}

// Opens external browser with URL
function OpenBrowser (URL) {
  window.open(URL);
}

// For switching CSS on hot/selected subsections
function ClassSwitch() {
  var args = ClassSwitch.arguments;
  if(document.getElementById) {
    for(var i=0; i < args.length; i += 2) { 
      if(document.getElementById(args[i])!=null) {
        document.getElementById(args[i]).className=args[i+1];
      }
    }
  }
}

// Tab flipping for cover & spread
function CoverSpreadFlip() {
	/* Insert all layers affected by tab-flipping in this array, regardless of default state */
	var idlist = new Array(
		'container_spread','container_cover'
	);
	/* Do not edit after this point */
	if(arguments.length < 1) { return; }
	for(var i = 0; i < idlist.length; i++) {
		var block = false;
		for(var ii = 0; ii < arguments.length; ii++) {
			if(idlist[i] == arguments[ii]) {
				block = true;
				break;
			}
		}
		if(block) { document.getElementById(idlist[i]).style.display = "block"; }
		else { document.getElementById(idlist[i]).style.display = "none"; }
	}
}

// Tab flipping for the spread tabs only
function TabFlip() {
	var idlist = new Array(
		'tab_focus_1','tab_focus_2','tab_focus_3','tab_focus_4','tab_focus_5',
		'tab_readyright_2','tab_readyright_3','tab_readyright_4','tab_readyright_5',
		'tab_readyleft_1','tab_readyleft_2','tab_readyleft_3','tab_readyleft_4',
		'container_page_1','container_page_2','container_page_3','container_page_4','container_page_5',
		'tab_offright_1','tab_offright_2','tab_offright_3','tab_offright_4',
		'tab_offleft_1','tab_offleft_2','tab_offleft_3','tab_offleft_4','tab_offleft_5'
	);

	if(arguments.length < 1) { return; }

	for(var i = 0; i < idlist.length; i++) {
		var block = false;
		for(var ii = 0; ii < arguments.length; ii++) {
			if(idlist[i] == arguments[ii]) {
				block = true;
				break;
			}
		}
		if(block) { document.getElementById(idlist[i]).style.display = "block"; }
		else { document.getElementById(idlist[i]).style.display = "none"; }
	}
}

// For showing & hiding (visibility property) certain layers
function ChangeLayerVis() {
  var i,p,v,obj,args=ChangeLayerVis.arguments;
  for (i=0; i<(args.length-2); i+=3) 
  with (document) if (getElementById && ((obj=getElementById(args[i]))!=null)) { v=args[i+2];
    if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v=='hide')?'hidden':v; }
    obj.visibility=v; }
}

// Mask pre-load
function ImagePreload() {
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=ImagePreload.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}
