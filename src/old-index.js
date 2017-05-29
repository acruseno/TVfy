/*
NODE MODULES
*/
import $ from 'jquery'

$(function() {
var $tvShowsContainer = $('#app-body').find('.tv-shows')
$tvShowsContainer.on('click', 'button.like', function(ev){
  var $this = $(this)
  $this.closest('.tv-show').toggleClass('liked')
})
var template =  '<article class="tv-show">' +
                    '<div class="left img-container">' +
                      '<img src=":img:" alt=":img alt:">' +
                    '</div>' +
                    '<div class="right info">' +
                      '<h1>:name:</h1>' +
                      '<p>:summary:</p>' +
                      '<button class="like">💖</button>'
                    '</div>' +
                  '</article>';

function renderShows(shows){
$tvShowsContainer.find('.loader').remove()
shows
  .forEach(function(show){
    var article = template
        .replace(':name:', show.name)
        .replace(':img:', show.image ? show.image.medium : '') //si no tiene imagen retona una cadena vacia
        .replace(':summary:', show.summary)
        .replace(':img alt:', show.name + " Logo ")
        
    var $article = $(article)
    $article.hide()
    $tvShowsContainer.append($($article.fadeIn('slow'))) //Muestra lentamente los shows
  })
}

$('#app-body')
  .find('form')
  .submit(function(ev){
    ev.preventDefault()
    var busqueda = $(this).find('input[type="text"]').val()
    var loader = $('<div class="loader">')
    $tvShowsContainer.find('.tv-show').remove()
    loader.appendTo($tvShowsContainer)
    //request ajax
    $.ajax({
      url:'http://api.tvmaze.com/search/shows',
      data: {q: busqueda},
      success: function(res, textstatus, xhr){
        loader.remove()
        var shows = res.map(function(el){ //carga los shows que devuelve la busqueda
          return el.show
        })
        renderShows(shows)
      }
    })
  })

//REQUEST AJAX CON PROMESAS A TVMAZE
if (!localStorage.shows) { //si no esta cargado los shows hacer el request sino usar el localStorage
  $.ajax('http://api.tvmaze.com/shows')
    .then(function (shows){
      $tvShowsContainer.find('.loader').remove()
      localStorage.shows = JSON.stringify(shows)
      renderShows(shows)
  })
}else{
  renderShows(JSON.parse(localStorage.shows))
}


/* REQUEST CON AJAX NORMAL
$.ajax({
  url: 'http://api.tvmaze.com/shows',
  success: function(shows, textstatus, xhr){
    $tvShowsContainer.find('.loader').remove() //despues que se cargan los shows elimina el loader
    renderShows(shows)
  }
})
*/
})
