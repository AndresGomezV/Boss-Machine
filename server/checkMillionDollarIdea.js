const checkMillionDollarIdea = (req, res, next) => {
    let { numWeeks, weeklyRevenue } = req.body;
  
    // Convertir numWeeks y weeklyRevenue a números antes de hacer cualquier cálculo
    numWeeks = Number(numWeeks);
    weeklyRevenue = Number(weeklyRevenue);
  
    // Verificar si numWeeks o weeklyRevenue no son números válidos
    if (isNaN(numWeeks) || isNaN(weeklyRevenue) || numWeeks <= 0 || weeklyRevenue <= 0) {
      return res.status(400).send("Invalid data for numWeeks or weeklyRevenue");
    }
  
    const totalValue = numWeeks * weeklyRevenue;
  
    // Verificar si el totalValue es inferior a un millón de dólares
    if (totalValue < 1000000) {
      return res
        .status(400)
        .send("Idea must be worth at least one million dollars");
    }
  
    // Si todo está bien, continuar con el siguiente middleware
    next();
  };
  
  // Leave this exports assignment so that the function can be used elsewhere
  module.exports = checkMillionDollarIdea;
  