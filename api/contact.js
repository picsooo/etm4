const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'mail.etmcar-solution.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

function adminTemplate(data) {
  const rows = [
    ['Nom', data.Nom],
    ['Téléphone', `<a href="tel:${data['Téléphone']}" style="color:#a8811a;text-decoration:none;font-weight:700">${data['Téléphone']}</a>`],
    ['E-mail', data.email ? `<a href="mailto:${data.email}" style="color:#a8811a;text-decoration:none">${data.email}</a>` : '—'],
    ['Véhicule', data['Véhicule'] || '—'],
    ['Kilométrage', data['Kilométrage'] || '—'],
    ['Prestation', data.Prestation || '—'],
    ['Message', data.Message || '—'],
  ]
    .map(
      ([k, v], i) =>
        `<tr style="background:${i % 2 === 0 ? '#ffffff' : '#f9f8f5'}">
          <td style="padding:14px 20px;font-size:14px;font-weight:700;color:#4a515b;border-bottom:1px solid #e2e5ea;width:140px;vertical-align:top">${k}</td>
          <td style="padding:14px 20px;font-size:15px;color:#14171c;border-bottom:1px solid #e2e5ea">${v}</td>
        </tr>`
    )
    .join('');

  const now = new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris', dateStyle: 'full', timeStyle: 'short' });

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f5f7;font-family:Arial,Helvetica,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f7;padding:32px 16px"><tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)">

  <!-- HEADER -->
  <tr><td style="background:#0a0a0a;padding:28px 40px;text-align:center">
    <img src="https://www.etmcar-solution.com/assets/logo/logo-etm-wordmark-fond-noir.png" alt="ETM Car-Solution" width="200" style="display:inline-block;max-width:200px;height:auto">
  </td></tr>

  <!-- BANDEAU -->
  <tr><td style="padding:30px 40px 0">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="background:linear-gradient(135deg,#a8811a,#8c6b12);border-radius:8px;padding:18px 24px;text-align:center">
        <p style="margin:0;color:#ffffff;font-size:20px;font-weight:700">&#128232; Nouvelle demande de devis</p>
      </td></tr>
    </table>
  </td></tr>

  <!-- DATE -->
  <tr><td style="padding:20px 40px 0">
    <p style="margin:0;font-size:13px;color:#737b86">Reçue le ${now}</p>
  </td></tr>

  <!-- TABLEAU INFOS CLIENT -->
  <tr><td style="padding:20px 40px 30px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e5ea;border-radius:8px;overflow:hidden">
      ${rows}
    </table>
  </td></tr>

  <!-- BOUTONS ACTION -->
  <tr><td style="padding:0 40px 30px;text-align:center">
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto"><tr>
      <td style="padding:0 6px">
        <a href="tel:${data['Téléphone']}" style="display:inline-block;background:#a8811a;color:#ffffff;font-weight:700;font-size:15px;padding:14px 28px;border-radius:6px;text-decoration:none">&#128222; Appeler le client</a>
      </td>
      ${data.email ? `<td style="padding:0 6px">
        <a href="mailto:${data.email}" style="display:inline-block;background:#0a0a0a;color:#a8811a;font-weight:700;font-size:15px;padding:14px 28px;border-radius:6px;text-decoration:none;border:1px solid #a8811a">&#9993; Répondre par email</a>
      </td>` : ''}
    </tr></table>
  </td></tr>

  <!-- FOOTER -->
  <tr><td style="background:#0a0a0a;padding:20px 40px;text-align:center">
    <p style="margin:0;font-size:12px;color:#737b86">Notification automatique — <span style="color:#a8811a">etmcar-solution.com</span></p>
  </td></tr>

</table>
</td></tr></table></body></html>`;
}

function clientTemplate() {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f5f7;font-family:Arial,Helvetica,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f7;padding:32px 16px"><tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)">

  <!-- HEADER -->
  <tr><td style="background:#0a0a0a;padding:32px 40px;text-align:center">
    <img src="https://www.etmcar-solution.com/assets/logo/logo-etm-wordmark-fond-noir.png" alt="ETM Car-Solution" width="220" style="display:inline-block;max-width:220px;height:auto">
    <p style="margin:12px 0 0;font-size:13px;color:#a8811a;letter-spacing:3px;text-transform:uppercase;font-weight:700">Électronique &amp; Reprogrammation Automobile</p>
  </td></tr>

  <!-- BANDEAU CONFIRMATION -->
  <tr><td style="padding:40px 40px 10px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="background:linear-gradient(135deg,#a8811a,#8c6b12);border-radius:8px;padding:20px 24px;text-align:center">
        <p style="margin:0;color:#ffffff;font-size:22px;font-weight:700">&#10004;&#65039; Demande bien reçue !</p>
      </td></tr>
    </table>
  </td></tr>

  <!-- CORPS -->
  <tr><td style="padding:24px 40px 32px">
    <p style="margin:0 0 18px;font-size:16px;color:#14171c;line-height:1.6">Bonjour,</p>
    <p style="margin:0 0 18px;font-size:16px;color:#14171c;line-height:1.6">Merci pour votre confiance ! Nous avons bien reçu votre demande de devis et notre équipe l'examine dès maintenant.</p>
    <p style="margin:0 0 24px;font-size:16px;color:#14171c;line-height:1.6"><strong style="color:#a8811a">Vous recevrez une réponse sous 24h ouvrées.</strong></p>

    <!-- ENCART URGENCE -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f9f8f5;border-left:4px solid #a8811a;border-radius:0 8px 8px 0;margin-bottom:24px">
      <tr><td style="padding:20px 24px">
        <p style="margin:0 0 6px;font-size:14px;font-weight:700;color:#14171c;text-transform:uppercase;letter-spacing:1px">&#128222; Besoin urgent ?</p>
        <p style="margin:0;font-size:15px;color:#4a515b;line-height:1.5">Appelez-nous directement au<br>
        <a href="tel:+33767801802" style="color:#a8811a;font-weight:700;font-size:18px;text-decoration:none">07 67 80 18 02</a></p>
      </td></tr>
    </table>

    <!-- PRESTATIONS -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="border-top:1px solid #e2e5ea;padding-top:24px">
        <p style="margin:0 0 16px;font-size:14px;color:#737b86;line-height:1.5">Nos prestations principales :</p>
        <table role="presentation" cellpadding="0" cellspacing="0">
          <tr><td style="padding:4px 0;font-size:14px;color:#4a515b">&#9670; Reprogrammation moteur Stage 1 &amp; 2</td></tr>
          <tr><td style="padding:4px 0;font-size:14px;color:#4a515b">&#9670; Diagnostic électronique avancé</td></tr>
          <tr><td style="padding:4px 0;font-size:14px;color:#4a515b">&#9670; Clonage &amp; réparation calculateurs</td></tr>
          <tr><td style="padding:4px 0;font-size:14px;color:#4a515b">&#9670; Solutions anti-pollution</td></tr>
        </table>
      </td></tr>
    </table>
  </td></tr>

  <!-- FOOTER -->
  <tr><td style="background:#0a0a0a;padding:28px 40px;text-align:center">
    <p style="margin:0 0 8px;font-size:14px;color:#a8811a;font-weight:700">ETM Car-Solution</p>
    <p style="margin:0 0 4px;font-size:13px;color:#737b86">Toulouse — Haute-Garonne</p>
    <p style="margin:0 0 12px;font-size:13px;color:#737b86">Lun-Sam : 09h — 19h</p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto"><tr>
      <td style="padding:0 8px"><a href="tel:+33767801802" style="color:#a8811a;font-size:13px;text-decoration:none">&#128222; 07 67 80 18 02</a></td>
      <td style="color:#4a515b">|</td>
      <td style="padding:0 8px"><a href="mailto:etm.carsolution@gmail.com" style="color:#a8811a;font-size:13px;text-decoration:none">&#9993; etm.carsolution@gmail.com</a></td>
    </tr></table>
  </td></tr>

</table>
</td></tr></table></body></html>`;
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = req.body;

    if (!data.Nom || !data['Téléphone']) {
      return res.status(400).json({ error: 'Nom et Téléphone requis' });
    }

    // Email admin — notification avec infos client
    await transporter.sendMail({
      from: '"ETM Car-Solution" <noreply@etmcar-solution.com>',
      to: 'wsaoudi@webminds.dz',
      cc: 'etm.carsolution@gmail.com',
      subject: `Nouvelle demande — ${data.Nom} — ${data.Prestation || 'Devis'}`,
      html: adminTemplate(data),
    });

    // Auto-réponse au client (si email fourni)
    if (data.email) {
      await transporter.sendMail({
        from: '"ETM Car-Solution" <noreply@etmcar-solution.com>',
        to: data.email,
        subject: 'ETM Car-Solution — Votre demande a bien été reçue',
        html: clientTemplate(),
      });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Mail error:', err);
    return res.status(500).json({ error: 'Erreur envoi email' });
  }
};
