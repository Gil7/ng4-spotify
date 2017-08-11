import { Component, OnInit } from '@angular/core';
import {Album} from '../../Album';
import {Artist} from '../../Artist';
import {SpotifyService} from '../../services/spotify.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  moduleId:module.id,
  selector: 'artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
  id:string;
  artist: Artist[];
  albums:Album[];
  constructor(private spotifyService:SpotifyService, private route:ActivatedRoute) { }

  ngOnInit() {
    //get info about the artist
    this.route.params.map(params => params['id']).subscribe((id) => {
      this.spotifyService.getToken().subscribe(res => {
        this.spotifyService.getArtist(id, res.access_token).subscribe(artist => {
          this.artist = artist; 
          console.log(artist.images[0].url);
        });
        this.spotifyService.getAlbums(id, res.access_token).subscribe(albums => {
          this.albums = albums.items; 
          console.log(albums.items)
        });
      })
    });
    //get artist's albums
    
  }

}
