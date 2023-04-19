// JavaScript Document

var gallery_items = new Array();

function preloadGallery() {
	itemNumber = 0;

gallery_items[itemNumber++] = [ "gallery_01.png", "Kamal Aggarwal", " ", " "];
gallery_items[itemNumber++] = [ "gallery_02.png", "Ardhyaska Amy", " ", " "];
gallery_items[itemNumber++] = [ "gallery_03.png", "Abrar Firdaus", " ", " "];
gallery_items[itemNumber++] = [ "gallery_04.png", "Fabiana Henkemaier de Souza", " ", " "];
gallery_items[itemNumber++] = [ "gallery_05.png", "Frederick Koli", " ", " "];
gallery_items[itemNumber++] = [ "gallery_06.png", "Choon Loong Po", " ", " "];
gallery_items[itemNumber++] = [ "gallery_07.png", "Марина Шипунова", " ", " "];
gallery_items[itemNumber++] = [ "gallery_08.png", "Victor Hugo González Peláez", "", " "];
gallery_items[itemNumber++] = [ "gallery_09.png", "Alex Benevides", " ", " "];
gallery_items[itemNumber++] = [ "gallery_10.png", "Mohammad Altaf  Husain", " ", " "];
gallery_items[itemNumber++] = [ "gallery_11.png", "Rajeevan Pr", " ", " "];
gallery_items[itemNumber++] = [ "gallery_12.png", "Rodolfo Castellon", " ", " "];
gallery_items[itemNumber++] = [ "gallery_13.png", "Сергей Безпечинский", " ", " "];
gallery_items[itemNumber++] = [ "gallery_14.png", "Rajkumar Samanta", " ", " "];
gallery_items[itemNumber++] = [ "gallery_15.png", "Сергей Безпечинский", " ", " "];
gallery_items[itemNumber++] = [ "gallery_16.png", "Damian Lobos", " ", " "];
gallery_items[itemNumber++] = [ "gallery_17.png", "Юрий Лакомкин", " ", " "];
gallery_items[itemNumber++] = [ "gallery_18.png", "Gabriel Herrera", "www.wonderfx.com", " &mdash; "];
gallery_items[itemNumber++] = [ "gallery_19.png", "Junaid Abbasi", "", " "];
gallery_items[itemNumber++] = [ "gallery_20.png", "Victoria Eugenia Aragon Martinez", " ", " "];
gallery_items[itemNumber++] = [ "gallery_21.png", "Роман Полищук", " ", " "];
gallery_items[itemNumber++] = [ "gallery_22.png", "Imam Putra", " ", " "];
gallery_items[itemNumber++] = [ "gallery_23.png", "Adrian Juman", "www.phoenixgfx.tk", " &mdash; "];
gallery_items[itemNumber++] = [ "gallery_24.png", "Ирина Баулина", " ", " "];
gallery_items[itemNumber++] = [ "gallery_25.png", "Joseph Diaz", "", " "];
gallery_items[itemNumber++] = [ "gallery_26.png", "Daniel Alejandro Paiz Valdivia", " ", " "];
gallery_items[itemNumber++] = [ "gallery_27.png", "Horea  Grindean", "www.horeagrindean.com", " &mdash; "];
gallery_items[itemNumber++] = [ "gallery_28.png", "Muammer Kara", " ", " "];
gallery_items[itemNumber++] = [ "gallery_29.png", "Александра Малышева", "www.behance.net/salllka", " &mdash; "];
gallery_items[itemNumber++] = [ "gallery_30.png", "Giuseppe Signore", " ", " "];
gallery_items[itemNumber++] = [ "gallery_31.png", "Robert Taylor", " ", " "];
gallery_items[itemNumber++] = [ "gallery_32.png", "Hui Ting Hsu", " ", " "];
gallery_items[itemNumber++] = [ "gallery_33.png", "Ирина Баулина", " ", " "];
gallery_items[itemNumber++] = [ "gallery_34.png", "Brenda Karinkanta", "www.brenkadesign.blogspot.com/", " &mdash; "];
gallery_items[itemNumber++] = [ "gallery_36.png", "Michél Nettling", "www.greatmade.de", " &mdash; "];
gallery_items[itemNumber++] = [ "gallery_37.png", "Sergio Saucedo", "www.sergiosaucedo.blogspot.com/", " &mdash; "];
gallery_items[itemNumber++] = [ "gallery_38.png", "Ursula Asri Prabandini", " ", " "];
gallery_items[itemNumber++] = [ "gallery_39.png", "Maurice Beumers", "www.mo-artworks.com", " &mdash; "];
gallery_items[itemNumber++] = [ "gallery_40.png", "Olga Duque Elena", " ", " "];
gallery_items[itemNumber++] = [ "gallery_41.png", "Tien Yuan Guan", " ", " "];
gallery_items[itemNumber++] = [ "gallery_42.png", "Kenneth Bruce Nichols", " ", " "];
gallery_items[itemNumber++] = [ "gallery_43.png", "John Jaeffer Javier", " ", " "];
gallery_items[itemNumber++] = [ "gallery_44.png", "Nouval AR", "www.inumocca.deviantart.com/", " &mdash; "];
gallery_items[itemNumber++] = [ "gallery_45.png", "Fernando Wundram", "www.speedgx.com", " &mdash; "];
gallery_items[itemNumber++] = [ "gallery_46.png", "Adriano Luis Silva", " ", " "];
gallery_items[itemNumber++] = [ "gallery_47.png", "Ahmad Chaidir", "www.supercorel.com", " &mdash; "];
gallery_items[itemNumber++] = [ "gallery_48.png", "Nanda Dixit", " ", " "];
gallery_items[itemNumber++] = [ "gallery_49.png", "Rustum Rivera", " ", " "];
gallery_items[itemNumber++] = [ "gallery_50.png", "Eduardo Portillo", " ", " "];
gallery_items[itemNumber++] = [ "gallery_51.png", "Ana Elizabeth Zavala Lopez", "www.anisss.deviantart.com", " &mdash; "];
gallery_items[itemNumber++] = [ "gallery_52.png", "Chaitanya Mellacheruvu", " ", " "];
gallery_items[itemNumber++] = [ "gallery_53.png", "Fabio Selani", "www.fabiosellani.blogspot.com", " &mdash; "];
gallery_items[itemNumber++] = [ "gallery_54.png", "Sandra Berenice Garcia Cortes", " ", " "];
gallery_items[itemNumber++] = [ "gallery_55.png", "Jesús Eduardo Luna Reyes", " ", " "];
gallery_items[itemNumber++] = [ "gallery_56.png", "Viviane Marques Marques", "www.midiaconsulte.com.br", " &mdash; "];
gallery_items[itemNumber++] = [ "gallery_57.png", "Marcela Alejandra Catalán Badilla", "www.facebook.com/Personaliza.Arquitectos", " &mdash; "];
gallery_items[itemNumber++] = [ "gallery_58.png", "Natalia De Anda Anima", "www.natalia-factory.deviantart.com", " &mdash; "];
gallery_items[itemNumber++] = [ "gallery_59.png", "Masoud Aghaei", " ", " "];
gallery_items[itemNumber++] = [ "gallery_60.png", "Felipe da Silva Cortes", "www.graphiadesign.com.br", " &mdash; "];
	// keep adding items here...
}

