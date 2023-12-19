'use client';

import { ChangeEvent, FormEventHandler, useEffect, useState } from 'react';

import FormInput from '@/components/forms/FormInput';
import FormTextArea from '@/components/forms/FormTextArea';
import Loading from '@/components/Loading';

import ContactForm from '@/types/entities/ContactForm';
import { ContactErrors } from '@/types/ValidationErrors';
import validateForm from '@/utils/validateForm';
import api from '@/api/api';
import { ContactServerError, ContactSuccess, ContactValidationErrors } from '@/types/api/ContactResponse';
import Modal from '@/components/Modal';
import IconCheck from '@/icons/IconCheck';

const defaultContact: ContactForm = { email: '', phone: '', name: '', message: '' };
const defaultErrors: ContactErrors = { emailErrors: [], phoneErrors: [], nameErrors: [], messageErrors: [] };

const ContactPage = () => {
  const [contact, setContact] = useState<ContactForm>({ ...defaultContact });
  const [errors, setErrors] = useState<ContactErrors>({ ...defaultErrors });
  const [errorMessage, setErrorMessage] = useState<string>('Erro ao enviar e-mail');
  const [loading, setLoading] = useState<boolean>(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setContact({ ...contact, email: e.target.value });

  const handleChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value.replaceAll(/[^0-9]/g, '').slice(0, 11);

    const phone = value.length === 11
      ? `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`
      : value;

    setContact({ ...contact, phone });
  };

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => setContact({ ...contact, name: e.target.value });

  const handleChangeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => setContact({ ...contact, message: e.target.value });

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const errors = validateForm.contact({ ...contact, phone: contact.phone.replaceAll(/[^0-9]/g, '') });
    if (errors) return setErrors({ ...errors });

    setLoading(true);
    try {
      const response = await api.requestContact({ ...contact, phone: contact.phone.replaceAll(/[^0-9]/g, '') });

      const { success } = response as ContactSuccess;
      const { errors } = response as ContactValidationErrors;
      const { error } = response as ContactServerError;

      if (success) {
        setShowSuccessMessage(true);
        setContact({ ...defaultContact });
      }

      if (errors) setErrors({ ...errors });
      if (error) setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setErrors({ ...defaultErrors });
    setErrorMessage('');
  }, [contact]);

  return (
    <main className="mt-6 mb-16 sm:my-16 px-3">
      <Modal showModal={showSuccessMessage} setShowModal={setShowSuccessMessage}>
        <div className="flex flex-col gap-2 text-center text-sm">
          <p className="py-1">Mensagem enviada com sucesso</p>
          <p className="py-1">Nossa equipe responderá o quanto antes!</p>
          <IconCheck width={48} height={48} color="green" className="mx-auto" />
        </div>
      </Modal>

      <form className="mx-auto max-w-sm flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="text-center mb-3">
          <h1 className="font-bold text-2xl mb-3">Entre em Contato</h1>

          <p>Deixe sua mensagem e responderemos assim que possível!</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <FormInput
            title="E-mail *"
            name="email"
            type="email"
            placeholder="Digite seu e-mail"
            onChange={handleChangeEmail}
            value={contact.email}
            errors={errors.emailErrors || []}
          />

          <FormInput
            title="Celular *"
            name="phone"
            type="text"
            placeholder="Digite seu telefone"
            onChange={handleChangePhone}
            value={contact.phone}
            errors={errors.phoneErrors || []}
          />
        </div>

        <FormInput
          title="Nome *"
          name="name"
          type="text"
          placeholder="Digite seu nome"
          onChange={handleChangeName}
          value={contact.name}
          errors={errors.nameErrors || []}
        />

        <FormTextArea
          title="Mensagem *"
          name="message"
          classTextarea="h-24"
          placeholder="Digite sua mensagem"
          onChange={handleChangeMessage}
          value={contact.message}
          errors={errors.messageErrors || []}
        />

        <button
          className="bg-blue-400 hover:bg-blue-500 rounded-lg h-12 text-white
            transition-all duration-300 flex items-center justify-center
          "
          type="submit"
        >
          {loading
            ? <Loading diameter={20} color="white" />
            : <span>Enviar</span>
          }
        </button>

        {errorMessage &&
          <span className="text-sm text-red-500 text-center">{errorMessage}</span>
        }
      </form>
    </main>
  );
};

export default ContactPage;
