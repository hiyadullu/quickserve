import bcrypt from "bcryptjs";

const hashPassword = async () => {
    const password = "1234";  // Replace this with the actual password you want to hash
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password:", hashedPassword);
};

hashPassword();
