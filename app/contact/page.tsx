"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSubmitted(false);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "9a8b27ed-843e-46b8-8663-508a000017fa", // ⭐ Reemplaza con tu key real
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitted(false), 6000);
      } else {
        setError(result.message || "Error al enviar. Por favor intenta de nuevo.");
      }
    } catch (err) {
      setError("Error de conexión. Verifica tu internet e intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-background px-4 py-24">
      <div className="w-full mx-auto flex flex-col md:flex-row max-md:items-center justify-center gap-12 md:gap-16">
        {/* Columna izquierda: texto + iconos */}
        <div className="flex flex-col mt-10">
          <p className="text-[11px] max-md:text-center font-extrabold uppercase tracking-wider text-blue-400 mb-2">
            Get In Touch
          </p>

          <h1 className="text-5xl/14 max-md:text-center font-bold text-foreground max-w-2xs mb-4">
            Let's build something real.
          </h1>
          <p className="text-base/5.5 text-muted max-md:text-center max-w-2xs">
            Let's turn your ideas into meaningful products that solve real problems and create real impact.
          </p>

          {/* Iconos sociales */}
          <div className="flex items-center max-md:justify-center gap-4 mt-7 text-muted">
            {/* YouTube */}
            <a
              href="https://youtube.com/@rikitechhd"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="transition-colors hover:text-foreground"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="transition-colors hover:text-foreground"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            {/* TikTok */}
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="transition-colors hover:text-foreground"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </a>

            {/* X (Twitter) */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="transition-colors hover:text-foreground"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Columna derecha: formulario */}
        <div className="w-full max-w-sm border border-border bg-muted-bg rounded-2xl p-8">
          <h2 className="text-base font-medium text-foreground mb-5.5">
            Send Message
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Mensaje de éxito */}
            {submitted && (
              <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-3 text-xs text-emerald-500">
                ✅ ¡Mensaje enviado correctamente! Te responderemos pronto.
              </div>
            )}

            {/* Mensaje de error */}
            {error && (
              <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-500">
                ❌ {error}
              </div>
            )}

            {/* Nombre */}
            <div className="flex flex-col gap-2.5">
              <label htmlFor="name" className="text-xs text-muted">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted/60 outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2.5">
              <label htmlFor="email" className="text-xs text-muted">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted/60 outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Mensaje */}
            <div className="flex flex-col gap-2.5">
              <label htmlFor="message" className="text-xs text-muted">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message.."
                className="bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted/60 outline-none focus:border-blue-500 transition-colors resize-none"
              />
            </div>

            {/* Campo honeypot anti-spam (oculto) */}
            <input
              type="checkbox"
              name="botcheck"
              className="hidden"
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="off"
            />

            {/* Botón */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-500 text-white text-base py-3 rounded-lg transition-colors cursor-pointer mt-1 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}