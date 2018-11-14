
const handleProfileGet = (db) => (req, res) =>{
  const { id } = req.params;
  db.select('*').from('users').where({id})
    .then(user => {
      if (user.length) {
        res.json(user[0])
      } else {
        res.status(400).json(`Profil non trouvé`)
      }
  })
  .catch(err => res.status(400).json(`Erreur pour obtenir l'utilisateur`))
}

module.exports = {
  handleProfileGet: handleProfileGet
}
