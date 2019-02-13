import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { FormDataService } from '../data/formData.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class RegserviceService {
  url = "http://localhost:3000/api";
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient, private formDataService: FormDataService) { }

  storedetails() {
    return this.http.post(this.url + '/register', this.formDataService.getFormData(), this.noAuthHeader);
  }

  login(authCredentials) {
    console.log(authCredentials);
    return this.http.post(this.url + '/authenticate', authCredentials, this.noAuthHeader);
  }
  getUserProfile() {
    return this.http.get(this.url + '/userProfile');
  }

  getAllPosts() {
    return this.http.get(this.url + '/all');
  }
  getpost(id, user) {
    console.log(id)
    return this.http.post(this.url + '/post/' + id, user)
  }
  likeBlog(like) {
    return this.http.post(this.url + "/like", like)
  }
  dislikeBlog(dislike) {
    return this.http.post(this.url + "/dislike", dislike)
  }

  postComment(comment) {
    // Create blogData to pass to backend

    return this.http.post(this.url+"/comment", comment)

  }
  deletepost(post){
    return this.http.post(this.url+"/delete",post)
  }
rate(rate){
  return this.http.post(this.url+'/rate',rate)
}

  post(data) {
    return this.http.post(this.url + '/newpost', data)
  }
  rstpw(email) {
    return this.http.put(this.url + '/rstpw', email);
  }

  newpassword(token) {

    return this.http.get(this.url + '/resetpassword/' + token);

  }

  savepassword(password) {
    return this.http.put(this.url + '/savepassword', password);
  }

  fromdata(form) {
    return this.http.post(this.url + '/register', form);
  }

  //Helper Methods

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
}
