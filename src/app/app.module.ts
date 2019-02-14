import { NgModule }           from '@angular/core';
import { BrowserModule }      from '@angular/platform-browser';
import { FormsModule }        from '@angular/forms';


/* App Root */
import { AppComponent }       from './app.component';
import { NavbarComponent }    from './navbar/navbar.component';

/* Feature Components */
import { PersonalComponent }  from './personal/personal.component';
import { WorkComponent }      from './work/work.component';
import { AddressComponent }   from './address/address.component';
import { ResultComponent }    from './result/result.component';

/* Routing Module */
import { AppRoutingModule }   from './app-routing.module';
//import {appRoutes }   from './routing';
//import { RouterModule } from '@angular/router';

/* Shared Service */
import { FormDataService }    from './data/formData.service';
import { WorkflowService }    from './workflow/workflow.service';
import { RegserviceService } from './servers/regservice.service';
import { HttpModule } from '@angular/http';
import { RegistraionComponent } from './registraion/registraion.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';


import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { ResetpwComponent } from './resetpw/resetpw.component';
import { NewpwComponent } from './resetpw/newpw/newpw.component';
import { RegisComponent } from './regis/regis.component';
import { AddpostComponent } from './user-profile/addpost/addpost.component';
import { PostComponent } from './post/post.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { RatingComponent } from './post/rating/rating.component';
@NgModule({
    imports:      [ BrowserModule, 
                    FormsModule,
                    AppRoutingModule,
                    HttpModule, 
                    HttpClientModule,
                    FlashMessagesModule,
                    AngularFireModule.initializeApp({
                        apiKey: "AIzaSyD3dyNOte2kt3vQd1KjhivBe9Ahc3dtCiY",
                        authDomain: "parkherefiles.firebaseapp.com",
                        storageBucket: "parkherefiles.appspot.com",
                        projectId: "parkherefiles",
                      }),
                      AngularFireStorageModule,
                    //RouterModule.forRoot(appRoutes),
                  ],
    providers:    [{
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      },AuthGuard ,FlashMessagesService,{ provide: FormDataService, useClass: FormDataService},
                   { provide: WorkflowService, useClass: WorkflowService },RegserviceService],
    declarations: [ AppComponent, NavbarComponent, PersonalComponent, WorkComponent, AddressComponent, ResultComponent, RegistraionComponent, SignInComponent, UserProfileComponent, ResetpwComponent, NewpwComponent, RegisComponent, AddpostComponent, PostComponent, SearchBarComponent, RatingComponent],
    bootstrap:    [ AppComponent ]
})
 
export class AppModule {}