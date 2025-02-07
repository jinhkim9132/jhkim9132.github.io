var Photo = function()
{
  /* 처리 페이지 주소 */
  var process = GNB_PROCESS + "/process/photo/photo_manager.php";
  return {
    init: function(){
      Photo.callList();
      $(".snap_file").on('click',function(){
        var access_token = localStorage.getItem("access_token");
        var nickname = localStorage.getItem("nickname");
        var profile_thumb = localStorage.getItem("profile_thumb");
        //

       if(access_token == null || access_token == ''){
          loginWithKakao();
          return;
       }else{
          $("#snap_photo_img").trigger("click");
       }
      });
      $("#snap_photo_img").on('change',function(){
        if($("#snap_photo_img").val() == '') return;

        var access_token = localStorage.getItem("access_token");
        var nickname = localStorage.getItem("nickname");
        var email = localStorage.getItem("email");

        $("#email").val(email);
        $("#nickname").val(nickname);
        $("#snap_photo_img").trigger("click");


        $("#_SnapfileUp").ajaxForm({
          type: "POST",
          url: process,
          dataType:"json",
          beforeSubmit:function(data,frm,opt){
            return true;
          },
          success:function(data,status){
            var result = data.result;
            if(result == 'ok'){
              var img = data.image;
              var code = data.code;
              var HTML = "<div class='photo_box' id='snap_" + code + "' style=\"background-image:url('" + img + "');\"><a href=\"javascript:Photo.delSnap('" + code + "','" + email + "');\"><div class='del_img'></div></a></div>";
              $(".photo_up_wrap").append(HTML);
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
      });

    },
    callList: function(){
      var email = localStorage.getItem("email");
      var param = "mode=glist&email=" + email + "&card_code=" + cardCode ;
      $.ajax({
        type: "POST",
        url: process,
        dataType:"json",
        data:param,
        success:function(data){
          var result = data.result;
          var rurl = data.returnURL;
          if(result == 'ok'){
              var total = data.total;
              var list = data.list;
              if(total == '') total = 0;
              total = parseInt(total,10);
              var HTML = "";
              for(i = 0; i < total; i++){
                code = list[i].code;
                img = list[i].image;

               HTML = "<div class='photo_box' id='snap_" + code + "' style=\"background-image:url('" + img + "');\"><a href=\"javascript:Photo.delSnap('" + code + "','" + email + "');\"><div class='del_img'></div></a></div>";
               $(".photo_up_wrap").append(HTML);
              }
          }else{
            //alert('처리중 오류가 발생했습니다.');
            return;
          }
        },
        error:function(xhr){
          //alert('처리중 오류가 발생했습니다.');
          return false;
        }
      });
    },
    delSnap: function(code,email){
      if(confirm('해당 이미지를 삭제하시겠습니까?')){
        var param = "mode=del&code=" + code + "&email=" + email;

        $.ajax({
          type: "POST",
          url: process,
          dataType:"json",
          data:param,
          success:function(data){
            var result = data.result;
            var rurl = data.returnURL;
            if(result == 'ok'){
              $("#snap_" + code).remove();
            }else{
              //alert('처리중 오류가 발생했습니다.');
              return;
            }
          },
          error:function(xhr){
            //alert('처리중 오류가 발생했습니다.');
            return false;
          }
        });
      }
    },
  }
}();
