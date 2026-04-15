// DB2 Database Configuration
import ibm_db from 'ibm_db';

// Database connection string
// For GitHub Pages deployment, we'll use demo mode since DB2 requires server-side connection
const connectionString = process.env.DB2_CONNECTION_STRING ||
  'DEMO_MODE'; // Placeholder for demo mode

// Database operations
class DB2Service {
  constructor() {
    this.connectionString = connectionString;
    this.isDemoMode = this.connectionString === 'DEMO_MODE';
  }

  // Connect to database
  async connect() {
    if (this.isDemoMode) {
      throw new Error('Demo mode: DB2 connection not available on GitHub Pages. Configure a backend server for full functionality.');
    }

    return new Promise((resolve, reject) => {
      ibm_db.open(this.connectionString, (err, conn) => {
        if (err) {
          console.error('DB2 Connection Error:', err);
          reject(err);
        } else {
          console.log('Connected to DB2 database');
          resolve(conn);
        }
      });
    });
  }

  // Execute query
  async executeQuery(sql, params = []) {
    const conn = await this.connect();
    return new Promise((resolve, reject) => {
      conn.query(sql, params, (err, data) => {
        if (err) {
          console.error('Query Error:', err);
          reject(err);
        } else {
          resolve(data);
        }
        conn.close();
      });
    });
  }

  // Execute non-query (INSERT, UPDATE, DELETE)
  async executeNonQuery(sql, params = []) {
    const conn = await this.connect();
    return new Promise((resolve, reject) => {
      conn.prepare(sql, (err, stmt) => {
        if (err) {
          console.error('Prepare Error:', err);
          conn.close();
          reject(err);
          return;
        }

        stmt.execute(params, (err, result) => {
          if (err) {
            console.error('Execute Error:', err);
            reject(err);
          } else {
            resolve(result);
          }
          stmt.close();
          conn.close();
        });
      });
    });
  }

  // Test connection
  async testConnection() {
    if (this.isDemoMode) {
      return {
        success: false,
        message: 'Demo Mode: DB2 connection not available on GitHub Pages. This is normal for static hosting.',
        error: 'DEMO_MODE'
      };
    }

    try {
      const result = await this.executeQuery('SELECT 1 as test FROM SYSIBM.SYSDUMMY1');
      return { success: true, message: 'DB2 connection successful', data: result };
    } catch (error) {
      return { success: false, message: 'DB2 connection failed', error: error.message };
    }
  }
}

export default DB2Service;