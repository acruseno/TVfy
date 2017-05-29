import $ from 'jquery'

export function getShows(callback){
	$.ajax('http://api.tvmaze.com/shows', {
		success: function(shows, textStatus, xhr){
			callback(shows)
		}
	})
}
export function searchShows(busqueda, callback){
	$.ajax('http://api.tvmaze.com/search/shows',{
		data:busqueda,
		success: function(res, textStatus, xhr){
			callback(res)
		}
	})
}