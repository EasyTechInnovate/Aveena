import dotenvFlow from 'dotenv-flow'

dotenvFlow.config()

const config = {
    env: process.env.ENV || 'development',
    server: {
        port: parseInt(process.env.PORT || '5000', 10),
        url: process.env.SERVER_URL || 'http://localhost:5000'
    },
    database: {
        url: process.env.DATABASE_URL
    },
    auth: {
        jwtSecret: process.env.JWT_SECRET,
        jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
        jwtExpiresIn: '1d',
        jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d'
    },
    security: {
        corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
        rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
        rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX || '100', 10)
    },
    client: {
        url: process.env.CLIENT_URL || 'http://localhost:5173'
    },
    google: {
        apiKey: process.env.GOOGLE_API_KEY
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: '14d'
    },
    payu: {
        baseUrl: process.env.PAYU_URL, 
        key: process.env.PAYU_KEY,
        salt: process.env.PAYU_SALT,
        successUrl: process.env.PAYU_SUCCESS_URL,
        failureUrl: process.env.PAYU_FAILURE_URL,
        verifyUrl: process.env.PAYU_VERIFY_URL
    }
}

export default config