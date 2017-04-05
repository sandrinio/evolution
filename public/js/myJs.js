$(document).ready(function() {




  var c1Val;
  var c2Val;
  var c3Val;
  var c4Val;
  var competencyScore = c1Val + c2Val + c3Val + c4Val;

  $('#input-c1').on('rating.change', function(event, value, caption) {
    c1Val = +value;
  });

  $('#input-c2').on('rating.change', function(event, value, caption) {
    c2Val = +value;
  });

  $('#input-c3').on('rating.change', function(event, value, caption) {
    c3Val = +value;
  });

  $('#input-c4').on('rating.change', function(event, value, caption) {
    c4Val = +value;
  });



  // $('#cScore').html('<em>საშუალო ქულა:</em> <strong>' + c1Val + c2Val + c3Val + c4Val + '</strong>');
  $('#btn-test').on('click', function () {

    console.log(typeof(competencyScore));
    console.log(competencyScore);
    $('#cScore').html('<em>საშუალო ქულა:</em> <strong>' + competencyScore  + '</strong>');
  })

});