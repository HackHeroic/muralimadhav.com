'use client';

import { useEffect } from 'react';

export default function ResumePage() {
  useEffect(() => {
    // Client-side redirect for static export
    window.location.href = 'https://dub.sh/aryans-resume';
  }, []);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <p>Redirecting to resume...</p>
      <p>
        <a href="https://dub.sh/aryans-resume">Click here if you are not redirected</a>
      </p>
    </div>
  );
}

