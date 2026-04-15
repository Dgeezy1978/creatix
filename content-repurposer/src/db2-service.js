// DB2 Database Configuration
import ibm_db from 'ibm_db';

// Database connection string
// Format: DATABASE=dbname;HOSTNAME=host;PORT=port;PROTOCOL=TCPIP;UID=username;PWD=password;
const connectionString = process.env.DB2_CONNECTION_STRING || 'DATABASE=sample;HOSTNAME=localhost;PORT=50000;PROTOCOL=TCPIP;UID=db2inst1;PWD=password;';

// Database operations
class DB2Service {
  constructor() {
    this.connectionString = connectionString;
  }

  // Connect to database
  async connect() {
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
    try {
      const result = await this.executeQuery('SELECT 1 as test FROM SYSIBM.SYSDUMMY1');
      return { success: true, message: 'DB2 connection successful', data: result };
    } catch (error) {
      return { success: false, message: 'DB2 connection failed', error: error.message };
    }
  }
}

export default DB2Service;