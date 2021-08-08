$(function() {
  $('nav a, a.scroll').on('click', function(e){
    e.preventDefault();
    var href = $(this).attr('href');
    if (href.includes('#')){
      scrollToAnchor(href);
    }else{
      window.location = href;
    }
  });
});

function scrollToAnchor(aid){
  var aTag = $(aid);
  $('html,body').animate({scrollTop: aTag.offset().top - 90},'slow');
}