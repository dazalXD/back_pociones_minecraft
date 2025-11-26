const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const ingredients = require('./data/potionIngredients.json');
const negativePotions = require('./data/potions_bad_efects.json');
const positivePotions = require('./data/potions_good_efects.json');

const app = express();
const PORT = 3000;
const BASE_PATH = '/api/v1';

// --- 1. CONFIGURACIÓN DE SWAGGER ---
// Cargar el archivo de especificación YAML
const swaggerDocument = YAML.load('./swagger.yaml');
const swaggerOptions = {
    customCss: '.swagger-ui .topbar { display: none }'
};

// Establecer el endpoint para la documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));

// --- 2. ENDPOINT DE LA API ---
// Endpoint GET para obtener la lista de ingredientes
app.get(`${BASE_PATH}/potions/ingredients`, (req, res) => {
    try {
        // Simplemente enviamos la lista JSON de ingredientes
        res.status(200).json(ingredients);
    } catch (error) {
        console.error('Error al obtener los ingredientes:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
});

app.get(`${BASE_PATH}/potions/negative`, (req, res) => {
    try {
        res.status(200).json(negativePotions);
    } catch (error) {
        console.error('Error al obtener pociones negativas:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
});

app.get(`${BASE_PATH}/potions/positive`, (req, res) => {
    try {
        // Simplemente enviamos la lista JSON de pociones positivas
        res.status(200).json(positivePotions);
    } catch (error) {
        console.error('Error al obtener pociones positivas:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
});

// --- 3. SERVICIOS DE ARCHIVOS ---
app.use('/assets', express.static('assets'));

// --- 4. INICIAR EL SERVIDOR ---
app.listen(PORT, () => {
    console.log(`✅ Servidor Express corriendo en http://10.55.37.2:${PORT}`);
    console.log(`📖 Documentación Swagger disponible en http://10.55.37.2:${PORT}/api-docs`);
});