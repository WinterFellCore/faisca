// Site da Faísca: tema, menu do celular, animações de entrada e o "Claudinho digitando".
(() => {
  const root = document.documentElement;
  root.classList.add('js');
  const semMovimento = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Tema claro/escuro, lembrado entre visitas
  document.getElementById('tema').addEventListener('click', () => {
    const novo = root.dataset.theme === 'light' ? 'dark' : 'light';
    root.dataset.theme = novo;
    try { localStorage.setItem('faisca-tema', novo); } catch { /* modo privado */ }
  });

  // Menu do celular
  const menu = document.getElementById('menu');
  const menuBt = document.getElementById('menu-bt');
  const fecharMenu = () => { menu.classList.remove('aberto'); menuBt.setAttribute('aria-expanded', 'false'); };
  menuBt.addEventListener('click', () => {
    const aberto = menu.classList.toggle('aberto');
    menuBt.setAttribute('aria-expanded', String(aberto));
  });
  menu.addEventListener('click', e => { if (e.target.closest('a')) fecharMenu(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') fecharMenu(); });

  // Borda no topo depois de rolar
  const topo = document.getElementById('topo');
  const marcarTopo = () => topo.classList.toggle('rolou', scrollY > 8);
  addEventListener('scroll', marcarTopo, { passive: true });
  marcarTopo();

  // Elementos aparecem ao entrar na tela
  const alvos = document.querySelectorAll('.revela');
  if ('IntersectionObserver' in window && !semMovimento) {
    const io = new IntersectionObserver(entradas => {
      entradas.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('visivel'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    alvos.forEach((el, i) => { el.style.transitionDelay = `${(i % 4) * 60}ms`; io.observe(el); });
  } else {
    alvos.forEach(el => el.classList.add('visivel'));
  }

  // Resposta do Claudinho sendo digitada na janela ilustrativa
  const digita = document.getElementById('digita');
  const frase = 'Pronto! Criei a seção de contato com um formulário. Quer que eu explique cada parte?';
  if (semMovimento) {
    digita.textContent = frase;
    digita.classList.add('fim');
  } else {
    let i = 0;
    const passo = () => {
      digita.textContent = frase.slice(0, ++i);
      if (i < frase.length) setTimeout(passo, 28 + Math.random() * 40);
      else digita.classList.add('fim');
    };
    setTimeout(passo, 900);
  }

  // Link de download ainda não definido: avisa em vez de pular para o topo
  const baixar = document.getElementById('link-baixar');
  if (baixar.getAttribute('href') === '#') {
    baixar.addEventListener('click', e => {
      e.preventDefault();
      baixar.textContent = 'Em breve';
      baixar.setAttribute('aria-disabled', 'true');
    });
  }

  document.getElementById('ano').textContent = new Date().getFullYear();
})();
