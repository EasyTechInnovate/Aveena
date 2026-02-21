import os from 'os';
import config from '../config/config.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default {
    getSystemHealth: () => {
        return {
            cpuUsage: os.loadavg(),
            totalMemory: `${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`,
            freeMemory: `${(os.freemem() / 1024 / 1024).toFixed(2)} MB`,
        };
    },
    getApplicationHealth: () => {
        return {
            environment: config.ENV,
            uptime: `${process.uptime().toFixed(2)} Seconds`,
            memoryUsage: {
                heapTotal: `${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} MB`,
                heapUsed: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,
            },
        };
    },
    generateOtp: (length = 6) => {
        let otp = '';
        for (let i = 0; i < length; i++) {
            otp += Math.floor(Math.random() * 10).toString();
        }
        return otp;
    },
    hashOtp: (otp) => {
        const hashedOtp = bcrypt.hashSync(otp, 8);
        return hashedOtp;
    },
    compareOtp: (otp, hashedOtp) => {
        return bcrypt.compareSync(otp, hashedOtp);
    },
    hashPassword: (password) => {
        return bcrypt.hashSync(password, 10);
    },
    comparePassword: (password, hashedPassword) => {
        return bcrypt.compareSync(password, hashedPassword);
    },
    generateToken: (data) => {
        const token = jwt.sign(data, config.jwt.secret, {
            expiresIn: config.jwt.expiresIn
        });
        return token;
    },
    verifyToken: (token) => {
        const decoded = jwt.verify(token, config.jwt.secret);
        return decoded;
    }
};
