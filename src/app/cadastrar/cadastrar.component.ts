import { Component, OnInit } from '@angular/core';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router'
import { AlertasService } from '../service/alertas.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  isCpf: boolean = true

  usuario: Usuario = new Usuario
  confirmarSenha: string
  tipoUser: string
  tipoDoc: string

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertas: AlertasService
  ) { }


  ngOnInit() {
    window.scroll(0, 0)
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value

  }

  tipoUsuario(event: any) {
    this.tipoUser = event.target.value

  }
  
  tipoDocumento(event: any) {
    this.tipoDoc = event.target.value
  }

  cadastrar() {
    this.usuario.tipo = this.tipoUser
    this.usuario.documento = this.tipoDoc

    if (this.usuario.senha != this.confirmarSenha) {
      this.alertas.showAlertDanger('As senhas estão incorretas.')

    } else {
      this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp
        this.router.navigate(['/login'])


        this.alertas.showAlertSuccess("Usuario cadastrado com sucesso!")
      })

    }


  }

  onChangeCheckBox() {
    if (this.isCpf == false) {
      this.isCpf = true
    } else {
      this.isCpf = false
    }
  }
}
