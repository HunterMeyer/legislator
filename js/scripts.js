var MyLegislator = {

};

$(function() {
  var i = 0;
  $("form#get-zip").submit(function() {
    var zip = $("input#zip").val();
    $("div#card-container").empty();
    $.get("http://congress.api.sunlightfoundation.com/legislators/locate?apikey=5b596ceec88a42d98151d7b383431dc9&zip=" + zip, function(responseBody) {
      responseBody.results.forEach(function(legislator) {
        $("div#card-container").append("<div class='leftHeader' id='cards" + i + "'></div>");
        $("div#cards" + i).append("<img id='pics' style='inline-block' src='img/" + legislator.bioguide_id + ".jpg'>").hide().fadeIn();
        $("div#cards" + i).append("<ul id='person" + i +"'><b>" + legislator.first_name + " " + legislator.last_name + " " + " (" + legislator.chamber + ", " + legislator.party + "-" + legislator.state + ")</b>").hide().fadeIn();
        $("ul#person" + i).append("<li>" + "<a target='_blank' href=" + legislator.website + ">" + legislator.website + "</a></li>").hide().fadeIn();
        $("ul#person" + i).append("<li>" + legislator.phone + "</li>").hide().fadeIn();    
        $("ul#person" + i).append("<li id='bills'>Sponsored Bills</li></ul>").hide().fadeIn();
        $("li#bills").click(function() {
          $.get("http://congress.api.sunlightfoundation.com/bills?apikey=5b596ceec88a42d98151d7b383431dc9&sponsor_id__in=" + legislator.bioguide_id, function(resultBody) {
          resultBody.results.forEach(function(bills) {
            $("ul#bills").append("<li><a target='_blank' href='" + bills.urls.congress + "''>" + bills.bill_id + "</a></li>").hide().fadeIn();
          });
          $('#myModal').modal('show');
        });
        })
        if (legislator.twitter_id != "null") {
          $("ul#person" + i).append("<a target='_blank' href='http://www.twitter.com/" + legislator.twitter_id + "'><img class='icons' src='icons/twitter.png'>").hide().fadeIn();  
        }
        if (legislator.youtube_id != "null") {
          $("ul#person" + i).append("<a target='_blank' href='http://www.youtube.com/user/" + legislator.youtube_id + "'><img class='icons' src='icons/youtube.png'>").hide().fadeIn();  
        }
        if (legislator.facebook_id != "null") {
          $("ul#person" + i).append("<a target='_blank' href='http://www.facebook.com/" + legislator.facebook_id + "'><img class='icons' src='icons/facebook.png'>").hide().fadeIn();  
        }
        i++;
      });
    });

    return false;
  });
});
