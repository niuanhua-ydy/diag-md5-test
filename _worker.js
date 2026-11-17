export default {
  async fetch(request, env, ctx) {
    const out = {};
    out.performanceType = typeof performance;
    out.globalPerformanceType = typeof globalThis.performance;
    try {
      out.performanceNow = (typeof performance !== "undefined") ? performance.now() : "undefined";
    } catch (e) {
      out.performanceError = String(e && e.name) + ": " + String(e && e.message);
    }
    try { out.proxyName = Proxy.name; } catch (e) { out.proxyNameError = String(e); }
    try { out.urlName = URL.name; } catch (e) { out.urlNameError = String(e); }
    try {
      const buf = await crypto.subtle.digest("MD5", new TextEncoder().encode("test"));
      out.md5 = Array.from(new Uint8Array(buf)).map(function (b) { return b.toString(16).padStart(2, "0"); }).join("");
    } catch (e) {
      out.md5Error = String(e && e.name) + ": " + String(e && e.message);
    }
    const cf = request.cf;
    out.cfUndefined = (cf === undefined);
    if (cf) { out.colo = cf.colo; }
    return new Response(JSON.stringify(out, null, 2), { headers: { "content-type": "application/json" } });
  }
};
