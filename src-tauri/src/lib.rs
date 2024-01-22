#[cfg_attr(mobile, tauri::mobile_entry_point)]

mod cli_commands;

pub fn run() {
  tauri::Builder::default()
    .plugin(tauri_plugin_notification::init())
    .invoke_handler(tauri::generate_handler![cli_commands::check_aws_cli_installed])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
