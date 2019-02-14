import { Component, OnInit } from '@angular/core';
import { RegserviceService } from '../servers/regservice.service';
import { Router } from "@angular/router";
import { finalize } from 'rxjs/operators';
import { FileUploader } from 'ng2-file-upload';
import { FlashMessagesService } from 'angular2-flash-messages';
// import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { PostComponent } from '../post/post.component';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userDetails: any;
  pic;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  downloadURL: Observable<string>;
  profileUrl: Observable<string>;
  isloading
  constructor(private service: RegserviceService, private afStorage: AngularFireStorage, private router: Router, private flashMessage: FlashMessagesService) { }
  newpost = {
    title: '',
    body: '',
    createdBy: ''
  }
  date = Date.now()





  ngOnInit() {

    
    this.newpost.title = '';
    this.newpost.body = '';
    this.isloading = false
    this.getAllPosts();
    this.service.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        this.newpost.createdBy = this.userDetails.firstName
        console.log(res);
      },
      err => {
        console.log(err);

      });

  }




  onLogout() {
    this.service.deleteToken();
    this.router.navigate(['/login']);
  }




  Posts;
  getAllPosts() {
    // Function to GET all Posts from database
    this.service.getAllPosts().subscribe(data => {
      console.log(data);

      this.Posts = data['posts']; // Assign array to use in HTML
    });
  }







  // add a new post---------------------------------------------------------------
  post() {
    console.log(this.newpost)
    this.service.post(this.newpost).subscribe(res => {
      console.log(res)
      let message = res['message'];
      let success = res['success'];
      if (!success)
        this.flashMessage.show(message, { cssClass: 'alert-danger', timeout: 3000 });
      else {
        this.flashMessage.show(message, { cssClass: 'alert-success', timeout: 3000 });
        this.ngOnInit();
      }
    })
  }





  read(id) {
    console.log(id)
    // this.router.navigate(['newpassword']);
    this.router.navigate(['post/' + id])
    
  }


  // pic = "";
  private files = [];
  id = '';
  private url = '';
  // isloading=false
  private uploader: FileUploader;


  upload(event) {
    
  }
title;
  type(title){
    if(this.title)
return title==this.title
return true
 }

 changtitle(title){
   
  //  if(title==1)
  if(title=="all")
  this.title=null
  else
   this.title=title;
   console.log(this.title)
   this.ngOnInit()
 }
}

