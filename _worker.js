export default {
  async fetch(request, env, ctx) {
    const out = {};
    try {
      const cf = request.cf;
      out.cfUndefined = (cf === undefined);
      out.cfNull = (cf === null);
      out.cfType = typeof cf;
      if (cf) {
        out.colo = cf.colo;
        out.country = cf.country;
        out.asn = cf.asn;
        out.asOrganization = cf.asOrganization;
      }
    } catch (e) {
      out.cfError = String(e && e.name) + ": " + String(e && e.message);
    }
    try {
      const buf = await crypto.subtle.digest("MD5", new TextEncoder().encode("test"));
      out.md5 = Array.from(new Uint8Array(buf)).map(function (b) { return b.toString(16).padStart(2, "0"); }).join("");
    } catch (e) {
      out.md5Error = String(e && e.name) + ": " + String(e && e.message);
    }
    try {
      const nodeCrypto = await import("node:crypto");
      out.nodeCrypto = typeof nodeCrypto.createHash;
      out.nodeMd5 = nodeCrypto.createHash("md5").update("test").digest("hex");
    } catch (e) {
      out.nodeCryptoError = String(e && e.name) + ": " + String(e && e.message);
    }
    return new Response(JSON.stringify(out, null, 2), { headers: { "content-type": "application/json" } });
  }
};
