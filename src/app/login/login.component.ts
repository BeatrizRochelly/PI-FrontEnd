import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuarioLogin: UsuarioLogin = new UsuarioLogin()

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {

    window.scroll(0,0)   
  }

  entrar(){
    this.auth.entrar(this.usuarioLogin).subscribe((resp: UsuarioLogin) =>{
      this.usuarioLogin = resp

      //environment.token = this.usuarioLogin.token  //depois dele logar antes de ir pro inicio ele faz toda essas alterações
      //environment.nome = this.usuarioLogin.nome
      //environment.foto = this.usuarioLogin.foto
      //environment.id = this.usuarioLogin.id


      this.router.navigate(['/inicio'])
     }, erro =>{
      if (erro.status == 401 && erro.status == 500){
        alert('Usuário ou senha estão incorretos')
      }
    })
  

  }
}
