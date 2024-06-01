package com.avellaneda.pruebamongo.configuration;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Objects;
import java.util.Properties;

@Configuration
public class MailConfig {

    @Autowired
    private Dotenv dotenv;

    @Bean
    public JavaMailSender javaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();

        mailSender.setHost(dotenv.get("SMTP_HOST"));
        mailSender.setPort(Integer.parseInt(Objects.requireNonNull(dotenv.get("SMTP_PORT")))); // Set your port
        mailSender.setUsername(dotenv.get("SMTP_USERNAME"));
        mailSender.setPassword(dotenv.get("SMTP_PASSWORD"));

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");

        return mailSender;
    }
}
