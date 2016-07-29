$('.button').on('click', function(e) {
  $('.display').text(this.innerText);
  setTimeout(function() {
    $('.display').text('');
  }, 300);
});