'use client';

import { useEffect } from 'react';

const RESUME_URL = '/C Murali Madhav Resume  April 2026 .pdf';

export default function ResumePage() {
  useEffect(() => {
    // Client-side redirect for static export
    window.location.href = RESUME_URL;
  }, []);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <p>Redirecting to resume...</p>
      <p>
        <a href={RESUME_URL}>Click here if you are not redirected</a>
      </p>
    </div>
  );
}

