# Landing Page - ServiGlobal AI (Agentes de Voz + Omnicanal)

Esta landing page está diseñada para ofrecer servicios de consultoría e implementación de agentes de voz IA y soluciones omnicanal. Enfocada en la conversión a través de demos interactivas y agendamiento de pre-consultorías.

## Funcionalidades Implementadas

### 1. Hero Section

- Mensaje de valor claro y directo ("Agentes de Voz IA + Omnicanal").
- Llamadas a la acción (CTAs) principales: Agendar pre-consultoría y Probar Demo.
- Diseño visual impactante con `hero-futuristic`.

### 2. Casos de Uso Interactivos

- Visualización de 7 verticales de negocio (Atención al Cliente, Ventas, Cobranza, etc.).
- Contenido dinámico para cada caso de uso.

### 3. Demos de Agentes de Voz (Simulación UI)

- **Demo Inbound:** Simulación de llamada desde el navegador con visualización de ondas de audio y estados de llamada.
- **Demo Outbound:** Formulario para solicitar una llamada, simulando el flujo de contacto de un agente.
- Selectores de tipo de agente y validaciones de formulario básicas.

### 4. Sección de Beneficios y Proceso

- Presentación clara de ventajas competitivas.
- Explicación del modelo de trabajo consultivo (Pre-consultoría > Piloto > Producción).

### 5. Integraciones

- Showcase de compatibilidad con herramientas populares (CRM, Calendarios, VoIP).

### 6. Agendamiento

- Integración con **Cal.com** para agendar citas directamente en la landing.

### 7. Internacionalización (i18n)

- Soporte multi-idioma (Español/Inglés) implementado con `next-intl`.
- Archivos de mensajes en `messages/en.json` y `messages/es.json`.

## Stack Tecnológico

- **Framework:** Next.js
- **Estilos:** Tailwind CSS
- **Animaciones:** Framer Motion
- **Iconos:** Lucide React

## Estructura del Proyecto

- `/components`: Componentes de UI divididos por secciones (`Hero`, `UseCases`, `VoiceDemo`, `Integrations`, `Process`, `Benefits`, `Booking`).
- `/messages`: Archivos de traducción.
- `/app`: Rutas y layouts de Next.js.
- `/public`: Assets estáticos.
