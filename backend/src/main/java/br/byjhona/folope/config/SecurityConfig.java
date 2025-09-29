package br.byjhona.folope.config;


import br.byjhona.folope.autenticacao.FiltroAutenticacao;
import br.byjhona.folope.autenticacao.FiltroAutorizacao;
import br.byjhona.folope.autenticacao.JwtTokenService;
import br.byjhona.folope.autenticacao.ServicoPersonalizadoUsuarioDetalhes;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    private final JwtTokenService jwtService;
    private final ServicoPersonalizadoUsuarioDetalhes userDetailsService;


    public SecurityConfig(JwtTokenService jwtService, ServicoPersonalizadoUsuarioDetalhes userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, AuthenticationManager authenticationManager) throws Exception {

        FiltroAutenticacao filtroAutenticacao = new FiltroAutenticacao(jwtService);
        filtroAutenticacao.setFilterProcessesUrl("/usuario/login");
        filtroAutenticacao.setAuthenticationManager(authenticationManager);


        FiltroAutorizacao filtroAutorizacao = new FiltroAutorizacao(jwtService, userDetailsService);

        http.csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> {
                })
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("usuario/login").permitAll()
                        .requestMatchers("usuario/cadastrar").permitAll()
                        .anyRequest().authenticated()
                )
                .addFilter(filtroAutenticacao)
                .addFilterAfter(filtroAutorizacao, FiltroAutenticacao.class);
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


}
