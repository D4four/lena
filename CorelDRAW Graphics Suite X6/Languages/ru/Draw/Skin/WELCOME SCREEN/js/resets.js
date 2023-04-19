// JavaScript Document

function ResetTab2() {
  dactive('whatsnew01a'); dshow('body_right2_01a');
	dactive('whatsnew02a'); dshow('body_right2_02a');
	dactive('whatsnew03a'); dshow('body_right2_03a');
	dactive('whatsnew04a'); dshow('body_right2_04a');
	dactive('whatsnew05a'); dshow('body_right2_05a');
	dactive('whatsnew06a'); dshow('body_right2_06a');
	dshow('body_left2_00');
	dshow('body_right2_00');
}

function ResetTab3() {
	ClassSwitch('desc_bullet_videotuts','on','desc_bullet_coreltutor','off','desc_bullet_insights','off','desc_bullet_tipstricks','off','desc_bullet_guidebook','off');
	dshow('body_right3_00');
	$('NeedReaderAdvisory').style.display='none';	
	ClassSwitch('bullet_videotuts','active','bullet_coreltutor','inactive vc','bullet_insights','inactive vc','bullet_tipstricks','inactive vc','bullet_guidebook','inactive vc','morett','inactive off');
}

function ResetAll() {
	ResetTab2();
	ResetTab3();
	TabFlip('')
}
