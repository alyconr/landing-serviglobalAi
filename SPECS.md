# SPECS.md — Landing Page “Agentes de Voz + Omnicanal” (Sin precios, enfoque en preconsultoría)

## 0) Nombre de la funcionalidad
Landing Page Marketing + Demos (Agentes de Voz IA + Omnicanal) + Captura de Leads (Cal.com)

## 1) Objetivo (User Goal)
Permitir que un prospecto:
1) entienda en pocos segundos qué resolvemos y cómo trabajamos (servicio consultivo, no autoservicio),
2) pruebe una **demo** (simulada) y/o
3) **agende una preconsultoría** (CTA principal) o deje sus datos para contacto,
todo sin mostrar precios y reforzando integración con infraestructura existente (VoIP/PBX/Asterisk, CRM, WhatsApp, Calendar, email).

## 2) Flujo paso a paso (User Flow)
1. Usuario llega al landing y ve el **Hero** con mensaje principal + 2 CTAs: **Agendar preconsultoría** y **Probar demo**.
2. Usuario explora rápidamente:
   - Casos de uso (7 modelos de negocio),
   - Beneficios,
   - Cómo trabajamos (3 fases),
   - Integraciones/tecnología,
   - Confianza + FAQ.
3. Usuario hace clic en **Probar demo** (scroll a sección “Demos”).
4. Usuario elige 1 de 2 demos:
   - **Demo A (Inbound web call):** “Llamar al agente desde el navegador” (simulación UI).
   - **Demo B (Outbound):** “Dejar datos y el agente me llama” (simulación UI).
5. En cualquiera de las demos, el cierre dirige a:
   - **Agendar preconsultoría** (Cal.com embebido) o
   - **Formulario de contacto** (si no agenda).
6. Usuario agenda (Cal.com) o deja datos; se muestra confirmación y siguiente paso.

---

# A) Reglas de negocio (deben cumplirse sí o sí)
Estas reglas son **criterios de aceptación** del contenido y del UX.

## A1) Objetivo del landing
- **Primario:** agendar reunión de preconsultoría (diagnóstico + propuesta).
- **Secundario:** activar demo y convertir en agendamiento o captura de datos.
- **Terciario:** educar: no es autoservicio; es implementación consultiva con integración.

## A2) Propuesta de valor “above the fold” (7 segundos)
Debe quedar claro que:
- Agentes de voz + omnicanal (voz, WhatsApp, Instagram, Messenger, web).
- Servicio consultivo (no DIY).
- Preconsultoría para diagnosticar y diseñar.
- Integración con stack e infraestructura existente (CRM, calendar, email, VoIP/PBX/Asterisk).
- Respaldo de experiencia (20+ años VoIP/call centers).

## A3) Verticales (7 modelos de negocio)
La sección “Casos de uso” debe incluir exactamente:
1) Atención al Cliente  
2) Call Centers y Soporte Técnico  
3) Cobranza y Recuperación de Pagos  
4) Ventas y Generación de Leads  
5) Reclutamiento y Selección  
6) Reservaciones y Agendamiento  
7) E-commerce y Tiendas Online  

Cada caso debe tener:
- 1 promesa,
- 3 tareas automatizables,
- integraciones típicas,
- CTA contextual: “Agendar diagnóstico para [vertical]”.

## A4) Beneficios (formato obligatorio)
Los beneficios deben expresarse como **Resultado + por qué** con estos 6 claims:
1. Incrementa ventas (filtrado/calificación).
2. Servicio 24/7 (mensajería + voz con traspaso a humano).
3. Reduce errores (flujos consistentes/auditables).
4. Ahorra costos (menos carga repetitiva).
5. Integra tu stack (CRM, calendarios, email, WhatsApp, telefonía).
6. Tiempo récord (diagnóstico → piloto → producción).

## A5) Modelo de servicio (no autoservicio)
Sección “Cómo trabajamos” con 3 fases:
- Preconsultoría (entregable mínimo: mapa de flujos + propuesta técnica),
- Implementación piloto (Python puro / LangGraph si multiagente),
- Producción y optimización (monitoreo + soporte).

