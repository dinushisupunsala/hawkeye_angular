import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalComponent }    from './personal/personal.component';
import { WorkComponent }        from './work/work.component';
import { AddressComponent }     from './address/address.component';
import { ResultComponent }      from './result/result.component';

import { WorkflowGuard }        from './workflow/workflow-guard.service';
import { WorkflowService }      from './workflow/workflow.service';
import { SignInComponent } from './sign-in/sign-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './auth/auth.guard';
import { RegistraionComponent } from './registraion/registraion.component';
import { ResetpwComponent } from './resetpw/resetpw.component';
import { NewpwComponent } from './resetpw/newpw/newpw.component';
import { RegisComponent } from './regis/regis.component';
import { PostComponent } from './post/post.component';

export const appRoutes: Routes = [


    // 1st Route
 {path: 'reg',  component: RegistraionComponent,children:[ 
   { path: 'personal',  component: PersonalComponent },
  // 2nd Route
  { path: 'work',  component: WorkComponent, canActivate: [WorkflowGuard] },
  // 3rd Route
  { path: 'address',  component: AddressComponent, canActivate: [WorkflowGuard] },
  // 4th Route
  { path: 'result',  component: ResultComponent, canActivate: [WorkflowGuard] },
    // 5th Route
  { path: '',   redirectTo: 'personal', pathMatch: 'full' },
  //{ path: '**', redirectTo: 'personal', pathMatch: 'full' }
]},
    // 6th Route
 // { path: 'reg',  component: RegistraionComponent },
  {path: 'login', component: SignInComponent,},
  {path: 'userprofile', component: UserProfileComponent,canActivate:[AuthGuard]},
  {path: 'resetpassword', component: ResetpwComponent},
  {path: 'newpassword/:token', component: NewpwComponent},
  {path:'regis',component:RegisComponent},
  {path:'post/:id',component:PostComponent}
  
  //{ path: '**', component: SignInComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes 
   // ,{ useHash: true}
   )],
  exports: [RouterModule],
  providers: [WorkflowGuard]
})

export class AppRoutingModule {}