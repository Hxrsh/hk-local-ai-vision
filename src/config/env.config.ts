export default () => ({
    PORT: process.env.APP_PORT ? process.env.APP_PORT : 3000,
    DB_URI: process.env.MONGODB_URI,
});
