package br.byjhona.folope;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class FolopeApplication {

    public static void main(String[] args) {
        SpringApplication.run(FolopeApplication.class, args);
    }

}
