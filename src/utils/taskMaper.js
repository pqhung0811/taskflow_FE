export const mapData = (tasks, chef) => {
  const cards = tasks.map(
    ({
      id,
      startTime,
      deadline,
      state,
      project,
      responsible,
      title,
      advance,
      comments,
      files,
      priority,
      category,
    }) => {
      return {
        id: `${id}`,
        title: title,
        description: chef
          ? `assigned to : ${responsible ? responsible.name.toUpperCase() : 'Unassigned'}`
          : `project : ${project.name}`,
        label: deadline ? `${deadline.substring(0, 10)}` : '',
        draggable: true,
        startTime,
        project,
        advance,
        comments,
        state,
        files,
        priority,
        category,
      };
    }
  );

  const enAttente = cards.filter((card) => card.state == "ON_HOLD");
  const enCours = cards.filter((card) => card.state == "IN_PROGRESS");
  const attenteValidation = cards.filter(
    (card) => card.state == "VALIDATION"
  );
  const validee = cards.filter((card) => card.state == "VALIDATED");

  const taskData = {
    lanes: [
      {
        id: "0",
        title: "On hold",
        label: `${enAttente.length} tasks`,
        cards: enAttente,
        style: { backgroundColor: "#d1d8e0" }, // Style of Lane
        //cardStyle: { backgroundColor: 'blue' }
        disallowAddingCard: true,
      },
      {
        id: "1",
        title: "In progress",
        label: `${enCours.length} tasks`,
        cards: enCours,
        disallowAddingCard: true,
        style: { backgroundColor: "#74b9ff" },

        //cardStyle: { backgroundColor: 'blue' }
      },
      {
        id: "2",
        title: "waiting for validation",
        label: `${attenteValidation.length} tasks`,
        cards: attenteValidation,
        style: { backgroundColor: "#81ecec" }, // Style of Lane
        disallowAddingCard: true,
        boxShadow: "2px 2px 4px 0px rgba(0,0,0,0.75)",
      },
      {
        id: "3",
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
