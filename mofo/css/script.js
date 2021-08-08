$(function() {
  $('nav a').on('click', function(e){
    e.preventDefault();
    var href = $(this).attr('href');
    if (href.includes('#')){
      scrollToAnchor(href);
    }else{
      window.location = href;
    }
  });
});