var applause = new Audio("applause.mp3");

var speed = 400;
var anim_speed = 'slow';

var values_num = 20;
var val_to_search = 16;

var found = false;

var low = 0;
var mid = 0;
var high = 0;

// start();

// Conf form
var conf_form = $("#conf-wrap");
conf_form.submit(function (e) {
  e.preventDefault();
  $("#conf").fadeOut();
  $("#mag").delay(400).addClass("bounceInUp");

  values_num = parseInt($("#num_values").val());
  val_to_search = parseInt($("#val_to_search").val());

  if (val_to_search <= values_num && val_to_search >= 0 && $("#submit-conf").attr("disabled") == undefined) {
    start();
  }
});

$("#run").click(function () {
  $("#submit-conf").click();
});

function start() {
  $("#feedback").fadeOut();

  $("#num_to_look").text(val_to_search);
  
  $.each($("#objects .object"), function () {
    $(this).remove();
  });;

  for (i = 1; i <= values_num; i++) {
    $("#objects").append("<div class='object " + i + "'>" + i + "</div>");
  }
  
  low = 1;
  high = values_num;
  mid = Math.floor((low + high - 1) / 2);
  positionFlags();

  while (!found) {
    checker_pos = $(".object." + mid).offset().left - $("#objects").offset().left + $(".object." + mid).width() / 2;
    
    if (val_to_search > mid) {
        $("#checker").css('animation-name', 'spinRight').css('animation-duration', '2s');
    }

    if (val_to_search < mid) {
        $("#checker").css('animation-name', 'spinLeft').css('animation-duration', '2s');
    }

    $("#checker").animate({ 
        left: checker_pos + 'px',
    }, anim_speed).delay(speed);
    
    if (val_to_search > mid) {
      setTimeout(function () {
      for (i = low; i < mid + 1; i++) {
        $(".object." + i).css('background-color', '#FE2020');
      }
      });
      
      low = mid + 1;
      mid = Math.floor((low + high) / 2);
    } else if (val_to_search < mid) {
      for (i = high; i > mid - 1; i--) {
        $(".object." + i).delay(400).css('background-color', '#FE2020');
      }

      high = mid - 1;
      mid = Math.floor((low + high) / 2);
    } else {
      found = true;
      $("#checker").promise().done(function () {
        $(this).css('background-color', '#5CB85C');
        applause.play();
        $("#feedback").fadeIn().find("span").html(val_to_search);
        //  playAgain()
      });
    }

    positionFlags();
  }
}

function positionFlags () {
  low_pos = $(".object." + low).offset().left - $("#objects").offset().left + $(".object." + low).width() / 2;

  $(".flag#low").animate({ 
        left: low_pos + 'px',
    }, anim_speed).delay(speed);
  
  mid_pos = $(".object." + mid).offset().left - $("#objects").offset().left + $(".object." + mid).width() / 2;

  $(".flag#mid").animate({ 
        left: mid_pos + 'px',
    }, anim_speed).delay(speed);
  
  high_pos = $(".object." + high).offset().left - $("#objects").offset().left + $(".object." + high).width() / 2;

$(".flag#high").animate({ 
    left: high_pos + 'px',
}, anim_speed).delay(speed);
}

function playAgain () {
  //if (confirm("Value found at index " + val_to_search + " Wanna play again?")) {
    $("#conf").show();
    found = false;
    $("#checker").css('left', '0px');
  //}
}

$("#replay").click(function () {
  found = false;
  start();
});

$("#re_conf").click(function () {
  $("#conf #conf-wrap").addClass("swing").addClass("animated");
  
  setTimeout(function () {
    $("#conf #conf-wrap").delay(600).removeClass("swing").removeClass("animated");
  }, 1000);

  playAgain();
});

conf_form.change(function () {
  validateFormat();
});

conf_form.keyup(function () {
  validateFormat();
});

function validateFormat () {
  if (parseInt($("#val_to_search").val()) <= parseInt($("#num_values").val())) {
    $("#run").removeClass("disabled");
    $("#submit-conf").removeAttr("disabled")
  } else {
    $("#run").addClass("disabled");
    $("#submit-conf").attr("disabled", "disabled")
  }
}

$(document).ready(function () {
  setTimeout(function () {
    $("#conf-wrap").fadeIn('slow');
    setTimeout(function () {
      var blop = new Audio("Blop.mp3");
      blop.play();
    }, 100);
  }, 1000);
});