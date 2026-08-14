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

  // PRIMARY provider: NVIDIA NIM (z-ai/glm-5.2), fallback: Groq.
  const nvidiaKey = process.env.NVIDIA_NIM_API_KEY;
  const groqKey = process.env.GROQ_API_KEY;

  const primary = nvidiaKey
    ? { id: 'nvidia', key: nvidiaKey, baseUrl: 'https://integrate.api.nvidia.com/v1', model: process.env.NVIDIA_MODEL || 'z-ai/glm-5.2' }
    : (groqKey && groqKey !== 'YOUR_GROQ_API_KEY_HERE')
      ? { id: 'groq', key: groqKey, baseUrl: 'https://api.groq.com/openai/v1', model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile' }
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
        model: primary.model
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
