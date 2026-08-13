import jwt from 'jsonwebtoken';

function generateToken(id) {
  const token = jwt.sign({
    id
  }, process.env.SECRET_KEY, // secret ka use isliye karte hai taki unique token generate ho aur easily guess na kiya ja sake
   { expiresIn: "30d" });
  return token
};

export { generateToken };