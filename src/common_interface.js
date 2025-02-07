var _LIB_URL = '/_gnbModule/library/';
var _ACT_URL = '/_mngAdm';


function chkUserInput(frm){
  var lng = frm.elements.length;
  for(i = 0; i < lng; i++){
    var Obj = frm.elements[i];
    try{
      var name = Obj.getAttribute("name");							// 필드명
      var id = Obj.getAttribute("id");									// 필드아이디
      var inTitle = Obj.getAttribute("alt");						// 필드 제목
      var required = Obj.getAttribute("required");			// 필수 여부
      var type = Obj.getAttribute("type");							// 타입
      var value = Obj.getAttribute("value");						// 값
      var flag = chkType(type);
      var ttype = chkInType(type);
      var tagName = Obj.tagName;												// 태그 타입
      if(name == null || inTitle == null) continue;

      if(id == 'pwd_ok'){
        var val1 = $("#pwd").val();
        var val2 = $("#pwd_ok").val();

        if(val1 != val2){
          alert('비밀번호가 일치하지 않습니다.');
          $("#pwd_ok").focus();
          return false;
        }
      }

      if(inTitle != null){
        try{
          inBase =  inTitle.josa('을/를')
        }catch(e){
          alert(e.toString());
        }

        if(tagName == 'TEXTAREA'){
          try{
            if(oEditors.getById[id] != undefined){
              oEditors.getById[id].exec("UPDATE_CONTENTS_FIELD", []);
            }
          }catch(e){
            oEditors = null;
          }
        }
        if(required != null){
          if(ttype == 'chk'){
            if(!chkInputType(frm,name,inTitle + inBase,flag,ttype)) return false;
          }else{
            if(!chkInputType(frm,name,inTitle + inBase,flag,ttype)) return false;
          }

        }
      }
    }catch(e){

    }
  }
  return true;
}

function chkInputType(frm,iptname,txt,flag,type){
  var obj = document.getElementsByName(iptname);

  if(obj[0] == null) return true;
  msg = '';
  switch (flag){
    case 0:
      msg = '입력';
      break;
    case 1:
      msg = '선택';
      break;
  }
  if(type == '') type = 'ipt';

  switch(type){
    case 'ipt':
      try{
        if(eval("frm." +  iptname + ".value == ''")){
          alert(txt + ' ' + msg + "하세요.");
          eval("frm." + iptname + ".focus()");
          return false;
        }
      }catch(e){
        alert('error : '+ iptname + " :  " + e.toString());
        return false;
      }

      break;
    case 'rdo':
    case 'chk':
      var chk_name = name.replace('[]','');
      lng = eval("frm." +  chk_name + ".length");

      chking = 0;

      for(_i = 0; _i < lng; _i++){
        if(eval("frm." +  chk_name + "[" + _i + "].checked == true")){
          chking = 1;
        }
      }

      if(chking == 0){
        alert(txt + ' ' + msg + "하세요.");
        eval("frm." + chk_name + "[0].focus()");
        return false;
      }
      break;
  }
  return true;
}
function NumCheck(frm,strArg){
  var num ="0123456789";
  for (var i=0; i<frm.value.length; i++){
    if(-1 == num.indexOf(frm.value.charAt(i))){
      alert("숫자만 입력가능합니다!");
      frm.value = '';
      frm.focus();
      return;
    }
  }
}
function getCookie(name){
  var nameOfCookie = name + "=";
  var x = 0;
  while ( x <= document.cookie.length )
  {
    var y = (x+nameOfCookie.length);
    if ( document.cookie.substring( x, y ) == nameOfCookie )
    {
      if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 )
        endOfCookie = document.cookie.length;
      return unescape( document.cookie.substring( y, endOfCookie ) );
    }
    x = document.cookie.indexOf( " ", x ) + 1;
    if ( x == 0 )
      break;
  }
  return "";
}
function setCookie( name, value, expiredays ){
  var todayDate = new Date();
  todayDate.setDate( todayDate.getDate() + expiredays );
  document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() +";"
}

function closePopUp(pop_id,today_id,name,value,day) {
  var obj = $("#" + today_id);
  if(obj.prop("checked")){
    setCookie(name,value,day);
  }
  $("#" + pop_id).hide();
}

function openPopUp(pop_id,name,value){
  var cookie_v = getCookie(name);

  if(cookie_v != value){
    $("#" + pop_id).show();
  }
}

function number_format(input){
  var input = String(input);
  var reg = /(\-?\d+)(\d{3})($|\.\d+)/;
  if(reg.test(input)){
    return input.replace(reg, function(str, p1,p2,p3){
          return number_format(p1) + "," + p2 + "" + p3;
        }
    );
  }else{
    return input;
  }
}



