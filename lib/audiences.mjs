/** Specialty and segment pages for the Chartnote marketing hub. */

export const specialties = [
  {
    slug: "family-medicine",
    name: "Family medicine",
    summary:
      "Outpatient visits, chronic follow-up, and preventive care documented while you stay with the patient.",
    title: "Family Medicine AI Scribe | Chartnote",
    description:
      "Chartnote is the AI medical scribe for family medicine. Turn outpatient visits into structured notes, templates, and after-visit summaries.",
    headline: "AI medical scribe for family medicine",
    lead: "Chartnote documents the outpatient visit while you stay with the patient. Acute complaints, chronic follow-up, and preventive care can land in a structured note you review before it goes into the chart.",
    helps: [
      {
        title: "A SOAP note from the visit itself",
        body: "AI Scribe listens to the encounter on your computer or phone and drafts a structured clinical note. You edit assessment and plan before anything is final.",
      },
      {
        title: "Templates for the problems you see every day",
        body: "Build sections for chronic problems, health maintenance, and counseling. Snippets expand the dot phrases you already trust, in Chartnote or a web-based EHR.",
      },
      {
        title: "The note leaves with the patient",
        body: "After-visit summaries can be generated from the note. Copilot can draft a referral or patient letter for you to revise. The Chrome extension places text into web-based EMRs.",
      },
    ],
    notes: [
      "Acute visit SOAP notes",
      "Chronic disease follow-up",
      "Preventive visit documentation",
      "After-visit summaries",
      "Referral and patient letters",
    ],
    workflow:
      "Clinic schedules stack short visits. Record the encounter, generate the note, then review tone and structure — narrative, concise, or bulleted. Billing suggestions for ICD-10, CPT, and E/M are there for you to accept or change. Chartnote does not submit claims.",
  },
  {
    slug: "internal-medicine",
    name: "Internal medicine",
    summary:
      "Multi-problem outpatient visits, with an assessment and plan that follows the problems you manage.",
    title: "Internal Medicine AI Scribe | Chartnote",
    description:
      "Chartnote helps outpatient internists document multi-problem visits with custom templates, AI Scribe, and notes that transfer into web-based EMRs.",
    headline: "AI medical scribe for internal medicine",
    lead: "Internal medicine notes carry more than one problem. Chartnote lets you keep a structured assessment and plan, with the sections and order you define, instead of a single generic summary.",
    helps: [
      {
        title: "Problem-oriented structure",
        body: "Custom AI templates set sections, nested subsections, and formatting. Specialty-aware clinical context is part of how Chartnote drafts the note. You still decide what stays.",
      },
      {
        title: "Long visits, less screen time",
        body: "AI Scribe captures the conversation so you can face the patient. Dictation covers the addendum you want to say rather than type.",
      },
      {
        title: "Letters that start from the note",
        body: "Copilot drafts referrals and patient messages from the chart context you give it. Nothing is sent until you review it. Patient data is not used to train models.",
      },
    ],
    notes: [
      "Multi-problem SOAP and progress notes",
      "New-patient histories",
      "Medication and plan updates",
      "Referral letters",
      "After-visit summaries",
    ],
    workflow:
      "Review billing suggestions for ICD-10, CPT, and E/M yourself. Move the finished note into a web-based EMR with the Chrome extension, or keep working from the Chartnote mobile app between visits.",
  },
  {
    slug: "hospitalist",
    name: "Hospitalist",
    summary:
      "Admission H&Ps, daily progress notes, and discharge summaries for hospitalists, whether your training is family medicine or internal medicine.",
    title: "Hospitalist AI Scribe | Chartnote",
    description:
      "Chartnote helps hospitalists document admission H&Ps, daily progress notes, and discharge summaries with Voice Chart and AI Scribe.",
    headline: "AI medical scribe for hospitalists",
    lead: "Hospital medicine is the same sequence of notes whether you trained in family medicine or internal medicine: admission, daily progress, and discharge. Chartnote drafts those notes from dictation or the bedside conversation, and you review them before they reach the chart.",
    helps: [
      {
        title: "Admission, progress, and discharge",
        body: "Voice Chart turns a spoken history and physical, progress note, or discharge summary into a structured draft. Speak the way you would to a colleague covering the service, and correct the draft. The same dictation covers a procedure note when the shift includes one.",
      },
      {
        title: "The conversation at the bedside",
        body: "When the note starts as a conversation, AI Scribe records the encounter on a phone or computer. The mobile app syncs so the phone can act as a microphone for the computer, and you review the draft at a workstation.",
      },
      {
        title: "One structure across the service",
        body: "Custom templates set the order of sections and subsections. Style controls keep a progress note as tight or as narrative as the service expects. On a team plan, clinicians can share templates and snippets so admission and progress notes follow the same sections. Each note is still yours to sign.",
      },
    ],
    notes: [
      "Admission history and physicals",
      "Daily progress notes",
      "Discharge summaries",
      "Hand-off and consult-style narratives you template",
      "Discharge instructions you review",
    ],
    workflow:
      "Dictate between rooms or capture the bedside conversation, then edit on a computer and transfer the text into a web-based EHR with the Chrome extension. Chartnote does not place orders, manage a census, or replace the hospital EHR.",
  },
  {
    slug: "emergency-medicine",
    name: "Emergency medicine",
    summary:
      "Focused ED documentation from a short encounter, ready for you to review before it hits the chart.",
    title: "Emergency Medicine AI Scribe | Chartnote",
    description:
      "Chartnote helps emergency clinicians document short encounters with AI Scribe, dictation, and templates you control, then move the note into a web-based EHR.",
    headline: "AI medical scribe for emergency medicine",
    lead: "Emergency encounters are short and the note still has to hold the story. Chartnote drafts from what you say in the room or dictate afterward, in a structure you define.",
    helps: [
      {
        title: "The bedside conversation",
        body: "AI Scribe records the encounter on a computer or phone and drafts a structured note. You review medical decision making before the note is final.",
      },
      {
        title: "Dictate when the room is already done",
        body: "Voice Chart and dictation turn a spoken summary into text. Use them for the course, procedures you performed, and disposition — in your words.",
      },
      {
        title: "Templates for the complaints you see constantly",
        body: "Snippets and custom templates keep chief complaint, exam, and plan in the order your department uses. Chartnote does not track a board or place orders.",
      },
    ],
    notes: [
      "ED visit notes",
      "Procedure documentation you dictate",
      "Medical decision making in your template",
      "Discharge instructions you review",
      "Referral or follow-up letters",
    ],
    workflow:
      "Transfer finished text into a web-based EHR with the Chrome extension. Privacy controls match the rest of Chartnote: HIPAA compliance documentation, a Business Associate Agreement, and a policy that patient data is not used for training.",
  },
  {
    slug: "urgent-care",
    name: "Urgent care",
    summary:
      "Same-day visits documented with reusable templates, so the note can be finished before the next patient.",
    title: "Urgent Care AI Scribe | Chartnote",
    description:
      "Chartnote helps urgent care clinicians document same-day visits with AI Scribe, dot phrases, and notes that transfer into web-based EMRs.",
    headline: "Documentation for urgent care",
    lead: "Urgent care is a run of similar visits that still need a complete note. Chartnote combines ambient scribing with the templates and dot phrases you reuse, so editing is the short part.",
    helps: [
      {
        title: "One encounter, one structured note",
        body: "Talk through the visit. AI Scribe drafts subjective, objective, assessment, and plan. You change anything that does not sound like you.",
      },
      {
        title: "Dot phrases for the complaints you repeat",
        body: "Snippets expand with a shortcut in Chartnote or in a web-based EHR. Build them yourself or start from the community library, then make them yours.",
      },
      {
        title: "Same chart, wherever the shift is",
        body: "The Chrome extension inserts notes into web-based EMRs. The mobile app covers capture when you are away from the desktop.",
      },
    ],
    notes: [
      "Same-day illness and injury notes",
      "Procedure notes you dictate",
      "Work or school notes you review",
      "After-visit summaries",
      "Follow-up instructions",
    ],
    workflow:
      "Plans start with a free Basic tier if you want to try a shift before you commit. Paid individual plans raise the note allowance. Chartnote does not schedule visits or run the front desk.",
  },
  {
    slug: "nurse-practitioners",
    name: "Nurse practitioners",
    summary:
      "Full-visit documentation for nurse practitioners in clinic, hospital, and urgent settings.",
    title: "AI Scribe for Nurse Practitioners | Chartnote",
    description:
      "Chartnote helps nurse practitioners document visits with AI Scribe, custom templates, dictation, and notes that move into web-based EHRs.",
    headline: "AI medical scribe for nurse practitioners",
    lead: "Chartnote is a documentation tool for the clinician doing the visit. Nurse practitioners use the same AI Scribe, templates, and dictation to produce a note in their own structure.",
    helps: [
      {
        title: "The visit you actually conducted",
        body: "AI Scribe drafts from the encounter. Voice Chart covers H&Ps, progress notes, and discharge summaries when you are dictating rather than talking with the patient.",
      },
      {
        title: "Your wording",
        body: "Style controls and custom templates keep sections, order, and tone under your control. Snippets hold the counseling and exam language you repeat.",
      },
      {
        title: "A shared library when you are on a team",
        body: "Team plans add shared templates, shared snippets, and shared notes, plus admin tools and centralized billing. Individual plans remain available if you document on your own.",
      },
    ],
    notes: [
      "Clinic SOAP notes",
      "Hospital progress notes",
      "Discharge summaries",
      "Patient instructions",
      "Referral letters",
    ],
    workflow:
      "Chartnote does not define scope of practice or supervision. It documents what you say, for you to review, then transfer into a web-based EHR. Billing suggestions are suggestions. You choose the codes.",
  },
  {
    slug: "physician-assistants",
    name: "Physician assistants",
    summary:
      "Visit notes, progress notes, and dictated summaries for physician assistants.",
    title: "AI Scribe for Physician Assistants | Chartnote",
    description:
      "Chartnote helps physician assistants document encounters with AI Scribe, Voice Chart, snippets, and transfer into web-based EHRs.",
    headline: "AI medical scribe for physician assistants",
    lead: "Physician assistants document across clinic, hospital, and procedural settings. Chartnote captures the encounter or the dictation and returns a structured note you can edit before it reaches the chart.",
    helps: [
      {
        title: "Stay with the patient",
        body: "AI Scribe is for the conversation in the room. Dictation is for the lines you want to add by voice while you edit.",
      },
      {
        title: "Service-specific templates",
        body: "Build the sections your service expects — pre-op, post-op, or a problem-based clinic note. On a team plan, those templates and snippets can be shared.",
      },
      {
        title: "Notes that move into the EHR you already open",
        body: "The Chrome extension works with web-based EHRs. Chartnote is not a separate medical record for the health system.",
      },
    ],
    notes: [
      "Clinic and consult notes",
      "Procedure and operative narratives you dictate",
      "Progress notes",
      "Discharge summaries",
      "Patient letters",
    ],
    workflow:
      "Copilot can draft a patient message or referral from the note context. You review every word. Patient conversations are not used to train models.",
  },
  {
    slug: "geriatrics",
    name: "Geriatrics",
    summary:
      "Longer visits documented in full — history, function, medications, and the plan — without living in the keyboard.",
    title: "Geriatrics AI Scribe | Chartnote",
    description:
      "Chartnote helps geriatric clinicians document longer visits with AI Scribe, custom templates, and after-visit summaries for patients and families.",
    headline: "Documentation for geriatric practice",
    lead: "Geriatric visits take time because the history takes time. Chartnote is there so the record can be thorough without asking you to type it while the patient is talking.",
    helps: [
      {
        title: "Capture a long conversation",
        body: "AI Scribe drafts a structured note from the encounter, including what a caregiver says in the room. You decide what belongs in the chart.",
      },
      {
        title: "Sections for the way you practice",
        body: "Custom templates can hold function, medications, goals of care, and the plan in the order you want. Chartnote does not score assessment scales for you.",
      },
      {
        title: "Something the family can read",
        body: "After-visit summaries are generated for you to edit. Copilot can help turn the note into plain-language instructions. Nothing goes out unreviewed.",
      },
    ],
    notes: [
      "Comprehensive visit notes",
      "Follow-up progress notes",
      "Medication and plan updates",
      "Goals-of-care documentation you template",
      "After-visit summaries",
    ],
    workflow:
      "For bedside work in a facility, the mobile app records the encounter and syncs to the computer. Nursing homes are covered on their own segment page. Chartnote is not an electronic health record.",
  },
  {
    slug: "orthopedics",
    name: "Orthopedics",
    summary:
      "Clinic visits and operative reports, dictated or scribed, in the structure your practice uses.",
    title: "Orthopedics AI Scribe and Dictation | Chartnote",
    description:
      "Chartnote helps orthopedic clinicians document clinic visits and operative reports with Voice Chart, AI Scribe, and custom templates.",
    headline: "AI documentation for orthopedics",
    lead: "Orthopedics splits between the clinic and the operative note. Chartnote covers both: a scribe for the visit conversation, and Voice Chart for dictated operative reports and other structured documents.",
    helps: [
      {
        title: "Operative reports by dictation",
        body: "Voice Chart is built to turn dictated operative reports, H&Ps, progress notes, and discharge summaries into a structured note you edit.",
      },
      {
        title: "Clinic visits without the keyboard between you and the patient",
        body: "AI Scribe drafts from the encounter. Templates can follow the sections you use for an injury or a post-op check, including laterality, exam, and plan.",
      },
      {
        title: "Phrases that should never be retyped",
        body: "Snippets store consent language, postop instructions, and exam blocks you insert on purpose. You still review the note.",
      },
    ],
    notes: [
      "New injury and follow-up visits",
      "Post-operative checks",
      "Operative reports",
      "Discharge summaries",
      "Patient instruction letters",
    ],
    workflow:
      "Chartnote does not view images, plan implants, or write orders. It documents what you say and lets you place that text in a web-based EHR.",
  },
  {
    slug: "neurology",
    name: "Neurology",
    summary:
      "Detailed histories and exam narratives, captured by scribe or dictation, in your template.",
    title: "Neurology AI Scribe | Chartnote",
    description:
      "Chartnote helps neurologists document detailed histories and exams with AI Scribe, Voice Chart, and custom templates.",
    headline: "AI medical scribe for neurology",
    lead: "Neurology notes are long because the history and exam are long. Chartnote takes the dictation or the visit conversation and drafts a structured note you can still rewrite line by line.",
    helps: [
      {
        title: "Room for a real history",
        body: "AI Scribe is meant for the full encounter, not a one-line chief complaint. You keep the details that matter and delete the rest.",
      },
      {
        title: "An exam section you designed",
        body: "Custom templates and nested subsections let you lay out the exam the way you perform it. Chartnote does not score the exam or generate a diagnosis for you.",
      },
      {
        title: "Dictation when you are out of the room",
        body: "Voice Chart turns a spoken H&P, progress note, or discharge summary into structured text. Dictation covers shorter edits by voice.",
      },
    ],
    notes: [
      "New-patient consultations",
      "Follow-up progress notes",
      "Hospital H&Ps and discharge summaries",
      "Patient instruction letters",
      "After-visit summaries",
    ],
    workflow:
      "Billing suggestions for ICD-10, CPT, and E/M are available for review. Transfer the finished note with the Chrome extension into a web-based EHR.",
  },
  {
    slug: "pediatrics",
    name: "Pediatrics",
    summary:
      "Well visits and sick visits, including the caregiver in the room, documented in your template.",
    title: "Pediatrics AI Scribe | Chartnote",
    description:
      "Chartnote helps pediatric clinicians document well and sick visits with AI Scribe, snippets, and after-visit summaries families can use.",
    headline: "AI medical scribe for pediatrics",
    lead: "Pediatric visits are a conversation with a child, a caregiver, or both. Chartnote drafts the note from that encounter so you can stay in it, then you shape the chart.",
    helps: [
      {
        title: "Well visits and sick visits",
        body: "Use separate templates for the note types you run. AI Scribe supplies a first draft from what was said. Anticipatory guidance you repeat can live in snippets.",
      },
      {
        title: "Instructions a family can take home",
        body: "After-visit summaries and Copilot drafts of patient instructions start from the note. You edit them before anyone sees them.",
      },
      {
        title: "The EHR you already chart in",
        body: "The Chrome extension inserts text into web-based EHRs. Chartnote does not replace growth charts, immunization inventories, or your pediatric record.",
      },
    ],
    notes: [
      "Well-child visit notes",
      "Sick-visit SOAP notes",
      "Follow-up progress notes",
      "School and activity notes you review",
      "After-visit summaries",
    ],
    workflow:
      "Style controls keep the note as short as a sick visit or as complete as a new-patient history. Data from the encounter is not used to train models.",
  },
  {
    slug: "oncology",
    name: "Oncology",
    summary:
      "Longitudinal visit notes with the sections you define, documented under healthcare privacy controls.",
    title: "Oncology Clinical Documentation | Chartnote",
    description:
      "Chartnote helps oncology clinicians document complex visits with AI Scribe, Voice Chart, custom templates, and HIPAA-compliant handling.",
    headline: "Clinical documentation for oncology",
    lead: "Oncology notes carry history, interval course, and a plan that has to be precise. Chartnote is a scribe and dictation tool for that documentation. You define the sections. You approve the words.",
    helps: [
      {
        title: "A template that matches the visit",
        body: "Custom sections and nested subsections let a treatment visit, a new consult, or a follow-up follow your outline. Specialty-aware context informs the draft. It does not stage disease or write orders.",
      },
      {
        title: "Scribe or dictate",
        body: "AI Scribe fits a conversation in the room. Voice Chart fits a longer dictated consult, progress note, or discharge summary.",
      },
      {
        title: "Privacy built for clinical records",
        body: "Chartnote is HIPAA compliant, offers a Business Associate Agreement, and does not use patient data for training. Read the privacy and security pages for the full program, including the SOC 2 Type II examination.",
      },
    ],
    notes: [
      "New consult notes",
      "Treatment and interval visit notes",
      "Hospital progress notes and discharge summaries",
      "Patient instruction letters",
      "After-visit summaries",
    ],
    workflow:
      "Copilot can help draft a patient message from the note. It is not a regimen builder. Move finished documentation into the web-based EHR with the Chrome extension.",
  },
  {
    slug: "psychiatry",
    name: "Psychiatry",
    summary:
      "Long psychotherapy and medication visits, with a mental status and assessment you structure, written in the words you choose.",
    title: "Psychiatry AI Scribe | Chartnote",
    description:
      "Chartnote helps psychiatrists, therapists, and psychiatric nurse practitioners document psychotherapy and medication visits with AI Scribe and custom templates.",
    headline: "AI medical scribe for psychiatry",
    lead: "Psychiatry visits run long, whether the hour is psychotherapy, medication management, or both. Chartnote drafts the note from that conversation for psychiatrists, therapists, and psychiatric nurse practitioners, and you decide which words belong in the chart.",
    helps: [
      {
        title: "Psychotherapy and medication visits",
        body: "AI Scribe is meant for the full encounter, including a long session. Use one template for psychotherapy, one for medication management, or one that holds both. You edit the draft before it is final.",
      },
      {
        title: "Mental status and assessment, in your structure",
        body: "Custom templates and nested subsections let you lay out the mental status exam and the assessment the way you write them. Chartnote does not score the exam or assign a diagnosis.",
      },
      {
        title: "Wording you are willing to keep",
        body: "A mental health note should say what the chart needs and no more. You review every line before it is final. Chartnote is HIPAA compliant, offers a Business Associate Agreement, and does not use patient data for training.",
      },
    ],
    notes: [
      "Psychotherapy session notes",
      "Medication management visits",
      "Mental status and assessment sections you template",
      "Follow-up progress notes",
      "Letters and instructions you review",
    ],
    workflow:
      "Dictate an addendum when you would rather speak it than type it, then transfer the finished note into a web-based EHR with the Chrome extension. Chartnote does not send the note to anyone else, and what was said in the room is not used to train models.",
  },
  {
    slug: "cardiology",
    name: "Cardiology",
    summary:
      "Clinic follow-ups for chronic cardiac conditions, with a structured history, assessment, and letters back to the referring clinician.",
    title: "Cardiology AI Scribe | Chartnote",
    description:
      "Chartnote helps cardiologists document clinic follow-ups, structured assessments, consult letters, and dictated procedure notes.",
    headline: "AI medical scribe for cardiology",
    lead: "Cardiology follow-up notes have to carry a precise history and an assessment the referring clinician can use. Chartnote drafts that note from the visit or from dictation, and you set what stays.",
    helps: [
      {
        title: "Follow-ups with a structured history",
        body: "AI Scribe drafts from the clinic conversation. Templates can hold the history of present illness and the assessment in the order you use for chronic cardiac problems. You change anything that is not accurate.",
      },
      {
        title: "Letters back to the referring clinician",
        body: "Copilot can draft a consult letter from the note you just reviewed. Nothing goes out until you edit it. Chartnote does not send the letter for you.",
      },
      {
        title: "Procedure notes by dictation",
        body: "Voice Chart turns a dictated procedure note, history and physical, or progress note into structured text you correct. Chartnote does not interpret studies or write orders.",
      },
    ],
    notes: [
      "Clinic follow-up notes",
      "New consult histories and assessments",
      "Procedure notes you dictate",
      "Consult letters you review",
      "After-visit summaries",
    ],
    workflow:
      "Billing suggestions for ICD-10, CPT, and E/M are there for you to accept or change. Chartnote does not submit claims. Move the finished note into a web-based EHR with the Chrome extension.",
  },
  {
    slug: "ob-gyn",
    name: "OB/GYN",
    summary:
      "Prenatal visits, annual well-woman exams, problem visits, and procedure notes you dictate.",
    title: "OB/GYN AI Scribe | Chartnote",
    description:
      "Chartnote helps obstetric and gynecologic clinicians document prenatal visits, annual exams, problem visits, and dictated procedure notes.",
    headline: "AI medical scribe for OB/GYN",
    lead: "An OB/GYN schedule mixes prenatal visits, annual well-woman exams, and problem visits, plus the procedure note you dictate afterward. Chartnote drafts those notes from the conversation or from dictation, in a structure you define.",
    helps: [
      {
        title: "Prenatal, annual, and problem visits",
        body: "Keep a template for each visit type. AI Scribe supplies a first draft from what was said in the room. Snippets hold the counseling and exam language you want to insert on purpose.",
      },
      {
        title: "Procedure notes by dictation",
        body: "Voice Chart turns a dictated procedure note into structured text you edit. Chartnote does not document from a device, place orders, or replace the procedure record.",
      },
      {
        title: "Instructions you review before they leave",
        body: "After-visit summaries and Copilot drafts of patient instructions start from the note. You edit them before anyone sees them. The Chrome extension inserts the finished text into web-based EHRs.",
      },
    ],
    notes: [
      "Prenatal visit notes",
      "Annual well-woman exams",
      "Problem-visit SOAP notes",
      "Procedure notes you dictate",
      "After-visit summaries",
    ],
    workflow:
      "Style controls keep a problem visit short or a new prenatal history complete. Chartnote is not a fetal-monitoring system or a prenatal record. Patient data is not used to train models.",
  },
];

