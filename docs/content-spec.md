# ujasbhadani.com rebrand: content specification

Final copy for every section, with the founder's revisions (B2, E1, S4) and decisions
(FD1 to FD9, see `docs/decisions-2026-09-29.md`) already applied. Builders copy this
text into content files verbatim. Do not add numbers, dates, or claims that are not
here. Voice is first person. Bullets have an implied subject and start with the verb.

Markers used below (for the founder's pre-merge review, not for rendering):
- `[confirm]` after a bullet: drawn from industry practice; the founder confirms it in
  the D5 review before merge (FD7 = A). Render normally; keep `confirm: true` in the
  content file's front matter so the review checklist can be generated.
- Nothing else is marked. Anything the founder could not yet supply (dates, links,
  years) is simply omitted from the rendered page.

---

## 0. Global

- Site name: Ujas Bhadani
- Page title: `Ujas Bhadani · SOX 404(b) ITGC lead and founder of Crescive.ai`
- Meta description: `Security and GRC engineer leading a Deloitte-audited SOX 404(b) IT general controls program, and founder of Vasan AI (Crescive.ai). Writing on AI in GRC.`
- Identity line (used in hero, Open Graph card, llms.txt, JSON-LD jobTitle):
  `SOX 404(b) ITGC lead · Security and GRC engineer · Founder, Vasan AI (Crescive.ai)`
- Canonical: `https://ujasbhadani.com/`
- Headshot: `assets/img/profile-img.jpg` (existing). Alt text: "Ujas Bhadani".
- Footer: `© 2026 Ujas Bhadani · Founder, Vasan AI Technologies, LLC · crescive.ai`
  with LinkedIn (https://www.linkedin.com/in/ujasbhadani/), GitHub
  (https://github.com/ujasbhadani) and email (contact@ujasbhadani.com, as text with
  a copy button). No template credit (site no longer uses the iPortfolio template).
- Navigation (left rail on desktop, top bar on phones), in this order with anchors:
  1. Home `#top`
  2. About `#about`
  3. Experience `#experience` (alias `#resume`)
  4. SOX 404(b) practice `#sox-404b`
  5. AI in GRC `#ai-in-grc`
  6. Projects `#projects`
  7. Research `#research` (alias `#researchpaper`)
  8. Skills and certifications `#skills`
  9. Awards `#awards`
  10. Recommendations `#recommendations` (alias `#recommandations`)
  11. Contact `#contact`
  Aliases are empty anchors placed at the start of the target section so old links
  still land correctly.
- External links: crescive.ai and vasan.ai are linked from the Founder role, the
  Crescive case study and the footer only (FD9 = A).

---

## 1. Hero

- Name: **Ujas Bhadani**
- Rotating role phrases (in order): `SOX 404(b) ITGC lead` · `Security and GRC engineer` · `Founder, Crescive.ai` · `Building AI for GRC`
  (If motion is reduced, show the first phrase statically.)
- Sub-line: `I run IT general controls programs that pass Big 4 audit, and I build AI that makes that work faster and more defensible.`

---

## 2. About (first person, B2 revision applied)

I am a security and GRC engineer who leads the SOX 404(b) IT general controls program at Xponential Fitness, where Deloitte is the external auditor, and the founder of Vasan AI Technologies, the company behind Crescive.ai. My work sits where audit rigor meets engineering: designing controls that hold up to testing, automating the evidence behind them, and building AI systems that are auditable by construction.

Across a decade at Red Hat Academy, Electromech, Bosch and Xponential I moved from Linux hardening and cloud security into zero-trust architecture and secure SDLC, and then into IT audit leadership. That path shapes how I work. I prefer controls enforced in code and databases over controls written in policy, and evidence that regenerates itself over evidence collected by hand.

I hold a Master of Science in Cybersecurity and GRC from Northeastern University, publish in IEEE and international security journals, and am certified across CISSP, CRISC, AWS, Red Hat and Cisco. I write about AI in GRC: what changes for auditors when the system under review is a model, and how AI can take the tedious parts of control testing without lowering the bar.

---

## 3. Experience

Render as a vertical timeline. Each role shows title, organisation, location where known,
then bullets. No dates are rendered (none supplied). Where a role has two groups, show
the group label as a small sub-heading inside the role.

### 3.1 Founder · Vasan AI Technologies, LLC (Crescive.ai)

(E1 revision: no entity type, no dates, no "(I1)" line. FD6 = B: no counts.)

- Brands had no way to see how ChatGPT, Perplexity, Gemini, Claude, Grok, Copilot, DeepSeek or Google AI Overviews described them, or why a competitor was cited instead, so I founded Vasan AI and built Crescive, an AI-agent-based Answer Engine Optimization platform that measures brand presence across the major answer engines through official provider APIs, diagnoses each losing prompt to a root cause, drafts human-approved fixes, and proves before-and-after lift. It is live at crescive.ai with self-serve plans and a free trial.
- Designed the platform to be auditable from the first commit: a Next.js front end and a Python measurement worker on AWS ECS Fargate behind a metered, cached, budgeted model gateway, on Supabase Postgres where tenant isolation, seat limits and plan protections are enforced by row-level security in the database rather than by application code alone, with every schema change gated by a structural review before it ships.
- Brought an IT auditor's discipline to an AI product: every architectural decision recorded as a decision record, a role-to-permission matrix enforced server-side, a separate corporate privilege plane where admin access to a customer workspace is time-boxed, reason-required and written to two audit logs, envelope encryption for stored customer credentials, and a public security page mapped to NIST CSF 2.0 and the OWASP Top 10 with a responsible disclosure policy.
- Instead of hiring a large early team, designed a multi-role AI specialist operating model (architect, backend, frontend, database engineer, QA sentinel, risk officer, pentest engineer, legal counsel and others), each agent with a defined role, task-scoped tools and an auditable activity trail, under a project-manager planning gate, mandatory QA and Risk Officer sign-off on security-tagged work, and hook-enforced commit discipline, which took the platform from first commit to a live, self-serve product in its first quarter.
- Built the AI governance and legal program alongside the product rather than after it: an AI system card, evaluation and red-team summaries, NIST AI RMF alignment and EU AI Act classification, a privacy notice and DPA/SCC package, an AI addendum for enterprise contracts, and a rule that no security claim reaches the marketing site without Risk Officer review.
- Ran go-to-market as an engineered pipeline: an automated daily blog with a claims checker that rejects invented statistics, every post paired with LinkedIn and Instagram companions, an llms.txt for answer engines, and error monitoring plus an email alerting pipeline with canary tests so failures surface before customers see them.

Links: crescive.ai (product), vasan.ai (company).

### 3.2 Security Engineer · Xponential Fitness, Inc. · Irvine, CA

Sub-line under the title: `SOX 404(b) ITGC program lead · external auditor: Deloitte`

**Group: SOX 404(b) ITGC program**

- Took over as management's lead for the Deloitte-audited SOX 404(b) IT general controls program after a year that closed with open deficiencies, and rebuilt it end to end: re-scoped top-down from the financial statement line items to the financially relevant applications and infrastructure, redesigned the Risk and Control Matrix against COSO 2013 and PCAOB AS 2201, and walked every key control with its owner so design gaps were fixed before external testing began. The year closed with every prior-year deficiency remediated and a no-material-weakness opinion. [confirm: re-scoping and COSO/AS 2201 wording]
- Owned test of design and test of operating effectiveness across the key controls and in-scope applications covering logical access, change management, IT operations and program development, sized samples to control frequency (two for a quarterly control, twenty-five or more for a daily one), proved each population complete before selecting from it, ran interim testing with a year-end roll-forward, and coordinated auditor reliance so Deloitte could reduce its own re-performance. [confirm]
- Evidence collection had been a manual scramble of screenshots and email threads, so I moved the program into AuditBoard (now Optro) with control-owner assignments, request tracking and evidence pulled straight from source systems, cutting retrieval time 35% and giving auditors one timestamped population for every test.
- Made user access review the most defensible control in the program: quarterly UAR and privileged-access recertification across ERP, financial reporting, HR and cloud platforms, each population validated for completeness and accuracy before review, reviewer attestation and removals captured in the tool rather than in email, segregation-of-duties conflicts documented, and terminations tested against HR records, which removed the recurring terminated-user and shared-account findings. [confirm]
- Standardized change-management evidence across engineering teams by mapping the SDLC to key controls (ticketed approval, reviewer distinct from author, segregated deployment, emergency changes logged and approved within a defined window) and reconciling deployed changes against the ticket population, which eliminated developer-access-to-production and unlogged-emergency-change exceptions. [confirm]
- Built the SOC 1 Type 2 reliance file for outsourced financial systems: mapped complementary user entity controls to the internal controls that satisfy them, reviewed subservice carve-outs and covered the gap between report period and fiscal year-end with bridge letters, and documented every exception with its impact, so reliance on service organizations held up to auditor challenge. [confirm]
- Ran deficiency evaluation with management and Deloitte, rating each exception on likelihood and magnitude as a control deficiency, significant deficiency or material weakness, testing whether compensating controls actually operated at the precision needed, aggregating by account, assertion and IT system, then driving remediation through POA&Ms with named owners and re-test dates until the log was closed. [confirm: classification wording]
- Control owners were answering the same request three times for SOX, SOC 2 and ISO 27001, so I consolidated the overlapping requirements into one control library and one evidence calendar, letting a single artifact satisfy several frameworks and cutting audit fatigue. [confirm: consolidation wording]
- Built the vendor due-diligence process for the GRC function: risk tiering, security questionnaires, SOC report review and contract security terms, so every third party was evaluated against internal policy, regulatory requirements and business risk before onboarding.
- Introduced AI into the audit workflow only where it could be evidenced: LLM-assisted pre-screening of change tickets and access-review populations against control criteria before human testing, with prompts, outputs and the tester's own conclusion retained as workpapers because auditors treat AI-generated work product as unreviewed until a person signs it, plus an AI-use policy and a NIST AI RMF-based risk assessment so the tooling itself was auditable. [confirm]

**Group: Security engineering**

- Application code was reaching production without automated security testing, so I integrated SAST and DAST into the CI/CD pipelines with findings routed to the owning team, taking DevSecOps coverage to 80% of services.
- Spoofed email carrying the company's domain was a live phishing vector, so I deployed SPF, DKIM and DMARC through Cloudflare and moved the policy to enforcement, cutting spoofed mail by 90%.
- Led endpoint defense on CrowdStrike, tuning detection and automated remediation so roughly 5,000 vulnerabilities a day were mitigated without disrupting business operations.
- Sensitive data was leaving through email and shared drives with no detection, so I deployed data-loss-prevention controls across Google Workspace and built anomaly detection into the SIEM workflows, closing the gap between the written policy and what was actually caught.
- Engineering teams were choosing their own authentication and crypto patterns, so I wrote the security requirements for OAuth2 flows, cryptographic standards and API security across the SaaS estate, giving them one standard to build to and be audited against.

### 3.3 Sr. Security Engineer · Bosch Home Comfort · Watertown, MA

- Corporate and cloud networks still trusted anything inside the perimeter, so I led the move to a zero-trust architecture using a CNAPP platform and an IAM role-to-profile design that gave each workload and person only the access its job required, shrinking the blast radius of any single compromised credential.
- Vulnerability scanning was inconsistent across product teams, so I ran GreenBone scanning as a shared service with per-team ownership and prioritization, raising coverage across the product portfolio while cutting the effort teams spent on triage by 40%.
- Compliance checks happened after deployment, so I transitioned cloud security from checklist reviews to infrastructure-as-code and policy-as-code guardrails aligned to NIST 800-53, ISO 27001/27002 and OWASP ASVS, so controls were enforced at deploy time and their evidence was generated automatically.
- Product teams were shipping without a threat model, so I embedded threat modeling and secure-SDLC checkpoints into their development workflow, catching design-level risks before code was written instead of in penetration test reports after release.
- Identity and patching were spread across disconnected tools, so I consolidated single sign-on on JumpCloud and automated patch management with Automox across the hybrid estate, reducing standing credentials and shortening patch windows.

### 3.4 Cyber Security Engineer · Electromech

- Server hardening was a manual runbook applied differently on every build, so I wrote Ansible playbooks that enforced a CIS-aligned baseline automatically, cutting hardening time 27% and making every server identical to the standard. [confirm: "CIS-aligned"]
- AWS accounts had no central security visibility, so I enabled and tuned IAM, Security Hub, Inspector and CloudTrail with continuous monitoring and owner-assigned remediation, resolving 85% of high-risk findings across the AWS services in use.
- Threats were only visible after the fact, so I brought SIEM correlation and network segmentation together for prevention and visibility, so lateral movement was blocked by design and the remaining traffic was actually watched.

### 3.5 Linux Security Administrator · Red Hat Academy (Silver Oak Group of Institutes)

- A mixed estate of Linux and Windows servers had no consistent patch or access policy, so I took over patch management, user accounts and security configuration and put structured patch cycles and access rules in place, improving the servers' security posture by 15%.
- Colleagues had little exposure to Linux security, so I designed and delivered more than ten hands-on workshops (Linux fundamentals, CLI, SELinux, kernel security, SSH hardening, containers on RHEL) and trained 80+ co-workers in cyber awareness and vulnerability assessment.
- The academy needed course material aligned to Red Hat's own curriculum, so I developed hands-on coursework for the RHCSA and RHCE tracks that students could run in a lab.

### 3.6 Graduate Teaching Assistant · Northeastern University · Boston, MA

- Mentored more than 250 graduate students across Network Security Practices, Network Distributed Systems and Foundations of Cybersecurity.
- Students were learning firewalls and attacks from slides, so I designed and ran hands-on threat-modeling, brute-force, penetration-testing and Palo Alto firewall labs where they performed the attack, found the misconfiguration and fixed it, and could explain the root cause afterwards.
- Coached students through configuring Palo Alto firewalls, routers, switches, cryptography, VPNs, IDS/IPS and SIEM until they could do it without the lab guide.

### 3.7 Education

- **M.S. Cybersecurity and Governance, Risk and Compliance** · Northeastern University, Boston · GPA 3.75/4.00. Coursework: Computer System Security, Network Security Practices, Information System Forensics, Information Assurance, Decision Making for Critical Infrastructure, IT Security Governance, Risk and Compliance, Capstone.
- **B.E. Computer Engineering** · Gujarat Technological University · GPA 9.56/10.00, top of cohort with a 10/10 semester.

---

## 4. How I run a SOX 404(b) ITGC program (section `#sox-404b`)

Intro line: `Seven steps, in the order the audit runs. Each one names what I do and the artifact it leaves behind.`

Render as a horizontal lifecycle on desktop (inline SVG or CSS steps), stacked on
phones. Each step: number, name, one sentence, artifact label.

1. **Scope and risk assessment.** Identify financially relevant applications, databases, operating systems and infrastructure from the financial statement line items down. Artifact: in-scope system inventory with rationale.
2. **Risk and Control Matrix.** Map each ITGC domain (logical access, change management, IT operations, program development) to risks, key controls, frequency, owner and evidence. Artifact: RCM aligned to COSO 2013.
3. **Walkthroughs.** Sit with each control owner, trace one instance end to end, and fix design gaps before testing starts. Artifact: walkthrough memo and design conclusion.
4. **Test of design and operating effectiveness.** Pull populations, prove them complete and accurate, select samples sized to control frequency (two for quarterly, twenty-five or more for daily), and test by inquiry, observation, inspection and re-performance. Artifact: test sheets with IPE validation.
5. **SOC 1 reliance.** Review each service organization's Type 2 report, map complementary user entity controls to the internal controls that satisfy them, address subservice carve-outs, and cover the gap to year-end with bridge letters. Artifact: SOC 1 reliance memo.
6. **Deficiency evaluation and remediation.** Rate each exception on likelihood and magnitude, test whether compensating controls really operate at the precision needed, aggregate by account, assertion and system, and drive fixes through owned POA&Ms with re-test dates. Artifact: deficiency log.
7. **Roll-forward and opinion support.** Update interim testing to year-end and give the external auditor a clean, indexed workpaper set. Artifact: roll-forward package.

[confirm: the whole lifecycle describes work the founder personally leads]

Closing line with link: `The full story of one program rebuild is in the case study.` → `/work/sox-404b-itgc/`

---

## 5. AI in GRC (section `#ai-in-grc`, FD8 = A)

Intro: `Three short positions, each with its sources. The Crescive case study is the worked example.`

Render as three cards that expand in place (or link to `/writing/<slug>/` pages; builder's
choice, but the full text must be reachable without leaving the site). Each piece ends
with a "Sources" line.

### 5.1 What an auditor needs from an AI control

An AI control is any control where a model does part of the work: screening change tickets, drafting a review, flagging unusual access. Auditors do not care that the model is clever. They care about the same four things they care about for any control: can I see the population it ran over, can I see what it decided, can I tie each decision to a person who is accountable for it, and can I re-perform a sample.

COSO's 2026 guidance on internal control over generative AI puts the building blocks in plain terms: access restrictions and acceptable-use policies, input validation, prompt governance treated as configuration change management, output validation with exception handling, logging that makes every run traceable, and monitoring for drift.

Translated into workpapers, that means the prompt is version-controlled and approved like a configuration change; the model's output is retained together with the input it saw; a named tester records their own conclusion rather than forwarding the model's; and the exception rate is watched over time so a model that quietly stops flagging is caught.

If a team cannot produce those four things, the control is a convenience, not a control. If it can, the model is doing what a good junior tester does: the tedious first pass, with a reviewer who signs.

Sources: COSO, Achieving Effective Internal Control over Generative AI (2026), via Deloitte Heads Up: https://dart.deloitte.com/USDART/home/publications/deloitte/heads-up/2026/coso-internal-controls-generative-ai · Protiviti, 2025 SOX compliance trends (auditor posture on generative-AI work product): https://blog.protiviti.com/2025/10/29/calmer-audits-higher-bar-2025-sox-compliance-trends-and-update/

### 5.2 ITGCs still apply when the system is a model

Logical access, change management, operations. Those domains were written for ERPs, and they map cleanly onto AI agents once you stop thinking of an agent as software and start thinking of it as a user with a job description.

Logical access: each agent needs its own identity, a defined role, and permissions scoped to the task, with the same provisioning and deprovisioning evidence a human contractor would need. A shared API key used by five agents is a generic account, and it will be written up as one.

Change management: a prompt, a tool list and a model version are configuration. A change to any of them is a change, with approval, testing and a record of who deployed it.

Operations: agent runs need logs a person can read, budget and rate limits so a loop cannot run up a bill overnight, and monitoring that distinguishes a failed run from a wrong one.

PwC's 2026 view is that the agent orchestration layer itself belongs in ITGC scope, which matches what I see in practice: the interesting risk is rarely a single model, it is the plumbing that hands one agent's output to the next without anyone looking. None of this requires new audit theory. It requires applying the theory we have to a new kind of user.

Sources: PwC, AI agent interactions and the future of IT general controls: https://www.pwc.nl/en/services/audit-assurance/pwc-accountancy-insights/data-it-and-internal-control/ai-agent-interactions-and-the-future-of-it-general-controls.html · NIST AI Risk Management Framework 1.0: https://www.nist.gov/itl/ai-risk-management-framework

### 5.3 AI specialists under a Risk Officer gate: how Crescive is built

Crescive is built by a roster of AI specialists, each with a role a person would recognise: architect, backend and frontend developers, database engineer, QA, risk officer, pentest engineer, legal counsel. A project manager plans every task before any code is written. Specialists work in isolated branches with scoped tools. QA must pass before a task closes. Anything that touches authentication, tenant isolation or credentials needs the Risk Officer's sign-off. Schema changes get a structural review. Every decision that changes the architecture is written down as a decision record, and commits are enforced by hooks rather than by memory.

This is the operating model of an audited engineering organisation, applied to agents. It is slower than letting one model write everything. It is also the reason a control I would test at a client exists in my own company: access is role-scoped, changes are reviewed by someone other than the author, and there is a log for every privileged action.

When people ask whether AI can be trusted to build software, my answer is that the question is the same as for people. Not on trust. On controls.

Sources: the Crescive case study on this site · Crescive security page: https://crescive.ai/security

---

## 6. Projects (section `#projects`)

Card order (GRC first, engineering second, coursework last). Each card: title, one
outcome line, optional link, optional tag. Cards without a known link render without one.

1. **Rebuilding a SOX 404(b) ITGC program to a clean opinion** · case study · link `/work/sox-404b-itgc/` · "All prior-year deficiencies remediated, evidence retrieval down 35%, no material weakness."
2. **Crescive: an AI product built with audit gates** · case study · link `/work/crescive/` · "Controls in the database, decisions on record, a Risk Officer gate on every security change."
3. **AuditBoard (now Optro) evidence automation** · "Moved SOX evidence requests from email and screenshots into AuditBoard with control-owner assignment and source-system pulls. Retrieval time down 35%, one timestamped population per test."
4. **AI governance program for Crescive** · link https://crescive.ai/security · "An AI system card, evaluation and red-team summaries, a threat model, NIST AI RMF alignment, EU AI Act classification and an AI addendum for enterprise contracts, all written before general availability. The same artifacts SOC 2 examiners now ask AI companies for."
5. **User access review completeness-and-accuracy toolkit** · tag "pilot" · "Scripts that reconcile HR termination records against identity-provider and application user exports, flag accounts active past termination, and produce the population validation an auditor expects before a UAR is accepted." [confirm]
6. **AI-assisted control testing pilot** · tag "pilot" · "An LLM screens change tickets against the change-management control criteria (approval present, reviewer distinct from author, deployment ticket linked) and flags exceptions for a human tester, with every prompt and verdict retained as a workpaper. The model pre-screens; the tester concludes." [confirm]
7. **NIST 800-53 risk assessment for a healthcare messaging vendor** · "Analyzed assets, threats and vulnerabilities for Mobileheartbeat and recommended controls mapped to NIST SP 800-53." (no link)
8. **Server hardening automation** · link https://github.com/ujasbhadani/Server-Hardening-Automation · "Ansible playbooks that harden a Linux server to a consistent baseline, 27% faster than the manual runbook."
9. **CI/CD pipeline for AWS Lambda** · link https://github.com/ujasbhadani/CI-CD-Pipeline-AWS · "A pipeline that builds, tests and deploys a Lambda function on every push."
10. **Email security: behavioral analysis of an email** · "Used machine learning to examine the context in which an email is sent and flag anomalies; the basis of the NLP and Isolation Forest paper." (no link)
11. **AI-based intrusion detection with PCA and Random Forest** · "Tested whether class imbalance degrades IDS training on CIC-IDS-2017 using selective undersampling and SMOTE oversampling." (no link)
12. **Penetration testing in Docker containers** · "Simulated attacks on vulnerable WordPress and database topologies in containers with sqlmap, Metasploit and Nmap." (no link)
13. **Red Hat Academy website** · link https://rha.socet.edu.in/ · "Built the site for Red Hat Academy at Silver Oak Group of Institutes."

Dropped: "Cyberattack DOS & DDOS" (S5, P7 approved).

### 6.1 Case study: Rebuilding a SOX 404(b) ITGC program to a clean opinion (`/work/sox-404b-itgc/`)

Title: Rebuilding a SOX 404(b) ITGC program to a clean opinion
Eyebrow: Case study · Xponential Fitness, Inc. · external auditor Deloitte

**Context.** Xponential Fitness is a public company, so its internal control over financial reporting is audited under SOX 404(b), with Deloitte issuing the opinion. When I took over the IT general controls side of the program, the prior year had closed with open deficiencies and evidence that lived in email threads and screenshots. Nothing in this write-up names a system beyond its category or repeats an auditor finding verbatim.

**Scope.** The four ITGC domains, logical access, change management, IT operations and program development, across the applications and infrastructure that feed the financial statements, for one fiscal year.

**What changed.**

1. *Scoping went top-down.* Instead of inheriting last year's list, I started from the financial statement line items and worked down to the applications, databases, operating systems and infrastructure that could cause a material misstatement, with a rationale recorded for every system in and out of scope.
2. *The Risk and Control Matrix was redesigned* against COSO 2013 and PCAOB AS 2201, with each control's frequency, owner, type and evidence named, and the reports it depended on tagged as information produced by the entity.
3. *Walkthroughs came before testing.* Every key control was traced end to end with its owner so design gaps were fixed before anyone pulled a sample.
4. *Evidence moved into AuditBoard (now Optro).* Requests were assigned to control owners, tracked to closure, and pulled from source systems where possible, which cut retrieval time 35% and gave the auditors one timestamped population per test.
5. *User access review became the strongest control.* Populations were validated for completeness and accuracy before review, reviewer attestations and removals were captured in the tool, terminations were tested against HR records, and segregation-of-duties conflicts were documented.
6. *Change management evidence was standardized* across engineering teams: ticketed approval, reviewer distinct from author, segregated deployment, emergency changes logged and approved within a defined window, and deployed changes reconciled against the ticket population.
7. *SOC 1 reliance was documented properly.* Complementary user entity controls were mapped to the internal controls that satisfy them, carve-outs were addressed, and bridge letters covered the gap to year-end.
8. *Deficiencies were evaluated the way the auditor evaluates them:* likelihood and magnitude, compensating controls tested for precision, aggregation by account, assertion and system, and remediation driven through owned POA&Ms with re-test dates.

**Outcome.** Every prior-year deficiency was remediated, evidence retrieval time fell 35%, and the year closed with a no-material-weakness opinion.

**What I would tell another program lead.** Walk before you test. Prove the population before you sample. Put the evidence where the auditor can see it without asking. And treat AI in the workflow as a first pass that a named person still signs.

Diagram: reuse the seven-step lifecycle from section 4 as the page's spine.

[confirm: items 1, 2, 5, 6, 7, 8 under "What changed" use industry-practice wording; the founder confirms in D5]

### 6.2 Case study: Crescive, an AI product built with audit gates (`/work/crescive/`)

Title: Crescive: an AI product built with audit gates
Eyebrow: Case study · Vasan AI Technologies · crescive.ai

**The problem.** Brands could not see how ChatGPT, Perplexity, Gemini, Claude and the other answer engines described them, or why a competitor was cited when they were not. The tools that measured it did not act on it, and the tools that acted did not prove anything changed.

**What Crescive does.** It measures brand presence across the major answer engines through official provider APIs, diagnoses each losing prompt to a root cause, drafts human-approved fixes, and proves before-and-after lift. It is live at crescive.ai with self-serve plans and a free trial.

**Architecture in one paragraph.** A Next.js front end and a Python measurement worker on AWS ECS Fargate sit behind a metered, cached, budgeted model gateway. Data lives in Supabase Postgres, where tenant isolation, seat limits and plan protections are enforced by row-level security in the database rather than by application code alone. Every schema change is gated by a structural review before it ships.

**The operating model.** The product is built by a roster of AI specialists, each with a defined role, task-scoped tools and an auditable activity trail: architect, backend, frontend, database engineer, QA sentinel, risk officer, pentest engineer, legal counsel and others. A project manager plans every task before any code is written. QA must pass before a task closes, and the Risk Officer signs off on anything touching authentication, tenant isolation or credentials. Commit discipline is enforced by hooks, and every architectural decision is written down as a decision record.

**What "auditable by construction" means in practice.**
- Access is role-scoped: a role-to-permission matrix is enforced server-side, and the corporate privilege plane is separate from tenant access.
- Privileged access is time-boxed and reason-required: an admin opening a customer workspace gets a capped session, must state why, and the access lands in two audit logs.
- Secrets are encrypted at rest with envelope encryption, and the public security page maps controls to NIST CSF 2.0 and the OWASP Top 10, with a responsible disclosure policy.
- Governance was written before launch: an AI system card, evaluation and red-team summaries, NIST AI RMF alignment, EU AI Act classification, a privacy notice, a DPA/SCC package and an AI addendum for enterprise contracts.
- Marketing claims are commitments: no security claim reaches the site without Risk Officer review, and the automated blog runs a claims checker that rejects invented statistics.

**What I would do differently.** Put the structural schema review in place from the first migration rather than after the first drift incident, and write the operating model down before the second specialist is added, not after the fifth.

Links: https://crescive.ai · https://crescive.ai/security · https://vasan.ai

(FD6 = B: this page carries no counts of commits, PRs, ADRs, migrations, posts, agents or engines.)

---

## 7. Research (section `#research`, S4 revision: keep every paper)

Two groups. Each row: title, venue, year, link (if any), abstract on expand. Newest first
within each group. Abstract text is copied from the current `index.html` with these
fixes: "of enders" → "offenders", "LOFT approach" → "LOTL approach", stray line breaks
joined. The duplicated "Weaponizing Phase" entry is collapsed to one (S2).

**Published**
1. Smart Grids: A Cyber–Physical Systems Perspective · IRJET, Vol. 11, Issue 6, 2024 · https://www.irjet.net/archives/V11/i6/IRJET-V11I6117.pdf
2. Weaponizing Phase: Living Off the Land Technique · Hakin9 · http://web.archive.org/web/20260612031857/https://hakin9.org/product/weaponization-unveiled-navigating-stage-two/ (archived copy — publisher removed the live page)
3. Verizon Telecommunication Network in Boston · IEEE Xplore, document 10210182, 2023 · https://ieeexplore.ieee.org/document/10210182
4. Hybrid Cloud: The New Generation of Indian Education Society · IRJET, Vol. 7, Issue 9, 2020 · https://www.irjet.net/archives/V7/i9/IRJET-V7I9519.pdf

**Manuscripts**
5. Fuzzing Neural Networks: Discovering Hidden Failures in AI Systems
6. Advanced Email Security with NLP and the Isolation Forest Algorithm
7. Smart Grid Security: Innovative Approaches for Threat Detection and Countermeasures
8. Pillars of Power System and Security of Smart Grid

---

## 8. Skills and certifications (section `#skills`)

Grouped list, no progress bars (K4). Groups and items exactly as follows.

- **SOX and IT audit:** SOX 404(a)/(b) · ITGC and ITAC · Risk and Control Matrix · walkthroughs · TOD/TOE · sampling and roll-forward · IPE and key reports · SOC 1 Type 2 reliance and CUECs · deficiency evaluation · COSO 2013 · PCAOB AS 2201 · AuditBoard (now Optro)
- **AI governance:** NIST AI RMF 1.0 · ISO/IEC 42001 · EU AI Act classification · OWASP Top 10 for LLM applications · AI system cards · model gateways with metering and budgets · prompt-injection defense · human-approval gates
- **Frameworks and standards:** NIST CSF 2.0 · NIST SP 800-53 Rev 5 · NIST SP 800-37 · ISO 27001:2022 / 27002 · SOC 2 · PCI DSS 4.0 · CIS Benchmarks · OWASP ASVS and Top 10 · MITRE ATT&CK
- **Security operations:** CrowdStrike · SIEM and anomaly detection · DLP (Google Workspace) · GreenBone · Cloudflare (SPF/DKIM/DMARC) · JumpCloud · Automox · Wireshark, Nmap, Snort, Metasploit
- **Cloud and platform:** AWS (IAM, Security Hub, Inspector, CloudTrail, Config, ECS Fargate, Lambda, S3, SQS) · Azure · Supabase and Postgres row-level security · Terraform · Ansible · Docker, Kubernetes, OpenShift · OpenStack
- **Engineering:** Python · TypeScript and Next.js · SQL · Shell · YAML · Git and GitHub Actions · CI/CD with SAST/DAST · Linux (RHEL, Ubuntu, Kali) · Windows
- **Network and crypto:** TCP/IP, routing (BGP, OSPF, EIGRP), VPNs, TLS, X.509, OAuth2, pfSense/ASA, IDS/IPS

**Certifications** (names only; links added when supplied):
CISSP · CRISC · AWS Certified Solutions Architect, Associate (SAA-C03) · Red Hat Certified Engineer (RHCE) · Red Hat Certified System Administrator (RHCSA) · Cisco Certified Network Associate (CCNA) · CompTIA Security+

**Training:** Red Hat OpenShift I: Containers and Kubernetes (DO180) · Introduction to OpenShift Applications (DO101)

---

## 9. Awards (section `#awards`)

One row of three, no icons, no years (none supplied):
- Cybersecurity Professional in Healthcare
- International Achievers' Award, 2023
- TCC-REX Karmaveer Global Young Leaders Fellowship and Karmaveer Chakra Award, in partnership with the United Nations

---

## 10. Recommendations (section `#recommendations`)

Three or four static quote cards, text verbatim from the current site (including the
"Has is excellent…" wording, which is the author's own). Images from
`assets/img/testimonials/testimonials-1.jpg` … `-4.jpg` with alt text = the person's name.

1. Mardiros Merdinian, Professor, Adjunct Faculty at Northeastern University (https://www.linkedin.com/in/mardiros/): "Ujas was my student at Northeastern University's M.Sc. in Cybersecurity program. He was a great team player and he greatly contributed to the class. I was very pleased with his performance and happy to have him in my class. He is a passionate and promising cyber security professional who will contribute to the greater good of safe cyber world."
2. Nilesh Vaghela, Founder at ElectroMech, AWS Community Hero, AAI, RHCI (https://www.linkedin.com/in/nilesh-vaghela/): "Has is excellent example of self motivated and initiative person. He possess good Linux knowledge. He is also developing good leadership at Silveroak. Good human being."
3. Viren Patel, Supply Chain Business Analyst at AERCO International, Inc. (https://www.linkedin.com/in/viren-g-patel/): "He's a stellar cybersecurity pro, skilled and dedicated. His expertise makes him an asset, fortifying organizations with strong security and safeguarding against threats."
4. Darshil Shah, CEO at Sperious (https://www.linkedin.com/in/darshil-shah-220b9666/): "Ujas possesses strong knowledge of cybersecurity, hybrid cloud, cloud computing, ansible, and Linux. His sincerity, intelligence, and leadership as a Student Ambassador are commendable."

---

## 11. Contact (section `#contact`, FD4 = A)

If you are standing up or rescuing a SOX 404(b) ITGC program, evaluating AI for your GRC function, or want to talk about how Crescive is built, I would like to hear from you.

- Email: contact@ujasbhadani.com (selectable text with a copy button; no form)
- LinkedIn: https://www.linkedin.com/in/ujasbhadani/

---

## 12. Search and answer-engine identity

- JSON-LD `Person`: name Ujas Bhadani; url https://ujasbhadani.com/; image (headshot URL); jobTitle = identity line; worksFor `Organization` Xponential Fitness, Inc.; alumniOf `CollegeOrUniversity` Northeastern University and Gujarat Technological University; sameAs: https://www.linkedin.com/in/ujasbhadani/, https://github.com/ujasbhadani, https://crescive.ai, https://vasan.ai.
- JSON-LD `Organization`: name Vasan AI Technologies, LLC; url https://vasan.ai; brand Crescive (https://crescive.ai); founder → the Person.
- Open Graph and Twitter card: title = page title, description = meta description, image = generated 1200×630 card (name, identity line, headshot) at `/og.png`.
- `robots.txt`: allow all, including GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot; sitemap URL.
- `sitemap.xml`: generated.
- `llms.txt` at the root:

```
# Ujas Bhadani

> Security and GRC engineer. SOX 404(b) ITGC lead at Xponential Fitness, Inc. (Deloitte-audited). Founder of Vasan AI Technologies, LLC, the company behind Crescive.ai, an AI-agent-based Answer Engine Optimization platform.

Key facts:
- Leads the SOX 404(b) IT general controls program at Xponential Fitness; the most recent audit year closed with every prior-year deficiency remediated and a no-material-weakness opinion.
- Moved SOX evidence collection into AuditBoard (now Optro), cutting retrieval time 35%.
- Founder of Vasan AI Technologies, LLC (vasan.ai); Crescive (crescive.ai) is its product.
- M.S. Cybersecurity and GRC, Northeastern University. Certifications: CISSP, CRISC, AWS Solutions Architect Associate, RHCE, RHCSA, CCNA, CompTIA Security+.
- Writes about AI in GRC: auditing AI controls, applying ITGCs to AI agents.

## Pages
- [Home](https://ujasbhadani.com/)
- [SOX 404(b) case study](https://ujasbhadani.com/work/sox-404b-itgc/)
- [Crescive case study](https://ujasbhadani.com/work/crescive/)
- [Contact](https://ujasbhadani.com/#contact): contact@ujasbhadani.com
```

- 404 page: designed, with links back to the sections.
- Old anchors preserved (section 0).

---

## 13. Pre-merge review checklist (D5), to be generated from `confirm: true` items

Every bullet or paragraph marked `[confirm]` above, listed with its section, for the founder
to mark "true as written", "true with edit" or "not mine" before merge. Nothing marked
goes live unconfirmed. The builder generates this list into the pull request description.
