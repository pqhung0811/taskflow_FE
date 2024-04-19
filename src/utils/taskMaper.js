export const mapData = (tasks, chef) => {
  const cards = tasks.map(
    ({
      id,
      debut,
      deadLine,
      etat,
      projet,
      responsable,
      titre,
      avancement,
      commentaires,
    }) => {
      return {
        id: `${id}`,
        title: titre,
        description: chef
          ? `assigned to : ${responsable.nom.toUpperCase()}`
          : `project : ${projet.nom}`,
        label: `${deadLine.substring(0, 10)}`,
        draggable: true,
        debut,
        projet,
        avancement,
        commentaires,
        etat,
      };
    }
  );

  const enAttente = cards.filter((card) => card.etat == "En_ATTENTE");
  const enCours = cards.filter((card) => card.etat == "EN_COURS");
  const attenteValidation = cards.filter(
    (card) => card.etat == "ATTENTE_VALIDATION"
  );
  const validee = cards.filter((card) => card.etat == "VALIDEE");

  const taskData = {
    lanes: [
      {
        id: "1",
        title: "On hold",
        label: `${enAttente.length} tasks`,
        cards: enAttente,
        style: { backgroundColor: "#d1d8e0" }, // Style of Lane
        //cardStyle: { backgroundColor: 'blue' }
        disallowAddingCard: true,
      },
      {
        id: "2",
        title: "In progress",
        label: `${enCours.length} tasks`,
        cards: enCours,
        disallowAddingCard: true,
        style: { backgroundColor: "#74b9ff" },

        //cardStyle: { backgroundColor: 'blue' }
      },
      {
        id: "3",
        title: "waiting for validation",
        label: `${attenteValidation.length} tasks`,
        cards: attenteValidation,
        style: { backgroundColor: "#81ecec" }, // Style of Lane
        disallowAddingCard: true,
        boxShadow: "2px 2px 4px 0px rgba(0,0,0,0.75)",
      },
      {
        id: "4",
        title: "completed",
        label: `${validee.length} tasks`,
        cards: validee,
        style: { backgroundColor: "#55efc4" },
        disallowAddingCard: true,
      },
    ],
  };
  return taskData;
};
