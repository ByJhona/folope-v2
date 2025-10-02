import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'folope-autenticacao-page',
  imports: [ReactiveFormsModule],
  templateUrl: './autenticacao-page.html',
  styleUrl: './autenticacao-page.scss',
})
export class AutenticacaoPage {
  private readonly auth = inject(AuthService);
  loginForm = new FormGroup({
    apelido: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    senha: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  login() {
    if (this.loginForm.invalid) return;

    this.auth
      .login(this.loginForm.value.apelido!, this.loginForm.value.senha!)
      .subscribe({
        next: (response: any) => {
          console.log('Login bem-sucedido:', response);
        },
        error: (error: any) => {
          console.error('Erro no login:', error);
        },
      });
  }

  obterControleFormulario(nomeControle: string) {
    return this.loginForm.get(nomeControle) as FormControl;
  }
}
