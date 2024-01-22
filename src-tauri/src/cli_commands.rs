use tauri::command;

#[command]
pub async fn check_aws_cli_installed() -> Result<bool, String> {
  let (command, args) = if cfg!(target_os = "windows") {
        ("aws", vec!["--version"])
    } else {
        ("which", vec!["aws"])
    };

    match std::process::Command::new(command)
        .args(args)
        .output() {
            Ok(output) => Ok(!output.stdout.is_empty()),
            Err(e) => Err(format!("Failed to execute command: {}", e))
        }
}
