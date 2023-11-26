package com.mystack.techblog.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.mystack.techblog.services.auth.TokenService;

@Service
public class MailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private TokenService tokenService;

    public void sendConfirmationEmail(String email, String firstName) {
        SimpleMailMessage message = new SimpleMailMessage();

        String token;

        try {
            token = tokenService.generateAccountConfirmationToken(email);
        } catch (Throwable e) {
            throw new RuntimeException("Falha ao tentar gerar token. Tente novamente mais tarde");
        }

        message.setFrom("AllTech@mystack.site");
        message.setTo(email);
        message.setSubject("Confirmação de e-mail - All Tech Blog");
        message.setText("Olá, " + firstName + "!\nEste é um e-mail de confirmação para o seu registro em nosso blog.\n\nPara concluir o cadastro, acesse o link a seguir e faça login:\nhttps://altech.mystack.site/auth/confirm/" + token + "\n\nSe não foi você, mande-nos um e-mail ou apenas ignore esta mensagem.");

        try {
            mailSender.send(message);
        } catch(MailException e) {
            throw new RuntimeException("Falha ao enviar e-mail");
        }
    }
}
