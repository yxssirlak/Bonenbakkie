import React, { useState } from 'react';
import { MapPin, MessageCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'error' | 'sent'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  function validate() {
    if (!name.trim()) return 'Vul je naam in.';
    if (!email.trim()) return 'Vul je e-mail in.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return 'Vul een geldig e-mailadres in.';
    if (!message.trim()) return 'Schrijf een kort bericht.';
    return '';
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');
    const v = validate();
    if (v) {
      setErrorMsg(v);
      setStatus('error');
      return;
    }

    const subject = encodeURIComponent(`Contact via website: ${name}`);
    const body = encodeURIComponent(`Naam: ${name}%0AEmail: ${email}%0A%0ABericht:%0A${message}`);
    window.location.href = `mailto:hallo@tbonenbakkie.com?subject=${subject}&body=${body}`;
    setStatus('sent');
    setErrorMsg('');
  };

  return (
    <main>
      <section data-nav-theme="light" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title mb-6">Contact</h2>
          <p className="mb-6 text-[#6e5b49]">Wil je ons boeken voor een evenement of heb je een vraag? Stuur ons een bericht of bel ons.</p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-[2rem] p-8 bg-white/95 border border-[#e8d6c2] shadow-sm">
              <h3 className="font-semibold mb-2 text-[#3f2e1f]">Stuur een bericht</h3>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <input aria-label="naam" value={name} onChange={(e) => setName(e.target.value)} placeholder="Naam" className="w-full p-3 rounded-lg border" />
                <input aria-label="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" className="w-full p-3 rounded-lg border" />
                <textarea aria-label="bericht" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Bericht" className="w-full p-3 rounded-lg border h-32" />
                {status === 'error' && <div className="text-red-600">{errorMsg}</div>}
                {status === 'sent' && <div className="text-green-700">Je mailclient is geopend. Verstuur je bericht om contact op te nemen.</div>}
                <div className="flex justify-end">
                  <button type="submit" className="coffee-btn">Verstuur</button>
                </div>
              </form>
            </div>

            <div className="rounded-[2rem] p-8 bg-[var(--color-beige-warm)] border border-[#e8d6c2]">
              <h3 className="font-semibold mb-4 text-[#3f2e1f]">Andere manieren om ons te bereiken</h3>
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="w-6 h-6 text-[#6B4423]" />
                <div>
                  <div className="font-medium">Locatie</div>
                  <div className="text-sm text-[#6e5b49]">Mobiele wagen - varieert per dag</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MessageCircle className="w-6 h-6 text-[#6B4423]" />
                <div>
                  <div className="font-medium">E-mail</div>
                  <div className="text-sm text-[#6e5b49]">hallo@tbonenbakkie.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
