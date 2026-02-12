import { changePassword, login, register } from '../services/authService.js';

export default class AuthController {

    static async changePassword(req, res, next) {
        try {
            await changePassword(req.user.id, req.body.currentPassword, req.body.newPassword);
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
            const token = await login(req.body);
            res.json(token);
        } catch (error) {
            next(error);
        }
    }

}