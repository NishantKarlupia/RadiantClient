import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { StoreComponent } from './components/store/store.component';
import { AboutComponent } from './components/about/about.component';
import { CommunityComponent } from './components/community/community.component';
import { MatCardModule } from '@angular/material/card';
import { LoginComponent } from './components/login/login.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from './services/auth.interceptor';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminSidebarComponent } from './admin/admin-sidebar/admin-sidebar.component';
import {MatListModule} from '@angular/material/list';
import { AdminAllgamesComponent } from './admin/admin-allgames/admin-allgames.component';
import { AdminAddgameComponent } from './admin/admin-addgame/admin-addgame.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AdminUpdategameComponent } from './admin/admin-updategame/admin-updategame.component';
import { GameComponent } from './components/game/game.component';
import { AllQuestionsComponent } from './components/all-questions/all-questions.component';
import { AddQuestionComponent } from './components/add-question/add-question.component';
import { QuestionComponent } from './components/question/question.component';
import { DeleteQuestionComponent } from './components/delete-question/delete-question.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { AddAnswerComponent } from './components/add-answer/add-answer.component';
import { AllExperiencesComponent } from './components/all-experiences/all-experiences.component';
import { AddExperienceComponent } from './components/add-experience/add-experience.component';
import { ToastrModule } from 'ngx-toastr';
import { FooterComponent } from './components/footer/footer.component';
import { CategoryComponent } from './components/category/category.component';
import { AdminStatsComponent } from './admin/admin-stats/admin-stats.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { CartComponent } from './components/cart/cart.component';
import { UserSidebarComponent } from './components/user-sidebar/user-sidebar.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserGamesComponent } from './components/user-games/user-games.component';
import { UserCartComponent } from './components/user-cart/user-cart.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    StoreComponent,
    AboutComponent,
    CommunityComponent,
    LoginComponent,
    SignupComponent,
    AdminDashboardComponent,
    AdminSidebarComponent,
    AdminAllgamesComponent,
    AdminAddgameComponent,
    AdminUpdategameComponent,
    GameComponent,
    AllQuestionsComponent,
    AddQuestionComponent,
    QuestionComponent,
    DeleteQuestionComponent,
    AddAnswerComponent,
    AllExperiencesComponent,
    AddExperienceComponent,
    FooterComponent,
    CategoryComponent,
    AdminStatsComponent,
    UserProfileComponent,
    CartComponent,
    UserSidebarComponent,
    UserDetailsComponent,
    UserGamesComponent,
    UserCartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    HttpClientModule,
    MatListModule,
    CKEditorModule,
    MatProgressBarModule,
    ToastrModule.forRoot({preventDuplicates:true})
    
  ],
  providers: [provideAnimationsAsync(),authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
