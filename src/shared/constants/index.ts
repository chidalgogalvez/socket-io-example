/*
 * Get App Version from package.json
 */
export const APP_VERSION = process.env.npm_package_version;
/**
 * These are API defaults that can be changed using environment variables,
 * it is not required to change them (see the `.env.example` file)
 */
export const API_DEFAULT_PORT = 3000;
export const API_DEFAULT_PREFIX = '/api/digitacion/integration/v1';

/**
 * The defaults below are dedicated to Swagger configuration
 */
export const SWAGGER_TITLE = 'WebSocket';
export const SWAGGER_DESCRIPTION = 'WebSocket Recepcion';
export const SWAGGER_PREFIX = `${API_DEFAULT_PREFIX}/docs`;

/**
 * Environments
 */
export const PRODUCTION = 'production';
export const STAGING = 'staging';
export const DEVELOPMENT = 'development';
export const LOCAL = 'local';
