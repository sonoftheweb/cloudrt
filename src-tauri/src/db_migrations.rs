use tauri_plugin_sql::{Migration, MigrationKind};

pub fn get_migrations() -> Vec<Migration> {
  vec![
    Migration {
      version: 1,
      description: "create_vendors_table",
      sql: r#"
          CREATE TABLE IF NOT EXISTS Vendors (
              vendor_id INTEGER PRIMARY KEY,
              vendor_name TEXT NOT NULL
          );
      "#,
      kind: MigrationKind::Up,
  },
  Migration {
    version: 2,
    description: "create_projects_table",
    sql: r#"
        CREATE TABLE IF NOT EXISTS Projects (
            project_id TEXT PRIMARY KEY,
            project_name TEXT NOT NULL,
            project_key TEXT NOT NULL,
            project_description TEXT,
            vendor_id INTEGER,
            FOREIGN KEY (vendor_id) REFERENCES Vendors(vendor_id)
        );
    "#,
    kind: MigrationKind::Up,
  },
  Migration {
    version: 3,
    description: "seed_vendors_table",
    sql: r#"
        INSERT INTO Vendors (vendor_id, vendor_name) VALUES
        (1, 'aws'),
        (2, 'gcp');
    "#,
    kind: MigrationKind::Up,
  },
  ]
}
