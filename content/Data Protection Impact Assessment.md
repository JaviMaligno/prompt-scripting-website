# Data Protection Impact Assessment

**Project:** Prompt Scripter – Browser Extension + Backend Service  
**Controller:** Javier Aguilar Martín, trading as AGILabs — 82 Chatterton Road, BR2 9QE, United Kingdom  
**Date:** 28 August 2026  
**Version:** 1.0

This assessment is carried out under Article 35 of the UK GDPR. It is published so that users can read the reasoning behind how their data is handled, rather than only the conclusions.

---

## 1. Project Overview

- **Purpose of the Service**  
    Allow users to capture, store, and re-run their own prompts and AI outputs from supported chat platforms.
    
- **Scope of Processing**
    
    - Capture of prompts/responses (only at user request).
        
    - Optional user-uploaded datasets (CSV, text).
        
    - Account data (email, login credentials).
        
    - Subscription state for users on the paid plan.
        
    - Limited logs (abuse monitoring, debug).
        
    - Mailing list addresses submitted through the website sign-up form.
        
- **Parties involved**
    
    - Users of Prompt Scripter
        
    - The operator, who is the sole person with access to production data
        
    - Stripe, as merchant of record and payment processor for the paid plan
        
    - Infrastructure suppliers (hosting, managed database) acting as processors
        
    - Third-party AI providers (OpenAI, Google, Anthropic, etc.)
        

---

## 2. Description of Data Processed

- **Personal Data Types** (some may be incidental):
    
    - Email address (for registration, login, and the mailing list).
        
    - User-generated chat content (may contain PII if the user includes it).
        
    - Subscription state and a Stripe customer identifier.
        
- **Special Categories of Data** (sensitive):
    
    - Not intentionally collected.
        
    - Possible incidental collection if a user includes it in chat content they choose to save (e.g. health information).
        
- **Data we do not hold**
    
    - Payment card details. These are collected by Stripe on Stripe’s own checkout and never reach our systems.
        
- **Data Flows**
    
    1. User interacts with an AI site → Prompt Scripter captures content at the user’s request.
        
    2. Data is stored in the Service’s managed database, hosted by our infrastructure suppliers.
        
    3. The user can export or delete it.
        
    4. Data may be temporarily retained for abuse monitoring and legal compliance.
        
    5. For paid accounts, Stripe notifies the backend of the subscription state, which sets the account’s entitlement.
        

---

## 3. Legal Basis for Processing (UK/EU GDPR)

- **Contractual necessity** – providing the Service the user signed up for, and running a paid subscription.
    
- **Consent** – for optional features such as storage of chat content, and for the mailing list.
    
- **Legitimate interests** – abuse monitoring and service improvement, weighed against the interests of users.
    
- **Legal obligations** – retention where required by law, including tax records.
    

---

## 4. Necessity & Proportionality

- **Why is processing necessary?**  
    To provide the script management and re-run functionality users ask for.
    
- **Could the same purpose be achieved with less data?**  
    Only partially. Storing metadata alone would use less data, but the core function is re-using the chat content itself, so the content has to be stored to deliver it.
    
- **Minimisation measures**
    
    - Store only what the user asks to be stored.
        
    - No background scraping or collection.
        
    - Deletion and export tools provided.
        
    - Card data avoided entirely by using a merchant of record.
        

---

## 5. Risks & Mitigation

|Risk|Likelihood|Impact|Mitigation|
|---|---|---|---|
|Users input PII into chat content they save|Medium|High|Terms of Service make the user responsible for the content they store; deletion and export tools provided; nothing is captured without an explicit user action.|
|Unauthorised access to stored data|Medium|High|User authentication, HTTPS in transit, hashed passwords, expiring session tokens, production access limited to the operator.|
|Data breach at an infrastructure supplier|Low-Medium|High|Reputable suppliers under Article 28 processing agreements; access controls; incident response procedure with 72-hour ICO reporting.|
|Non-compliance with AI suppliers’ terms|Medium|Medium|No scraping; only user-initiated capture; disclaimers in the Terms of Service.|
|Cross-border data transfer|Medium|Medium|Transfers made under an adequacy decision, the UK IDTA, or the UK Addendum to the EU SCCs.|
|Retention beyond what is necessary|Medium|Medium|Retention matched to third-party retention windows; deleted data purged once it is no longer needed for abuse, safety or legal purposes.|
|Exposure of payment data|Low|High|Card data never enters our systems; Stripe is merchant of record and handles collection, storage and tax.|

---

## 6. Data Subject Rights

- **Access** – users can request a copy of their data by writing to info@javieraguilar.ai; we respond within one month.
    
- **Deletion** – supported in the product, and on request.
    
- **Portability** – export in a machine-readable format is supported.
    
- **Rectification** – users can correct their own data in the product, or ask us to.
    
- **Objection and restriction** – handled on request through the same contact address.
    
- **Withdrawal of consent** – available at any time where consent is the basis, including for the mailing list.
    
- **Complaint** – users may complain to the ICO, or to the supervisory authority where they live, without going through us first.
    

---

## 7. Security Measures

- HTTPS-only traffic.
    
- User accounts with hashed passwords.
    
- Session tokens with expiry.
    
- CSP-safe extension injection practices.
    
- Production data access limited to the operator.
    
- No card data held; payment handled entirely by Stripe.
    

---

## 8. Consultation

- **Internal**: the operator, who is also the developer and product owner.
    
- **Users**: feedback channels are open at info@javieraguilar.ai, and this assessment is published for users to read and respond to.
    
- **Regulator**: prior consultation under Article 36 is not required, because the residual risk after mitigation is not high. ICO guidance is followed.
    

---

## 9. Conclusion

- **Residual risk level:** Medium. The driver is the possibility that users place personal data inside chat content they choose to save. This is inherent to a tool whose purpose is to store and re-use the user’s own prompts, and it is mitigated rather than eliminated: nothing is stored without a deliberate user action, and the user can export or delete anything at any time.
    
- **Decision:** The processing may proceed with the mitigations set out above.
    
- **Review:** This assessment is reviewed annually, and sooner if the Service starts processing a new category of data, adds a new class of recipient, or changes how data is stored.
    
