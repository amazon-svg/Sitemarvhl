import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

app.use("*", cors());
app.use("*", logger(console.log));

const CONTACT_EMAIL = "contact.marvhl@gmail.com";

// ── Utilitaire : envoi d'email via Resend ──────────────────────────────────
async function sendEmail(subject: string, html: string, replyTo?: string) {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) {
    console.log("RESEND_API_KEY non configurée – email non envoyé (données sauvegardées en KV).");
    return;
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "MARVHL Galilée <onboarding@resend.dev>",
        to: [CONTACT_EMAIL],
        reply_to: replyTo || CONTACT_EMAIL,
        subject,
        html,
      }),
    });
    if (!res.ok) {
      const err = await res.text();
      console.log(`Erreur envoi email Resend: ${res.status} – ${err}`);
    } else {
      console.log(`Email envoyé avec succès à ${CONTACT_EMAIL}: "${subject}"`);
    }
  } catch (e) {
    console.log("Exception lors de l'envoi email Resend:", e);
  }
}

// ── Formatage HTML du mail de contact ─────────────────────────────────────
function buildContactEmailHtml(data: {
  prenom: string; nom: string; email: string; telephone: string;
  societe?: string | null; objet: string; message: string;
  rappel: boolean; creneau?: string | null; createdAt: string;
}) {
  const rappelSection = data.rappel
    ? `
      <tr><td colspan="2" style="padding:12px 0 4px;font-weight:700;color:#C9A84C;font-size:15px;">
        📞 Demande de rappel pour visite
      </td></tr>
      <tr>
        <td style="padding:4px 12px 4px 0;color:#666;width:160px;">Créneau souhaité</td>
        <td style="padding:4px 0;color:#111;">${data.creneau || "Non précisé"}</td>
      </tr>`
    : "";

  return `
    <div style="font-family:Arial,sans-serif;max-width:620px;margin:0 auto;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
      <div style="background:#0F2D52;padding:24px 28px;">
        <h1 style="color:#fff;margin:0;font-size:20px;">Nouveau message – MARVHL Bâtiment Galilée</h1>
        <p style="color:#C9A84C;margin:6px 0 0;font-size:13px;">${data.createdAt}</p>
      </div>
      <div style="padding:28px;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr>
            <td style="padding:4px 12px 4px 0;color:#666;width:160px;">Prénom / Nom</td>
            <td style="padding:4px 0;color:#111;font-weight:600;">${data.prenom} ${data.nom}</td>
          </tr>
          <tr>
            <td style="padding:4px 12px 4px 0;color:#666;">Email</td>
            <td style="padding:4px 0;color:#111;"><a href="mailto:${data.email}" style="color:#0F2D52;">${data.email}</a></td>
          </tr>
          <tr>
            <td style="padding:4px 12px 4px 0;color:#666;">Téléphone</td>
            <td style="padding:4px 0;color:#111;"><a href="tel:${data.telephone}" style="color:#0F2D52;">${data.telephone}</a></td>
          </tr>
          ${data.societe ? `
          <tr>
            <td style="padding:4px 12px 4px 0;color:#666;">Société</td>
            <td style="padding:4px 0;color:#111;">${data.societe}</td>
          </tr>` : ""}
          <tr>
            <td style="padding:12px 12px 4px 0;color:#666;font-weight:600;vertical-align:top;">Objet</td>
            <td style="padding:12px 0 4px;color:#111;font-weight:600;">${data.objet}</td>
          </tr>
          <tr>
            <td style="padding:4px 12px 16px 0;color:#666;vertical-align:top;">Message</td>
            <td style="padding:4px 0 16px;color:#111;white-space:pre-wrap;">${data.message}</td>
          </tr>
          ${rappelSection}
        </table>
      </div>
      <div style="background:#f9fafb;padding:14px 28px;border-top:1px solid #e5e7eb;font-size:12px;color:#9ca3af;">
        Message reçu via le formulaire de contact du site MARVHL – Bâtiment Galilée, 12 rue Cantelaudette, 33310 Lormont
      </div>
    </div>`;
}

// ── GET – santé du serveur ─────────────────────────────────────────────────
app.get("/make-server-e7a4acaf/", (c) => {
  return c.json({ message: "MARVHL server ready." });
});

// ── POST – Soumission du formulaire de contact ─────────────────────────────
app.post("/make-server-e7a4acaf/contact", async (c) => {
  try {
    const body = await c.req.json();
    const { nom, prenom, email, telephone, societe, objet, message, rappel, creneau } = body;

    // Validation minimale
    if (!nom || !prenom || !email || !telephone || !objet || !message) {
      return c.json(
        { error: "Champs obligatoires manquants: nom, prenom, email, telephone, objet, message" },
        400
      );
    }

    const id = `contact_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const createdAt = new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" });
    const entry = {
      id,
      nom,
      prenom,
      email,
      telephone,
      societe: societe || null,
      objet,
      message,
      rappel: Boolean(rappel),
      creneau: creneau || null,
      createdAt: new Date().toISOString(),
      status: "nouveau",
    };

    await kv.set(id, JSON.stringify(entry));
    console.log(`Nouveau contact enregistré: ${id} – ${prenom} ${nom} <${email}>`);

    // Envoi email à contact.marvhl@gmail.com
    const subjectSuffix = Boolean(rappel) ? " [+ RAPPEL DEMANDÉ]" : "";
    const emailSubject = `[MARVHL] ${objet}${subjectSuffix}`;
    const emailHtml = buildContactEmailHtml({
      prenom, nom, email, telephone,
      societe: societe || null,
      objet, message,
      rappel: Boolean(rappel),
      creneau: creneau || null,
      createdAt,
    });
    await sendEmail(emailSubject, emailHtml, email);

    return c.json({ success: true, id });
  } catch (err) {
    console.log("Erreur lors du traitement du formulaire de contact:", err);
    return c.json({ error: `Erreur serveur: ${err}` }, 500);
  }
});

// ── GET – Liste des contacts (usage interne) ───────────────────────────────
app.get("/make-server-e7a4acaf/contacts", async (c) => {
  try {
    const entries = await kv.getByPrefix("contact_");
    const contacts = entries.map((e: string) => {
      try { return JSON.parse(e); } catch { return null; }
    }).filter(Boolean);

    contacts.sort((a: { createdAt: string }, b: { createdAt: string }) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return c.json({ contacts, total: contacts.length });
  } catch (err) {
    console.log("Erreur lors de la récupération des contacts:", err);
    return c.json({ error: `Erreur serveur: ${err}` }, 500);
  }
});

Deno.serve(app.fetch);
