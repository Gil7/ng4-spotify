import { Injectable } from '@angular/core';
import {Http,Headers,Response} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SpotifyService {
  private searchUrl:string;
  private redirect_uri:string;
  private client_id ='996080937ebb4594a0979146c9c0c121';
  private client_secret = '0bda3cfd213c4622bc6c562586568ec8';
  private access_token:string;
  private ArtistUrl: string;
  private AlbumsUrl:string;
  private AlbumUrl:string;
  private encoded = btoa(this.client_id + ':' + this.client_secret);
private base64 = 'OTk2MDgwOTM3ZWJiNDU5NGEwOTc5MTQ2YzljMGMxMjE6MGJkYTNjZmQyMTNjNDYyMmJjNmM1NjI1ODY1NjhlYzg=';
  constructor(private http:Http) { 
    console.log("service initialized")
  }
  getToken(){
      // let params : URLSearchParams = new URLSearchParams();
      // params.set('grant_type' , 'client_credentials');
      // let body = params.toString();
       let params = ('grant_type=client_credentials');
  
       let headers = new Headers();
       headers.append( 'Authorization', 'Basic ' + this.encoded);
      
       headers.append('Content-Type' , 'application/x-www-form-urlencoded');
  
       return this.http.post('https://accounts.spotify.com/api/token', params , {headers : headers} )
       .map(res=> res.json());
  }
  searchMusic(str:string, type="artist",token:string){
    this.searchUrl = 'https://api.spotify.com/v1/search?query='+str+'&offset=0&limit=20&type='+type+'&market=US';
    let headers = new Headers();
    headers.append('Authorization' , 'Bearer ' + token);

    return this.http.get(this.searchUrl,{headers: headers})
    .map( (res:Response) => res.json());
  }
  getArtist(id:string,token:string){
    this.ArtistUrl = 'https://api.spotify.com/v1/artists/' + id;
    let headers = new Headers();
    headers.append('Authorization' , 'Bearer ' + token);
    return this.http.get(this.ArtistUrl, {headers:headers})
      .map(res => res.json());
  }
  getAlbums(artistId:string,token:string){
    this.AlbumsUrl = 'https://api.spotify.com/v1/artists/' + artistId + '/albums';
    let headers = new Headers();
    headers.append('Authorization' , 'Bearer ' + token);
    return this.http.get(this.AlbumsUrl, {headers:headers})
      .map(res => res.json());
  }
  getAlbum(id:string,token:string){
    this.AlbumUrl = 'https://api.spotify.com/v1/albums/' + id;
    let headers = new Headers();
    headers.append('Authorization' , 'Bearer ' + token);
    return this.http.get(this.AlbumUrl, {headers:headers})
      .map(res => res.json());
  }
}