function SetNavigationControlsState()
{
  var currentItem = window.external.GetSessionProperty('currentGalleryItem');
  var leftNav = document.getElementById('gallery_back');
  var rightNav = document.getElementById('gallery_forward');

  leftNav.style.display = 'inline';
  rightNav.style.display = 'inline';

  if ( currentItem <= 1 )
  {
    // first item, disable left nav contgrol
    leftNav.style.display = 'none';
  }
  
  if ( currentItem >= ( gallery_items.length - 2 ))
  {
    // last item, disable right nav control
    rightNav.style.display = 'none';
  }
}

function loadGallery() 
{
	var currentItem = window.external.GetSessionProperty('currentGalleryItem');

  // set up navigation controls states
  SetNavigationControlsState();

	if ( currentItem < gallery_items.length )
	{
		var gs = document.getElementById('gallery_left_image');
		gs.innerHTML = "<img src='images/content/" + gallery_items[currentItem][0] + "' class='vc_inner' alt='' />";
		
		gs = document.getElementById('gallery_left_artist');
		gs.innerHTML = gallery_items[currentItem][1] + gallery_items[currentItem][3] + "<span id='galleft' class=" + '"' + "link" + '"' + " onmouseover='ClassSwitch(" + '"galleft","link_over"' + ")' onmouseout='ClassSwitch(" + '"galleft","link"' + ")' onclick=" + '"' + "OpenBrowser(" + "'http://" + gallery_items[currentItem][2] + "')" + '"' + ">" + gallery_items[currentItem][2] + "</span> ";

	}

	if ( currentItem < (gallery_items.length-1) )
	{
		var gs = document.getElementById('gallery_right_image');
		gs.innerHTML = "<img src='images/content/" + gallery_items[currentItem + 1][0] + "' class='vc_inner' alt='' />";
		gs.style.display = 'block';
		
		gs = document.getElementById('gallery_right_artist');
		gs.innerHTML = gallery_items[currentItem + 1][1] + gallery_items[currentItem + 1][3] + "<span id='galright' class=" + '"' + "link" + '"' + " onmouseover='ClassSwitch(" + '"galright","link_over"' + ")' onmouseout='ClassSwitch(" + '"galright","link"' + ")' onclick=" + '"' + "OpenBrowser(" + "'http://" + gallery_items[currentItem + 1][2] + "')" + '"' + ">" + gallery_items[currentItem + 1][2] + "</span> ";
		gs.style.display = 'block';
	}
	else
	{
		document.getElementById('gallery_right_image').style.display = 'none';
		document.getElementById('gallery_right_artist').style.display = 'none';
	}
}

function DecrementGalleryPosition()
{
  var currentItem = window.external.GetSessionProperty('currentGalleryItem');

  if ( currentItem > 1 )
  {
    currentItem = currentItem - 2;
    window.external.SetSessionProperty('currentGalleryItem', currentItem );
    
    loadGallery();
  }
}

function IncrementGalleryPosition()
{
  var currentItem = window.external.GetSessionProperty('currentGalleryItem');

  if ( currentItem < ( gallery_items.length - 2 ) )
  {
    currentItem = currentItem + 2;
    window.external.SetSessionProperty('currentGalleryItem', currentItem );
    
    loadGallery();
  }
}