function viewQuest(flag,view){
  var objContain = document.getElementById("alimDDiv" + flag);
  if(objContain != null){
    if(view == 'n'){
      objContain.innerHTML = "";
    }else{
      var childDiv = document.createElement("div");

      childDiv.setAttribute("style","position:absolute;border:1px solid #c04813;background:#f9f8f8;padding:10px;display:block;line-height:24px;");
      $.ajax({
        type: "POST",
        url: _LIB_URL + "message/message.php",
        dataType:"html",
        data: "flag=" + flag,
        success:function(data){
          try{
            childDiv.innerHTML = data;
            objContain.appendChild(childDiv);
          }catch(e){
          }
        },
        error:function(xhr){
          //alert(xhr.toString());
        }
      });
    }
  }
}

function chkedAll(checked){
  $("[name='chk[]']").attr("checked",checked);
}

function isChecked(){
  var chk = false;
  var obj = document.getElementsByName("chk[]");
  for(i = 0; i < obj.length; i++){
    chk = obj[i].checked;
    if(chk){
      break;
    }
  }

  return chk;
}

function isVal(val){
  if(val == null || val == undefined){
    return false;
  }
  return true;
}
function delCommonData(info){
  var chk = isChecked();
  if(chk){
  }else{
    alert('선택된 데이터가 없습니다.');
    return;
  }

  var table = info.table;
  var frm = info.form;

  if(!isVal(table)){
    alert('테이블명이 정의되어 있지 않습니다.');
    return;
  }
  if(!isVal(frm)){
    alert('폼이름이 정의되어 있지 않습니다.');
    return;
  }
  var param = $("#" + frm).serialize() + "&table=" + table;
  $.ajax({
    type: "POST",
    url: _ACT_URL + "/process/common/common_delete.php",
    dataType:"json",
    data: param,
    success:function(data){
      try{
        if(data.result == 'success'){
          alert('데이터가 삭제되었습니다.');
          window.document.location.reload();
        }else if(data.result == 'fail'){
          alert('처리중 오류가 발생했습니다.');
          return false;
        }
      }catch(e){
      }
    },
    error:function(xhr){
      //alert(xhr.toString());
    }
  });
}

function callDataExist(info){
  var mode = info.mode;
  var table = info.table;
  var chk_field = info.chk_field;
  var chk_value = info.chk_value;
  var result = false;

  if(!isVal(table)){
    alert('테이블명이 정의되어 있지 않습니다.');
    return false;
  }
  if(!isVal(chk_field)){
    alert('중복확인할 필드명이 정의되어 있지 않습니다.');
    return false;
  }
  if(!isVal(chk_value)){
    alert('중복확인할 값이 정의되어 있지 않습니다.');
    return false;
  }
  var param = "mode=" + mode + "&table=" + table + "&chk_field=" + chk_field + "&chk_value=" + chk_value;
  $.ajax({
    type: "POST",
    url: _ACT_URL + "/process/common/chk_exist_value.php",
    dataType:"json",
    data: param,
    success:function(data){
      try{
        if(data.result == 'success'){
          alert('사용가능한 아이디입니다.');

          if($("#id_chk") != null) $("#id_chk").val('y');
          return true;
        }else if(data.result == 'exist'){
          alert('이미 사용중인 아이디입니다.');
          if($("#id_chk") != null) $("#id_chk").val('n');
          return false;
        }else if(data.result == 'fail'){
          alert('처리중 오류가 발생했습니다.');
          if($("#id_chk") != null) $("#id_chk").val('n');
          return false;
        }
      }catch(e){
      }

    },
    error:function(xhr){
      //alert(xhr.toString());
    }
  });
}

function initSelect(name){
  var lng = $("#" + name + " option").size();

  for(i = lng - 1; i >= 1; i--){
    $("#" + name + " option:eq(" + i + ")").remove();
  }

}

function setUserEmail(objId,value){
  if(objId == '') return;
  var val = $("#" + objId +"2").val(value);
}

function validateEmail(email) {
  var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return re.test(email);
}


function chgDivFn(objName,flag){
  if($("." + objName) == null || $("." + objName) == undefined){
    return;
  }
  var lng = $("." + objName).length;

  $("." + objName).attr("style","display:none;");
  for(i = 0; i < lng; i++){
    var obj = $("." + objName)[i];

  }
  $("#" + objName + flag).attr("style","display:block;");
}

function schBoardList(){
  $("#_zzbrdFrm").submit();
}

function viewContent(code,obj){
  if($("#content" + code) != null){
    if($("#content" + code).css('display') == 'none'){
      $("#content" + code).show();
    }else{
      $("#content" + code).hide();
    }
  }
  if($("#contentLine" + code) != null){
    if($("#contentLine" + code).css('display') == 'none'){
      $("#contentLine" + code).show();
    }else{
      $("#contentLine" + code).hide();
    }
  }
}

function addBtnFavorite() {
  if (window.sidebar && window.sidebar.addPanel) { // Mozilla Firefox Bookmark
    window.sidebar.addPanel(document.title,window.location.href,'');
  } else if(window.external && ('AddFavorite' in window.external)) { // IE Favorite
    window.external.AddFavorite(location.href,document.title);
  } else if(window.opera && window.print) { // Opera Hotlist
    this.title=document.title;
    return true;
  } else { // webkit - safari/chrome
    alert((navigator.userAgent.toLowerCase().indexOf('mac') != - 1 ? 'Command/Cmd' : 'CTRL') + " + D 키를 누르면 북마크에 저장됩니다.");
  }
}

