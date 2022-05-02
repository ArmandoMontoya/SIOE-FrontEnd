import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import {SharedModule} from '../../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FileUploadModule } from '@iplab/ngx-file-upload';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule
  ]
})
export class LoginModule {}
