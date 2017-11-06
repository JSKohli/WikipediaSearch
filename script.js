$(document).ready(function() {
  $("#cross").click(function() {
    $(".input-text").val('');
    $("#resultList").empty();
  });
  
  $('.input-text').keyup(function(key) {
    if(key.keyCode == 13) {
      $("#resultList").empty();     
      $("#randomArticle").appendTo(".pageTitle")
      $("<br>").prependTo("#resultList")
      var searchValue = $(".input-text").val();
      var apiCall="https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=";
      apiCall = apiCall + encodeURIComponent(searchValue);
      //console.log(apiCall);
      $.ajax({
        url: apiCall,
        dataType: "jsonp",
        success: function(response) {
          // console.log(response);
          resultList = response.query.search;
          for(var pageid in resultList) {
            var page = resultList[pageid];
            var newListItem = "<a href=\"https://en.wikipedia.org/?curid=" + page.pageid + "\" target=\"_blank\"><div class=\"listItem\"><h3 class=\"title\">" + page.title + "</h3><p>" + page.snippet + "</p></div></a><br>";              
            $(newListItem).appendTo("#resultList");
          }
        }
      });
    }
  })
});

