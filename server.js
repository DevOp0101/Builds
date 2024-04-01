const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static('build'));

app.get('*', (req, res) => {
 res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
});