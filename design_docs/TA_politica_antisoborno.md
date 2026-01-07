# Textos actuales: Política Antisoborno
**Página:** Política Antisoborno (/politica-antisoborno)  
**Fecha:** 07 de Enero de 2026  

---

## Contenidos de la pantalla

| Multimedia (Archivo) | Sección / Ubicación | Texto (ES) | Texto (EN) | Notas |
| :--- | :--- | :--- | :--- | :--- |
| [Nombre_de_archivo_de_multimedia] | **SEO** – Title | Política Antisoborno | INVEST El Salvador | Anti-Bribery Policy | INVEST El Salvador | Desde `page.tsx` |
| [Nombre_de_archivo_de_multimedia] | **Título Principal** | Política Antisoborno | Anti-Bribery Policy | H1 centrado |
| [Nombre_de_archivo_de_multimedia] | **Introducción** | Con el propósito de consolidar los principios de integridad, legalidad y transparencia en la gestión de todos los servicios que proporciona la Agencia de Promoción de Inversión y Exportaciones de El Salvador (INVEST), se establece, mantiene y se revisará de manera continua la presente Política Antisoborno. | In order to consolidate the principles of integrity, legality and transparency in the management of all services provided by the Investment and Export Promotion Agency of El Salvador (INVEST), this Anti-Bribery Policy is established, maintained and continuously reviewed. | Texto alineado a la izquierda |
| [Nombre_de_archivo_de_multimedia] | **Compromisos** – Encabezado | INVEST asume los siguientes compromisos: | INVEST assumes the following commitments: | H3 con borde inferior |
| [Nombre_de_archivo_de_multimedia] | **Compromisos** – Item I | Cero tolerancia frente al soborno en todas sus formas de expresión. | Zero tolerance for bribery in all its forms of expression. | Badge circular con número romano |
| [Nombre_de_archivo_de_multimedia] | **Compromisos** – Item II | Los funcionarios y empleados de INVEST se comprometen a cumplir y mejorar continuamente el Sistema de Gestión Antisoborno (SGAS), basado en la Norma ISO 37001:2016... | INVEST officials and employees are committed to complying with and continuously improving the Anti-Bribery Management System (ABMS), based on ISO 37001:2016... | |
| [Nombre_de_archivo_de_multimedia] | **Compromisos** – Item III | Todo funcionario o empleado de INVEST, tiene la responsabilidad de identificar y reportar indicios de soborno... [denuncias_soborno@investinelsalvador.gob.sv] | Every INVEST official or employee has the responsibility to identify and report signs of bribery... [denuncias_soborno@investinelsalvador.gob.sv] | Incluye email, teléfono 7071-7019 |
| [Nombre_de_archivo_de_multimedia] | **Compromisos** – Item IV | La Función de Cumplimiento Antisoborno, en conjunto con el liderazgo de su presidente, es responsable de verificar, evaluar y dar seguimiento... | The Anti-Bribery Compliance Function, together with the leadership of its president, is responsible for verifying, evaluating and monitoring... | |
| [Nombre_de_archivo_de_multimedia] | **Compromisos** – Item V | Los funcionarios, empleados, proveedores, socios de negocios y demás partes interesadas relacionadas con INVEST deben cumplir con los requisitos del SGAS... | Officials, employees, suppliers, business partners and other interested parties related to INVEST must comply with the ABMS requirements... | |
| [Nombre_de_archivo_de_multimedia] | **Compromisos** – Item VI | Los funcionarios y personal que conforman todas las dependencias de INVEST, deberán adoptar las medidas necesarias para asegurar la protección, confidencialidad y anonimato... | Officials and staff from all INVEST departments must take necessary measures to ensure the protection, confidentiality and anonymity... | |
| [Nombre_de_archivo_de_multimedia] | **Compromisos** – Item VII | Las autoridades de INVEST realizarán investigaciones pertinentes, agotando las instancias administrativas y legales... | INVEST authorities will carry out pertinent investigations, exhausting administrative and legal instances... | |
| [Nombre_de_archivo_de_multimedia] | **Cierre** | INVEST, como institución líder en la promoción de la inversión extranjera y las exportaciones de El Salvador, reafirma su compromiso... | INVEST, as a leading institution in promoting foreign investment and exports from El Salvador, reaffirms its commitment... | Texto en cursiva, contenedor semitransparente |
| [Nombre_de_archivo_de_multimedia] | **Fecha** | San Salvador, Agosto 2025 | San Salvador, August 2025 | Texto alineado a la derecha |
| [Nombre_de_archivo_de_multimedia] | **Formulario** – Título | Denuncias de Posibles Actos de Soborno | Reporting Possible Bribery Acts | H2 en fondo blanco |
| [Nombre_de_archivo_de_multimedia] | **Formulario** – Campo Nombre | Nombre (Opcional) | Name (Optional) | Input de texto |
| [Nombre_de_archivo_de_multimedia] | **Formulario** – Campo Teléfono | Teléfono (Opcional) | Phone (Optional) | Input tipo tel |
| [Nombre_de_archivo_de_multimedia] | **Formulario** – Campo Email | Correo Electrónico (Opcional) | Email (Optional) | Input tipo email |
| [Nombre_de_archivo_de_multimedia] | **Formulario** – Campo Fecha | Fecha del hecho identificado: | Date of Incident: | Input tipo date |
| [Nombre_de_archivo_de_multimedia] | **Formulario** – Campo Descripción | Describa la denuncia de posible hecho de Soborno identificada: | Description: | Textarea, 5 filas |
| [Nombre_de_archivo_de_multimedia] | **Formulario** – Botón Enviar | Enviar reporte | Submit Report | Botón centrado, gradiente azul |

---

## Notas de Implementación

- **Layout:** Página con tema oscuro (gradiente `#00030A` → `#050B1A`)
- **Formulario:** Fondo blanco para contraste, siempre centrado
- **Tipografía:** Texto alineado a la izquierda (no justificado)
- **Móvil:** Optimizado con `break-words` para evitar overflow de emails largos
- **i18n:** Namespace `anti_bribery` en `messages/anti-bribery/[locale].json`
