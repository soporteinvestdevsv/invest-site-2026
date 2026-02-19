'use client';

import { useEffect } from 'react';

// CSS as a constant string to ensure it's injected even if imports fail or context is strict

// CSS as a constant string to ensure it's injected even if imports fail or context is strict
const SCOPED_CSS = `
/* Scoped HubSpot Form Styles */
.hs-form {
  font-family: var(--font-museo-sans), sans-serif !important;
  color: var(--color-text-primary);
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.hs-form * {
  font-family: var(--font-museo-sans), sans-serif !important;
}

/* Headings */
.hs-richtext h1,
.hs-richtext h2,
.hs-richtext h3 {
  color: #0b2a4a;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.5rem;
}

.hs-richtext h1 { font-size: 2rem; }
.hs-richtext h2 { font-size: 1.5rem; }
.hs-richtext p { 
  margin-bottom: 1rem; 
  line-height: 1.6;
  color: var(--color-text-muted);
}

/* Fields */
.hs-form-field { margin-bottom: 24px; }
.hs-form-field > label {
  display: block;
  font-weight: 500;
  color: var(--color-text-primary);
  margin-bottom: 4px;
  font-size: 0.95rem;
}
.hs-field-desc {
  display: block;
  font-size: 0.85rem;
  color: var(--color-text-muted);
  margin-bottom: 8px;
  font-style: italic;
}
.hs-form-required { color: #ef4444; margin-left: 2px; }

/* Inputs */
.hs-input:not([type="checkbox"]):not([type="radio"]) {
  display: block;
  width: 100%;
  padding: 10px 14px;
  font-size: 1rem;
  line-height: 1.5;
  color: var(--color-text-primary);
  background-color: var(--color-surface-page);
  border: 1px solid var(--color-border-neutral);
  border-radius: 0.5rem;
  transition: all 0.15s ease-in-out;
}
.hs-input:not([type="checkbox"]):not([type="radio"]):focus {
  border-color: #0b2a4a;
  outline: 0;
  box-shadow: 0 0 0 4px rgba(11, 42, 74, 0.1);
}
textarea.hs-input { min-height: 120px; resize: vertical; }

/* Selects */
select.hs-input {
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}

/* Radios/Checkboxes */
.inputs-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; }
.hs-form-radio-display, .hs-form-booleancheckbox-display { display: flex; align-items: flex-start; gap: 10px; cursor: pointer; }
.hs-input[type="radio"], .hs-input[type="checkbox"] {
  width: 1.25em; height: 1.25em; margin-top: 3px;
  border: 1px solid var(--color-border-neutral);
  accent-color: #0b2a4a;
}
.hs-input[type="radio"] { border-radius: 50%; }

/* Buttons */
.actions { margin-top: 1.5rem; padding-bottom: 0; }
.hs-button.primary {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 2rem;
  font-weight: 600;
  color: white;
  background-color: #0b2a4a;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  width: 100%;
  transition: all 0.2s;
}
.hs-button.primary:hover { background-color: #08213a; }
.hs-button.primary:focus { outline: none; box-shadow: 0 0 0 4px rgba(11, 42, 74, 0.2); }
@media (min-width: 640px) { .hs-button.primary { width: auto; } }

/* Error messages */
.hs-error-msgs { list-style: none; padding: 0; margin: 4px 0 0 0; color: #ef4444; font-size: 0.875rem; }
.hs-input.invalid { border-color: #ef4444; }

/* Layout */
fieldset { border: none; padding: 0; margin-bottom: 3rem; max-width: 100%; }
@media (max-width: 767px) {
  .hs-form-field { width: 100% !important; float: none !important; margin-bottom: 16px; }
  .hs-richtext h1 { font-size: 1.75rem; }
  fieldset { margin-bottom: 2rem; }
}
.hs_submit { margin-bottom: 0; }
`;


export const HubSpotContactForm = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "//js.hsforms.net/forms/embed/v2.js";
        script.charset = "utf-8";
        script.type = "text/javascript";
        document.body.appendChild(script);

        script.onload = () => {
            // @ts-ignore
            if (window.hbspt) {
                // @ts-ignore
                window.hbspt.forms.create({
                    portalId: "23799474",
                    formId: "4842e4c6-1ad7-4b4e-b8ec-75152c307716",
                    region: "na1",
                    target: '#hubspot-form-container',
                    css: '' // Disable default HubSpot styles to ensure ours take precedence
                });
            }
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: SCOPED_CSS }} />
            <div id="hubspot-form-container" className="w-full mx-auto"></div>
        </>
    );
};
