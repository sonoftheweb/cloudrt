import { invoke } from '@tauri-apps/api/tauri'

export const useCliStore = defineStore('cli', () => {
  const awsCliInstalled = ref<boolean>(false)
  const gcpCliInstalled = ref<boolean>(false)
  const azureCliInstalled = ref<boolean>(false)

  async function checkAwsCli() {
    try {
      const isInstalled = await invoke('check_aws_cli_installed')
      console.log('AWS CLI is installed:', isInstalled);
    } catch (error) {
      console.error('Error checking AWS CLI installation:', error)
    }
  }

  return {
    awsCliInstalled,
    gcpCliInstalled,
    azureCliInstalled,
    checkAwsCli,
  }
})
