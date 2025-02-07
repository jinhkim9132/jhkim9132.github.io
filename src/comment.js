
var Comment = function()
{
  /* 처리 페이지 주소 */
  var process = GNB_PROCESS + "/process/comment/comment_manager.php";
  return {
    reg: function(){

      var comment = $("#comment").val();
      if(comment == ""){
        alert('내용을 입력해주세요.');
        return;
      }

      
      
      var nickname = localStorage.getItem("nickname");
      var profile_thumb = localStorage.getItem("profile_thumb");
      var email = localStorage.getItem("email");

      var param = "card_code=" + cardCode  + "&email=" + email + "&nickname=" + nickname + "&profile=" + profile_thumb + "&comment=" + encodeURIComponent(comment);

      $.ajax({
        type: "POST",
        url: '/_gnbprocess/process/comment/comment_manager.php',
        dataType:"json",
        data:"mode=reg&" + param,
        success:function(data){
          var result = data.result;
          var rurl = data.returnURL;
          if(result == 'ok'){
            $("#comment").val('');
            Comment.list(1);
          }else{
            alert('[1]처리중 오류가 발생했습니다.' + result);
            return;
          }
        },
        error:function(xhr){
          alert('[2]처리중 오류가 발생했습니다.' + xhr.responseText.toString());
          return false;
        }
      });
    },
    moreData: function(){
      commentPage++;
      Comment.list();
    },
    list: function(){
      var param = "card_code=" + cardCode  + "&page=" + commentPage;
     // $(".visit_list_wrap").empty();
      $.ajax({
        type: "POST",
        url: '/_gnbprocess/process/comment/comment_manager.php',
        dataType:"json",
        data:"mode=list&" + param,
        success:function(data){
          var result = data.result;
          var rurl = data.returnURL;
          if(result == 'ok'){
            var total = data.total;
            var total_page = data.total_page;
            var list = data.list;
            if(total_page == '') total_page = 0;
            total_page = parseInt(total_page,10);
            if(total == "") total = 0;
            total = parseInt(total,10);
            if(total_page > commentPage) $(".paging").removeClass('hide');
            else  $(".paging").addClass('hide');
            var HTML = "";
            for(var i = 0; i < total; i++){
              var code = list[i].code;
              var profile = list[i].profile;
              var nickname = list[i].nickname;
              var comment = list[i].comment;
              var register_day = list[i].register_day;


              HTML += "<div class='visit_list'>";
              HTML += "<div class='photo'><div style=\"background-image:url('" + decodeURIComponent(profile) + "');\"></div></div>";
              HTML += "<div class='name'>" + nickname + "</div>";
              HTML += "<div class='title'>" + comment + "</div>";
              HTML += "<div class='like off'><div></div></div>";
              HTML += "</div>";
            }
            if(total == 0){
              HTML = "<div class='visit_list'><div class='title data_none'>등록된 데이터가 없습니다.</div></div>";
            }
            $(".visit_list_wrap").append(HTML);
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
    addGallery: function(){
      var HTML = "<div class='d_file'><input type='file' name='gFile[]' class='ipt w30p'></div>";
      $("#gallery").append(HTML);
    },
    addMngGallery: function(){
      var HTML = "<div class='d_file'><input type='file' name='mFile[]' class='ipt w30p'></div>";
      $("#mng_gallery").append(HTML);
    },
    addHouseGallery: function(){
      var HTML = "<div class='d_file'><input type='file' name='hFile[]' class='ipt w30p'></div>";
      $("#house_gallery").append(HTML);
    },
    callComment: function(code){
      if(code == '') return;
      var param = "code=" + code;
      $("#comment").val('');
      $.ajax({
        type: "POST",
        url: process,
        dataType:"json",
        data:"mode=call_comment&" + param,
        success:function(data){
          var result = data.result;
          var rurl = data.returnURL;
          if(result == 'ok'){
            var list = data.list;
            var cnt = data.cnt;
            $("#comment_cnt").html(cnt);
            $(".comment_list_wrap").html(list);
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
    },
    regComment: function(code){
      if(code == '') return;

      var comment = $("#comment").val();
      if(comment == ""){
        alert('내용을 입력해주세요.');
        $("#comment").focus();
        return;
      }

      var param = "code=" + code + "&comment=" + encodeURIComponent(comment);

      $.ajax({
        type: "POST",
        url: process,
        dataType:"json",
        data:"mode=reg_comment&" + param,
        success:function(data){
          var result = data.result;
          var rurl = data.returnURL;
          if(result == 'ok'){
            $("#comment").val('');
            Info.callComment(code);
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
    },
    commentDel: function(code){
      if(code == '') return;

      if(!confirm('해당글을 삭제하시겠습니까?')) return;

      var param = "code=" + code;

      $.ajax({
        type: "POST",
        url: process,
        dataType:"json",
        data:"mode=del_comment&" + param,
        success:function(data){
          var result = data.result;
          var rurl = data.returnURL;
          if(result == 'ok'){
            //$("#comment_list_" + code).remove();
            window.document.location.reload();
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
    },
    viewReplyFrm: function(code,pcode){
      var HTML = "<section class='comment_write_wrap_reply' id='reply_comment_" + code + "'>";
      HTML += "<ul>";
      HTML += "<li><input type='text' name='comment" + code + "' id='comment" + code + "' value='' class='' autocomplete='off'></li>";
      HTML += "<li><a href=\"javascript:Info.regReplyComment('" + code + "','" + pcode + "');\"><div class='btn'>등록</div></a> <a href=\"javascript:Info.cancelCommentReply('" + code + "')\"><div class='btn'>취소</div></a></li>";
      HTML += "</ul>";
      HTML += "</section>";

      if($("#reply_comment_" + code).html() == undefined){
        $("#list_data_" + code).append(HTML);
      }
    },
    regReplyComment: function(code,ref_code){
      if(code == '' || ref_code == '') return;
      var comment = $("#comment" + code).val();
      if(comment == ""){
        alert('내용을 입력해주세요.');
        $("#comment" + code).focus();
        return;
      }

      var param = "code=" + code + "&ref_code=" + ref_code + "&comment=" + encodeURIComponent(comment);

      $.ajax({
        type: "POST",
        url: process,
        dataType:"json",
        data:"mode=reg_reply_comment&" + param,
        success:function(data){
          var result = data.result;
          var rurl = data.returnURL;
          if(result == 'ok'){
            Info.callComment(ref_code);
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
    },
    cancelCommentReply: function(code){
      $("#reply_comment_" + code).remove();
    },
  }
}();
