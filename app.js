const express = require('express');
const cors = require('cors');
const app = express();
const pokemonRoutes = require('./routes/pokemonRoutes');

app.use(cors());
app.use(express.json());
app.use('/api/pokemon', pokemonRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