function sendSMS(code,flag,manflag,hp){
  var wMode = 0;


  var win = window.open('../popup/sms_flag.php?code=' + code + '&flag=' + flag + "&manflag=" + manflag + "&hp=" + hp,'phone','width=400,height=300');
  try{
    win.focus();
  }catch(e){
    alert('팝업 차단을 해제후 이용하여 주시기 바랍니다');
  }
}


function compareValue(obj1,obj2,msg){
  if(obj1.value != obj2.value){
    alert(msg);
    return false;
  }

  return true;
}
function goPage(url,mflag){
  if(mflag == 'none'){
    return;
  }else{
    window.document.location.href=decodeURIComponent(url);
  }
}
function downFile(file,rfile,code,board){
  if(typeof(board) == undefined) board = '';
  if(typeof(code) == undefined) code = '';
  window.document.location.href= _ACT_URL + "/process/download.php?file=" + file + "&rfile=" + rfile + "&board=" + board + "&code=" + code;
}

function downBBSFile(code,board,num){
  if(typeof(board) == undefined) board = '';
  if(typeof(code) == undefined) code = '';

  var down_point = $("#down_point").html();

  if(!confirm('다운로드시 ' + down_point + ' 포인트가 차감됩니다.\r\n해당 파일을 다운 받으시겠습니까?')){
    return;
  }
  var param = "mode=chk_down&board=" + board + "&code=" + code + "&num=" + num;
  $.ajax({
    type: "POST",
    url: _ACT_URL + "/process/bbs_download.php",
    dataType:"json",
    data: param,
    success:function(data){
      var result = data.result;
      try{
        if(result == 'ok'){
          window.document.location.href= _ACT_URL + "/process/bbs_download.php?board=" + board + "&code=" + code + "&num=" + num;
        }else if(result == 'login'){
          alert('로그인후 이용가능합니다.');
          return;
        }else if(result == 'not_point'){
          alert('포인트가 부족합니다.');
          return;
        }else if(result == 'reg_id'){
          alert('작성자는 다운로드를 받을수 없습니다.');
          return;
        }else if(result == 'buy'){
          alert('이미 다운 받으신 파일입니다.\r\n마이페이지 -> 다운로드 이력에서 확인가능합니다.');
          return;
        }

      }catch(e){
      }
    },
    error:function(xhr){
      //alert(xhr.toString());
    }
  });



}

/* 북 마크 */
function bookmark(){
  var currentDate = new Date();
  var title = document.title;
  var domain = 'http://' + document.domain + "/?_bk=" + currentDate.getTime();
  window.external.AddFavorite(domain, title);
}
/* 북 마크 */

function checkedAllData(checked){
  $(".list_check").attr("checked",checked);

}

function goPosition(obj_id){
  var offset = $('#' + obj_id).offset(); //선택한 태그의 위치를 반환	

  $('html').animate({scrollTop : offset.top}, 400);
}
function goTop(obj_id){
  var offset = $('.' + obj_id).offset(); //선택한 태그의 위치를 반환

  $('html').animate({scrollTop : offset.top}, 400);
}

function audioPlay(){
  var obj = document.getElementById("paperAudio");
  obj.play();
}

function audioStop(){
  var sound = document.getElementById("paperAudio");
  sound.pause();
  sound.currentTime = 0;
}

function goProductQna(){
  var frm = document.forderform;
  frm.action = "qna.php";
  frm.submit();
}
function goProductUse(){
  var frm = document.forderform;
  frm.action = "use.php";
  frm.submit();
}
function goProductUseMod(code){
  var frm = document.forderform;
  frm.action = "use.php?ucode=" + code;
  frm.submit();
}
$(document).ready(function(){
  $(".detail_tab li").on("click",function(){
    $(".shop-content .detail_tab li").removeClass("on");
    $(".shop-content .detail").addClass("hide");
    $(this).addClass("on");
    var tab = $(this).attr("id");
    $(".shop-content .detail." + tab).removeClass("hide");
  });
});

function chkLogin(page){
  if(confirm('로그인후 이용가능합니다\n로그인 페이지로 이동하시겠습니까?')){
    window.document.location.href="/m/member/login.php?rurl=" + encodeURIComponent(page);
  }
}

function chkCharCode(event){
  const regExp = /[^0-9a-zA-Z]/g;
  const ele = event.target;
  if (regExp.test(ele.value)) {
    ele.value = ele.value.replace(regExp, '');
  }
}
function chkNumCode(event){
  const keyCode = event.keyCode;
  const isValidKey = (
    (keyCode >= 48 && keyCode <= 57) || // Numbers
    (keyCode >= 97 && keyCode <= 122) ||
    (keyCode === 8)    
  );
  if (!isValidKey) {
    event.preventDefault();
    return false;
  }
}