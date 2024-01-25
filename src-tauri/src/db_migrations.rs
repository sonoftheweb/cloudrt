use tauri_plugin_sql::{Migration, MigrationKind};

pub fn get_migrations() -> Vec<Migration> {
  vec![
    Migration {
      version: 1,
      description: "create_initial_tables",
      sql: "CREATE TABLE projects (project_id VARCHAR KEY, project_name TEXT, project_key TEXT, project_description TEXT, project_vendor VARCHAR);",
      kind: MigrationKind::Up,
    },
  ]
}
