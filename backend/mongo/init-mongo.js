db.createCollection('users');
db.users.insert({
    name: "admin",
    email: "admin@admin.com",
    password: "$2a$10$QeVrBeKUOCzsPGSwd2487.La4sCARLKPKykNpQ38xULvQij7sViRG",
    role: "admin"
});