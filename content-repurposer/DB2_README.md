# DB2 Integration for Content Repurposer

This application now includes IBM DB2 database connectivity for content repurposing operations.

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Database Connection**
   - Copy `.env.example` to `.env` (if it exists) or update the existing `.env` file
   - Set your DB2 connection string in the `DB2_CONNECTION_STRING` environment variable

   Example connection string format:
   ```
   DATABASE=your_db_name;HOSTNAME=your_host;PORT=50000;PROTOCOL=TCPIP;UID=your_username;PWD=your_password;
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

## Database Configuration

The DB2 connection is configured in `src/db2-service.js`. The service provides:

- `connect()` - Establish database connection
- `executeQuery(sql, params)` - Execute SELECT queries
- `executeNonQuery(sql, params)` - Execute INSERT/UPDATE/DELETE operations
- `testConnection()` - Test database connectivity

## Usage

The application includes a "Test DB2 Connection" button that will:
- Attempt to connect to your configured DB2 database
- Execute a simple test query
- Display the connection status

## Environment Variables

- `DB2_CONNECTION_STRING` - Full DB2 connection string with database credentials

## Prerequisites

- IBM DB2 database server running and accessible
- Valid database credentials
- Network connectivity to the DB2 server

## Troubleshooting

- Ensure your DB2 server is running and accessible
- Verify connection string parameters (hostname, port, database name, credentials)
- Check firewall settings allow connections to DB2 port (default: 50000)
- Install DB2 client libraries if required for your platform