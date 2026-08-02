import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const resendApiKey = Deno.env.get('RESEND_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Dit lost de gevreesde CORS error op
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { record } = await req.json()

    // Stuur de mail via Resend
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`
      },
      body: JSON.stringify({
        from: 'Bonenbakkie <onboarding@resend.dev>', // Laat dit staan om te testen
        to: 'info@bonenbakkie.nl', // Vul hier in waar je de aanvragen wilt ONTVANGEN
        subject: `Nieuwe aanvraag: ${record.type_aanvraag} - ${record.naam}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px;">
            <h2>☕ Nieuwe Offerte Aanvraag</h2>
            <p><strong>Naam:</strong> ${record.naam || '-'}</p>
            <p><strong>Bedrijf:</strong> ${record.bedrijfsnaam || '-'}</p>
            <p><strong>E-mail:</strong> ${record.email || '-'}</p>
            <p><strong>Telefoon:</strong> ${record.telefoon || '-'}</p>
            <p><strong>Gelegenheid:</strong> ${record.gelegenheid || '-'}</p>
            <p><strong>Datum:</strong> ${record.datum || '-'}</p>
            <p><strong>Locatie:</strong> ${record.locatie || '-'}</p>
            <p><strong>Gasten:</strong> ${record.aantal_gasten || '-'}</p>
            <hr />
            <p><strong>Extra wensen:</strong><br/> ${record.bericht || 'Geen'}</p>
          </div>
        `
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