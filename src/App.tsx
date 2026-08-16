/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

const navItems = [
  { id: 'problema', label: 'EL PROBLEMA' },
  { id: 'solucion', label: 'LA SOLUCIÓN' },
  { id: 'proceso', label: 'EL PROCESO' },
  { id: 'playbooks', label: 'PLAYBOOKS' },
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 90;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  useEffect(() => {
    const sectionIds = ['problema', 'solucion', 'proceso', 'playbooks'];

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const triggerPoint = 180;
      let currentActive = '';

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerPoint && rect.bottom > triggerPoint) {
            currentActive = id;
            break;
          }
        }
      }

      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#121316] text-gray-200 relative flex flex-col overflow-x-hidden selection:bg-[#93a7c6]/30 selection:text-[#f4f4f2]">
      
      {/* Fixed Header Wrapper */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'pt-4 px-4' : 'pt-0 px-0'}`}>
        {/* Navbar */}
        <nav className={`mx-auto flex items-center justify-between transition-all duration-300 ${
          scrolled 
            ? 'max-w-[900px] bg-[#1a1c20]/80 backdrop-blur-md border border-white/5 rounded-xl px-6 py-3 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)]' 
            : 'max-w-[1400px] px-10 md:px-16 lg:px-24 py-8 bg-transparent border-transparent'
        }`}>
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img src="/lap-logo.png" alt="LAP Logo" className="h-10 object-contain" />
          </div>
          
          <div className="hidden md:flex items-center gap-10 text-[10.5px] font-mono tracking-[0.2em] uppercase">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative transition-colors font-bold cursor-pointer uppercase ${
                    isActive ? 'text-[#93a7c6]' : 'text-gray-400 hover:text-[#f4f4f2]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <div className="absolute -bottom-2 left-0 right-0 h-px bg-[#93a7c6]" />
                  )}
                </button>
              );
            })}
          </div>
          
          <button 
            onClick={() => scrollToSection('agenda')}
            className="bg-white text-black px-6 py-2.5 rounded-[4px] text-[13px] font-medium flex items-center gap-2 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            Agenda <ArrowRight className="w-4 h-4" />
          </button>
        </nav>
      </div>

      {/* Spacer to prevent layout shift when navbar becomes fixed */}
      <div className="h-[100px]" />

      {/* Main Container framed with lines */}
      <div className="relative z-10 flex-1 w-full max-w-[1400px] mx-auto flex flex-col">
        {/* Top Horizontal Line (Below Navbar) */}
        <div className="absolute top-0 left-[-50vw] right-[-50vw] h-px border-t border-dashed border-white/10 hidden md:block" />
        
        {/* Left/Right Vertical Lines (Extend fully) */}
        <div className="absolute -top-[150px] bottom-0 left-6 lg:left-12 w-px border-l border-dashed border-white/10 hidden md:block" />
        <div className="absolute -top-[150px] bottom-0 right-6 lg:right-12 w-px border-l border-dashed border-white/10 hidden md:block" />

        {/* Crosshairs at top intersections */}
        <div className="absolute top-0 left-6 lg:left-12 -translate-x-1/2 -translate-y-1/2 text-white/40 hidden md:block">
           <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M7.5 0V15M0 7.5H15" stroke="currentColor" strokeWidth="1"/></svg>
        </div>
        <div className="absolute top-0 right-6 lg:right-12 -translate-x-1/2 -translate-y-1/2 text-white/40 hidden md:block">
           <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M7.5 0V15M0 7.5H15" stroke="currentColor" strokeWidth="1"/></svg>
        </div>
        
        <main className="flex-1 px-0 pt-[70px] pb-8 lg:pb-12 flex flex-col items-center justify-center relative">
          
          {/* Centered Text Section */}
          <div className="w-full max-w-[700px] flex flex-col items-center text-center z-10">
            <div className="text-[11px] font-mono tracking-[0.25em] text-[#869ab5] mb-8 uppercase font-bold">
              Linked Acquisition Partner
            </div>
            
            <h1 className="text-[58px] font-serif font-medium leading-[1.05] tracking-tight text-[#f4f4f2] mb-8">
              Arquitectura Full-Funnel que Genera <span className="font-serif italic text-[#93a7c6] font-normal tracking-normal">10-30 Llamadas Calificadas B2B x Mes</span>
            </h1>
            
            <p className="text-gray-400 text-[17.5px] leading-[28px] font-['Space_Grotesk'] font-normal not-italic max-w-[700px]">
Posicionamos a tu agencia B2B como la mejor y única opción de tus prospectos, convirtiéndote en el referente al que ya conocen, ya le creen, y transformando esa confianza en llamadas agendadas.            </p>
          </div>

          {/* Video Placeholder */}
          <div className="w-full max-w-[750px] aspect-video mt-12 bg-[#161920]/50 border border-white/10 rounded-xl flex flex-col items-center justify-center backdrop-blur-sm relative group cursor-pointer overflow-hidden z-10 shadow-2xl">
             {/* Gradient overlay for depth */}
             <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#121316]/80 pointer-events-none" />
             
             {/* Play button */}
             <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20 group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110 mb-4 shadow-[0_0_40px_rgba(255,255,255,0.05)]">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="white" className="ml-2 opacity-90 group-hover:opacity-100 transition-opacity"><path d="M5 3l14 9-14 9V3z"/></svg>
             </div>
             
             {/* Optional subtle text */}
             <span className="text-[11px] font-mono tracking-widest text-gray-400 uppercase relative z-10 opacity-70">Play overview</span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 z-10">
            <button 
              onClick={() => scrollToSection('agenda')}
              className="w-full sm:w-auto bg-white text-black px-7 py-3.5 rounded-[4px] text-[15px] font-medium flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              Agenda <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => scrollToSection('proceso')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-[4px] text-[15px] font-medium border border-white/20 text-[#f4f4f2] hover:bg-white/5 transition-colors cursor-pointer"
            >
              Resultados
            </button>
          </div>

        </main>

        {/* In-flow dashed line above Problem Section for desktop */}
        <div className="hidden md:block w-full px-6 lg:px-12 relative mt-0">
          <div className="w-full h-px border-b border-dashed border-white/10" />
          {/* Crosshairs */}
          <div className="absolute left-6 lg:left-12 top-0 -translate-x-1/2 -translate-y-1/2 text-white/40">
             <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M7.5 0V15M0 7.5H15" stroke="currentColor" strokeWidth="1"/></svg>
          </div>
          <div className="absolute right-6 lg:right-12 top-0 -translate-x-1/2 -translate-y-1/2 text-white/40">
             <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M7.5 0V15M0 7.5H15" stroke="currentColor" strokeWidth="1"/></svg>
          </div>
        </div>

        {/* THE PROBLEM SECTION */}
        <section id="problema" className="w-[1300px] mx-auto px-6 lg:px-24 py-24 flex flex-col relative z-10">
          
          {/* Header */}
          <div className="flex items-center gap-6 mb-16">
            <span className="text-[11px] font-mono tracking-[0.25em] text-[#869ab5] uppercase font-bold whitespace-nowrap">
              El Problema
            </span>
            <div className="flex-1 h-px border-b border-dashed border-white/10" />
          </div>

          {/* Title & Desc */}
          <div className="max-w-3xl mb-20">
            <h2 className="text-[40px] md:text-[48px] font-serif font-medium leading-[1.1] tracking-tight text-[#f4f4f2] mb-6">
              Sos una opción más, <br className="hidden md:block" />
              <span className="italic text-[#93a7c6] font-normal">no LA UNICA en la que piensan</span>
            </h2>
            <p className="text-gray-400 text-[17.5px] leading-[1.6] max-w-[640px] font-['Space_Grotesk'] font-normal not-italic">
La mayoría de las agencias B2B compiten sin nombre propio. Escriben en frío a desconocidos que no tienen ningún motivo para confiar, y cada conversación arranca desde cero. Sin autoridad visible, no hay forma de destacar — solo de competir.            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1 — Inbox: you're just another stranger */}
            <div className="bg-[#161920]/40 border border-white/5 rounded-2xl p-6 lg:p-8 flex flex-col hover:bg-white/[0.02] transition-colors relative group">
               <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
               {/* Visual Area — Mock Inbox */}
               <div className="h-[200px] bg-gradient-to-b from-[#1a1d24] to-[#121316] rounded-xl border border-white/5 mb-8 p-4 flex flex-col shadow-inner relative z-10 overflow-hidden">
                 <div className="flex items-center justify-between mb-3">
                   <div className="text-[9px] font-mono tracking-widest text-gray-500 uppercase">Bandeja de Entrada</div>
                   <div className="text-[9px] font-mono text-gray-600">12 sin leer</div>
                 </div>
                 <div className="space-y-[6px] flex-1">
                   {/* Email rows — all look identical */}
                   {[
                     { from: 'Agency Alpha', preview: 'Hola, te ayudamos a escalar tus…' },
                     { from: 'Tú', preview: 'Hola, te ayudamos a conseguir…', isYou: true },
                     { from: 'Growth Co.', preview: 'Hola, te ayudamos a generar…' },
                     { from: 'Scale Studio', preview: 'Hola, te ayudamos a crecer…' },
                   ].map((email, i) => (
                     <div key={i} className={`flex items-center gap-2.5 p-2 rounded-md border transition-colors ${email.isYou ? 'bg-white/[0.03] border-white/10' : 'bg-transparent border-transparent'}`}>
                       <div className={`w-[6px] h-[6px] rounded-full shrink-0 ${email.isYou ? 'bg-[#93a7c6]' : 'bg-white/15'}`} />
                       <div className="flex-1 min-w-0">
                         <div className="flex items-center justify-between gap-2">
                           <span className={`text-[11px] font-medium truncate ${email.isYou ? 'text-[#93a7c6]' : 'text-gray-400'}`}>{email.from}</span>
                           <span className="text-[8px] text-gray-600 font-mono shrink-0">10:{42 - i}am</span>
                         </div>
                         <div className="text-[10px] text-gray-500 truncate leading-tight mt-0.5">{email.preview}</div>
                       </div>
                     </div>
                   ))}
                 </div>
                 {/* Fade overlay at bottom */}
                 <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#121316] to-transparent pointer-events-none" />
               </div>
               <div className="text-[10px] font-mono tracking-widest text-[#869ab5] uppercase mb-3 relative z-10 font-bold">Problema 01</div>
               <h3 className="text-[22px] font-serif font-medium text-[#f4f4f2] mb-3 leading-snug relative z-10">Un Desconocido Más en la Bandeja</h3>
               <p className="text-[14px] text-gray-400 leading-[1.6] relative z-10 font-['Space_Grotesk'] font-normal not-italic">
Sin presencia ni historial visible, el prospecto no tiene forma de diferenciarte. Cada mensaje frío entra a competir con otros diez, sin ninguna ventaja previa.               </p>
            </div>

            {/* Card 2 — Trust meter at zero, every call resets */}
            <div className="bg-[#161920]/40 border border-white/5 rounded-2xl p-6 lg:p-8 flex flex-col hover:bg-white/[0.02] transition-colors relative group">
               <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
               {/* Visual Area — Trust Gauge */}
               <div className="h-[200px] bg-gradient-to-b from-[#1a1d24] to-[#121316] rounded-xl border border-white/5 mb-8 p-4 flex flex-col shadow-inner relative z-10 overflow-hidden">
                 <div className="text-[9px] font-mono tracking-widest text-gray-500 uppercase mb-3">Llamada de Ventas #47</div>
                 
                 {/* Trust bar */}
                 <div className="mb-3">
                   <div className="flex items-center justify-between mb-1.5">
                     <span className="text-[10px] text-gray-400 font-medium">Nivel de Confianza</span>
                     <span className="text-[12px] font-mono font-bold text-red-400/80">0%</span>
                   </div>
                   <div className="w-full h-[5px] bg-white/5 rounded-full overflow-hidden border border-white/5">
                     <div className="h-full w-[3%] bg-red-400/40 rounded-full" />
                   </div>
                 </div>

                 {/* Stats */}
                 <div className="space-y-2 mt-auto">
                   <div className="flex items-center justify-between p-2 rounded-md bg-[#121316]/60 border border-white/5">
                     <span className="text-[10px] text-gray-400">Touchpoints previos</span>
                     <span className="text-[11px] font-mono font-semibold text-gray-500">0</span>
                   </div>
                   <div className="flex items-center justify-between p-2 rounded-md bg-[#121316]/60 border border-white/5">
                     <span className="text-[10px] text-gray-400">Contexto del prospecto</span>
                     <span className="text-[8px] font-mono tracking-widest text-gray-600 border border-dashed border-white/10 px-2 py-0.5 rounded-full uppercase">Ninguno</span>
                   </div>
                   <div className="flex items-center justify-between p-2 rounded-md bg-[#121316]/60 border border-white/5">
                     <span className="text-[10px] text-gray-400">Empieza de nuevo</span>
                     <span className="text-[11px] font-mono text-red-400/60">↺ Reset</span>
                   </div>
                 </div>
               </div>
               <div className="text-[10px] font-mono tracking-widest text-[#869ab5] uppercase mb-3 relative z-10 font-bold">Problema 02</div>
               <h3 className="text-[22px] font-serif font-medium text-[#f4f4f2] mb-3 leading-snug relative z-10">Cada Llamada Empieza de Cero</h3>
               <p className="text-[14px] text-gray-400 leading-[1.6] relative z-10 font-['Space_Grotesk'] font-normal not-italic">
El prospecto llega escéptico, hay que convencerlo desde el minuto uno. Sin confianza construida antes, el ciclo de venta se alarga y el contrato se achica.               </p>
            </div>

            {/* Card 3 — Awareness that never converts to meetings */}
            <div className="bg-[#161920]/40 border border-white/5 rounded-2xl p-6 lg:p-8 flex flex-col hover:bg-white/[0.02] transition-colors relative group">
               <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
               {/* Visual Area — Leaky Funnel */}
               <div className="h-[200px] bg-gradient-to-b from-[#1a1d24] to-[#121316] rounded-xl border border-white/5 mb-8 p-5 flex flex-col shadow-inner relative z-10">
                 <div className="text-[9px] font-mono tracking-widest text-gray-500 uppercase mb-4">Conversión de Atención</div>
                 <div className="space-y-2.5 flex-1 flex flex-col justify-center">
                   {/* Funnel bars */}
                   <div className="flex items-center gap-3">
                     <span className="text-[9px] font-mono text-gray-500 w-[62px] text-right shrink-0">Te ven</span>
                     <div className="flex-1 h-[14px] bg-[#93a7c6]/20 rounded-sm relative overflow-hidden">
                       <div className="h-full w-[85%] bg-[#93a7c6]/30 rounded-sm" />
                     </div>
                     <span className="text-[11px] font-mono text-[#93a7c6] w-[36px] text-right">2,400</span>
                   </div>
                   <div className="flex items-center gap-3">
                     <span className="text-[9px] font-mono text-gray-500 w-[62px] text-right shrink-0">Recuerdan</span>
                     <div className="flex-1 h-[14px] bg-[#93a7c6]/10 rounded-sm relative overflow-hidden">
                       <div className="h-full w-[40%] bg-[#93a7c6]/20 rounded-sm" />
                     </div>
                     <span className="text-[11px] font-mono text-gray-400 w-[36px] text-right">340</span>
                   </div>
                   <div className="flex items-center gap-3">
                     <span className="text-[9px] font-mono text-gray-500 w-[62px] text-right shrink-0">Confían</span>
                     <div className="flex-1 h-[14px] bg-white/5 rounded-sm relative overflow-hidden">
                       <div className="h-full w-[12%] bg-white/10 rounded-sm" />
                     </div>
                     <span className="text-[11px] font-mono text-gray-500 w-[36px] text-right">58</span>
                   </div>
                   <div className="flex items-center gap-3">
                     <span className="text-[9px] font-mono text-red-400/60 w-[62px] text-right shrink-0">Agendan</span>
                     <div className="flex-1 h-[14px] bg-red-400/5 rounded-sm border border-dashed border-red-400/10 relative overflow-hidden" />
                     <span className="text-[12px] font-mono font-bold text-red-400/70 w-[36px] text-right">0</span>
                   </div>
                 </div>
                 {/* Subtle leak indicator */}
                 <div className="flex items-center gap-2 mt-2">
                   <div className="flex-1 h-px border-t border-dashed border-red-400/15" />
                   <span className="text-[8px] font-mono text-red-400/40 uppercase tracking-widest">Sin sistema de conversión</span>
                   <div className="flex-1 h-px border-t border-dashed border-red-400/15" />
                 </div>
               </div>
               <div className="text-[10px] font-mono tracking-widest text-[#869ab5] uppercase mb-3 relative z-10 font-bold">Problema 03</div>
               <h3 className="text-[22px] font-serif font-medium text-[#f4f4f2] mb-3 leading-snug relative z-10">El Reconocimiento no se Convierte en Reuniones</h3>
               <p className="text-[14px] text-gray-400 leading-[1.6] relative z-10 font-['Space_Grotesk'] font-normal not-italic">
Aunque algunos prospectos ya te conozcan, no hay un sistema que transforme esa atención en una llamada agendada. Queda como reconocimiento pasivo, nunca como pipeline.               </p>
            </div>

          </div>
        </section>

        <SolutionSection />

        <DeploymentSection />

        <YoutubeSection />

        <IdealPartnersSection />

        <FAQSection />

        <AuditSection />

        <FooterSection onNavigate={scrollToSection} />

      </div>
    </div>
  );
}

function IdealPartnersSection() {
  const bestFit = [
    "B2B services across finance, SaaS, agencies, and professional services",
    "A market of 100K+ contacts. Clients with multiple targetable segments compound the results",
    "$15K+ LTV per customer",
    "Proven sales process in place. A sales team or in-house AEs maximize results",
    "Product-market fit achieved"
  ];

  const notFit = [
    "Total addressable market under 100K contacts",
    "LTV under $15K (the economics don't carry the system)",
    "No follow-up motion behind the outreach",
    "Pre-product-market fit or pre-launch",
    "Inconsistent offer or shifting positioning"
  ];

  return (
    <section className="w-[1300px] mx-auto px-6 lg:px-24 pt-24 pb-32 flex flex-col relative z-10 border-t border-dashed border-white/10">
      {/* Header */}
      <div className="flex items-center gap-6 mb-16">
        <span className="text-[11px] font-mono tracking-[0.25em] text-[#869ab5] uppercase font-bold whitespace-nowrap">
          Ideal Partners
        </span>
        <div className="flex-1 h-px border-b border-dashed border-white/10" />
      </div>

      <div className="max-w-[700px] mb-16">
        <h2 className="text-[40px] md:text-[48px] font-serif font-medium leading-[1.1] tracking-tight text-[#f4f4f2] mb-6">
          Who we're built <span className="italic text-[#93a7c6] font-normal">for</span>.
        </h2>
        <p className="text-gray-400 text-[16.5px] leading-[1.6] font-['Space_Grotesk'] font-normal not-italic">
          The Growth OS isn't a fit for everyone. It's a fit for B2B service businesses with enough market to scale into and enough deal economics to make a unified system pay for itself. The checklist below is how we screen new partners.
        </p>
      </div>

      {/* Grid container */}
      <div className="grid grid-cols-1 md:grid-cols-2 rounded-xl border border-white/5 overflow-hidden">
        
        {/* Left Column - Best Fit */}
        <div className="bg-[#1a1c23]/40 flex flex-col">
          <div className="p-6 lg:p-8 border-b border-white/5 flex items-center gap-4">
            <div className="w-8 h-8 rounded border border-[#93a7c6]/30 bg-[#93a7c6]/10 flex items-center justify-center">
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#93a7c6]">
                  <polyline points="20 6 9 17 4 12" />
               </svg>
            </div>
            <span className="text-[11px] font-mono tracking-widest text-[#869ab5] uppercase font-semibold">Best Fit</span>
          </div>
          <ul className="flex flex-col">
            {bestFit.map((item, idx) => (
              <li key={idx} className="px-6 lg:px-8 py-5 lg:py-6 border-b border-dashed border-white/5 flex items-start gap-4 text-[14px] text-gray-200 font-medium leading-[1.6] last:border-b-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#93a7c6] shrink-0 mt-[3px]">
                   <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column - Not a Fit */}
        <div className="bg-[#121316]/80 flex flex-col md:border-l border-white/5">
          <div className="p-6 lg:p-8 border-b border-white/5 flex items-center gap-4">
            <div className="w-8 h-8 rounded border border-red-400/20 bg-red-400/5 flex items-center justify-center">
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-400/70">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
               </svg>
            </div>
            <span className="text-[11px] font-mono tracking-widest text-gray-500 uppercase font-semibold">Not a Fit</span>
          </div>
          <ul className="flex flex-col">
            {notFit.map((item, idx) => (
              <li key={idx} className="px-6 lg:px-8 py-5 lg:py-6 border-b border-dashed border-white/5 flex items-start gap-4 text-[14px] text-gray-400 font-medium leading-[1.6] last:border-b-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400/50 shrink-0 mt-[4px]">
                   <line x1="18" y1="6" x2="6" y2="18" />
                   <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Footer CTA */}
      <div className="mt-16 pt-10 border-t border-dashed border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
         <p className="text-[14px] text-gray-400 font-['Space_Grotesk'] leading-[1.6] max-w-[500px]">
           <span className="italic text-gray-300 mr-1">Not sure where you land?</span> 
           Book the audit. We'll tell you straight whether the architecture is the right move for your business right now.
         </p>
         <button className="bg-[#f0f0f0] text-[#121316] px-8 py-4 rounded font-medium text-[14px] flex items-center gap-3 hover:bg-white transition-colors shrink-0 whitespace-nowrap">
            Book a Growth Architecture Audit
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="translate-y-[1px]">
               <line x1="5" y1="12" x2="19" y2="12"></line>
               <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
         </button>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    {
      num: "01",
      question: "¿Para quién es este servicio?",
      answer: "Para agencias que quieren conseguir clientes de forma constante en LinkedIn pero no tienen tiempo ni equipo para encargarse de la captación. Si querés delegar todo el sistema comercial de forma estructurada — no solo contratar un SDR o appointment setter suelto que manda mensajes sin estrategia, sin oferta trabajada y sin sistema — sino implementar un proceso completo que realmente convierta, esto es para vos."
    },
    {
      num: "02",
      question: "¿Cuánto tiempo necesito dedicarle yo?",
      answer: "Mucho menos de lo que imaginás. Al inicio necesitamos 1 o 2 llamadas cortas para entender tu negocio, tu cliente ideal y tu propuesta de valor. De ahí en adelante, solo te pedimos una revisión semanal para alinearnos en resultados. El resto — perfil, conexiones, mensajes y contenido — lo gestionamos nosotros. En lugar de dedicar horas diarias a prospectar, invertís menos de 2 horas semanales y aparecés a cerrar las llamadas que generamos."
    },
    {
      num: "03",
      question: "¿En cuánto tiempo empiezo a ver resultados?",
      answer: "En 3 semanas el sistema está funcionando a pleno rendimiento. La primera semana armamos tu oferta y perfil, la segunda el sistema ya está en marcha con las campañas lanzadas, y en la tercera semana es cuando nuestros clientes empiezan a recibir sus primeras llamadas calificadas — con el sistema operando al máximo y generando conversaciones de forma constante."
    },
    {
      num: "04",
      question: "¿Qué pasa si ya tengo un perfil de LinkedIn armado?",
      answer: "Lo auditamos y lo optimizamos para que funcione de forma completamente profesional. Si falta una sección clave, la creamos. Si el diseño no comunica autoridad, lo cambiamos. Si no tiene una landing page clara que convierta visitas en conversaciones, la armamos. Nos encargamos de que cada elemento de tu perfil esté alineado con el sistema de captación que vamos a implementar."
    },
    {
      num: "05",
      question: "¿Esto es diferente a contratar un community manager?",
      answer: "Sí, completamente. Un community manager gestiona contenido. Nosotros operamos todo el sistema comercial — outbound, inbound y conversaciones — con un único objetivo: generar llamadas y clientes para tu agencia. No medimos likes, medimos agendas."
    },
    {
      num: "06",
      question: "¿Ofrecen algún tipo de garantía?",
      answer: "Sí. El servicio tiene una duración de 3 meses y si al finalizar ese período no obtuviste un retorno de inversión considerable en base a los resultados acordados al inicio, te devolvemos el 100% de tu inversión. Trabajamos con el compromiso de que esto funcione, no solo de que \"se intente\"."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-[1300px] mx-auto px-6 lg:px-24 pt-24 pb-32 flex flex-col relative z-10 border-t border-dashed border-white/10">
      {/* Header */}
      <div className="flex items-center gap-6 mb-16">
        <span className="text-[11px] font-mono tracking-[0.25em] text-[#869ab5] uppercase font-bold whitespace-nowrap">
          F A Q
        </span>
        <div className="flex-1 h-px border-b border-dashed border-white/10" />
      </div>

      <h2 className="text-[40px] md:text-[48px] font-serif font-medium leading-[1.1] tracking-tight text-[#f4f4f2] mb-20">
        Preguntas..? <span className="italic text-[#93a7c6] font-normal">respondidas!</span>
      </h2>

      <div className="flex flex-col border-t border-dashed border-white/10">
        {faqs.map((faq, index) => (
          <FAQItem 
            key={index}
            num={faq.num}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
    </section>
  );
}

function FAQItem({ num, question, answer, isOpen, onClick }: { num: string, question: string, answer: string, isOpen: boolean, onClick: () => void }) {
  return (
    <div className="border-b border-dashed border-white/10">
      <button 
        onClick={onClick}
        className="w-full flex items-center justify-between py-8 text-left group"
      >
        <div className="flex items-center gap-8">
          <span className="text-[11px] font-mono tracking-widest text-gray-500">{num}</span>
          <span className="text-[20px] md:text-[24px] font-serif font-medium text-gray-200 group-hover:text-[#f4f4f2] transition-colors">{question}</span>
        </div>
        <span className="text-gray-500 font-mono text-[16px] group-hover:text-[#f4f4f2] transition-colors">
          {isOpen ? '-' : '+'}
        </span>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[300px] opacity-100 pb-8' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-[15px] leading-[1.6] text-gray-400 font-['Space_Grotesk'] pl-[62px] max-w-[800px]">
          {answer}
        </p>
      </div>
    </div>
  );
}

function SystemCheckRow({ label, status }: { label: string, status: string }) {
  return (
    <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#121316]/50 border border-white/5">
      <div className="flex items-center gap-3">
        <div className="w-[14px] h-[14px] rounded-[3px] border border-dashed border-white/20 flex items-center justify-center" />
        <span className="text-[12px] text-gray-300 font-medium">{label}</span>
      </div>
      <span className="text-[8px] font-mono tracking-widest border border-dashed border-white/20 text-gray-500 px-2.5 py-1 rounded-full uppercase">
        {status}
      </span>
    </div>
  );
}

function SignalRow({ label, status }: { label: string, status: string }) {
  return (
    <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#121316]/50 border border-white/5">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-gray-500" />
        <span className="text-[12px] text-gray-300 font-medium">{label}</span>
      </div>
      <span className="text-[8px] font-mono tracking-widest border border-white/10 text-gray-500 px-2.5 py-1 rounded-full uppercase">
        {status}
      </span>
    </div>
  );
}

function SolutionSection() {
  const steps = [
    {
      num: "01",
      title: "Atención",
      sub: "CAPTAR EL INTERÉS",
      desc: "Construimos sistemas de prospección multicanal que ponen tu oferta frente a los tomadores de decisión correctos en el momento exacto.",
      visual: (
        <div className="flex flex-col items-center justify-center h-full relative p-4">
          <div className="text-[9px] font-mono tracking-widest text-gray-500 uppercase absolute top-4 left-4">Radar de Mercado</div>
          <div className="relative w-32 h-32 flex items-center justify-center mt-4">
            <div className="absolute inset-0 rounded-full border border-white/5 animate-[spin_10s_linear_infinite] border-t-white/20" />
            <div className="absolute inset-4 rounded-full border border-white/10" />
            <div className="absolute inset-8 rounded-full border border-[#93a7c6]/20 bg-[#93a7c6]/5" />
            <div className="w-2 h-2 rounded-full bg-[#93a7c6] shadow-[0_0_15px_#93a7c6]" />
            {/* Blips */}
            <div className="absolute top-4 right-8 w-1 h-1 rounded-full bg-[#f4f4f2]/50" />
            <div className="absolute bottom-6 left-6 w-1.5 h-1.5 rounded-full bg-[#93a7c6]/80 shadow-[0_0_8px_#93a7c6] animate-pulse" />
            <div className="absolute top-1/2 left-2 w-1 h-1 rounded-full bg-white/30" />
          </div>
        </div>
      )
    },
    {
      num: "02",
      title: "Nutrición",
      sub: "CONSTRUIR CONFIANZA",
      desc: "Transformamos el interés inicial en confianza a través de contenido estratégico y seguimiento automatizado, posicionándote como la única opción.",
      visual: (
        <div className="flex flex-col h-full relative p-4">
          <div className="text-[9px] font-mono tracking-widest text-gray-500 uppercase mb-auto">Curva de Autoridad</div>
          <div className="flex items-end justify-between h-[100px] mt-auto gap-2 px-2 relative">
            {/* Background grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between opacity-10">
              {[1,2,3,4].map(i => <div key={i} className="w-full h-px border-t border-dashed border-white" />)}
            </div>
            {/* Bars */}
            {[15, 25, 45, 70, 100].map((h, i) => (
              <div key={i} className="w-full rounded-t-[2px] bg-gradient-to-t from-[#93a7c6]/10 to-[#93a7c6]/40 border-t border-[#93a7c6]/50 relative group-hover:from-[#93a7c6]/20 group-hover:to-[#93a7c6]/60 transition-colors" style={{ height: `${h}%` }}>
                 {i === 4 && <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-[#93a7c6] font-bold">+ROI</div>}
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      num: "03",
      title: "Conversión",
      sub: "GENERAR REUNIONES",
      desc: "Sistemas probados que convierten prospectos nutridos en llamadas de ventas agendadas con alta intención de compra.",
      visual: (
        <div className="flex flex-col h-full relative p-4">
          <div className="text-[9px] font-mono tracking-widest text-gray-500 uppercase mb-auto">Pipeline de Ventas</div>
          <div className="flex flex-col items-center justify-center flex-1 w-full gap-3 mt-4">
            <div className="flex items-center justify-between w-3/4 p-2 rounded-md bg-[#121316]/80 border border-white/5">
              <span className="text-[10px] text-gray-400">Prospecto Listo</span>
              <div className="w-1.5 h-1.5 rounded-full bg-green-400/50" />
            </div>
            <div className="w-px h-4 bg-gradient-to-b from-white/20 to-transparent" />
            <div className="flex items-center justify-between w-full p-3 rounded-lg bg-gradient-to-r from-[#93a7c6]/10 to-[#121316] border border-[#93a7c6]/30 shadow-[0_0_15px_rgba(147,167,198,0.1)] group-hover:border-[#93a7c6]/50 transition-colors">
              <div className="flex items-center gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#93a7c6]">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span className="text-[12px] font-medium text-[#f4f4f2]">Llamada Agendada</span>
              </div>
              <span className="text-[10px] font-mono text-[#93a7c6] border border-[#93a7c6]/20 px-2 py-0.5 rounded uppercase">+1 Deal</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="solucion" className="w-[1300px] mx-auto px-6 lg:px-24 py-24 flex flex-col relative z-10 border-t border-dashed border-white/10">
      {/* Header */}
      <div className="flex items-center gap-6 mb-16">
        <span className="text-[11px] font-mono tracking-[0.25em] text-[#869ab5] uppercase font-bold whitespace-nowrap">
          La Solución
        </span>
        <div className="flex-1 h-px border-b border-dashed border-white/10" />
      </div>

      <div className="mb-16">
        <h2 className="text-[40px] md:text-[48px] font-serif font-medium leading-[1.1] tracking-tight text-[#f4f4f2] mb-6">
          Una Arquitectura Full-Funnel<br className="hidden md:block" />
          <span className="italic text-[#93a7c6] font-normal">de Autoridad y Captación</span>
        </h2>
        <p className="text-gray-400 text-[17.5px] leading-[1.6] max-w-[640px] font-['Space_Grotesk'] font-normal not-italic">
          Construido sobre la atención que logramos captar, el sistema nutre a tus prospectos continuamente. Tres pilares trabajan como un solo engranaje que toma a un desconocido y lo convierte sistemáticamente en llamadas agendadas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {/* Connecting line (desktop only) */}
        <div className="absolute top-[100px] left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-[#93a7c6]/30 to-transparent hidden md:block z-0 pointer-events-none" />

        {steps.map((step, idx) => (
          <div key={idx} className="bg-[#161920]/40 border border-white/5 rounded-2xl p-6 lg:p-8 flex flex-col hover:bg-white/[0.02] transition-all duration-300 relative group hover:-translate-y-1">
             <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
             
             {/* Visual Area */}
             <div className="h-[200px] bg-gradient-to-b from-[#1a1d24] to-[#121316] rounded-xl border border-white/5 mb-8 flex flex-col shadow-inner relative z-10 overflow-hidden">
               {step.visual}
             </div>

             <div className="flex items-end gap-4 mb-4 relative z-10">
               <span className="text-[42px] font-serif font-medium leading-none text-[#93a7c6]/40 group-hover:text-[#93a7c6] transition-colors">{step.num}</span>
               <h3 className="text-[22px] font-serif font-medium text-[#f4f4f2] leading-snug pb-1">{step.title}</h3>
             </div>
             
             <div className="text-[10px] font-mono tracking-widest text-gray-500 uppercase mb-3 relative z-10 font-bold">{step.sub}</div>
             
             <p className="text-[14px] text-gray-400 leading-[1.6] relative z-10 font-['Space_Grotesk'] font-normal not-italic">
               {step.desc}
             </p>
          </div>
        ))}
      </div>
    </section>
  );
}


function DeploymentSection() {
  const [activePhase, setActivePhase] = useState(0);

  const phases = [
    { 
      id: 1, 
      timeframe: "SEMANA 1", 
      title: "Sentamos las Bases", 
      heading: "Sentamos las Bases.", 
      desc: "Analizamos tu oferta actual, tu perfil y tu presencia general para identificar los puntos debiles. Optimizamos tu oferta y presentacion, mejoramos tu perfil y landing, para que todo vaya acorde su target y posicionamiento. Todo lo que sigue se apoya en estas bases." 
    },
    { 
      id: 2, 
      timeframe: "SEMANA 2", 
      title: "Instalamos la Arquitectura", 
      heading: "Instalamos la Arquitectura.", 
      desc: "Instalamos los sistemas que van a correr solos a partir de acá: dashboards de métricas, SOPs, y la infraestructura para lanzar campañas, crear contenido, publicar posts, construir tu lista de emails y generar recursos. No es trabajo manual repetido cada semana — es una arquitectura que, una vez instalada, sigue funcionando paso a paso con el tiempo." 
    },
    { 
      id: 3, 
      timeframe: "SEMANA 3", 
      title: "Arranca la Ejecución", 
      heading: "Arranca la Ejecución.", 
      desc: "Arranca la ejecución: outbound saliendo a buscar tomadores de decisión, inbound generando atención con contenido, y todo el sistema trabajando en conjunto para atraer, nutrir y convertir." 
    },
    { 
      id: 4, 
      timeframe: "SEMANA 2-3", 
      title: "Secuencias de Cierre", 
      heading: "Seguimiento y manejo de objeciones.", 
      desc: "Aplicamos secuencias estructuradas para presentar tu solución en detalle, responder dudas comunes y empujar al prospecto a agendar la reunión." 
    },
    { 
      id: 5, 
      timeframe: "SEMANA 3", 
      title: "Trackeo y Mejora", 
      heading: "Medimos, ajustamos y escalamos.", 
      desc: "Monitoreamos las tasas de apertura y respuesta. Optimizamos cada etapa del embudo hasta lograr un flujo estable de 3 a 10 llamadas agendadas por semana." 
    }
  ];

  return (
    <section id="proceso" className="w-[1300px] mx-auto px-6 lg:px-24 py-24 flex flex-col relative z-10 border-t border-dashed border-white/10">
      {/* Header */}
      <div className="flex items-center gap-6 mb-16">
        <span className="text-[11px] font-mono tracking-[0.25em] text-[#869ab5] uppercase font-bold whitespace-nowrap">
          El Proceso
        </span>
        <div className="flex-1 h-px border-b border-dashed border-white/10" />
      </div>

      <div className="mb-16 flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6">
        <div>
          <h2 className="text-[40px] md:text-[48px] font-serif font-medium leading-[1.1] tracking-tight text-[#f4f4f2] mb-6">
            Tu sistema completo, listo, <br /><span className="italic text-[#93a7c6] font-normal">y corriendo en la 2da semana!</span>
          </h2>
          <p className="text-gray-400 text-[17.5px] leading-[1.6] max-w-[640px] font-['Space_Grotesk'] font-normal not-italic">
            Un plan de despliegue interactivo en 5 fases. Navega por las etapas para ver cómo pasamos de definir la oferta a generar llamadas constantes.
          </p>
        </div>
        <div className="text-[10px] font-mono tracking-widest text-[#869ab5] uppercase mb-2 bg-[#121316] px-4 py-2 border border-white/5 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.02)]">
          META: 3-10 LLAMADAS/SEMANA
        </div>
      </div>

      {/* Interactive Horizontal Timeline */}
      <div className="relative mb-20 mt-10 max-w-[1000px] mx-auto w-full hidden md:block">
        <div className="absolute top-[22px] left-0 right-0 h-px bg-white/10" />
        <div 
          className="absolute top-[22px] left-0 h-px bg-[#93a7c6] transition-all duration-700 ease-in-out" 
          style={{ width: `${(activePhase / (phases.length - 1)) * 100}%` }}
        />
        
        <div className="relative flex justify-between">
          {phases.map((phase, idx) => {
            const isActive = idx === activePhase;
            const isPassed = idx < activePhase;
            return (
              <div 
                key={phase.id} 
                className="flex flex-col items-center cursor-pointer group w-32"
                onClick={() => setActivePhase(idx)}
              >
                <div className={`text-[10px] font-mono tracking-widest mb-4 transition-colors duration-300 h-4 ${isActive ? 'text-[#f4f4f2] font-bold' : isPassed ? 'text-gray-400' : 'text-gray-600 group-hover:text-gray-400'}`}>
                  {phase.timeframe}
                </div>
                
                {/* Timeline Dot */}
                <div className={`w-[14px] h-[14px] rounded-full relative z-10 transition-all duration-500 flex items-center justify-center ${isActive ? 'bg-[#93a7c6] scale-125 shadow-[0_0_15px_rgba(147,167,198,0.5)]' : isPassed ? 'bg-[#93a7c6]' : 'bg-[#121316] border border-white/20 group-hover:border-white/50'}`}>
                  {isActive && <div className="absolute inset-0 rounded-full border border-[#93a7c6] animate-ping opacity-30" style={{ animationDuration: '2s' }} />}
                </div>

                <div className={`mt-5 text-[13px] font-serif transition-colors duration-300 text-center leading-tight ${isActive ? 'text-[#f4f4f2]' : isPassed ? 'text-gray-400' : 'text-gray-600 group-hover:text-gray-400'}`}>
                  {phase.title}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Active Phase Content */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-16 items-center">
        {/* Left: Content */}
        <div className="flex flex-col relative pl-4 lg:pl-10 border-l border-dashed border-[#93a7c6]/30">
          <div className="text-[10px] font-mono tracking-widest text-[#869ab5] uppercase mb-4">
            FASE 0{activePhase + 1}
          </div>
          <h3 className="text-[32px] lg:text-[40px] font-serif font-medium text-[#f4f4f2] leading-[1.1] mb-6 min-h-[88px] flex items-center">
            {phases[activePhase].heading}
          </h3>
          <p className="text-gray-400 text-[16px] leading-[1.7] font-['Space_Grotesk'] font-normal not-italic min-h-[110px]">
            {phases[activePhase].desc}
          </p>
          
          {/* Mobile navigation fallback */}
          <div className="flex gap-4 mt-8 md:hidden">
            <button 
              onClick={() => setActivePhase(Math.max(0, activePhase - 1))}
              disabled={activePhase === 0}
              className="px-4 py-2 bg-white/5 rounded border border-white/10 disabled:opacity-30"
            >
              Anterior
            </button>
            <button 
              onClick={() => setActivePhase(Math.min(phases.length - 1, activePhase + 1))}
              disabled={activePhase === phases.length - 1}
              className="px-4 py-2 bg-white/5 rounded border border-white/10 disabled:opacity-30"
            >
              Siguiente
            </button>
          </div>
        </div>

        {/* Right: Visual Container */}
        <div className="bg-[#161920]/40 border border-white/5 rounded-2xl p-8 lg:p-12 flex flex-col relative min-h-[460px] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.03] to-transparent pointer-events-none" />
          
          <div className="flex justify-between items-center text-[9px] font-mono tracking-widest text-gray-500 uppercase mb-10 relative z-10 border-b border-white/5 pb-4">
             <span>{phases[activePhase].title}</span>
             <span>Ejecución</span>
          </div>

          <div className="flex-1 relative z-10 flex items-center justify-center">
             <DeploymentVisual phase={activePhase} />
          </div>
          
          {/* Faint background number */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[300px] font-serif font-medium text-white/[0.015] pointer-events-none z-0">
            0{activePhase + 1}
          </div>
        </div>
      </div>
    </section>
  );
}

function DeploymentVisual({ phase }: { phase: number }) {
  const fadeClass = "animate-in fade-in zoom-in-95 duration-500 flex flex-col w-full h-full justify-center items-center gap-4 relative z-10";

  if (phase === 0) {
    return (
      <div key="p0" className={fadeClass}>
        <div className="w-full max-w-[340px] bg-[#161920] border border-white/10 rounded-xl p-6 shadow-2xl relative z-10 group">
          {/* Badge */}
          <div className="absolute -top-3 -right-3 bg-[#93a7c6] text-[#0a0a0a] text-[11px] font-bold px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(147,167,198,0.3)]">
            Re-estructuración
          </div>
          
          {/* Header of wireframe: Profile */}
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/5">
             <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative">
               <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#93a7c6] rounded-full flex items-center justify-center border-2 border-[#161920]">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
               </div>
             </div>
             <div className="flex-1">
                <div className="h-2.5 w-1/2 bg-[#f4f4f2]/80 rounded mb-2" />
                <div className="h-2 w-3/4 bg-white/20 rounded" />
             </div>
          </div>
          
          {/* Body of wireframe: Offer / Landing text */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-[10px] font-mono text-[#869ab5] uppercase tracking-widest">Oferta Optimizada</div>
              <div className="h-4 w-4 rounded-sm bg-white/5 flex items-center justify-center">
                 <div className="w-1.5 h-1.5 rounded-full bg-[#93a7c6]/50 animate-pulse" />
              </div>
            </div>
            <div className="h-2 w-full bg-white/10 rounded" />
            <div className="h-2 w-full bg-white/10 rounded" />
            <div className="h-2 w-5/6 bg-white/10 rounded" />
            <div className="h-2 w-4/6 bg-white/10 rounded" />
          </div>

          {/* CTA Button placeholder */}
          <div className="h-9 w-full bg-[#93a7c6]/10 border border-[#93a7c6]/30 rounded flex items-center justify-center transition-colors group-hover:bg-[#93a7c6]/20">
             <div className="h-1.5 w-1/4 bg-[#93a7c6]/60 rounded" />
          </div>
          
          {/* Edit icon floating */}
          <div className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#121316] border border-white/10 rounded-xl flex items-center justify-center shadow-xl rotate-[-12deg] group-hover:rotate-[-5deg] transition-transform duration-300">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#93a7c6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
          </div>
        </div>
      </div>
    );
  }
  
  if (phase === 1) {
    return (
      <div key="p1" className={fadeClass}>
        <div className="w-full max-w-[340px] bg-[#161920] border border-white/10 rounded-xl p-6 shadow-2xl relative z-10 group">
          {/* Badge */}
          <div className="absolute -top-3 -right-3 bg-[#f4f4f2] text-[#0a0a0a] text-[11px] font-bold px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(244,244,242,0.3)] flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Sistema Activo
          </div>
          
          {/* Top Navbar / Dashboard Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#93a7c6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
              <div className="text-[10px] font-mono tracking-widest text-[#869ab5] uppercase">Command Center</div>
            </div>
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            </div>
          </div>
          
          {/* Dashboard Grid */}
          <div className="grid grid-cols-2 gap-3 mb-3">
             {/* Metric 1 */}
             <div className="bg-white/5 border border-white/5 rounded-lg p-3">
                <div className="h-1.5 w-1/2 bg-white/20 rounded mb-3" />
                <div className="flex items-end gap-1 h-6">
                   <div className="w-1/4 bg-[#93a7c6]/40 h-[40%] rounded-sm" />
                   <div className="w-1/4 bg-[#93a7c6]/60 h-[70%] rounded-sm" />
                   <div className="w-1/4 bg-[#93a7c6]/80 h-[50%] rounded-sm" />
                   <div className="w-1/4 bg-[#93a7c6] h-[100%] rounded-sm transition-all duration-1000 group-hover:h-[80%]" />
                </div>
             </div>
             {/* Metric 2 */}
             <div className="bg-white/5 border border-white/5 rounded-lg p-3 flex flex-col justify-between">
                <div className="h-1.5 w-1/2 bg-white/20 rounded mb-2" />
                <div>
                   <div className="text-[16px] font-mono text-[#f4f4f2] leading-none mb-1.5">100%</div>
                   <div className="h-1 w-full bg-white/10 rounded overflow-hidden">
                      <div className="h-full w-full bg-green-500/50" />
                   </div>
                </div>
             </div>
          </div>
          
          {/* List/SOPs */}
          <div className="bg-white/5 border border-white/5 rounded-lg p-3 space-y-2.5">
             <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded bg-[#93a7c6]/20 flex items-center justify-center">
                   <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#93a7c6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <div className="h-1.5 w-3/4 bg-white/20 rounded" />
             </div>
             <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded bg-[#93a7c6]/20 flex items-center justify-center">
                   <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#93a7c6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <div className="h-1.5 w-1/2 bg-white/20 rounded" />
             </div>
             <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded bg-[#93a7c6]/20 flex items-center justify-center">
                   <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#93a7c6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <div className="h-1.5 w-2/3 bg-white/20 rounded" />
             </div>
          </div>
          
          {/* Floating settings gear */}
          <div className="absolute -left-5 top-2/3 -translate-y-1/2 w-10 h-10 bg-[#121316] border border-white/10 rounded-xl flex items-center justify-center shadow-xl group-hover:rotate-180 transition-transform duration-1000">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#93a7c6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 2) {
    return (
      <div key="p2" className={fadeClass}>
        <div className="relative w-[300px] h-[200px]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#93a7c6] rounded-full flex items-center justify-center text-[#121620] shadow-[0_0_20px_#93a7c6]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 2L11 13"></path><path d="M22 2l-7 20-4-9-9-4 20-7z"></path></svg>
          </div>
          
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 200">
            <path d="M150 50 Q 80 120 40 180" fill="none" stroke="#93a7c6" strokeWidth="2" strokeDasharray="4 4" className="opacity-50" />
            <path d="M150 50 Q 150 120 150 180" fill="none" stroke="#93a7c6" strokeWidth="2" strokeDasharray="4 4" className="opacity-50" />
            <path d="M150 50 Q 220 120 260 180" fill="none" stroke="#93a7c6" strokeWidth="2" strokeDasharray="4 4" className="opacity-50" />
          </svg>
          
          <div className="absolute bottom-0 left-[40px] -translate-x-1/2 bg-[#1a202c] border border-white/10 px-4 py-2 rounded text-[11px] text-[#f4f4f2]">Outbound</div>
          <div className="absolute bottom-0 left-[150px] -translate-x-1/2 bg-[#1a202c] border border-white/10 px-4 py-2 rounded text-[11px] text-[#f4f4f2]">Inbound</div>
          <div className="absolute bottom-0 left-[260px] -translate-x-1/2 bg-[#1a202c] border border-white/10 px-4 py-2 rounded text-[11px] text-[#f4f4f2]">Social</div>
        </div>
      </div>
    );
  }

  if (phase === 3) {
    return (
      <div key="p3" className={fadeClass}>
        <div className="flex flex-col gap-3 w-full max-w-[300px]">
          <div className="bg-[#1a202c] border border-white/10 rounded-lg p-4 opacity-50 ml-8">
            <div className="text-[10px] text-[#93a7c6] mb-1">Día 1</div>
            <div className="h-2 w-3/4 bg-white/20 rounded" />
          </div>
          <div className="bg-[#1a202c] border border-white/10 rounded-lg p-4 opacity-70 ml-4 relative">
            <div className="absolute top-1/2 -left-4 w-4 h-px bg-white/20" />
            <div className="text-[10px] text-[#93a7c6] mb-1">Día 4</div>
            <div className="h-2 w-full bg-white/20 rounded" />
          </div>
          <div className="bg-[#93a7c6]/10 border border-[#93a7c6]/50 rounded-lg p-4 shadow-[0_0_20px_rgba(147,167,198,0.2)] relative">
            <div className="absolute top-1/2 -left-8 w-8 h-px bg-[#93a7c6]/50" />
            <div className="text-[10px] text-[#93a7c6] font-bold mb-1">Día 7 - Cierre</div>
            <div className="h-2 w-5/6 bg-[#93a7c6]/70 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (phase === 4) {
    return (
      <div key="p4" className={fadeClass}>
        <div className="w-full max-w-[320px] bg-[#1a202c] border border-white/5 rounded-xl p-6 shadow-2xl flex flex-col items-center">
          <div className="text-[48px] font-serif font-medium text-[#f4f4f2] mb-2 leading-none flex items-start">
            <span className="text-[24px] text-[#93a7c6] mt-2 mr-1">+</span>
            <span>7</span>
          </div>
          <div className="text-[12px] font-mono text-gray-400 uppercase tracking-widest mb-8">Llamadas agendadas</div>
          
          <div className="w-full flex justify-between items-end h-[60px] gap-2 border-b border-white/10 pb-2">
            {[30, 45, 25, 60, 40, 80, 100].map((h, i) => (
              <div key={i} className={`w-full rounded-t-sm transition-all ${i === 6 ? 'bg-[#93a7c6] shadow-[0_0_10px_#93a7c6]' : 'bg-white/10'}`} style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

function YoutubeSection() {
  const videos = [
    {
      title: "Generate More Leads Than 99% Using Cold Email",
      desc: "The playbook separating top performers from everyone else.",
      thumb: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "21 Cold Email Hacks To Book More Sales Calls INSTANTLY",
      desc: "Rapid-fire tactics to lift reply rates and book more meetings.",
      thumb: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "How to Find Clients Who ACTUALLY Need Your Service",
      desc: "The targeting framework behind every high-converting go-to-market campaign we run.",
      thumb: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "I tried sending 10,000 emails a day for 30 days (LIVE)",
      desc: "What actually happens when you push volume to the limit.",
      thumb: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop"
    }
  ];

  return (
    <section id="playbooks" className="w-[1300px] mx-auto px-6 lg:px-24 pt-24 pb-32 flex flex-col relative z-10 border-t border-dashed border-white/10 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-6 mb-16">
        <span className="text-[11px] font-mono tracking-[0.25em] text-[#869ab5] uppercase font-bold whitespace-nowrap">
          Playbooks
        </span>
        <div className="flex-1 h-px border-b border-dashed border-white/10" />
      </div>

      <h2 className="text-[40px] md:text-[48px] font-serif font-medium leading-[1.1] tracking-tight text-[#f4f4f2] mb-16">
        Quieres saber mas sobre<br className="hidden md:block" />
         <span className="italic text-[#93a7c6] font-normal">estos sistemas de captacion?</span>
      </h2>

      <div className="flex justify-between items-center pb-4 border-b border-dashed border-white/10 mb-8">
        <span className="text-[10px] font-mono tracking-widest text-[#869ab5] uppercase">Videos</span>
        <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">Auto-Scroll / Hover to Pause</span>
      </div>

      <div className="relative w-full overflow-hidden group">
        {/* Left/Right Edge Masks for smooth fading */}
        <div className="absolute top-0 bottom-0 left-0 w-8 lg:w-16 bg-gradient-to-r from-[#121316] to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-8 lg:w-16 bg-gradient-to-l from-[#121316] to-transparent z-20 pointer-events-none" />

        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          <div className="flex gap-6 pr-6">
            {videos.map((video, idx) => (
              <VideoCard key={`1-${idx}`} {...video} />
            ))}
          </div>
          <div className="flex gap-6 pr-6">
            {videos.map((video, idx) => (
              <VideoCard key={`2-${idx}`} {...video} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function VideoCard({ title, desc, thumb }: { title: string, desc: string, thumb: string }) {
  return (
    <div className="w-[340px] flex flex-col bg-[#161920]/60 border border-white/5 rounded-xl overflow-hidden shrink-0 hover:border-white/10 transition-colors">
      <div className="relative h-[190px] w-full overflow-hidden group/thumb cursor-pointer">
        <img src={thumb} alt={title} className="w-full h-full object-cover opacity-80 group-hover/thumb:scale-105 group-hover/thumb:opacity-100 transition-all duration-700" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-10 bg-black/70 rounded-[8px] flex items-center justify-center backdrop-blur-sm border border-white/10 group-hover/thumb:bg-red-600 group-hover/thumb:border-red-500 transition-colors duration-300">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
              <path d="M5 3l14 9-14 9V3z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h4 className="text-[17px] font-serif font-medium text-[#f4f4f2] leading-[1.3] mb-3 line-clamp-2">{title}</h4>
        <p className="text-[13px] text-gray-400 font-['Space_Grotesk'] leading-[1.6] mb-6 flex-1 line-clamp-3">{desc}</p>
        <div className="pt-4 border-t border-dashed border-white/10">
          <a href="#" className="text-[10px] font-mono tracking-widest text-[#869ab5] uppercase flex items-center gap-1.5 hover:text-[#f4f4f2] transition-colors group/link">
            Watch on Youtube 
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover/link:opacity-100 group-hover/link:-translate-y-[1px] group-hover/link:translate-x-[1px] transition-all">
              <path d="M5 19L19 5M19 5v10M19 5H9" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

function AuditSection() {
  return (
    <section id="agenda" className="w-[1300px] mx-auto px-6 lg:px-24 pt-24 pb-32 flex flex-col relative z-10 border-t border-dashed border-white/10">
      {/* Header text block */}
      <div className="mb-12 max-w-[600px]">
        <div className="text-[10px] font-mono tracking-[0.25em] text-[#869ab5] uppercase font-bold mb-6">
          CHARLEMOS DE ESTRATEGIAS Y ESCALAR
        </div>
        <h2 className="text-[40px] md:text-[48px] font-serif font-medium leading-[1.1] tracking-tight text-[#f4f4f2] mb-6">
          Aplica y reserva tu<br /><span className="italic text-[#93a7c6] font-normal">Auditoria de Captación</span>
        </h2>
        <p className="text-gray-400 text-[17px] leading-[1.6] font-['Space_Grotesk'] font-normal not-italic">
        30 minutos. Analizamos tu situación actual, identificamos los puntos débiles y te muestro exactamente cómo se vería este sistema aplicado a tu negocio.        </p>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <span className="text-[9px] font-mono tracking-widest text-gray-500 uppercase">30 MIN</span>
        <div className="w-4 h-[1px] bg-[#869ab5]/30" />
        <span className="text-[9px] font-mono tracking-widest text-gray-500 uppercase">VIDEO CALL</span>
      </div>

      {/* Typeform Embed Container */}
      <div className="relative w-full max-w-[1100px] h-[550px] bg-[#161920]/40 rounded-sm border border-white/5 flex flex-col p-[2px]">
        {/* Corner Brackets */}
        <div className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t border-l border-[#869ab5]" />
        <div className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t border-r border-[#869ab5]" />
        <div className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b border-l border-[#869ab5]" />
        <div className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b border-r border-[#869ab5]" />

        {/* Inner Border Container */}
        <div className="flex-1 w-full h-full border border-white/10 rounded-sm flex flex-col relative overflow-hidden bg-[#121316]">
          
          {/* Mockup Typeform UI */}
          <div className="flex-1 flex flex-col items-start justify-center p-8 lg:p-24 relative z-10 w-full h-full">
            <div className="flex items-center gap-3 mb-10 w-full">
              <span className="text-[12px] font-bold bg-white text-black w-5 h-5 rounded-[3px] flex items-center justify-center shrink-0">1</span>
              <h3 className="text-[#f4f4f2] text-[22px] md:text-[26px] font-medium tracking-wide">What is your full name?<span className="text-white/60 ml-1">*</span></h3>
            </div>
            
            <div className="w-full max-w-[650px] mb-4">
              <input 
                type="text" 
                placeholder="Type your answer here..." 
                className="w-full bg-transparent border-b border-white text-[24px] md:text-[32px] text-[#f4f4f2] placeholder:text-gray-600/80 focus:outline-none pb-3 transition-colors focus:border-white/80" 
              />
            </div>
            
            <div className="bg-[#59261a] border border-[#ff6b4a]/20 text-[#ffd4c4] text-[13px] px-4 py-2.5 rounded-[4px] flex items-center gap-2.5 mt-6 font-medium shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-[#ff6b4a]">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              Please fill in What is your full name?
            </div>
          </div>

          {/* Typeform Footer Mock */}
          <div className="absolute bottom-6 right-6 flex items-center gap-2 z-20">
            <div className="flex items-center rounded overflow-hidden">
              <button className="bg-white/20 hover:bg-white/30 text-[#f4f4f2] w-9 h-9 flex items-center justify-center transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="18 15 12 9 6 15" />
                </svg>
              </button>
              <button className="bg-white hover:bg-gray-200 text-black w-9 h-9 flex items-center justify-center transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </div>
            <div className="bg-white hover:bg-gray-100 text-black px-3 h-9 rounded flex items-center gap-1.5 text-[11px] font-bold tracking-tight cursor-pointer transition-colors">
              Powered by 
              <span className="flex items-center gap-[2px] ml-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="black">
                  <rect x="2" y="6" width="7" height="12" rx="1.5" />
                  <rect x="11" y="6" width="11" height="12" rx="1.5" />
                </svg>
                Typeform
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function FooterSection({ onNavigate }: { onNavigate?: (id: string) => void }) {
  return (
    <footer className="w-[1300px] mx-auto pt-24 pb-8 flex flex-col relative z-10 border-t border-dashed border-white/10 mt-12">
      <div className="flex flex-col md:flex-row justify-between items-start gap-16 px-6 lg:px-24 mb-24">
        {/* Left Col */}
        <div className="max-w-[320px]">
           <div className="flex items-center gap-3 font-sans font-medium text-[18px] text-[#f4f4f2] tracking-tight mb-6">
             <img src="/lap-logo.png" alt="Linked Acquisition Partner" className="h-8 object-contain" />
             <span>Linked Acquisition Partner</span>
           </div>
           <p className="text-[11.5px] font-mono leading-[1.8] text-gray-400">
             A B2B growth partner. We build<br/>
             and run the complete system<br/>
             that turns cold outreach into<br/>
             qualified pipeline, then hand<br/>
             you the keys.
           </p>
        </div>

        {/* Right Cols */}
        <div className="flex gap-20">
           <div className="flex flex-col gap-4">
              <span className="text-[10px] font-mono tracking-[0.2em] text-gray-500 uppercase font-bold mb-2">Company</span>
              <button onClick={() => onNavigate?.('proceso')} className="text-left text-[13.5px] text-gray-300 font-medium font-['Space_Grotesk'] hover:text-[#f4f4f2] transition-colors cursor-pointer">Process</button>
              <button onClick={() => onNavigate?.('solucion')} className="text-left text-[13.5px] text-gray-300 font-medium font-['Space_Grotesk'] hover:text-[#f4f4f2] transition-colors cursor-pointer">Results</button>
              <a href="#" className="text-[13.5px] text-gray-300 font-medium font-['Space_Grotesk'] hover:text-[#f4f4f2] transition-colors">ROI calculator</a>
              <button onClick={() => onNavigate?.('solucion')} className="text-left text-[13.5px] text-gray-300 font-medium font-['Space_Grotesk'] hover:text-[#f4f4f2] transition-colors cursor-pointer">Services</button>
              <button onClick={() => onNavigate?.('playbooks')} className="text-left text-[13.5px] text-gray-300 font-medium font-['Space_Grotesk'] hover:text-[#f4f4f2] transition-colors cursor-pointer">Blog</button>
              <a href="#" className="text-[13.5px] text-gray-300 font-medium font-['Space_Grotesk'] hover:text-[#f4f4f2] transition-colors">Careers</a>
           </div>
           <div className="flex flex-col gap-4">
              <span className="text-[10px] font-mono tracking-[0.2em] text-gray-500 uppercase font-bold mb-2">Connect</span>
              <button onClick={() => onNavigate?.('agenda')} className="text-left text-[13.5px] text-gray-300 font-medium font-['Space_Grotesk'] hover:text-[#f4f4f2] transition-colors cursor-pointer">Book a call</button>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[13.5px] text-gray-300 font-medium font-['Space_Grotesk'] hover:text-[#f4f4f2] transition-colors">LinkedIn</a>
           </div>
        </div>
      </div>

      <div className="border-t border-dashed border-white/10 pt-8 px-6 lg:px-24 flex items-center justify-between">
         <span className="text-[11px] font-mono text-gray-500">© 2026 Linked Acquisition Partner</span>
      </div>
    </footer>
  );
}
