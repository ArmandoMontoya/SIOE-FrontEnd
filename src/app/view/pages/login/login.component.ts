import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/data/service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // uploaderkey: FileUploader = new FileUploader({ url: URL, isHTML5: true });

  public keyFile: File = null;

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(private _auth: AuthenticationService, private _route: ActivatedRoute, private _router: Router, private _formBuilder: FormBuilder) {
    // this._auth.logout();
    this.loginForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  }

  ngOnInit() {
  }

  get f(): any { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid)
      return;

    const info: any = {
      usuario: this.f.username.value,
      contrasena: this.f.password.value
    };

    this._auth.iniciarSesion(JSON.stringify(info)).pipe()
      .subscribe(data => {
        if (data.estatus === true) {
          this._router.navigate([this.returnUrl]);
        } else {
          this.error = data.mensaje;
          this.loading = false;
        }
      }, error => {
        this.error = error;
      });
  }

  validarFirma(files: FileList) {
    if(files.length > 0)
    {
      this.keyFile = files.item(0);
      let datos = new FormData();
      datos.append('key', this.keyFile, this.keyFile.name);

      this._auth.iniciarSesionFirmaElectronica(datos).pipe()
        .subscribe(data => {
          if (data.estatus == true) {
            this._router.navigate([this.returnUrl]);
          } else {
            this.error = data.mensaje;
            this.loading = false;
          }
        }, error => {
          this.error = error;
          this.loading = false;
        }
      );
    }
  }
}
