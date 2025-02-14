import menu from '../../models/menu.js';

function homeController() {
  return {
    async index(req, res) {
      try {
        console.log('Fetching data from Menu model...'); // Debugging
        const pizzas = await menu.find();

        if (!pizzas || pizzas.length === 0) {
          console.log('No pizzas found in database', pizzas);
        }

        res.render('home', { pizzas });
      } catch (error) {
        res.status(500).send('Error fetching pizzas');
      }
    },
  };
}

export default homeController;
