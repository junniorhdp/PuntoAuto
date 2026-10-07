/* ==========================================================================
   config/site.js — TODO lo específico del negocio vive aquí (plantilla white-label).
   Para cambiar de cliente: editar este archivo, config/pricing.js y las fotos.
   Los valores marcados con "TODO" son datos reales que el taller debe confirmar.
   ========================================================================== */
window.SITE = {
  demo: true,                                 // Sitio de demostración: añade noindex y avisos de datos de ejemplo
  name: 'Mecánica & Frenos Punto Auto',
  short: 'Punto Auto',
  lang: 'es-CO',
  url: 'https://punto-auto-demo.vercel.app',  // DEMO: dominio de prueba en Vercel (cambiar al dominio final)
  timezone: 'America/Bogota',

  // Contacto
  whatsapp: '573227454759',                   // Formato internacional sin "+"
  phone: '+57 322 745 4759',
  phoneHref: '+573227454759',
  email: 'contacto@puntoauto.example',       // DEMO
  formEndpoint: '',                           // TODO: URL del backend/Formspree. Vacío = el formulario abre WhatsApp
  responseTime: '30 MIN',

  // Ubicación
  city: 'Bogotá',
  cityArea: 'Bogotá / Chía',
  neighborhood: 'Palermo',                   // DEMO
  addressShort: 'Cra. 24 # 52-30, Palermo',   // DEMO
  address: 'Carrera 24 # 52-30, Barrio Palermo, Bogotá',   // DEMO: dirección de ejemplo
  geo: { lat: 4.6486, lng: -74.0678 },        // DEMO
  mapsLink: 'https://www.google.com/maps/search/?api=1&query=Palermo%2C+Bogot%C3%A1', // DEMO
  mapsEmbed: 'https://maps.google.com/maps?q=Palermo,+Bogot%C3%A1&z=15&output=embed', // DEMO
  perks: ['Sala de espera con Wi-Fi', 'Parqueadero para clientes'],   // DEMO

  // Horario: 0 = domingo … 6 = sábado. null = cerrado.
  hours: {
    0: null,
    1: { open: '07:30', close: '18:00' },
    2: { open: '07:30', close: '18:00' },
    3: { open: '07:30', close: '18:00' },
    4: { open: '07:30', close: '18:00' },
    5: { open: '07:30', close: '18:00' },
    6: { open: '08:00', close: '14:00' }      // DEMO: horario laboral estándar
  },

  social: {
    instagram: '',                            // TODO: URL completa, ej. https://instagram.com/usuario
    instagramHandle: '',                      // TODO: ej. puntoauto
    facebook: ''
  },

  // Hero
  hero: {
    eyebrow: 'FRENOS · SUSPENSIÓN · MECÁNICA RÁPIDA',
    title: 'Frenos seguros. Mecánica rápida. Sin dar vueltas.',
    subtitle: 'Frenos, suspensión y mecánica rápida con precio claro antes de empezar. Cotiza por WhatsApp y recibe respuesta en minutos.',
    image: 'https://images.unsplash.com/photo-1741014875173-f39e76aeec16?auto=format&fit=crop&w=1600&h=900&q=80',   // DEMO: Unsplash. Reemplazar por foto propia
    imageAlt: 'Pinza de freno amarilla sobre disco perforado en un rin negro'
  },

  // Cifras reales. Si está vacío, la barra de métricas no se muestra. NO inventar.
  metrics: [   // DEMO: cifras de ejemplo, no reales
    { label: 'FRENOS REVISADOS', value: '+1.500' },
    { label: 'ESTRELLAS EN GOOGLE', value: '4.9/5' },
    { label: 'GARANTÍA ESCRITA', value: '30 días' },
    { label: 'RESPUESTA POR WHATSAPP', value: '< 30 min' }
  ],

  // Servicios (el primero es el activo por defecto)
  services: [
    {
      id: 'frenos',
      name: 'Frenos',
      title: 'Servicio de frenos',
      description: 'Pastillas, discos, líquido y rectificación. Revisamos todo el sistema y te mostramos el estado de cada pieza antes de cambiar nada.',
      specs: 'PASTILLAS · DISCOS · LÍQUIDO',
      time: '1–3 H',
      image: 'https://images.unsplash.com/photo-1770834807387-820280f8270b?auto=format&fit=crop&w=1600&h=1200&q=80',
      imageAlt: 'Pinza de freno roja sobre disco ventilado en un rin negro',
      icon: 'brake'
    },
    {
      id: 'suspension',
      name: 'Suspensión',
      title: 'Suspensión y dirección',
      description: 'Amortiguadores, bujes, rótulas y terminales. Si el carro rebota, golpea o se va hacia un lado, lo diagnosticamos y lo corregimos.',
      specs: 'AMORTIGUADORES · BUJES · RÓTULAS',
      time: '2–4 H',
      image: 'https://images.unsplash.com/photo-1760836395763-25ea44ae8145?auto=format&fit=crop&w=1600&h=1200&q=80',
      imageAlt: 'Cuatro amortiguadores con resortes rojos listos para revisión',
      icon: 'suspension'
    },
    {
      id: 'mecanica-rapida',
      name: 'Mecánica rápida',
      title: 'Mecánica rápida',
      description: 'Cambio de aceite y filtros, bujías, batería, correas y revisión de niveles. Entras, te atendemos y sigues con tu día.',
      specs: 'ACEITE · FILTROS · BATERÍA',
      time: '30 MIN – 2 H',
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1600&h=1200&q=80',
      imageAlt: 'Correas y poleas de un motor en revisión',
      icon: 'wrench'
    },
    {
      id: 'diagnostico',
      name: 'Diagnóstico',
      title: 'Diagnóstico por scanner',
      description: 'Lectura de fallas y revisión pre-compra. Sabrás qué tiene el carro y qué conviene arreglar primero.',
      specs: 'SCANNER · PRE-COMPRA',
      time: '1 H',
      image: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?auto=format&fit=crop&w=1600&h=1200&q=80',
      imageAlt: 'Mecánico revisando el motor de un carro con el capó abierto',
      icon: 'scan'
    }
  ],

  // Foto de taller (tile bajo el proceso). Vacío = no se muestra.
  workshop: { image: 'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&w=1920&h=800&q=80', alt: 'Pared de herramientas organizadas en un taller mecánico' },   // DEMO: Unsplash

  // Pasos del proceso
  process: [
    { title: 'Escríbenos', text: 'Envía una foto o describe el problema por WhatsApp.' },
    { title: 'Te cotizamos', text: 'Precio cerrado antes de empezar. Sin sorpresas al recoger.' },
    { title: 'Te lo entregamos', text: 'Con garantía escrita y fotos del trabajo realizado.' }
  ],

  // Paquetes (precios en config/pricing.js)
  packages: [
    {
      id: 'basico',
      name: 'Revisión de frenos',
      tier: 'Básico',
      includes: ['Inspección de pastillas y discos', 'Revisión del líquido de frenos', 'Informe con fotos']
    },
    {
      id: 'premium',
      name: 'Frenos al día',
      tier: 'Premium',
      recommended: true,
      badge: 'MÁS ELEGIDO',
      includes: ['Cambio de pastillas (un eje)', 'Limpieza y ajuste de pinzas', 'Revisión del líquido de frenos', 'Prueba de ruta']
    },
    {
      id: 'completo',
      name: 'Frenos y suspensión',
      tier: 'Completo',
      includes: ['Todo lo del paquete Premium', 'Revisión de suspensión y dirección', 'Purga del líquido de frenos', 'Informe con fotos']
    }
  ],

  // Cotizador
  quote: {
    vehicles: [
      { id: 'auto', label: 'Automóvil' },
      { id: 'suv', label: 'SUV' },
      { id: 'camioneta', label: 'Camioneta' },
      { id: 'moto', label: 'Moto' }
    ],
    extras: [
      { id: 'prueba-ruta', label: 'Prueba de ruta con informe' },
      { id: 'liquido', label: 'Cambio de líquido de frenos' },
      { id: 'niveles', label: 'Revisión de niveles y filtros' }
    ]
  },

  // Antes y después. Vacío = la sección no se muestra.
  // { before: 'img/antes.webp', after: 'img/despues.webp', caption: 'HONDA CIVIC 2018 · DISCOS + PASTILLAS', alt: '…' }
  beforeAfter: [],

  // Opiniones reales y verificables. Vacío = la sección no se muestra.
  // { name: 'Nombre', vehicle: 'Mazda 3 2019', service: 'Frenos', text: '…', stars: 5 }
  reviews: [   // DEMO: opiniones de ejemplo
    { name: 'Andrés M.', vehicle: 'Mazda 3 2019', service: 'Frenos', stars: 5, text: 'Me cotizaron por WhatsApp en minutos y el precio final fue el mismo. Cambiaron pastillas y rectificaron discos el mismo día, y el pedal quedó firme.' },
    { name: 'Carolina R.', vehicle: 'Renault Duster 2021', service: 'Suspensión', stars: 5, text: 'Mi camioneta golpeaba en los huecos. Me mostraron los amortiguadores gastados con fotos antes de cambiarlos. Ahora va como nueva.' },
    { name: 'Julián P.', vehicle: 'Chevrolet Onix 2020', service: 'Mecánica rápida', stars: 5, text: 'Cambio de aceite y revisión completa en menos de una hora. Claros con el precio y me entregaron el informe por WhatsApp.' }
  ],
  rating: { value: 4.9, count: 187 },         // DEMO: dato de ejemplo (alimenta JSON-LD)

  faq: [
    { q: '¿Cuánto tarda un cambio de frenos?', a: 'Un cambio de pastillas suele tomar entre 1 y 3 horas. Si además se requiere rectificar o cambiar discos, te confirmamos el tiempo exacto al cotizar.' },
    { q: '¿Dan garantía por el trabajo?', a: 'Sí. Entregamos garantía escrita en cada servicio. Te indicamos el plazo y las condiciones al cotizar.' },
    { q: '¿Hacen la cotización sin costo?', a: 'Sí. Escríbenos por WhatsApp con una foto o la descripción del problema y te respondemos con un precio antes de empezar.' },
    { q: '¿Cómo sé si necesito cambiar los frenos?', a: 'Chillidos al frenar, pedal blando o que baja demasiado, vibración en el volante o la luz de frenos encendida. Ante cualquiera de estas señales, haz revisar el sistema cuanto antes.' },
    { q: '¿Trabajan con todas las marcas?', a: 'Trabajamos con la mayoría de marcas de automóviles, SUV, camionetas y motos. Cuéntanos marca, modelo y año para confirmarte.' },
    { q: '¿Puedo dejar el carro todo el día?', a: 'Sí. Si el trabajo requiere más tiempo, te avisamos por WhatsApp y coordinamos la entrega.' },
    { q: '¿Qué medios de pago aceptan?', a: 'Confirma por WhatsApp los medios de pago disponibles.' }   // TODO: ajustar a los medios reales
  ],

  guarantees: ['Cotización sin costo', 'Garantía escrita', 'Fotos del trabajo'],

  legal: {
    businessName: 'Punto Auto S.A.S. (demo)',   // DEMO
    nit: '900.000.000-0 (demo)',              // DEMO
    privacyUrl: 'privacidad.html'
  }
};
