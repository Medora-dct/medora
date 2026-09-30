import React from "react";
import { Section } from "../components/patterns";

const LegalPage = ({ title }) => (
  <Section n={1} name={title.toUpperCase()} style={{ borderTop: 0 }}>
    <h1 className="pl-h1">{title}</h1>
    <div className="pl-slot" style={{ marginTop: 30 }}>
      {title.toUpperCase()} — LEGAL COPY TO BE SUPPLIED AND REVIEWED.
    </div>
  </Section>
);

export { LegalPage };
