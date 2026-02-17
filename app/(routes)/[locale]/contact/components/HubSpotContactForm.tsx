'use client';

import { useEffect } from 'react';

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
                    target: '#hubspot-form-container'
                });
            }
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div id="hubspot-form-container" className="w-full max-w-[600px] mx-auto min-h-[600px]"></div>
    );
};
