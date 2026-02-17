(function() {
  var html = '<div id="cookie-consent-banner" class="cc-banner" style="display:none;">' +
    '<div class="cc-inner">' +
      '<div class="cc-text">' +
        '<strong>Cookie Preferences</strong>' +
        '<p>We use cookies for analytics to understand how visitors use this site.</p>' +
      '</div>' +
      '<div class="cc-actions">' +
        '<button id="cookie-reject" class="cc-btn cc-btn-s">Reject</button>' +
        '<button id="cookie-accept" class="cc-btn cc-btn-p">Accept</button>' +
      '</div>' +
    '</div>' +
  '</div>';

  document.body.insertAdjacentHTML('beforeend', html);

  var style = document.createElement('style');
  style.textContent =
    '.cc-banner{position:fixed;bottom:0;left:0;right:0;background:#0f172a;border-top:2px solid #2563eb;padding:1rem;z-index:9999;box-shadow:0 -4px 12px rgba(0,0,0,0.2)}' +
    '.cc-inner{max-width:920px;margin:0 auto;display:flex;gap:1.5rem;align-items:center;flex-wrap:wrap;font-family:"IBM Plex Mono","JetBrains Mono",monospace}' +
    '.cc-text{flex:1;min-width:250px;color:#cbd5e1;font-size:0.78rem;line-height:1.6}' +
    '.cc-text strong{color:#fff;display:block;margin-bottom:0.25rem;font-size:0.85rem}' +
    '.cc-text p{margin:0}' +
    '.cc-actions{display:flex;gap:0.5rem}' +
    '.cc-btn{padding:0.5rem 1rem;border:none;border-radius:4px;font-size:0.78rem;font-weight:600;cursor:pointer;transition:all 0.2s;font-family:inherit;white-space:nowrap}' +
    '.cc-btn-p{background:#2563eb;color:#fff}' +
    '.cc-btn-p:hover{background:#1d4ed8}' +
    '.cc-btn-s{background:#1e293b;color:#94a3b8;border:1px solid #334155}' +
    '.cc-btn-s:hover{background:#334155;color:#fff}' +
    '@media(max-width:540px){.cc-inner{flex-direction:column;align-items:stretch}.cc-actions{justify-content:stretch}.cc-btn{flex:1}}';
  document.head.appendChild(style);

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }

  var CONSENT_KEY = 'cookie_consent';
  var isGDPRRegion = window.__isGDPRRegion || false;
  var consent = localStorage.getItem(CONSENT_KEY);

  function updateConsent(granted) {
    gtag('consent', 'update', { 'analytics_storage': granted ? 'granted' : 'denied' });
  }

  function saveConsent(analytics) {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ analytics: analytics, timestamp: Date.now(), region: isGDPRRegion ? 'gdpr' : 'other' }));
    updateConsent(analytics);
    document.getElementById('cookie-consent-banner').style.display = 'none';
  }

  if (consent) {
    var parsed = JSON.parse(consent);
    updateConsent(parsed.analytics);
  } else if (isGDPRRegion) {
    document.getElementById('cookie-consent-banner').style.display = 'block';
  } else {
    saveConsent(true);
  }

  document.getElementById('cookie-accept').addEventListener('click', function() { saveConsent(true); });
  document.getElementById('cookie-reject').addEventListener('click', function() { saveConsent(false); });
})();
