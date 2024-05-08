module.exports = {
    deploy : {
      production : {
        user : 'root',
        host : 'SUBJETIVO_backend_prod',
        ref  : 'origin/main',
        repo : 'https://github.com/juliozaor/backend-SUBJETIVO.git',
        path : '/var/SUBJETIVO/backend_core',
        'post-deploy': 'npm install && npm run build && cp .env build/.env && cd build && npm ci --production && pm2 restart backend_core',
      },
      qa : {
        user : 'root',
        host : 'supertransporte_qa',
        ref  : 'origin/dev',
        repo : 'https://github.com/juliozaor/backend-SUBJETIVO.git',
        path : '/var/SUBJETIVO/backend_core',
        'post-deploy': 'npm install && npm run build && cp .env build/.env && cd build && npm ci --production && pm2 restart backend-SUBJETIVO',
      }
    }
  };
  