const express = require('express');         
const bodyParser = require('body-parser'); 
const axios = require('axios');            
const cors = require('cors');              


const app = express();
const PORT = 3000; 


app.use(cors());


app.use(bodyParser.json());


app.get('/contactos', async (req, res) => {
  try {

    const response = await axios.get('http://www.raydelto.org/agenda.php');


    res.json(response.data);
  } catch (error) {

    console.error('Error al obtener contactos:', error.message);
    res.status(500).json({ error: 'Error al obtener contactos' });
  }
});


app.post('/contactos', async (req, res) => {
  const { nombre, apellido, telefono } = req.body;


  if (!nombre || !apellido || !telefono) {
    return res.status(400).json({ error: 'Faltan campos requeridos (nombre, apellido, telefono)' });
  }


  const nuevoContacto = { nombre, apellido, telefono };

  try {

    const response = await axios.post('http://www.raydelto.org/agenda.php', nuevoContacto, {
      headers: {
        'Content-Type': 'application/json',
      },
    });


    res.status(201).json({
      mensaje: 'Contacto guardado correctamente',
      datos_enviados: nuevoContacto
    });
  } catch (error) {

    console.error('Error al guardar contacto:', error.message);
    res.status(500).json({ error: 'Error al guardar contacto' });
  }
});


app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en: http://localhost:${PORT}`);
});