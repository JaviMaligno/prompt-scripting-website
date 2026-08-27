# Data Protection Impact Assessment (DPIA) – Draft Checklist

**Project:** Prompt Scripter – Browser Extension + Backend Service  
**Owner:** [Company Name]  
**Date:** [Insert Date]  
**Version:** 0.1 (Draft)

---

## 1. Project Overview

- **Purpose of the Service**  
    Allow users to capture, store, and re-run their own prompts and AI outputs from supported chat platforms.
    
- **Scope of Processing**
    
    - Capture of prompts/responses (only at user request).
        
    - Optional user-uploaded datasets (CSV, text).
        
    - Account data (email, login credentials).
        
    - Limited logs (abuse monitoring, debug).
        
- **Stakeholders**
    
    - Users of Prompt Scripter
        
    - [Company Name] staff (developers, admin)
        
    - Third-party AI providers (OpenAI, Google, Anthropic, etc.)
        

---

## 2. Description of Data Processed

- **Personal Data Types** (may be incidental):
    
    - Email address (for registration/login).
        
    - User-generated chat content (may contain PII if user includes it).
        
    - Subscription/payment details (future functionality).
        
- **Special Categories of Data** (sensitive):
    
    - Not intentionally collected.
        
    - Possible incidental collection if user includes it in chat content (e.g., health info).
        
- **Data Flows**
    
    1. User interacts with AI site → Prompt Scripter captures content at request.
        
    2. Data stored in [Cloud/Postgres/Storage provider].
        
    3. User can export/delete.
        
    4. Data may be temporarily retained for abuse/legal compliance.
        

---

## 3. Legal Basis for Processing (UK/EU GDPR)

- **Contractual necessity** – providing the Service the user signed up for.
    
- **Consent** – for optional features like storage of chat content.
    
- **Legitimate interests** – abuse monitoring, service improvement.
    
- **Legal obligations** – retention if required by law.
    

---

## 4. Necessity & Proportionality

- **Why is processing necessary?**  
    To provide script management and re-run functionality requested by users.
    
- **Could the same purpose be achieved with less data?**  
    Yes, by storing minimal metadata only — but functionality requires chat content.
    
- **Minimisation measures**
    
    - Store only user-requested data.
        
    - No background scraping or collection.
        
    - Deletion/export tools provided.
        

---

## 5. Risks & Mitigation

|Risk|Likelihood|Impact|Mitigation|
|---|---|---|---|
|Users input PII into chat|Medium|High|Make clear in ToS that users are responsible for content; provide deletion/export tools.|
|Unauthorized access to stored data|Medium|High|User authentication, HTTPS, access controls, planned encryption.|
|Data breach of cloud provider|Low-Medium|High|Use reputable providers, encryption at rest (future), security monitoring.|
|Non-compliance with AI suppliers’ ToS|Medium|Medium|No scraping; only user-initiated data capture; disclaimers in ToS.|
|Cross-border data transfer|Medium|Medium|Host in UK/EU; apply GDPR safeguards (e.g., SCCs if non-EU).|
|Retention beyond necessity|Medium|Medium|Match third-party retention windows; auto-delete logs after X days.|

---

## 6. Data Subject Rights

- Access request procedures in place? ✅ Planned
    
- Deletion on request? ✅ Supported
    
- Export in portable format? ✅ Supported (CSV/JSON/PDF export planned)
    
- Objection/restriction handling? ⚠️ To be documented internally
    

---

## 7. Security Measures

- HTTPS-only traffic.
    
- User accounts with hashed passwords.
    
- Session tokens (JWT with expiry).
    
- CSP-safe extension injection practices.
    
- Planned: encryption at rest for chat data.
    
- Planned: role-based access controls for admin staff.
    

---

## 8. Consultation

- **Internal**: Dev team, product lead.
    
- **External**: To be reviewed by legal counsel before launch.
    
- **Regulator consultation**: Not required at MVP, but ICO guidance should be followed.
    

---

## 9. Conclusion & Actions

- **Residual risk level:** Medium (due to potential user PII in chat content).
    
- **Decision:** Proceed with mitigations and legal review before scaling.
    
- **Actions:**
    
    -  Implement deletion/export functionality in v1.
        
    -  Document security practices.
        
    -  Add encryption in v2.
        
    -  Register with ICO before launch.
        
    -  Legal review of ToS & Privacy Policy before payment features.