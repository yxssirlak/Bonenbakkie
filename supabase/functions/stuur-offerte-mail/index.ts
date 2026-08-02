import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const resendApiKey = Deno.env.get('RESEND_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { record } = await req.json()

    // Bericht omzetten naar HTML met line-breaks (enters)
    const extraWensen = record.bericht ? record.bericht.replace(/\n/g, '<br>') : '<em>Geen extra wensen opgegeven.</em>';

    // BULLETPROOF HTML TEMPLATE VOOR EMAIL CLIENTS
    const htmlEmail = `
    <!DOCTYPE html>
    <html lang="nl">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Offerte Aanvraag</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #1e0f0a; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
      
      <!-- Hoofd Wrapper -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #1e0f0a; padding: 40px 20px;">
        <tr>
          <td align="center">
            
            <!-- De Witte Kaart (max breedte 600px voor perfecte weergave in mail) -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
              
              <!-- Header met Achtergrondkleur en Logo -->
              <tr>
                <td align="center" style="background-color: #3d2f1b; padding: 40px 20px; border-bottom: 4px solid #d4cab4;">
                  <!-- Logo gelinkt vanaf je live website -->
                  <img src="https://www.bonenbakkie.nl/bonenbakkielogo.png" alt="'t Bonenbakkie" width="220" style="display: block; max-width: 220px; height: auto; border: 0;">
                </td>
              </tr>

              <!-- Inhoud / Formulier Data -->
              <tr>
                <td style="padding: 40px 30px;">
                  <h2 style="color: #534026; margin: 0 0 20px 0; font-size: 24px; text-align: center; font-weight: 600;">
                    Nieuwe Offerte Aanvraag
                  </h2>
                  <hr style="border: none; border-top: 1px solid #f4ebd9; margin-bottom: 25px;">
                  
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size: 15px; line-height: 1.6;">
                    <tr>
                      <td width="35%" style="padding-bottom: 12px; color: #a37042; font-weight: bold;">Naam:</td>
                      <td width="65%" style="padding-bottom: 12px; color: #534026;">${record.naam || '-'}</td>
                    </tr>
                    <tr>
                      <td style="padding-bottom: 12px; color: #a37042; font-weight: bold;">Bedrijf:</td>
                      <td style="padding-bottom: 12px; color: #534026;">${record.bedrijfsnaam || '-'}</td>
                    </tr>
                    <tr>
                      <td style="padding-bottom: 12px; color: #a37042; font-weight: bold;">E-mail:</td>
                      <td style="padding-bottom: 12px; color: #534026;"><a href="mailto:${record.email}" style="color: #534026; text-decoration: none; font-weight: bold;">${record.email || '-'}</a></td>
                    </tr>
                    <tr>
                      <td style="padding-bottom: 12px; color: #a37042; font-weight: bold;">Telefoon:</td>
                      <td style="padding-bottom: 12px; color: #534026;">${record.telefoon || '-'}</td>
                    </tr>
                    <tr>
                      <td style="padding-bottom: 12px; color: #a37042; font-weight: bold;">Gelegenheid:</td>
                      <td style="padding-bottom: 12px; color: #534026;">${record.gelegenheid || '-'}</td>
                    </tr>
                    <tr>
                      <td style="padding-bottom: 12px; color: #a37042; font-weight: bold;">Datum:</td>
                      <td style="padding-bottom: 12px; color: #534026;">${record.datum || '-'}</td>
                    </tr>
                    <tr>
                      <td style="padding-bottom: 12px; color: #a37042; font-weight: bold;">Locatie:</td>
                      <td style="padding-bottom: 12px; color: #534026;">${record.locatie || '-'}</td>
                    </tr>
                    <tr>
                      <td style="padding-bottom: 25px; color: #a37042; font-weight: bold;">Gasten:</td>
                      <td style="padding-bottom: 25px; color: #534026;">${record.aantal_gasten || '-'}</td>
                    </tr>
                  </table>

                  <h3 style="color: #a37042; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 10px 0;">Extra Wensen & Details</h3>
                  <div style="background-color: #f4ebd9; padding: 20px; border-radius: 8px; color: #534026; font-size: 15px; line-height: 1.6; border: 1px solid #d4cab4;">
                    ${extraWensen}
                  </div>
                  
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td align="center" style="background-color: #f4ebd9; padding: 20px; color: #a37042; font-size: 12px; border-top: 1px solid #d4cab4;">
                  Deze aanvraag is automatisch verstuurd vanaf <a href="https://www.bonenbakkie.nl" style="color: #534026; font-weight: bold; text-decoration: none;">www.bonenbakkie.nl</a>
                </td>
              </tr>

            </table>
            <!-- Einde Witte Kaart -->

          </td>
        </tr>
      </table>
    </body>
    </html>
    `;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`
      },
      body: JSON.stringify({
        from: 'Bonenbakkie <onboarding@resend.dev>', // Verander dit later naar info@bonenbakkie.nl via Resend domein setup
        to: 'info@bonenbakkie.nl', 
        subject: `Aanvraag ${record.type_aanvraag}: ${record.naam}`,
        html: htmlEmail
      })
    })

    const data = await res.json()
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})