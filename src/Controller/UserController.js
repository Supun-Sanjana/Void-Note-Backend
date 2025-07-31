import DB from '../db/db.mjs';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

//register
export const userRegister = async (req, res) => {
    try {
        const {
            first_Name,
            last_Name,
            username,
            email,
            password,
            pofile_Pic_Url,
            is_Active
        } = req.body;

        // Validate required fields
        if (
            !first_Name ||
            !last_Name ||
            !username ||
            !email ||
            !password ||
            !pofile_Pic_Url ||
            is_Active === undefined // allow false too
        ) {
            return res.status(400).json({
                message: 'Some fields are missing...'
            });
        }

        // Check for existing user
        const existingUser = await DB.user.findFirst({
            where: {
                OR: [
                    { Username: username },
                    { Email: email }
                ]
            }
        });

        if (existingUser) {
            return res.status(409).json({
                message: 'Username or Email already exists.'
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = await DB.user.create({
            data: {
                First_Name: first_Name,
                Last_Name: last_Name,
                Username: username,
                Email: email,
                Password: hashedPassword,
                Profile_Pic_Url: pofile_Pic_Url,
                Is_Active: is_Active
                // Created_At and Last_Login will auto-generate
            }
        });

        res.status(201).json({
            message: 'User created successfully.',
            user: {
                id: newUser.User_Id,
                username: newUser.Username,
                email: newUser.Email
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


//login

export const userLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({
                message: 'Some fields are missing...'
            });
        }

        const user = await DB.user.findFirst({
            where: { Username: username }
        });
        if (!user) {
            return res.status(404).json({
                message: 'User Not Found !'
            });
        }

        const is_match = await bcrypt.compare(password, user.Password);

        if (!is_match) {
            return res.status(401).json({
                message: 'Password is wrong !'
            });
        }

        const token = jwt.sign({
            id: user.Id,
            user_name: user.Username
        },
            process.env.JWT_SECRET || 'wjb437nhgvbcgx2bjucbngjxh32bvhxjngvhdwj6nbxwvdx45562vghbxbfw45cfghxfcgsxs',
            { expiresIn: '24h' }
        );

        res.status(200).json({ message: "Success", token });



    } catch (e) {
        res.status(500).json({ 'message': "try againg ", error: e })
    }
}