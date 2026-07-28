import jwt from 'jsonwebtoken';

function generateToken(id) {
  const token = jwt.sign({
    id
  }, process.env.SECRET_KEY, { expiresIn: "30d" });
  return token
};

export { generateToken };