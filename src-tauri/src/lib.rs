#[cfg_attr(mobile, tauri::mobile_entry_point)]
mod cli_commands;
mod db_migrations;

pub fn run() {
    let migrations = db_migrations::get_migrations();
    tauri::Builder::default()
        .plugin(tauri_plugin_notification::init())
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:cloudrt.db", migrations)
                .build(),
        )
        .invoke_handler(tauri::generate_handler![
            cli_commands::check_aws_cli_installed
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
