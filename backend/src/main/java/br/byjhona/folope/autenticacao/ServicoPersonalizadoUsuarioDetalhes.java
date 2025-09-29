package br.byjhona.folope.autenticacao;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class ServicoPersonalizadoUsuarioDetalhes implements UserDetailsService {

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        String senhaCriptografada = new BCryptPasswordEncoder().encode("123456");
        return User.builder()
                .username("jhonatan")
                .password(senhaCriptografada)
                .authorities(Collections.emptyList())
                .build();
    }
}
