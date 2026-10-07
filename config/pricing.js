/* ==========================================================================
   config/pricing.js — precios del cotizador y de los paquetes (COP).
   DEMO: tarifas de referencia para Bogotá. Poner publish en false para mostrar
   "Cotización personalizada" en lugar de precios.
   ========================================================================== */
window.PRICING = {
  publish: true,
  currency: 'COP',

  // Multiplicador por tipo de vehículo (ids de SITE.quote.vehicles)
  vehicleFactor: { auto: 1, suv: 1.15, camioneta: 1.3, moto: 0.6 },

  // Rango por servicio (ids de SITE.services): { min, max }
  services: {
    'frenos':          { min: 180000, max: 380000 },   // Mantenimiento de frenos
    'suspension':      { min: 250000, max: 650000 },   // Suspensión básica
    'mecanica-rapida': { min: 90000,  max: 220000 },
    'diagnostico':     { min: 45000,  max: 90000 }     // Revisión e inspección
  },

  // Rango por extra (ids de SITE.quote.extras)
  extras: {
    'prueba-ruta': { min: 20000, max: 35000 },
    'liquido':     { min: 70000, max: 110000 },
    'niveles':     { min: 25000, max: 45000 }
  },

  // Precio "desde" por paquete (ids de SITE.packages) y por servicio
  packagesFrom: { basico: 45000, premium: 180000, completo: 380000 },
  servicesFrom: { 'frenos': 180000, 'suspension': 250000, 'mecanica-rapida': 90000, 'diagnostico': 45000 }
};
