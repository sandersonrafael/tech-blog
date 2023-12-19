package com.mystack.techblog.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.mystack.techblog.entities.email.ContactRequest;
import com.mystack.techblog.repositories.NewsletterSubscriberRepository;
import com.mystack.techblog.services.auth.TokenService;

@Service
public class MailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private NewsletterSubscriberRepository subscriberRepository;

    @Value("${api.security.cors.originPatterns}")
    private String applicationUrls;

    @Value("${spring.mail.username}")
    private String applicationEmail;

    public void requestEmailContact(ContactRequest data) {
        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom(applicationEmail);
        message.setTo(applicationEmail);
        message.setSubject("Um usuário mandou uma nova mensagem!");
        message.setText("Nome: " + data.name() + "\nE-mail: " + data.email() + "\nCelular: (" + data.phone().substring(0, 2) + ") " + data.phone().substring(2, 7) + '-' + data.phone().substring(7) + "\nMensagem: " + data.message());

        try {
            mailSender.send(message);
        } catch(MailException e) {
            throw new RuntimeException("Falha ao enviar e-mail");
        }
    }

    public void sendConfirmationEmail(String email, String firstName) {
        SimpleMailMessage message = new SimpleMailMessage();
        String url = applicationUrls.split(",")[0];

        String token;

        try {
            token = tokenService.generateAccountConfirmationToken(email);
        } catch (Throwable e) {
            throw new RuntimeException("Falha ao tentar gerar token. Tente novamente mais tarde");
        }

        message.setFrom(applicationEmail);
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

        message.setFrom(applicationEmail);
        message.setTo(email);
        message.setSubject("Recuperação de senha - All Tech Blog");
        message.setText("Olá, " + firstName + "!\nEste é um e-mail para recuperação da sua senha.\n\nPara acessar sua conta, visite o link a seguir e faça login com a nova senha desejada:\n\n" + url + "/auth/recover/" + token + "\n\nEste código é válido por 60 minutos. Após isto, será necessário solicitar a recuperação de senha novamente.\n\nSe não foi você quem tentou recuperar a senha em nosso site, mande-nos um e-mail ou ignore esta mensagem.");

        try {
            mailSender.send(message);
        } catch(MailException e) {
            throw new RuntimeException("Falha ao enviar e-mail");
        }
    }

    public void sendNewsletterEmail(String path, String postTitle) {
        SimpleMailMessage message = new SimpleMailMessage();
        String url = applicationUrls.split(",")[0];

        var subscribers = subscriberRepository.findAll().stream().map(sub -> sub.getEmail()).toList().toArray(new String[0]);

        message.setFrom(applicationEmail);
        message.setBcc(subscribers);
        message.setSubject("Novidades - All Tech Blog");
        message.setText("Olá, assinante!\n\nUm novo Post foi publicado em nosso Blog - '" + postTitle + "'\nVisite o link a seguir para ter acesso à nova publicação e conversar conosco e demais usuários:\n" + url + "/posts/" + path + "\n\nPara não receber mais e-mails como este, acesse: " + url + "/newsletter/unsubscribe");

        try {
            mailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException("Falha ao enviar e-mail");
        }
    }
}
