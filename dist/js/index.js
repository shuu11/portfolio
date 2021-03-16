//----------------------------------------------------------------------
//  mode
//----------------------------------------------------------------------
'use strict';

//----------------------------------------------------------------------
//  変数宣言
//----------------------------------------------------------------------

//----------------------------------------------------------------------
//  main
//----------------------------------------------------------------------
{

}

//----------------------------------------------------------------------
//  イベントハンドラ
//----------------------------------------------------------------------
document.getElementById('js-hamburger').addEventListener('click', () => {
  document.getElementById('js-hamburger').classList.toggle('click');
  document.getElementById('js-header__nav').classList.toggle('click');
  document.getElementById('js-mask').classList.toggle('click');
  document.querySelector('html').classList.toggle('u-overflow__hidden');
});

document.getElementById('js-mask').addEventListener('click', () => {
  document.getElementById('js-hamburger').classList.remove('click');
  document.getElementById('js-header__nav').classList.remove('click');
  document.getElementById('js-mask').classList.remove('click');
  document.querySelector('html').classList.remove('u-overflow__hidden');
});

document.getElementById('js-header__nav').addEventListener('click', () => {
  document.getElementById('js-hamburger').classList.remove('click');
  document.getElementById('js-header__nav').classList.remove('click');
  document.getElementById('js-mask').classList.remove('click');
  document.querySelector('html').classList.remove('u-overflow__hidden');
});

//----------------------------------------------------------------------
//  関数
//----------------------------------------------------------------------
function hoge(str){
  console.log(str);
}

/************************************************************************/
/*  END OF FILE                                       									*/
/************************************************************************/