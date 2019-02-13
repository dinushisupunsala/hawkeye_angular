import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RegserviceService } from '../servers/regservice.service';
import * as decode from 'jwt-decode';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(public router: Router, public route: ActivatedRoute, public service: RegserviceService, private flashMessage: FlashMessagesService) { }
  public id;
  post;
  message;

  userDetails;
  public user = { 
    userId: ''
  };

  // rat
public rateobj={
  rate:Number,
  id:'',
  userId:''
}
//
  username = "charindu"
  public userId;
  public like = {
    userId: '',
    id: ''
  }
  public com = {
    comment: '',
    userId: '',
    id: ''
  }

  ngOnInit() {
    this.com.comment = ""
    this.message = ""
    const token = this.service.getToken();
    console.log(token)
    const tokenPayload = decode(token);
    this.user.userId = tokenPayload._id
    this.like.userId = tokenPayload._id
    this.com.userId = tokenPayload._id
    this.rateobj.userId=tokenPayload._id
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.service.getpost(this.id, this.user).subscribe(res => {
      console.log(res)
      this.post = res['post'];

    })
  }

  likepost(id) {
    this.like.id = id;
    

    // Service to like a blog post
    this.service.likeBlog(this.like).subscribe(data => { //send like details to backend
      console.log(data)
      this.message = data['message'];
      let success = data['success'];
      if (success)
        this.ngOnInit();
      else setTimeout(() => {    //<<<---    using ()=> syntax
        this.message = false;
      }, 3000);

    });


  }

  

  dislikepost(id) {
    this.like.id = id;
    // Service to dislike a blog post
    this.service.dislikeBlog(this.like).subscribe(data => {
      console.log(data)
      this.message = data['message'];
      let success = data['success'];
      if (success)

        this.ngOnInit();
      else setTimeout(() => {    //<<<---    using ()=> syntax
        this.message = false;
      }, 3000);

      // this.ngOnInit(); // Refresh blogs after dislike
    });
  }

  comment(id) {
    this.com.id = id;
    console.log(this.com)
    this.service.postComment(this.com).subscribe(res => {
      console.log(res)
      this.ngOnInit();
    })
  }

  delete(id) {
    this.like.id = id
    console.log(this.like)
    this.service.deletepost(this.like).subscribe(data => {
      // console.log(res);
      this.message = data['message'];
      let success = data['success'];
      if (success)
        this.router.navigate(['userprofile'])
      else setTimeout(() => {    //<<<---    using ()=> syntax
        this.message = false;
      }, 3000);

      // this.ngOnInit(); // Refresh blogs after dislike

    })
  }



ratepost(id){
  this.rateobj.id=id
  let r=this.rateobj.rate
  this.rateobj.rate=parseInt(r)

  this.service.rate(this.rateobj).subscribe(data=>{
    this.message = data['message'];
      let success = data['success'];
      if (success)
        this.ngOnInit()
      else
    setTimeout(() => {    //<<<---    using ()=> syntax
        this.message = false;
      }, 3000);
  })
}
}
