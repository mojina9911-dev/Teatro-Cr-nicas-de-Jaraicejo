(() => {
  const $ = (id) => document.getElementById(id);
  const setText = (id, value) => { if ($(id) && typeof value === 'string') $(id).textContent = value; };
  const setImage = (id, value, alt) => {
    if (!$(id) || typeof value !== 'string' || !value.trim()) return;
    // Only local paths are accepted from the editable content file.
    if (value.startsWith('/') && !value.startsWith('//')) $(id).src = value;
    if (alt) $(id).alt = alt;
  };
  const safeExternalUrl = (value) => {
    try { const u = new URL(value); return ['https:', 'http:'].includes(u.protocol) ? u.href : ''; }
    catch { return ''; }
  };
  const youtubeId = (value) => {
    try {
      const u = new URL(value);
      if (u.hostname.includes('youtu.be')) return u.pathname.slice(1).split('/')[0];
      if (u.hostname.includes('youtube.com')) return u.searchParams.get('v') || u.pathname.split('/').filter(Boolean).pop();
    } catch (_) {}
    return '';
  };
  const menuButton = document.querySelector('.menu-toggle');
  const nav = $('main-nav');
  menuButton?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open'); menuButton?.setAttribute('aria-expanded', 'false');
  }));
  $('current-year').textContent = new Date().getFullYear();

  fetch('/content/site.json', { cache: 'no-cache' })
    .then(response => { if (!response.ok) throw new Error('No se pudo cargar el contenido'); return response.json(); })
    .then(data => {
      document.title = `${data.site_title || 'Crónicas de Jaraicejo'} | Historia y teatro`;
      const meta = document.querySelector('meta[name="description"]');
      if (meta && data.meta_description) meta.content = data.meta_description;
      if (typeof data.hero_title === 'string' && $('hero-title')) {
        const parts = data.hero_title.split(/\s+de\s+/i);
        const title = $('hero-title'); title.replaceChildren();
        if (parts.length === 2) {
          title.append(document.createTextNode(parts[0]));
          title.append(document.createElement('br'));
          const emphasis = document.createElement('em'); emphasis.textContent = `de ${parts[1]}`; title.append(emphasis);
        } else title.textContent = data.hero_title;
      }
      setText('hero-subtitle', data.hero_subtitle);
      setImage('hero-image', data.hero_image, data.hero_image_alt || 'Plaza Mayor de Jaraicejo');
      setText('intro-title', data.intro_title);
      setText('intro-text', data.intro_text);
      setText('history-title', data.history_title);
      setText('history-text', data.history_text);
      setText('work-title', data.work_title);
      setText('work-text', data.work_text);
      setText('director-name', data.director_name);
      setText('director-role', data.director_role);
      setText('director-text', data.director_text);
      setText('golfines-title', data.golfines_title);
      setText('golfines-text', data.golfines_text);
      setText('gallery-intro', data.gallery_intro);
      setText('videos-intro', data.videos_intro);
      setText('contact-title', data.contact_title);
      setText('contact-text', data.contact_text);
      if (data.instagram_url && safeExternalUrl(data.instagram_url)) $('instagram-link').href = safeExternalUrl(data.instagram_url);
      if (data.facebook_url && safeExternalUrl(data.facebook_url)) {
        const a = document.createElement('a'); a.href = safeExternalUrl(data.facebook_url); a.target = '_blank'; a.rel = 'noopener'; a.textContent = 'Facebook'; a.className = 'outline-button'; $('instagram-link').parentElement.append(a);
      }
      if (data.contact_email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.contact_email)) {
        const link = $('email-link'); link.href = `mailto:${data.contact_email}`; link.hidden = false;
      }
      const agenda = $('agenda');
      const agendaGrid = $('agenda-grid');
      if (Array.isArray(data.events) && data.events.length && agenda && agendaGrid) {
        agenda.hidden = false; agendaGrid.replaceChildren();
        data.events.forEach(item => {
          if (!item || !item.title) return;
          const card = document.createElement('article'); card.className = 'agenda-card';
          if (item.date) { const date = document.createElement('time'); date.dateTime = item.date; const parsed = new Date(`${item.date}T12:00:00`); date.textContent = Number.isNaN(parsed.getTime()) ? item.date : new Intl.DateTimeFormat('es-ES', { dateStyle: 'long' }).format(parsed); card.append(date); }
          const heading = document.createElement('h3'); heading.textContent = item.title; card.append(heading);
          if (item.location) { const place = document.createElement('p'); place.textContent = item.location; card.append(place); }
          if (item.description) { const desc = document.createElement('p'); desc.textContent = item.description; card.append(desc); }
          agendaGrid.append(card);
        });
        if (!agendaGrid.children.length) agenda.hidden = true;
      }
      const gallery = $('gallery-grid');
      if (Array.isArray(data.gallery) && data.gallery.length) {
        gallery.replaceChildren();
        data.gallery.forEach((item, index) => {
          if (!item || !item.image || !item.image.startsWith('/')) return;
          const figure = document.createElement('figure'); if (index === 0) figure.className = 'gallery-feature';
          const img = document.createElement('img'); img.src = item.image; img.alt = item.alt || item.caption || 'Fotografía de Crónicas de Jaraicejo'; img.loading = 'lazy';
          const cap = document.createElement('figcaption'); cap.textContent = item.caption || 'Crónicas de Jaraicejo';
          figure.append(img, cap); gallery.append(figure);
        });
      }
      const videos = $('video-grid');
      if (Array.isArray(data.videos) && data.videos.length) {
        videos.replaceChildren();
        data.videos.forEach(item => {
          const id = youtubeId(item.url || ''); if (!id) return;
          const card = document.createElement('article'); card.className = 'video-card';
          const frame = document.createElement('iframe'); frame.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}`; frame.title = item.title || 'Vídeo de Crónicas de Jaraicejo'; frame.loading = 'lazy'; frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'; frame.allowFullscreen = true;
          const heading = document.createElement('h3'); heading.textContent = item.title || 'Crónicas de Jaraicejo'; card.append(frame, heading); videos.append(card);
        });
        if (!videos.children.length) videos.innerHTML = '<p class="video-empty">Próximamente, vídeos y recuerdos audiovisuales de nuestras representaciones.</p>';
      }
    })
    .catch(error => console.info(error.message));
})();
