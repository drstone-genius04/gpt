const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();
 // Log all environment variables
// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
console.log(supabaseUrl);
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
app.use(express.json());

app.post('/send-data', async (req, res) => {
    const { data, error } = await supabase
        .from('documents')
        .insert([
            { column1: req.body.data1, column2: req.body.data2 },
        ]);

    if (error) return res.status(500).json({ error: error.message });

    return res.status(200).json({ data });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
