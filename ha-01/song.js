/* 
 * Keeping Up With the Javascripts - Home assignment #1
 * 
 * Think of all the attributes that you could use to describe a song, all of it's details or "meta-data".
 */

// so-far figured out song attributes
// 
var title = 'Aerial Boundaries';
var artist = 'Michael Hedges';
var durationSeconds = 285;
// songs could share the same album
var album = {
    name : 'Aerial Boundaries',
    label : 'Windham Hill Records',
    labelcode : 'WD-1032',
    firstRelease: true,
    format : 'CD'
}; 
// publishing country
var country = 'US';
// release year
var released = 1984;
// genre tags
var genre = ['Rock', 'Folk', 'World', 'Country'];
// style tags
var style = ['New Age', 'Acoustic', 'Neofolk'];

// one object to rule them all
var song = {
    title : title,
    artist : artist,
    durationSeconds : durationSeconds,
    album : album,
    country : country,
    released : released,
    genre : genre,
    style : style,
    voice : false
} ;

// prints song attributes
console.log('title ', title);
console.log('artist', artist);
console.log('durationSeconds', durationSeconds);
console.log('album', album);
console.log('album name', album.name);
console.log('album label', album.label);
console.log('album label code', album.labelcode);
console.log('album is first release', album.firstRelease);
console.log('album format', album.format);
console.log('release country', country);
console.log('release year', released);
console.log('genre', genre);
console.log('style', style);
console.log('voice', song.voice); // not represented as an independend 'var' like others


// prints all song representation
console.log(song);
