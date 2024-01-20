// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Builder;
mod commands;

fn main() {
    Builder::default()
        .invoke_handler(tauri::generate_handler![commands::check_aws_cli_installed])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
