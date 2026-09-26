const bcrypt = require('bcryptjs');
const hash = '$2b$10$FVj.eG8KtzaKEt0LvI7mB.oE58RhpKrCp/2gO8JTSY6E.VaCkJlrO';
bcrypt.compare('demo123', hash).then(console.log);
