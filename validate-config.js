#!/usr/bin/env node

/**
 * Configuration Validation Script
 * This script validates that all required environment variables are set
 * before the application starts.
 */

console.log('🔍 Validating configuration...\n');

try {
  // Load and validate configuration
  const config = require('./config');
  
  console.log('✅ Configuration validation passed!');
  console.log('📋 Current configuration:');
  console.log(`   Port: ${config.port}`);
  console.log(`   Environment: ${config.nodeEnv}`);
  console.log(`   CORS Origin: ${JSON.stringify(config.corsOrigin)}`);
  console.log(`   Static Cache: ${config.staticCacheMaxAge}s`);
  console.log(`   HTML Cache: ${config.htmlCacheMaxAge}s`);
  console.log(`   Compression Threshold: ${config.compressionThreshold} bytes`);
  
  // Additional security checks
  if (config.nodeEnv === 'production') {
    if (!process.env.CORS_ORIGIN) {
      throw new Error('CORS_ORIGIN is required in production environment');
    }
    console.log('🔒 Production security checks passed');
  } else {
    console.log('🛠️  Development environment detected');
  }
  
  console.log('\n🚀 Configuration is ready!');
  process.exit(0);
  
} catch (error) {
  console.error('\n❌ Configuration validation failed!');
  console.error(`Error: ${error.message}`);
  console.error('\n💡 Please check your .env file and ensure all required variables are set.');
  console.error('📖 See env.example for guidance.');
  process.exit(1);
}
