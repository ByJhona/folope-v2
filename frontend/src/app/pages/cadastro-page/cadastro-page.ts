import { UsuarioCadastroInterface } from '../../types/UsuarioCadastroInterface';
import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'folope-cadastro-page',
  imports: [ReactiveFormsModule],
  templateUrl: './cadastro-page.html',
  styleUrl: './cadastro-page.scss',
})
export class CadastroPage {
  private readonly auth = inject(AuthService);
  cadastroForm = new FormGroup({
    apelido: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    senha: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  cadastrar(): void {
    if (this.cadastroForm.invalid) return;
    const usuario: UsuarioCadastroInterface = {
      nomeUsuario: this.cadastroForm.value.apelido!,
      senha: this.cadastroForm.value.senha!,
    };
    this.auth.cadastrar(usuario).subscribe((usuario) => {
      // TODO - mostrar mensagem de sucesso num snackbar
      console.log('Usuário cadastrado com sucesso', usuario);
      this.redirecionarParaLogin();
    });
  }

  redirecionarParaLogin(): void {
    this.cadastroForm.reset();
    setTimeout(() => {
      this.auth.login();
    }, 1000);
  }

  obterControleFormulario(nomeControle: string) {
    return this.cadastroForm.get(nomeControle) as FormControl;
  }
}
