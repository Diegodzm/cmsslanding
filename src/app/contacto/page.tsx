import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactoPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="space-y-6">
        <div>
          <h1 className="site-heading text-4xl font-bold">Contacto</h1>
          <p className="site-copy mt-2">Envíanos un mensaje y te responderemos a la brevedad.</p>
        </div>

        <form className="site-surface space-y-4 rounded-3xl border p-6 shadow-sm">
          <div className="space-y-2">
            <label className="site-copy text-sm font-medium">Nombre</label>
            <Input placeholder="Tu nombre" className="site-input" />
          </div>
          <div className="space-y-2">
            <label className="site-copy text-sm font-medium">Correo Electrónico</label>
            <Input type="email" placeholder="correo@ejemplo.com" className="site-input" />
          </div>
          <div className="space-y-2">
            <label className="site-copy text-sm font-medium">Mensaje</label>
            <Textarea placeholder="¿En qué te podemos ayudar?" className="site-input min-h-[120px]" />
          </div>
          <Button type="button" className="site-button w-full rounded-full">
            Enviar Mensaje
          </Button>
        </form>
      </div>
    </div>
  );
}