## A6) Tecnología (sin abrumar)
- No listar herramientas arriba del fold.
- Sección “Tecnología” después de beneficios y casos de uso.
- Tecnología siempre traducida a ventaja: integración, robustez, control, evitar lock-in cuando aplique.

## A7) Integraciones (por categorías)
Mostrar por categorías:
- Canales: Voz, WhatsApp, Instagram, Messenger, Web.
- Agenda/comunicación: Google Calendar, Email.
- CRM/Atención: Chatwoot, GoHighLevel, otros.
- Infra: PBX/Asterisk, SIP trunks, sistemas internos.

## A8) CTAs (conversión)
- CTA primario persistente: **Agendar preconsultoría** (header, hero, después de casos, después de “cómo trabajamos”, footer).
- CTA secundario: **Probar demo (llamar ahora)** (hero + sección demo).
- CTA terciario: **Quiero que me contacten** (conduce a formulario/Cal.com).
Todo CTA refuerza diagnóstico: “15–30 min” + “plan inicial”.

## A9) Cal.com (captura y agenda)
- Formularios mínimos definidos (ver sección F).
- Post-submit: confirmación + llamada a agendar si no lo hizo.
- Post-agendamiento: checklist de preparación.

## A10) Demo (simulada) con cierre obligatorio
- Demo guiada (no genérica).
- Termina siempre en agendamiento o captura de datos.
- Disclaimer: demo es ejemplo; flujo real se diseña en preconsultoría.

---

# B) Alcance del producto (Scope)

## B1) IN-SCOPE (lo que sí se construye ahora)
1. Landing page completa (una sola página) con secciones definidas.
2. UX/UI de **selector de demos** con 2 experiencias:
   - Demo A: “Llamar al agente desde navegador” (simulación de UI de llamada).
   - Demo B: “Dejar datos y el agente me llama” (simulación de estado de llamada saliente).
3. Animaciones y microinteracciones con:
   - Tailwind v4,
   - Framer Motion,
   - (Opcional) R3F + Drei + GSAP para hero/background (sin comprometer performance).
4. Integración de **Cal.com** (embed) para agendamiento.
5. Formularios (UI + validación básica) para:
   - contacto,
   - demo B.
6. Accesibilidad y responsive (mobile-first).
7. Instrumentación de eventos (analytics) a nivel de UI (ver sección I).

## B2) OUT-OF-SCOPE (por ahora)
- Integración real con Ultravox/Retell/LiveKit/Vapi (solo simulación visual).
- Llamadas reales VoIP/SIP.
- Persistencia en backend/CRM real (solo UI).
- Automatizaciones reales con n8n (solo se describe como capacidad).
- Pricing, planes y checkout (prohibido en este landing).

---

# C) Público objetivo y tono
- Audiencia: dueños/gerentes/operaciones de negocios que buscan automatizar atención, ventas, cobranza, reclutamiento, reservas o e-commerce.
- Tono: profesional, directo, con autoridad técnica, cercano; sin promesas numéricas absolutas.
- Posicionamiento: “servicio consultivo + implementación” (no plataforma autoservicio).

---

# D) Estructura de información (IA / Secciones del landing)
La página debe seguir esta estructura y orden recomendado (se permiten ajustes menores sin violar reglas A).

## D1) Header (sticky)
- Logo + navegación ancla: “Casos”, “Cómo funciona”, “Integraciones”, “Demo”, “Agendar”.
- CTA primario: **Agendar preconsultoría** (botón).
- En mobile: menú compacto + CTA fijo inferior (ver D10).

## D2) Hero (above the fold)
### Mensaje creativo (obligatorio)
- Headline recomendado (puede variar pero debe mantener esencia):
  - “Tu mejor agente no duerme: atiende, vende y cobra 24/7 — conectado a tu operación.”
