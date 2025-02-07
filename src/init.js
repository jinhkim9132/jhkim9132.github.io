var commentPage = 1;

$(document).ready(function(){
  Comment.list();

  $("#comment").on('click',function(){
    var access_token = localStorage.getItem("access_token");
    var nickname = localStorage.getItem("nickname");
    var profile_thumb = localStorage.getItem("profile_thumb");

    if(access_token == null || access_token == ''){
      loginWithKakao();
      //$("#custom-login-btn").trigger('click');
      return;
    }
  });
  $("#comment").on('keyup',function(){
    var val = $(this).val();
    var lng = val.length;
    if(lng > 100) {
      val = val.substring(0, 100);
      $(this).val(val);
      return;
    }
    
    $(".in_num").html(lng + " / 100");
  });
  
  $('.icon_kakao').on('click',function(){
    shareTalk();
  });
  $(".comment_box .btn").on("click",function(){
    var access_token = localStorage.getItem("access_token");
    if(access_token == null || access_token == ''){
      loginWithKakao();     
      return;
    }
    
   
    Comment.reg();
    /*
    $("#_zzWriteF").ajaxForm({
      type: "POST",
      url: '/_gnbprocess/comment/comment_register.php',
      dataType:"json",
      beforeSubmit:function(data,frm,opt){
        return true;
      },
      success:function(data,status){
        var result = data.result;
        if(result == 'ok'){
          var index = data.index;

          
        }else{
          alert('처리중 오류가 발생했습니다.');
          return;
        }
      },
      error:function(xhr){
        alert('처리중 오류가 발생했습니다.');
        return false;
      }
    }).submit();
    */
  });
  $(".music").on('click',function(){
    const myAudio = document.getElementById("card_audio")
    if($(this).hasClass('on')){
      $(this).removeClass('on')
      myAudio.pause();
    }else{
      $(this).addClass('on')
      myAudio.play();
    }

  });
  /* 부모님연락처 */
  $(".parent_ttl").on('click',function(){
    if($(".p_info").hasClass('on')){
      $(this).removeClass("open");
      $(".p_info").removeClass('on');
    }else{
      $(this).addClass("open");
      $(".p_info").addClass('on');
    }
  });
  /* 참석의사 */
  $(".Part08 .btn").on('click',function(){
    if($(".Part08 .ipt_box").hasClass('open')){
      $(this).removeClass("open");
      $(".Part08 .ipt_box").removeClass('open');
    }else{
      $(this).addClass("open");
      $(".Part08 .ipt_box").addClass('open');
    }
  });
  /* 전달 */
  $(".Part08 .join").on('click',function(){
    var sex = $("#sex").val();
    var jname = $("#jname").val();
    var jnums = $("#jnums").val();

    if(sex == ""){
      alert('신랑 또는 신부를 선택해주세요.');
      return;
    }
    if(jname == ""){
      alert('참석자 성함을 입력해주세요.');
      $("#jname").focus();
      return;
    }
    if(jnums == ""){
      alert('참석자 인원을 선택해주세요.');
      $("#jnums").focus();
      return;
    }
    var process = GNB_PROCESS + "/process/join/join_manager.php";
    var param = "cardCode=" + cardCode   + "&sex=" + sex + "&jname=" + encodeURIComponent(jname) + "&jnums=" + encodeURIComponent(jnums);

    $.ajax({
      type: "POST",
      url: process,
      dataType:"json",
      data:"mode=reg_join&" + param,
      success:function(data){
        var result = data.result;
        var rurl = data.returnURL;
        if(result == 'ok'){
          alert('정상적으로 처리되었습니다.');
          $(".Part08 .who .join_btn").removeClass('on');
          $("#sex").val('');
          $("#jname").val('');
          $("#jnums").val('');
          $(".Part08 .ipt_box").removeClass('open');
        }else{
          alert('처리중 오류가 발생했습니다.');
          return;
        }
      },
      error:function(xhr){
        alert('처리중 오류가 발생했습니다.');
        return false;
      }
    });

  });
  /* 스냅사진 */
  $(".Part12 .btn").on('click',function(){
    if($(".Part12 .ipt_box").hasClass('open')){
      $(this).removeClass("open");
      $(".Part12 .ipt_box").removeClass('open');
    }else{
      $(this).addClass("open");
      $(".Part12 .ipt_box").addClass('open');
    }
  });
  try{
    shareTalk();
  }catch(e){}

});

