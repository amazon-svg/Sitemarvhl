import { useState } from "react";
import { useForm } from "react-hook-form";
import { Send, CheckCircle2, AlertCircle, Phone, CalendarCheck } from "lucide-react";
import { projectId, publicAnonKey } from "/utils/supabase/info";

interface FormData {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  societe?: string;
  objet: string;
  message: string;
  rappel: boolean;
  creneau?: string;
}

interface ContactFormProps {
  defaultLot?: string;
  defaultRef?: string;
}

export function ContactForm({ defaultLot, defaultRef }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      objet: defaultLot ? `Demande d'information – ${defaultLot} (${defaultRef})` : "",
      rappel: false,
    },
  });

  const wantsRappel = watch("rappel");

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      const res = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-e7a4acaf/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error("Erreur lors de l'envoi du formulaire:", err);
        setStatus("error");
        return;
      }

      setStatus("success");
      reset();
    } catch (e) {
      console.error("Erreur réseau lors de l'envoi du formulaire:", e);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 text-center">
        <CheckCircle2 size={40} className="text-emerald-500 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-emerald-800 mb-2">Message envoyé !</h3>
        <p className="text-emerald-700 text-sm leading-relaxed">
          Merci pour votre message. Notre équipe vous contactera dans les plus brefs délais.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-5 text-sm font-semibold text-emerald-700 hover:text-emerald-900 underline"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Nom / Prénom */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="prenom" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Prénom <span className="text-red-500">*</span>
          </label>
          <input
            id="prenom"
            type="text"
            autoComplete="given-name"
            className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors focus:ring-2 focus:ring-[#0F2D52]/20 placeholder:text-gray-300 ${
              errors.prenom ? "border-red-400 focus:border-red-400" : "border-gray-300 focus:border-[#0F2D52]"
            }`}
            placeholder="Jean"
            {...register("prenom", { required: "Le prénom est requis" })}
          />
          {errors.prenom && (
            <p className="text-red-500 text-xs mt-1">{errors.prenom.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="nom" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Nom <span className="text-red-500">*</span>
          </label>
          <input
            id="nom"
            type="text"
            autoComplete="family-name"
            className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors focus:ring-2 focus:ring-[#0F2D52]/20 placeholder:text-gray-300 ${
              errors.nom ? "border-red-400 focus:border-red-400" : "border-gray-300 focus:border-[#0F2D52]"
            }`}
            placeholder="Dupont"
            {...register("nom", { required: "Le nom est requis" })}
          />
          {errors.nom && (
            <p className="text-red-500 text-xs mt-1">{errors.nom.message}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors focus:ring-2 focus:ring-[#0F2D52]/20 placeholder:text-gray-300 ${
            errors.email ? "border-red-400 focus:border-red-400" : "border-gray-300 focus:border-[#0F2D52]"
          }`}
          placeholder="jean.dupont@entreprise.fr"
          {...register("email", {
            required: "L'email est requis",
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Email invalide" },
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Téléphone + Société */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="telephone" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Téléphone <span className="text-red-500">*</span>
          </label>
          <input
            id="telephone"
            type="tel"
            autoComplete="tel"
            className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors focus:ring-2 focus:ring-[#0F2D52]/20 placeholder:text-gray-300 ${
              errors.telephone ? "border-red-400 focus:border-red-400" : "border-gray-300 focus:border-[#0F2D52]"
            }`}
            placeholder="06 12 34 56 78"
            {...register("telephone", { required: "Le téléphone est requis" })}
          />
          {errors.telephone && (
            <p className="text-red-500 text-xs mt-1">{errors.telephone.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="societe" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Société
          </label>
          <input
            id="societe"
            type="text"
            autoComplete="organization"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-[#0F2D52] focus:ring-2 focus:ring-[#0F2D52]/20 placeholder:text-gray-300"
            placeholder="Mon Entreprise SAS"
            {...register("societe")}
          />
        </div>
      </div>

      {/* Objet */}
      <div>
        <label htmlFor="objet" className="block text-sm font-semibold text-gray-700 mb-1.5">
          Objet <span className="text-red-500">*</span>
        </label>
        <input
          id="objet"
          type="text"
          className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors focus:ring-2 focus:ring-[#0F2D52]/20 placeholder:text-gray-300 ${
            errors.objet ? "border-red-400 focus:border-red-400" : "border-gray-300 focus:border-[#0F2D52]"
          }`}
          placeholder="Demande d'information"
          {...register("objet", { required: "L'objet est requis" })}
        />
        {errors.objet && (
          <p className="text-red-500 text-xs mt-1">{errors.objet.message}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1.5">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          rows={4}
          className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors resize-none focus:ring-2 focus:ring-[#0F2D52]/20 placeholder:text-gray-300 ${
            errors.message ? "border-red-400 focus:border-red-400" : "border-gray-300 focus:border-[#0F2D52]"
          }`}
          placeholder="Décrivez votre projet, vos besoins en surface, le nombre de collaborateurs..."
          {...register("message", { required: "Le message est requis", minLength: { value: 10, message: "Message trop court" } })}
        />
        {errors.message && (
          <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
        )}
      </div>

      {/* Rappel pour visite */}
      <div className="bg-[#0F2D52]/4 border border-[#0F2D52]/15 rounded-xl p-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="mt-0.5 w-4 h-4 accent-[#0F2D52] shrink-0"
            {...register("rappel")}
          />
          <div>
            <span className="font-semibold text-[#0F2D52] text-sm flex items-center gap-1.5">
              <Phone size={14} className="text-[#C9A84C]" />
              Je souhaite être rappelé(e) pour organiser une visite
            </span>
            <p className="text-gray-500 text-xs mt-1">
              Un conseiller MARVHL vous rappellera pour convenir d'un rendez-vous de visite sur site.
            </p>
          </div>
        </label>

        {wantsRappel && (
          <div className="mt-4 pt-4 border-t border-[#0F2D52]/10">
            <label htmlFor="creneau" className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
              <CalendarCheck size={14} className="text-[#C9A84C]" />
              Créneau préféré pour la visite
            </label>
            <input
              id="creneau"
              type="text"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#0F2D52] focus:ring-2 focus:ring-[#0F2D52]/20 transition-colors placeholder:text-gray-300"
              placeholder="Ex : Mardi ou jeudi matin, semaine du 24 mars"
              {...register("creneau")}
            />
          </div>
        )}
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm">
          <AlertCircle size={16} className="shrink-0" />
          Une erreur est survenue. Veuillez réessayer ou nous contacter par téléphone.
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="flex items-center justify-center gap-2 w-full bg-[#C9A84C] hover:bg-[#b8963e] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-6 py-3.5 rounded-lg text-sm transition-colors"
      >
        {status === "loading" ? (
          <>
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Envoi en cours...
          </>
        ) : (
          <>
            <Send size={16} />
            Envoyer le message
          </>
        )}
      </button>

      <p className="text-xs text-gray-400 text-center">
        En soumettant ce formulaire, vous acceptez d'être contacté par MARVHL au sujet de votre demande.
      </p>
    </form>
  );
}