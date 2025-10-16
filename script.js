document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNavUl = document.querySelector('.main-nav ul');

    if (menuToggle && mainNavUl) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            mainNavUl.classList.toggle('active');

            const icon = menuToggle.querySelector('i');
            if (mainNavUl.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                menuToggle.setAttribute('aria-label', 'Fechar menu');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                menuToggle.setAttribute('aria-label', 'Abrir menu');
            }
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (mainNavUl && mainNavUl.classList.contains('active') && this.closest('.main-nav')) {
                mainNavUl.classList.remove('active');
                if (menuToggle) {
                    menuToggle.setAttribute('aria-expanded', 'false');
                    const icon = menuToggle.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                    menuToggle.setAttribute('aria-label', 'Abrir menu');
                }
            }

            const targetId = this.getAttribute('href');
            if (targetId.length > 1 && targetId.startsWith('#') && document.querySelector(targetId)) {
                e.preventDefault();
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    const contactForm = document.querySelector('#contato form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            let isValid = true;
            const inputsToValidate = [
                { id: 'nome', msg: 'O campo Nome Completo é obrigatório.' },
                { id: 'email', msg: 'O campo E-mail é obrigatório.', type: 'email' },
                { id: 'telefone', msg: 'O campo Telefone é obrigatório.' },
                { id: 'mensagem', msg: 'O campo Mensagem é obrigatório.' }
            ];

            inputsToValidate.forEach(field => {
                const inputElement = contactForm.querySelector(`#${field.id}`);
                if (inputElement) {
                    const parentNode = inputElement.parentNode;
                    let errorMsgElement = parentNode.querySelector(`.error-message[data-for="${field.id}"]`);

                    inputElement.classList.remove('input-error');
                    if (errorMsgElement) {
                        errorMsgElement.remove();
                    }

                    let currentFieldValid = true;
                    const trimmedValue = inputElement.value.trim();

                    if (trimmedValue === '') {
                        currentFieldValid = false;
                    } else if (field.type === 'email') {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(trimmedValue)) {
                            field.msg = 'Por favor, insira um e-mail válido.';
                            currentFieldValid = false;
                        }
                    }

                    if (!currentFieldValid) {
                        isValid = false;
                        inputElement.classList.add('input-error');
                        errorMsgElement = document.createElement('p');
                        errorMsgElement.classList.add('error-message');
                        errorMsgElement.setAttribute('data-for', field.id);
                        errorMsgElement.textContent = field.msg;
                        inputElement.insertAdjacentElement('afterend', errorMsgElement);
                    }
                }
            });

            if (!isValid) {
                e.preventDefault();
                console.log('Formulário com erros de validação. Não enviado.');
            } else {
                console.log('Formulário validado pelo cliente. Prosseguindo com o envio...');
            }
        });
    }
});