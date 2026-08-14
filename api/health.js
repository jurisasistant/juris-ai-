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

  // PRIMARY provider: Groq (instant, verified working from Vercel).
  // Fallback: NVIDIA NIM (z-ai/glm-5.2).
  const nvidiaKey = process.env.NVIDIA_NIM_API_KEY;
  const groqKey = process.env.GROQ_API_KEY;

  const primary = (groqKey && groqKey !== 'YOUR_GROQ_API_KEY_HERE')
    ? { id: 'groq', key: groqKey, baseUrl: 'https://api.groq.com/openai/v1', model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile' }
    : nvidiaKey
      ? { id: 'nvidia', key: nvidiaKey, baseUrl: 'https://integrate.api.nvidia.com/v1', model: process.env.NVIDIA_MODEL || 'z-ai/glm-5.2' }
      : null;

  if (!primary) {
    return res.status(200).json({
      status: 'ok',
      ai: 'missing_key',
      model: 'none'
    });
  }

  // Verify the primary key works (models list is free, no tokens).
  try {
    const response = await fetch(primary.baseUrl + '/models', {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${primary.key}` },
      signal: AbortSignal.timeout(8000)
    });
    if (response.ok) {
      let webSearch = !!process.env.LANGSEARCH_API_KEY ? 'langsearch' : 'none';
      let aiState = 'connected';
      let chatProbe = null;
      // Deep check: POST a 1-token completion with a 12s cap to prove the
      // provider actually answers chat requests (not just /models).
      try {
        const t0 = Date.now();
        const probe = await fetch(primary.baseUrl + '/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${primary.key}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: primary.model,
            messages: [{ role: 'user', content: 'say ok' }],
            max_tokens: 5,
            temperature: 0
          }),
          signal: AbortSignal.timeout(12000)
        });
        chatProbe = {
          ok: probe.ok,
          latencyMs: Date.now() - t0,
          status: probe.status
        };
      } catch (err) {
        chatProbe = { ok: false, latencyMs: 12000, error: String(err && err.message || err).slice(0, 80) };
      }
      if (primary.id === 'groq') {
        const data = await response.json();
        const ids = (data && Array.isArray(data.data)) ? data.data.map((m) => m && m.id) : [];
        const hasCompound = ids.includes('groq/compound');
        const hasMini = ids.includes('groq/compound-mini');
        if (hasCompound || hasMini) webSearch = 'groq';
        else if (!process.env.LANGSEARCH_API_KEY) aiState = 'connected_no_compound';
      }
      return res.status(200).json({
        status: 'ok',
        ai: aiState,
        provider: primary.id,
        webSearch: webSearch,
        model: primary.model,
        chatProbe: chatProbe
      });
    }
    return res.status(200).json({
      status: 'ok',
      ai: 'invalid_key',
      provider: primary.id,
      model: primary.model
    });
  } catch (err) {
    return res.status(200).json({
      status: 'ok',
      ai: 'connected_unverified',
      provider: primary.id,
      model: primary.model
    });
  }
};
