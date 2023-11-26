package com.mystack.techblog.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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

    @Value("${api.security.cors.originPatterns}")
    private String applicationUrls;

    public void sendConfirmationEmail(String email, String firstName) {
        SimpleMailMessage message = new SimpleMailMessage();
        String url = applicationUrls.split(",")[0];

        String token;

        try {
            token = tokenService.generateAccountConfirmationToken(email);
        } catch (Throwable e) {
            throw new RuntimeException("Falha ao tentar gerar token. Tente novamente mais tarde");
        }

        message.setFrom("AllTech@mystack.site");
        message.setTo(email);
        message.setSubject("Confirmação de e-mail - All Tech Blog");
        message.setText("Olá, " + firstName + "!\nEste é um e-mail de confirmação para o seu registro em nosso blog.\n\nPara concluir o cadastro, acesse o link a seguir e faça login:\n" + url + "/auth/confirm/" + token + "\n\nEste código é válido por 60 minutos. Após isto, será necessário registrar-se novamente.\n\nSe não foi você quem tentou se cadastrar em nosso site, mande-nos um e-mail ou ignore esta mensagem.");

        try {
            mailSender.send(message);
        } catch(MailException e) {
            throw new RuntimeException("Falha ao enviar e-mail");
        }
    }

    public void sendRecoverPasswordEmail(String email, String firstName) {
        SimpleMailMessage message = new SimpleMailMessage();
        String url = applicationUrls.split(",")[0];

        String token;

        try {
            token = tokenService.generateRecoverPasswordToken(email);
        } catch (Throwable e) {
            throw new RuntimeException("Falha ao tentar gerar token. Tente novamente mais tarde");
        }

        message.setFrom("AllTech@mystack.site");
        message.setTo(email);
        message.setSubject("Recuperação de senha - All Tech Blog");
        message.setText("Olá, " + firstName + "!\nEste é um e-mail para recuperação da sua senha.\n\nPara acessar sua conta, visite o link a seguir e faça login com a nova senha desejada:\n\n" + url + "/auth/recover/" + token + "\n\nEste código é válido por 60 minutos. Após isto, será necessário solicitar a recuperação de senha novamente.\n\nSe não foi você quem tentou recuperar a senha em nosso site, mande-nos um e-mail ou ignore esta mensagem.");

        try {
            mailSender.send(message);
        } catch(MailException e) {
            throw new RuntimeException("Falha ao enviar e-mail");
        }
    }
}