- Subheadline:
  - “Implementamos agentes de voz y omnicanal a medida. Integramos WhatsApp, telefonía, CRM y calendarios. Agenda una preconsultoría y recibe un plan inicial.”

### CTAs en hero (obligatorios)
- CTA primario: **Agendar preconsultoría** → scroll/anchor a sección Cal.com.
- CTA secundario: **Probar demo** → scroll/anchor a sección Demos.

### Visual / Motion
- Fondo animado sutil (R3F/GSAP opcional) o gradientes + motion.
- No usar video pesado arriba del fold.

## D3) Sección: “Casos de uso” (7 verticales)
- UI: tabs o grid de tarjetas.
- Cada tarjeta contiene: promesa + 3 bullets + integraciones + CTA contextual.
- Selector debe reordenar/actualizar CTA contextual (Regla A8).

## D4) Sección: “Beneficios”
- 6 beneficios obligatorios (Regla A4).
- Formato: cards con título + explicación breve (resultado + por qué).

## D5) Sección: “Cómo trabajamos” (3 fases)
- Fase 1: Preconsultoría (entregable: mapa de flujos + propuesta técnica).
- Fase 2: Implementación piloto (Python puro/LangGraph según complejidad).
- Fase 3: Producción/optimización (soporte continuo).
- CTA primario al final: **Agendar preconsultoría**.

## D6) Sección: “Integraciones”
- Mostrar por categorías (Regla A7).
- Enfatizar: “conectamos lo que ya usas”.

## D7) Sección: “Tecnología” (sin abrumar)
- Explicar enfoque:
  - “Seleccionamos el stack adecuado: open source + herramientas premium según tu caso.”
  - “Lógica pesada en backend Python; multiagente con LangGraph si aplica.”
  - “Integración con PBX/Asterisk y SIP si ya existe infraestructura.”
- Presentar logos opcionalmente, pero sin saturar.

## D8) Sección: “Demos” (obligatoria)
### D8.1 Selector de demo (2 opciones)
- UI: toggle/tabs “Demo A” y “Demo B”.
- Ambas opciones deben incluir:
  - 1 frase: qué prueba.
  - 3 bullets: qué hace.
  - Botón primario: “Iniciar demo”.
  - Disclaimer: “Demo simulada; el flujo real se define en preconsultoría.”

### D8.2 Demo A — “Llamar al agente desde el navegador” (SIMULACIÓN)
**Objetivo UX:** que el usuario “sienta” una llamada tipo agente de voz.

**Pantalla/Componente de llamada:**
- Estado inicial:
  - Selección de agente (dropdown):
    - “Agente Ventas”
    - “Agente Soporte”
    - “Agente Cobranza”
    - “Agente Reclutamiento”
    - “Agente Reservas”
  - Botón: **Llamar ahora**
- Al iniciar llamada:
  - Mostrar panel “AI Voice Agent” con:
    - indicador “Conectando…” → “En llamada”
    - ícono micrófono
    - visualizador de ondas/voz (sound waves) que responde a input simulado:
      - si el usuario mantiene presionado “Hablar” o activa micrófono (simulado), las ondas aumentan.
  - Botón: **Colgar** (rojo / alto contraste)
  - Timer de llamada (mm:ss) opcional.
- Al colgar:
  - Estado final con:
    - “Gracias. ¿Quieres implementarlo en tu negocio?”
    - CTA: **Agendar preconsultoría**
    - CTA secundario: “Ver casos de uso”

**Nota:** No se implementa audio real. Todo es simulado visualmente.

### D8.3 Demo B — “Dejar datos y el agente me llama” (SIMULACIÓN)
**Formulario mínimo:**
- Nombre
- Correo
- Teléfono
- (Opcional) empresa
- Botón: **Quiero que me llamen**

**Comportamiento simulado:**
- Tras enviar:
  - Estado “Solicitud recibida”
  - Animación: “El agente está llamando…” (ringing UI)
  - Mostrar panel “AI Voice Agent” con:
    - ondas/voz simuladas
    - botón **Colgar**
  - Luego mostrar “Te contactaremos en la implementación real. Agenda una preconsultoría para acelerar el proceso.”
  - CTA: **Agendar preconsultoría**
