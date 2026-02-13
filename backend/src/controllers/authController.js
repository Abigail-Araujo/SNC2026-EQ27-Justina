import { changePassword, login, register } from '../services/authService.js';

export default class AuthController {

    static async changePassword(req, res, next) {
        try {
            await changePassword(req.userId, req.body.currentPassword, req.body.newPassword);
            res.json({ message: 'Contraseña actualizada correctamente' });
        } catch (error) {
            next(error);
        }
    }
    
    static async register(req, res, next) {
        try {
            const user = await register(req.body);
            res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next) {
        try {
            const { token, userId } = await login(req.body);
            res.cookie(
                'authToken', token,{
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
                    maxAge: 8 * 60 * 60 * 1000 // 8 horas
                }
            )

            res.json({ message: 'Login realizado correctamente', userId });
        } catch (error) {
            next(error);
        }
    }

}