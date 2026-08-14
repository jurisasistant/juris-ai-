/* ==========================================================================
   Vercel Serverless Function: GET /api/health
   Tells the app whether the live AI backend is properly configured.
   - Checks GROQ_API_KEY presence AND validity (no tokens consumed).
   - Never returns secrets.
   ========================================================================== */

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const groqApiKey = process.env.GROQ_API_KEY;
  const hasKey = !!(groqApiKey && groqApiKey !== 'YOUR_GROQ_API_KEY_HERE');

  if (!hasKey) {
    return res.status(200).json({
      status: 'ok',
      ai: 'missing_key',
      model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile'
    });
  }

  // Key exists — verify it actually works (models list is free, no tokens).
  try {
    const response = await fetch('https://api.groq.com/openai/v1/models', {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${groqApiKey}` },
      signal: AbortSignal.timeout(8000)
    });
    if (response.ok) {
      return res.status(200).json({
        status: 'ok',
        ai: 'connected',
        model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile'
      });
    }
    return res.status(200).json({
      status: 'ok',
      ai: 'invalid_key',
      model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile'
    });
  } catch (err) {
    // Key present but couldn't verify (network) — treat as connected-unknown
    return res.status(200).json({
      status: 'ok',
      ai: 'connected_unverified',
      model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile'
    });
  }
};