- Validación: campos requeridos, formato email, teléfono numérico.

## D9) Sección: “Confianza” + “FAQ”
- Bloque “Por qué confiar” (Regla A11.1).
- FAQ mínimo (Regla A11.2).

## D10) Sección: “Agendar” (Cal.com embed)
- Embed de Cal.com visible.
- Copy de apoyo:
  - “Llamada de diagnóstico (15–30 min). Te entregamos un plan inicial.”
- Checklist de preparación (post-agenda recomendado).
- Repetir CTA primario en footer.

## D11) Footer
- Repetir navegación ancla.
- CTA primario.
- Disclaimer básico (si aplica): “No mostramos precios porque depende de alcance e integraciones.”

---

# E) Requisitos funcionales (FR)

## E1) Navegación y anclas
- FR-1: Header sticky con enlaces ancla a secciones.
- FR-2: Botón “Probar demo” en hero hace scroll a Demos.
- FR-3: CTAs “Agendar preconsultoría” llevan a sección Agendar (Cal.com).

## E2) Selector de vertical / casos de uso
- FR-4: UI permite explorar 7 verticales sin recargar.
- FR-5: Cada vertical tiene CTA contextual que scroll a Agendar con prefiltro visual (si aplica).

## E3) Demos (simuladas)
- FR-6: Selector de demo alterna Demo A y Demo B.
- FR-7: Demo A presenta estados: idle → conectando → en llamada → final.
- FR-8: Demo A incluye: selección de agente, indicador micrófono, ondas de sonido, botón colgar.
- FR-9: Demo B presenta estados: form → enviando → “llamando” → “en llamada” → final.
- FR-10: Demo B incluye validación básica de formulario.
- FR-11: En ambos finales debe existir CTA primario a Agendar.

## E4) Cal.com
- FR-12: Se debe integrar embed de Cal.com (iframe o embed oficial).
- FR-13: Se deben mapear campos mínimos (ver sección F) a Cal.com cuando aplique (si el embed permite prefill; si no, mantener como copy/UX).

## E5) Formularios (no-Cal)
- FR-14: Formulario “Quiero que me contacten” (si se incluye adicional) debe:
  - validar campos,
  - mostrar confirmación,
  - invitar a agendar.

---

# F) Datos y formularios (campos mínimos)

## F1) Cal.com (agenda)
Campos mínimos a solicitar (si Cal.com lo permite en el embed o en el flujo):
- Nombre
- Empresa
- Rol
- País/Ciudad (opcional)
- Canal principal (voz/WhatsApp/omnicanal)
- Modelo de negocio (7 opciones)
- Volumen aproximado (4 rangos)
- Integraciones requeridas (checkbox):
  - CRM, WhatsApp, Calendar, Email, PBX/Asterisk, Otros
- Objetivo principal (ventas/soporte/cobranza/reclutamiento/reservas/e-commerce)

## F2) Demo B (form simple)
- Nombre (requerido)
- Correo (requerido)
- Teléfono (requerido)
- Consentimiento/aceptación simple (opcional, según legal)

---

# G) Requisitos no funcionales (NFR)

## G1) Performance
- NFR-1: First Load rápido; evitar assets pesados arriba del fold.
- NFR-2: Si se usa R3F/Three, debe ser opcional o degradar en mobile/bajo rendimiento.

## G2) Accesibilidad
- NFR-3: Contraste AA; botones y focus visibles.
- NFR-4: Navegación por teclado para tabs, formularios y CTAs.
- NFR-5: Aria-labels en controles de demo (micrófono, colgar).

## G3) Responsive
- NFR-6: Mobile-first; CTA fijo inferior en mobile (“Agendar preconsultoría”).
- NFR-7: Demos usables en pantallas pequeñas.

