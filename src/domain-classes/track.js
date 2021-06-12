const { Artist } = require('./artist');
class Track {
  constructor(
            id=null,
            name=null,
            duration=null,
            album=null,
            genres=null,
            artist=null
        ){
        
        this.id = id;
        this.name = name;
        this.duration = duration;
        this.album = album;
        this.genres = genres;
        this.artist = artist;
        this.lyrics= "";
  }

    getIdTrack(){return this.id;}
    getName(){return this.name;}
    getDuration(){return this.duration;}
    getAlbumId(){return this.album;}
    getGenres(){return this.genres;}
    getArtists(){return this.artist;}

    async getLyrics(){
      if(this.lyrics == ""){
        const rp = require('request-promise');
        const BASE_URL = "https://api.musixmatch.com/ws/1.1/"
        const apikey = 'e0283ca2b405c3f3342ac66ca27862e1'
        const options= {
          uri: BASE_URL + "matcher.lyrics.get",
          qs: {
            q_artist: this.artist.name,
            q_track: this.name,
            apikey: apikey,
          },
          json: true 
        }
        this.lyrics = await rp.get(options).then((response) =>{
          console.log(response.message.body.lyrics.lyrics_body)
          return response.message.body.lyrics.lyrics_body
        })
        .catch(error => 
          console.log(error)) 
      }
    }
}
const muse = new Artist(null,"Muse",null)
const uno = new Track(null,"Uno", null,null,null,muse)

async function preguntar2veces(){
 await uno.getLyrics()
 await uno.getLyrics()
}


preguntar2veces()
module.exports = {
    Track: Track,
  };