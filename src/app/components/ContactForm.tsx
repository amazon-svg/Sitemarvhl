const onSubmit = async (data: FormData) => {
  setStatus("loading");
  try {
    const formData = new URLSearchParams();
    formData.append("form-name", "contact");
    formData.append("prenom", data.prenom);
    formData.append("nom", data.nom);
    formData.append("email", data.email);
    formData.append("telephone", data.telephone);
    formData.append("societe", data.societe || "");
    formData.append("objet", data.objet);
    formData.append("message", data.message);
    formData.append("rappel", data.rappel ? "oui" : "non");
    formData.append("creneau", data.creneau || "");

    const res = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
    });

    if (!res.ok) {
      setStatus("error");
      return;
    }

    setStatus("success");
    reset();
  } catch (e) {
    console.error("Erreur réseau:", e);
    setStatus("error");
  }
};