## G4) Seguridad/Privacidad (UI)
- NFR-8: Copys claros indicando que demos son simuladas y que los datos se usan para contacto/agendamiento.

---

# H) Stack y restricciones técnicas (contexto del proyecto)
Este proyecto ya está preconfigurado con:
- Next.js
- Tailwind CSS v4
- Framer Motion
- Three.js
- GSAP
- React Three Fiber (R3F) + Drei

**Restricciones:**
- No implementar backend real de llamadas.
- No implementar SDK real de Ultravox/Retell en esta fase.
- No implementar CRM real; solo UI/UX.

---

# I) Eventos de analítica (instrumentación recomendada)
Registrar (al menos como funciones/handlers, aunque el proveedor de analytics aún no esté definido):

- EVT-1: `cta_agendar_click` (origen: hero/header/casos/como_trabajamos/demo/footer)
- EVT-2: `cta_demo_click` (hero/demo)
- EVT-3: `vertical_selected` (vertical_id)
- EVT-4: `demo_selected` (demo=A|B)
- EVT-5: `demo_call_start` (agent_type)
- EVT-6: `demo_call_end` (duration, ended_by=user)
- EVT-7: `demo_form_submit` (success|error)
- EVT-8: `cal_embed_view` (viewport_enter)
- EVT-9: `faq_expand` (question_id)

---

# J) Copys mínimos por sección (lista de contenido obligatorio)

## J1) Hero
- Headline creativo (obligatorio):
  - “Tu mejor agente no duerme: atiende, vende y cobra 24/7 — conectado a tu operación.”
- Subheadline:
  - “Implementamos agentes de voz y omnicanal a medida. Integramos WhatsApp, telefonía, CRM y calendarios. Agenda una preconsultoría y recibe un plan inicial.”
- CTAs:
  - “Agendar preconsultoría”
  - “Probar demo”

## J2) Beneficios (6)
Usar exactamente estos conceptos, con redacción equivalente:
1) Incrementa ventas (leads calificados)
2) Servicio 24/7 (voz + mensajería)
3) Reduce errores (automatización auditable)
4) Ahorra costos (menos tareas repetitivas)
5) Integración con múltiples plataformas (CRM, Calendar, email, WhatsApp)
6) Tiempo récord (diagnóstico → piloto → producción)

## J3) Modelo de servicio (3 fases)
- “No vendemos una plataforma: implementamos un sistema que encaja con tu operación.”
- “Seleccionamos herramientas open source y premium según tus requerimientos.”

## J4) Demos (disclaimer)
- “Demo simulada. El flujo real se define en la preconsultoría según tu negocio.”

---

# K) Criterios de aceptación (Definition of Done)

1. El landing incluye todas las secciones D1–D11.
2. No se muestran precios en ninguna parte.
3. El hero cumple la regla de claridad en 7 segundos (A2).
4. Los 7 casos de uso están presentes con estructura completa (A3).
5. Beneficios incluyen los 6 claims (A4).
6. “Cómo trabajamos” incluye 3 fases y entregables (A5).
7. Integraciones por categorías (A7) y tecnología sin saturar (A6).
8. Sección demos permite elegir Demo A o B y ambas simulan:
   - UI de agente de voz,
   - ondas de sonido al hablar (simulado),
   - botón de colgar,
   - cierre con CTA a agendar.
9. Cal.com embed visible y accesible; CTAs anclan correctamente.
10. Responsive mobile-first con CTA fijo en mobile.
11. Accesibilidad básica: keyboard nav + focus + labels.
12. Eventos analíticos listos a nivel de handlers (aunque no haya proveedor).

---

# L) Notas para el LLM (instrucción maestra)
- Construir primero la estructura y contenido del landing conforme a reglas A.
- Implementar demos SOLO como simulación visual; no integrar llamadas reales.
- Priorizar claridad y conversión: CTA primario “Agendar preconsultoría” siempre visible en momentos clave.
- Mantener el enfoque “servicio consultivo + implementación” y “integración a infraestructura existente (incluye Asterisk/PBX/VoIP)”.