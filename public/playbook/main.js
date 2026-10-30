/**
 * AI Scribe Pilot Playbook — Lead Capture Form
 *
 * Handles:
 *  - Nav dropdown menus
 *  - Client-side validation
 *  - Form submission (mock — swap in real endpoint at FORM_ENDPOINT)
 *  - Thank-you state reveal
 *  - CTA scroll button behavior
 */

// ---------------------------------------------------------------------------
// Nav dropdowns
// ---------------------------------------------------------------------------

(function initNavDropdowns() {
  const dropdownWraps = document.querySelectorAll('.nav-dropdown-wrap');

  function closeAll(except) {
    dropdownWraps.forEach((wrap) => {
      if (wrap === except) return;
      wrap.classList.remove('is-open');
      const btn = wrap.querySelector('.nav-menu-btn');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  }

  dropdownWraps.forEach((wrap) => {
    const btn = wrap.querySelector('.nav-menu-btn');
    if (!btn) return;

    // Toggle on click
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = wrap.classList.contains('is-open');
      closeAll(null);
      if (!isOpen) {
        wrap.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });

    // Close on Escape
    wrap.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeAll(null);
        btn.focus();
      }
    });
  });

  // Close when clicking outside
  document.addEventListener('click', () => closeAll(null));

  // Close on focus leaving the nav
  document.addEventListener('focusin', (e) => {
    const nav = document.getElementById('site-nav');
    if (nav && !nav.contains(e.target)) {
      closeAll(null);
    }
  });
})();

'use strict';

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

/**
 * SWAP IN YOUR REAL BACKEND HERE.
 *
 * Replace FORM_ENDPOINT with your actual form handler URL:
 *   - HubSpot forms API
 *   - Formspree (https://formspree.io)
 *   - your own API route
 *   - Zapier webhook, etc.
 *
 * The current implementation logs the payload and shows the thank-you state
 * without making a real network request.
 */
const FORM_ENDPOINT = 'https://hooks.zapier.com/hooks/catch/9771176/upgbtxd/'; // e.g. 'https://formspree.io/f/YOUR_ID'

/**
 * SWAP IN PDF DOWNLOAD LINK HERE.
 *
 * After showing the thank-you state you may also trigger a file download.
 * Set PDF_URL to the path or URL of your PDF to enable this.
 */
const PDF_URL = 'https://chartnotepics.s3.us-east-2.amazonaws.com/Chartnote-AI-Scribe-Pilot-Playbook-WP.pdf'; // e.g. '/downloads/ai-scribe-pilot-playbook.pdf'

// ---------------------------------------------------------------------------
// DOM references
// ---------------------------------------------------------------------------

const form        = document.getElementById('lead-form');
const formCard    = document.getElementById('form-card');
const thankyouCard = document.getElementById('thankyou-card');
const submitBtn   = document.getElementById('submit-btn');
const ctaScrollBtn = document.getElementById('cta-scroll-btn');

const nameInput   = document.getElementById('name');
const emailInput  = document.getElementById('email');
const nameError   = document.getElementById('name-error');
const emailError  = document.getElementById('email-error');
const fieldName   = document.getElementById('field-name');
const fieldEmail  = document.getElementById('field-email');

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------

function isValidEmail(value) {
  // RFC-5321 simplified check
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

function clearError(fieldEl, errorEl, inputEl) {
  fieldEl.classList.remove('field--error');
  errorEl.textContent = '';
  inputEl.removeAttribute('aria-invalid');
}

function showError(fieldEl, errorEl, inputEl, message) {
  fieldEl.classList.add('field--error');
  errorEl.textContent = message;
  inputEl.setAttribute('aria-invalid', 'true');
}

function validateForm() {
  let valid = true;

  // Full name
  const nameValue = nameInput.value.trim();
  if (!nameValue) {
    showError(fieldName, nameError, nameInput, 'Please enter your full name.');
    valid = false;
  } else {
    clearError(fieldName, nameError, nameInput);
  }

  // Work email
  const emailValue = emailInput.value.trim();
  if (!emailValue) {
    showError(fieldEmail, emailError, emailInput, 'Please enter your work email.');
    valid = false;
  } else if (!isValidEmail(emailValue)) {
    showError(fieldEmail, emailError, emailInput, 'Please enter a valid email address.');
    valid = false;
  } else {
    clearError(fieldEmail, emailError, emailInput);
  }

  return valid;
}

// ---------------------------------------------------------------------------
// Live validation — clear error once user starts correcting
// ---------------------------------------------------------------------------

nameInput.addEventListener('input', () => {
  if (nameInput.value.trim()) {
    clearError(fieldName, nameError, nameInput);
  }
});

emailInput.addEventListener('input', () => {
  if (isValidEmail(emailInput.value.trim())) {
    clearError(fieldEmail, emailError, emailInput);
  }
});

// ---------------------------------------------------------------------------
// Form submission
// ---------------------------------------------------------------------------

async function submitForm(payload) {
  if (!FORM_ENDPOINT) {
    // Mock path — no real network request
    console.info('[Chartnote] Form payload (mock submission):', payload);
    await new Promise((resolve) => setTimeout(resolve, 600)); // simulate latency
    return { ok: true };
  }

  // Zapier webhooks don't send CORS headers, so use no-cors.
  // The request still reaches Zapier — we just can't read the response.
  await fetch(FORM_ENDPOINT, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  return { ok: true };
}

function triggerPdfDownload() {
  if (!PDF_URL) return;
  const a = document.createElement('a');
  a.href = PDF_URL;
  a.download = 'AI-Scribe-Pilot-Playbook.pdf';
  a.rel = 'noopener noreferrer';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function showThankYou() {
  formCard.classList.add('hidden');
  thankyouCard.classList.remove('hidden');

  // Scroll the thank-you card into view smoothly
  thankyouCard.scrollIntoView({ behavior: 'smooth', block: 'center' });

}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    // Focus the first error field
    const firstError = form.querySelector('[aria-invalid="true"]');
    if (firstError) firstError.focus();
    return;
  }

  // Disable button and show loading state
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';

  const payload = {
    name:         nameInput.value.trim(),
    email:        emailInput.value.trim(),
    organization: document.getElementById('org').value.trim() || null,
    source:       'ai-scribe-pilot-playbook-landing',
    timestamp:    new Date().toISOString(),
  };

  try {
    const result = await submitForm(payload);

    if (result.ok) {
      showThankYou();
    } else {
      // Non-OK HTTP response
      submitBtn.disabled = false;
      submitBtn.textContent = 'Download the Playbook';
      alert('Something went wrong. Please try again or email us directly.');
    }
  } catch (err) {
    console.error('[Chartnote] Submission error:', err);
    submitBtn.disabled = false;
    submitBtn.textContent = 'Download the Playbook';
    alert('A network error occurred. Please check your connection and try again.');
  }
});

// ---------------------------------------------------------------------------
// CTA section — scroll to form (or thank-you state)
// ---------------------------------------------------------------------------

if (ctaScrollBtn) {
  ctaScrollBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const target = thankyouCard.classList.contains('hidden')
      ? formCard
      : thankyouCard;

    target.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Focus the first input if the form is visible
    if (!formCard.classList.contains('hidden')) {
      nameInput.focus();
    }
  });
}
