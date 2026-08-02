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

    // Mooie HTML Template met jouw huisstijl
    const htmlEmail = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
    </head>
    <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f1ea; margin: 0; padding: 40px 20px;">
      
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05);">
        
        <!-- Header met Logo (Gepakt van je live website) -->
        <tr>
          <td style="background-color: #1e0f0a; text-align: center; padding: 40px 20px;">
            <img src="https://www.bonenbakkie.nl/bonenbakkielogo.png" alt="'t bonenbakkie" style="max-width: 200px; height: auto;" />
          </td>
        </tr>

        <!-- Inhoud van de mail -->
        <tr>
          <td style="padding: 40px 30px;">
            <h2 style="color: #534026; margin-top: 0; margin-bottom: 25px; font-size: 24px; border-bottom: 2px solid #f4f1ea; padding-bottom: 15px;">
              ☕ Nieuwe Offerte Aanvraag
            </h2>
            
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 15px; line-height: 1.6;">
              <tr><td style="padding-bottom: 10px;"><strong style="color: #a37042; display: inline-block; width: 130px;">Naam:</strong> <span style="color: #534026;">${record.naam || '-'}</span></td></tr>
              <tr><td style="padding-bottom: 10px;"><strong style="color: #a37042; display: inline-block; width: 130px;">Bedrijf:</strong> <span style="color: #534026;">${record.bedrijfsnaam || '-'}</span></td></tr>
              <tr><td style="padding-bottom: 10px;"><strong style="color: #a37042; display: inline-block; width: 130px;">E-mail:</strong> <span style="color: #534026;">${record.email || '-'}</span></td></tr>
              <tr><td style="padding-bottom: 10px;"><strong style="color: #a37042; display: inline-block; width: 130px;">Telefoon:</strong> <span style="color: #534026;">${record.telefoon || '-'}</span></td></tr>
              <tr><td style="padding-bottom: 10px;"><strong style="color: #a37042; display: inline-block; width: 130px;">Gelegenheid:</strong> <span style="color: #534026;">${record.gelegenheid || '-'}</span></td></tr>
              <tr><td style="padding-bottom: 10px;"><strong style="color: #a37042; display: inline-block; width: 130px;">Datum:</strong> <span style="color: #534026;">${record.datum || '-'}</span></td></tr>
              <tr><td style="padding-bottom: 10px;"><strong style="color: #a37042; display: inline-block; width: 130px;">Locatie:</strong> <span style="color: #534026;">${record.locatie || '-'}</span></td></tr>
              <tr><td style="padding-bottom: 25px;"><strong style="color: #a37042; display: inline-block; width: 130px;">Aantal Gasten:</strong> <span style="color: #534026;">${record.aantal_gasten || '-'}</span></td></tr>
            </table>

            <!-- Extra wensen blok -->
            <h3 style="color: #a37042; font-size: 16px; margin-bottom: 10px;">Extra wensen / Bericht:</h3>
            <div style="background-color: #f4f1ea; padding: 20px; border-radius: 8px; color: #534026; font-size: 15px; line-height: 1.6;">
              ${record.bericht || '<em>Geen bijzonderheden opgegeven.</em>'}
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background-color: #f4f1ea; text-align: center; padding: 20px; color: #a37042; font-size: 12px;">
            Deze aanvraag is automatisch verstuurd vanaf <strong>www.bonenbakkie.nl</strong>
          </td>
        </tr>
      </table>
      
    </body>
    </html>
    `

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`
      },
      body: JSON.stringify({
        from: 'Bonenbakkie <onboarding@resend.dev>', 
        to: 'info@bonenbakkie.nl', 
        subject: `Nieuwe aanvraag: ${record.type_aanvraag} - ${record.naam}`,
        html: htmlEmail // Verwijst naar de HTML hierboven
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