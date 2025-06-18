import pg from 'pg';

const pool = new pg.Pool({
  user: 'artesanos_user', 
  host: 'dpg-d1920cfdiees73ae6620-a.oregon-postgres.render.com',
  database: 'artesanos',
  password: 'ZMSiPI5sWiujSrrWyLjeBfYVwvxNSWRi', 
  port: 5432, 
  max: 10, 
  idleTimeoutMillis: 30000, 
  connectionTimeoutMillis: 2000, 
  ssl: true 
});


pool.on('error', (err) => {
  console.error('Error inesperado en el pool de PostgreSQL', err);
  process.exit(-1); 
});

export default pool;