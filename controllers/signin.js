
const handleSignin = (db, bcrypt) => (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json(`Vous n'avez pas respecté les conditions`);
  }
  db.select('email', 'hash').from('login')
  .where('email', '=', email)
  .then(data => {
    const isValid = bcrypt.compareSync(password, data[0].hash);
    if (isValid) {
      return db.select('*').from('users')
      .where('email', '=', email)
      .then(user => {
        res.json(user[0])
      })
      .catch(err => res.status(400).json(`Impossible de trouver l'utilisateur`))
    } else {
      res.status(400).json(`Erreur de connexion`)
    }
  })
  .catch(err => res.status(400).json(`Erreur de connexion`))
}

module.exports = {
  handleSignin: handleSignin
}
