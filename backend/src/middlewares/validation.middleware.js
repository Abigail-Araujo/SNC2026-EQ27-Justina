// validation.middleware.js
export const validateLogin = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email y password requeridos' });
    }

    if (!email.includes('@')) {
        return res.status(400).json({ error: 'Email inválido' });
    }

    if (password.length < 6) {
        return res.status(400).json({ error: 'Password mínimo 6 caracteres' });
    }

    next();
};

export const validateRegister = (req, res, next) => {
    const { email, password, full_name } = req.body;

    if (!email || !password || !full_name) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    if (!email.includes('@')) {
        return res.status(400).json({ error: 'Email inválido' });
    }

    if (password.length < 6) {
        return res.status(400).json({ error: 'Password mínimo 6 caracteres' });
    }

    if (full_name.trim().length < 3) {
        return res.status(400).json({ error: 'Nombre mínimo 3 caracteres' });
    }

    next();
};