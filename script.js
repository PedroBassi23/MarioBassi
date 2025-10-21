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

    /* Accordion legal — compatível, acessível e sem bugs */
document.addEventListener('DOMContentLoaded', () => {
    const accordionItems = document.querySelectorAll('.accordion-item');
  
    if (!accordionItems.length) return;
  
    // Fecha um item (animação controlada)
    function closeItem(item) {
      const header = item.querySelector('.accordion-header');
      const content = item.querySelector('.accordion-content');
      const icon = header.querySelector('.icon-toggle');
  
      // Forçar altura atual para permitir animação de fechamento suave
      content.style.maxHeight = content.scrollHeight + 'px';
      // forçar reflow para garantir a transição
      content.offsetHeight; // eslint-disable-line no-unused-expressions
  
      requestAnimationFrame(() => {
        content.style.transition = 'max-height 0.4s ease-out';
        content.style.maxHeight = '0px';
      });
  
      item.classList.remove('active');
      header.setAttribute('aria-expanded', 'false');
      content.setAttribute('aria-hidden', 'true');
  
      if (icon) {
        icon.classList.remove('fa-minus');
        icon.classList.add('fa-plus');
      }
    }
  
    // Abre um item (fecha os outros se necessário)
    function openItem(item) {
      const header = item.querySelector('.accordion-header');
      const content = item.querySelector('.accordion-content');
      const icon = header.querySelector('.icon-toggle');
  
      // Fecha os demais (comportamento exclusivo)
      accordionItems.forEach(other => {
        if (other !== item && other.classList.contains('active')) {
          closeItem(other);
        }
      });
  
      // Definir maxHeight para scrollHeight para permitir animação
      content.style.maxHeight = content.scrollHeight + 'px';
      content.style.transition = 'max-height 0.45s ease-out';
  
      // Quando terminar a transição de abrir, removemos maxHeight para permitir conteúdo responsivo
      const onOpenTransitionEnd = (e) => {
        if (e.propertyName !== 'max-height') return;
        // permitir crescimento natural do conteúdo (sem limitar)
        content.style.maxHeight = 'none';
        content.removeEventListener('transitionend', onOpenTransitionEnd);
      };
      content.addEventListener('transitionend', onOpenTransitionEnd);
  
      item.classList.add('active');
      header.setAttribute('aria-expanded', 'true');
      content.setAttribute('aria-hidden', 'false');
  
      if (icon) {
        icon.classList.remove('fa-plus');
        icon.classList.add('fa-minus');
      }
    }
  
    // Toggle handler
    accordionItems.forEach(item => {
      const header = item.querySelector('.accordion-header');
      const content = item.querySelector('.accordion-content');
  
      // Atributos ARIA iniciais
      header.setAttribute('role', 'button');
      header.setAttribute('aria-expanded', 'false');
      header.setAttribute('tabindex', '0');
      if (content) content.setAttribute('aria-hidden', 'true');
  
      // Click
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
  
        if (isActive) {
          closeItem(item);
        } else {
          // Se o content estiver com maxHeight 'none' (caso tenha sido aberto antes), garantir valor antes de fechar os outros
          // (não obrigatório, mas evita problemas no fluxo)
          accordionItems.forEach(i => {
            const c = i.querySelector('.accordion-content');
            if (c && getComputedStyle(c).maxHeight === 'none' && i !== item) {
              // forçar re-cálculo para fechar corretamente
              c.style.maxHeight = c.scrollHeight + 'px';
            }
          });
          openItem(item);
        }
      });
  
      // Acessibilidade via teclado (Enter / Space)
      header.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          header.click();
        }
      });
  
      // Quando o usuário redimensionar e um painel estiver aberto com maxHeight 'none',
      // nada precisa ser feito; mas quando for fechado e reaberto, o script recalcula scrollHeight.
      window.addEventListener('resize', () => {
        if (item.classList.contains('active')) {
          const c = item.querySelector('.accordion-content');
          // se estiver com maxHeight 'none', nada a fazer; caso contrário atualizar para novo scrollHeight
          if (c && c.style.maxHeight && c.style.maxHeight !== 'none') {
            c.style.maxHeight = c.scrollHeight + 'px';
          }
        }
      });
    });
  });
  
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