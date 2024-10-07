import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

// Env file configuration
function config(Env: any) {
	return {
		port: Env?.PORT,		
		databaseUrl: Env?.DATABASE_URL,
        routeBasePath: Env?.ROUTE_BASE_PATH,
		JwtSecret: Env?.JWT_SECRET,
	};
}

export default {
	...config(process.env),
};