export const segments = [
  {
    slug: "solo-practices",
    name: "Solo practices",
    summary:
      "One clinician, the web EMR you already use, and a note tool you can start without an IT project.",
    title: "AI Scribe for Solo Practices | Chartnote",
    description:
      "Chartnote gives solo clinicians an AI medical scribe, dictation, and templates that transfer notes into web-based EMRs. Start on the free plan.",
    headline: "Chartnote for solo practices",
    lead: "A solo practice does not need a rollout to try better documentation. Chartnote is an individual product you can open in the browser, on your phone, and inside the web EMR you already use.",
    helps: [
      {
        title: "Start on your own",
        body: "The Basic plan is free, with a monthly AI Scribe allowance, custom templates and snippets, and transfer into web-based EMRs. Pro and Max are the individual paid plans when the volume grows.",
      },
      {
        title: "No separate chart to maintain",
        body: "The Chrome extension places notes and dictation into web-based EHRs. Chartnote is the documentation layer, not a second medical record you have to reconcile.",
      },
      {
        title: "The whole visit, one person",
        body: "AI Scribe, dictation, Copilot, and snippets are available without a team administrator. Billing suggestions stay on the note for you to review.",
      },
    ],
    notes: [
      "Daily visit notes",
      "Dictated summaries",
      "Dot phrases and templates",
      "After-visit summaries",
      "Patient letters",
    ],
    workflow:
      "Sign up, record a real encounter, and edit the draft. There is no credit card on the free plan. When you want a Business Associate Agreement or a larger rollout, the Teams and HIPAA pages explain that path.",
  },
  {
    slug: "multi-specialty-groups",
    name: "Multi-specialty groups",
    summary:
      "Shared administration, with each specialty keeping the templates and note style it actually uses.",
    title: "AI Scribe for Multi-Specialty Groups | Chartnote",
    description:
      "Chartnote team plans let multi-specialty groups share templates and billing while each specialty keeps its own note structure.",
    headline: "Chartnote for multi-specialty groups",
    lead: "A multi-specialty group has one administration and many ways of writing a note. Chartnote team plans centralize billing and user management while templates stay specific to the specialty.",
    helps: [
      {
        title: "One subscription, many note styles",
        body: "Team Max covers teams of 2 to 50 and includes shared templates, shared snippets, shared notes, centralized billing, and admin tools to manage users.",
      },
      {
        title: "Each specialty keeps its structure",
        body: "Family medicine, orthopedics, or any other service can keep its own sections. Specialty pages describe how the scribe fits those visits. Nothing forces one template on the whole group.",
      },
      {
        title: "A path to enterprise controls",
        body: "Larger groups that need single sign-on, dedicated support, or organization-wide retention can look at the Enterprise plan and talk to sales.",
      },
    ],
    notes: [
      "Specialty-specific visit notes",
      "Shared dot phrases where they help",
      "Private templates where they should stay private",
      "Team usage visible to admins",
      "Notes transferred into web-based EHRs",
    ],
    workflow:
      "Chartnote does not merge your specialties into one chart. Clinicians still review and finalize their own notes. Fair use rules for unlimited plans are published on the Fair Use page.",
  },
  {
    slug: "regional-hospitals",
    name: "Regional hospitals",
    summary:
      "Inpatient and emergency documentation for the clinicians on staff, with a team rollout instead of a one-off login.",
    title: "AI Scribe for Regional Hospitals | Chartnote",
    description:
      "Chartnote helps regional hospitals document H&Ps, progress notes, discharge summaries, and ED visits with team administration and a BAA.",
    headline: "Chartnote for regional hospitals",
    lead: "Regional hospitals need documentation that works for the hospitalist, the emergency clinician, and the specialty service on call. Chartnote covers those note types under team administration.",
    helps: [
      {
        title: "The inpatient note set",
        body: "Voice Chart is built for H&Ps, progress notes, discharge summaries, and operative reports. AI Scribe covers encounters that start as a conversation.",
      },
      {
        title: "A rollout, not a pile of individual accounts",
        body: "Team plans add centralized billing, user admin, and shared templates. The Teams page describes guided onboarding and a Business Associate Agreement.",
      },
      {
        title: "Web-based EHR, not a rip-and-replace",
        body: "The Chrome extension inserts documentation into web-based EHRs. Chartnote does not replace the hospital information system or the medication record.",
      },
    ],
    notes: [
      "Admission H&Ps",
      "Daily progress notes",
      "Discharge summaries",
      "Emergency visit notes",
      "Operative reports",
    ],
    workflow:
      "Security details — HIPAA, encryption, and the annual SOC 2 Type II examination — are on the privacy and security pages. Contact sales for a hospital conversation. Chartnote does not publish a bed-size requirement.",
  },
  {
    slug: "large-health-systems",
    name: "Large health systems",
    summary:
      "Enterprise administration for clinical documentation: access, retention, support, and a BAA.",
    title: "AI Scribe for Large Health Systems | Chartnote",
    description:
      "Chartnote Enterprise adds SSO, centralized access, retention controls, and dedicated support for health-system clinical documentation.",
    headline: "Chartnote for large health systems",
    lead: "A health system has to know who can open a note, how long data is kept, and who to call. Chartnote Enterprise is the plan built for that administration, on top of the same scribe clinicians use.",
    helps: [
      {
        title: "Controls listed on the Enterprise plan",
        body: "Enterprise includes dedicated support, single sign-on (SSO), SOC 2 Type II compliance, usage analytics and reporting, organization-wide data retention and auto-deletion periods, and centralized access management.",
      },
      {
        title: "The clinical tool stays familiar",
        body: "Clinicians still use AI Scribe, Voice Chart, dictation, Copilot, and snippets. Templates can be shared by team. Notes still require a human review.",
      },
      {
        title: "Agreements and onboarding",
        body: "Chartnote provides a Business Associate Agreement and a Master Subscription Agreement. The Teams page describes guided implementation and onboarding.",
      },
    ],
    notes: [
      "Ambulatory visit notes",
      "Inpatient H&Ps, progress notes, and discharges",
      "Operative reports",
      "After-visit summaries",
      "Documentation standardized with shared templates",
    ],
    workflow:
      "Enterprise is quoted annually. Contact sales rather than using the self-serve checkout. The independent SOC 2 Type II examination is described on the HIPAA page.",
  },
  {
    slug: "nursing-homes",
    name: "Nursing homes",
    summary:
      "Bedside encounter notes for clinicians who round in nursing homes, captured on a phone and finished on a computer.",
    title: "Nursing Home Clinical Documentation | Chartnote",
    description:
      "Chartnote helps clinicians who round in nursing homes capture bedside notes with the mobile app, AI Scribe, and templates they control.",
    headline: "Documentation for nursing home rounds",
    lead: "Nursing home rounds happen at the bedside, often away from a desktop. Chartnote’s mobile app captures the encounter so the note can be finished and moved into a web-based chart afterward.",
    helps: [
      {
        title: "Capture where the patient is",
        body: "Record the encounter on a phone. AI Scribe drafts the note. The phone can also sync as a microphone for a computer.",
      },
      {
        title: "Progress notes in your format",
        body: "Templates hold the sections you use for a regulatory visit, a change in condition, or a follow-up. Chartnote does not complete MDS assessments or submit claims.",
      },
      {
        title: "A small group on one plan",
        body: "If several clinicians cover the same building, a team plan shares templates and snippets and centralizes billing. Each clinician still finalizes their own note.",
      },
    ],
    notes: [
      "Rounding progress notes",
      "Admission histories you dictate",
      "Change-in-condition notes",
      "Discharge summaries",
      "Family update letters you review",
    ],
    workflow:
      "Geriatrics has its own specialty page if the clinical question is the longer outpatient or facility visit. Chartnote is not a facility electronic health record.",
  },
  {
    slug: "telehealth",
    name: "Telehealth",
    summary:
      "Document the virtual visit you already conduct. Chartnote is the note, not the video call.",
    title: "Telehealth Visit Documentation | Chartnote",
    description:
      "Chartnote documents telehealth visits with AI Scribe or dictation on your computer, then moves the note into a web-based EHR. It is not a video platform.",
    headline: "Documentation for telehealth visits",
    lead: "Chartnote does not host the video visit. It documents the encounter you are already having, on the computer where that visit is open, or from a dictation afterward.",
    helps: [
      {
        title: "Scribe beside the visit",
        body: "AI Scribe runs on your computer or phone. Use it during the virtual encounter when the audio is on that device, then review the structured draft.",
      },
      {
        title: "Dictate after you hang up",
        body: "Voice Chart and dictation turn a spoken summary into a note if you prefer to document once the call is over. That path does not depend on capturing the call audio.",
      },
      {
        title: "Into the same EHR as an office visit",
        body: "The Chrome extension inserts the note into web-based EHRs. Templates can match your in-person notes so telehealth charts are not a different species.",
      },
    ],
    notes: [
      "Virtual visit SOAP notes",
      "Follow-up progress notes",
      "Patient instructions",
      "Referral letters",
      "After-visit summaries",
    ],
    workflow:
      "Chartnote does not join Zoom, place a video call, or store the recording of your telehealth vendor. It stores the documentation you create in Chartnote, under the same privacy terms as every other note.",
  },
  {
    slug: "fqhcs",
    name: "FQHCs",
    summary:
      "Shared documentation for federally qualified health centers, with team templates and a Business Associate Agreement.",
    title: "AI Scribe for FQHCs | Chartnote",
    description:
      "Chartnote helps FQHC clinicians document visits with shared team templates, an AI scribe, and a Business Associate Agreement.",
    headline: "Chartnote for FQHCs",
    lead: "Federally qualified health centers document a wide range of visits across many clinicians. Chartnote gives those clinicians a scribe and a shared template library, with team administration for the organization.",
    helps: [
      {
        title: "Many clinicians, one set of tools",
        body: "Team plans include shared templates and snippets, shared notes, centralized billing, and admin tools. Each clinician reviews their own note before it is final.",
      },
      {
        title: "Visit types you define",
        body: "Primary care, behavioral health, and enabling-service encounters can each have a template. Chartnote does not generate UDS tables or grant reports.",
      },
      {
        title: "A Business Associate Agreement",
        body: "A Business Associate Agreement is available, and privacy terms are the same program described on the HIPAA page.",
      },
    ],
    notes: [
      "Primary care visit notes",
      "Behavioral health notes you template",
      "Follow-up and care-plan documentation",
      "After-visit summaries",
      "Referral letters",
    ],
    workflow:
      "Chartnote does not replace the health center’s EHR or practice management system. Each clinician still reviews their own note before it is final.",
  },
];

export function audienceNav(kind) {
  const items = kind === "specialties" ? specialties : segments;
  const base = kind === "specialties" ? "/specialties" : "/segments";
  const allLabel = kind === "specialties" ? "All specialties" : "All segments";
  return [
    { href: base, label: allLabel },
    ...items.map((item) => ({ href: `${base}/${item.slug}`, label: item.name })),
  ];
}
