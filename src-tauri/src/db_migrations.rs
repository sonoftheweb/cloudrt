use tauri_plugin_sql::{Migration, MigrationKind};

pub fn get_migrations() -> Vec<Migration> {
    vec![
        Migration {
            version: 1,
            description: "create_vendors_table",
            sql: r#"
                CREATE TABLE IF NOT EXISTS Vendors (
                    vendor_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                    vendor_name TEXT NOT NULL
                );
            "#,
            kind: MigrationKind::Up,
        },
        Migration {
            version: 2,
            description: "create_git_table",
            sql: r#"
                CREATE TABLE IF NOT EXISTS GitProvider (
                    git_provider_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                    git_provider_name TEXT NOT NULL
                );
            "#,
            kind: MigrationKind::Up,
        },
        Migration {
            version: 3,
            description: "create_projects_table",
            sql: r#"
                CREATE TABLE IF NOT EXISTS Projects (
                    project_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                    project_name TEXT NOT NULL,
                    project_key TEXT NOT NULL,
                    project_description TEXT,
                    project_settings TEXT,
                    git_settings TEXT,
                    vendor_id INTEGER NOT NULL,
                    FOREIGN KEY (vendor_id) REFERENCES Vendors(vendor_id)
                );
            "#,
            kind: MigrationKind::Up,
        },
        Migration {
            version: 4,
            description: "seed_vendors_table",
            sql: r#"
                INSERT INTO Vendors (vendor_name) VALUES
                ('aws'),
                ('azure'),
                ('gcp');
            "#,
            kind: MigrationKind::Up,
        },
        Migration {
            version: 5,
            description: "seed_git_provider_table",
            sql: r#"
                INSERT INTO GitProvider (git_provider_name) VALUES
                ('github'),
                ('bitbucket');
            "#,
            kind: MigrationKind::Up,
        },
    ]
}
