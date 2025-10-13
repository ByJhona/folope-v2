import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { CadastroUsuarioInterface } from '../../types/CadastroUsuarioInterface';

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

  cadastrar() {
    if (this.cadastroForm.invalid) return;
    const usuario: CadastroUsuarioInterface = {
      apelido: this.cadastroForm.value.apelido!,
      senha: this.cadastroForm.value.senha!,
    };
    this.auth.cadastrar(usuario).subscribe((usuario) => {
      console.log('Usuário cadastrado com sucesso', usuario);
      this.cadastroForm.reset();
      this.auth.login();
    });
  }

  obterControleFormulario(nomeControle: string) {
    return this.cadastroForm.get(nomeControle) as FormControl;
  }
}
