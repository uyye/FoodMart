const bcrypt = require("bcryptjs")

const hashing = (password)=>{
    return bcrypt.hashSync(password, 8)
}

const compare = (password, hash)=>{
    return bcrypt.compareSync(password, hash)
}

module.exports = {hashing, compare}