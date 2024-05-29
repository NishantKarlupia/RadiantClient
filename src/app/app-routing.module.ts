import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StoreComponent } from './components/store/store.component';
import { AboutComponent } from './components/about/about.component';
import { CommunityComponent } from './components/community/community.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminAllgamesComponent } from './admin/admin-allgames/admin-allgames.component';
import { AdminAddgameComponent } from './admin/admin-addgame/admin-addgame.component';
import { AdminUpdategameComponent } from './admin/admin-updategame/admin-updategame.component';
import { GameComponent } from './components/game/game.component';
import { AllQuestionsComponent } from './components/all-questions/all-questions.component';
import { AddQuestionComponent } from './components/add-question/add-question.component';
import { QuestionComponent } from './components/question/question.component';
import { DeleteQuestionComponent } from './components/delete-question/delete-question.component';
import { AddAnswerComponent } from './components/add-answer/add-answer.component';
import { AllExperiencesComponent } from './components/all-experiences/all-experiences.component';
import { AddExperienceComponent } from './components/add-experience/add-experience.component';
import { CategoryComponent } from './components/category/category.component';
import { AdminStatsComponent } from './admin/admin-stats/admin-stats.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { CartComponent } from './components/cart/cart.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserGamesComponent } from './components/user-games/user-games.component';
import { UserCartComponent } from './components/user-cart/user-cart.component';

const routes: Routes = [
  {
    path:"",
    component:HomeComponent,
    pathMatch:"full"
  },
  {
    path:"store",
    component:StoreComponent,
    pathMatch:"full"
  },
  {
    path:"about",
    component:AboutComponent,
    pathMatch:"full"
  },
  {
    path:"community",
    component:CommunityComponent,
    pathMatch:"full"
  },
  {
    path:"login",
    component:LoginComponent,
    pathMatch:"full"
  },
  {
    path:"signup",
    component:SignupComponent,
    pathMatch:"full"
  },
  {
    path:"game/:gid",
    component:GameComponent,
    pathMatch:"full"
  },
  {
    path:"questions",
    component:AllQuestionsComponent,
    pathMatch:"full"
  },

  {
    path:"askquestion",
    component:AddQuestionComponent,
    pathMatch:"full"
  },

  {
    path:"question/:quesId",
    component:QuestionComponent,
    pathMatch:"full"
  },

  {
    path:"question/delete/:quesId",
    component:DeleteQuestionComponent,
    pathMatch:"full"
  },

  {
    path:"answer/question/:quesId",
    component:AddAnswerComponent,
    pathMatch:"full"
  },

  {
    path:"experiences",
    component:AllExperiencesComponent,
    pathMatch:"full"
  },

  {
    path:'experience/add',
    component:AddExperienceComponent,
    pathMatch:"full"
  },
  {
    path:'games/category/:category',
    component:CategoryComponent,
    pathMatch:"full"
  },

  {
    path:"user",
    component:UserProfileComponent,
    children:[
      {
        path:"details",
        component:UserDetailsComponent,
        pathMatch:"full"
      },
      {
        path:"games",
        component:UserGamesComponent,
        pathMatch:"full"
      },
      {
        path:"cart",
        component:UserCartComponent,
        pathMatch:"full"
      }
    ]
  },

  {
    path:"checkout",
    component:CartComponent,
    pathMatch:"full"
  },


  

  {
    path:"admin",
    component:AdminDashboardComponent,
    children:[
      {
        path:"",
        component:AdminStatsComponent
      },
      {
        path:"games",
        component:AdminAllgamesComponent
      },
      {
        path:"game/add",
        component:AdminAddgameComponent
      },
      {
        path:"game/update/:gid",
        component:AdminUpdategameComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
