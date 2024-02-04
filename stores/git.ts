import { defineStore } from 'pinia'
import type {
  BitbucketApi,
  GitProviders,
  GitSettings,
  GithubApi,
} from '~/types/git'

export const useGitStore = defineStore('git', () => {
  const { database } = useDbStore()
  const selectedProjectStore = useSelectedProjectStore()
  const { fireSystemNotification } = useNotificationsStore()

  const gitProviders = ref<GitProviders[]>([])
  const repoFileList = ref<any>(null)

  function getAllGitProviders(): void {
    database?.select('select * from GitProvider').then(response => {
      gitProviders.value = response as GitProviders[]
    })
  }

  function selectedProjectGit(): GitSettings | null {
    if (
      typeof selectedProjectStore.selectedProject?.git_settings === 'string'
    ) {
      return JSON.parse(
        selectedProjectStore.selectedProject?.git_settings as string,
      ) as GitSettings
    }

    return selectedProjectStore.selectedProject
      ?.git_settings as GitSettings | null
  }

  async function getRepoFileStructure() {
    let path: string | null = null
    const gitSettings = selectedProjectGit()
    switch (gitSettings?.name) {
      case 'github':
        path = `/contents?ref=${gitSettings.settings.branch.toLowerCase()}`
        break

      case 'bitbucket':
        path = `/src/${gitSettings.settings.branch.toLowerCase()}`
        break
    }
    if (!path) {
      fireSystemNotification({
        title: 'Error',
        body: 'No path specified for the git repository. Please check your git settings.',
      })
      return
    }
    repoFileList.value = await executeGitRequest(path)
    console.log(repoFileList.value)
  }

  function gitUrlBuilder(): { url: string; auth: string } | undefined {
    const gitSettings = selectedProjectGit()
    switch (gitSettings?.name) {
      case 'github':
        return {
          url: `https://api.github.com/repos/${gitSettings.settings.owner}/${gitSettings.settings.repository_name}`,
          auth: `token ${
            (gitSettings.settings as GithubApi).personal_access_token
          }`,
        }
      case 'bitbucket':
        const base64Credentials = btoa(
          `${(gitSettings.settings as BitbucketApi).username}:${
            (gitSettings.settings as BitbucketApi).app_password
          }`,
        )
        return {
          url: `https://api.bitbucket.org/2.0/repositories/${
            (gitSettings.settings as BitbucketApi).workspace
          }/${gitSettings.settings.repository_name}`,
          auth: `Basic ${base64Credentials}`,
        }
    }
  }

  async function executeGitRequest(path: string): Promise<any> {
    const gitConfig = gitUrlBuilder()
    if (!gitConfig) {
      fireSystemNotification({
        title: 'Error',
        body: 'Git configuration is undefined',
      })
      return null
    }

    const { data, error } = await useFetch(`${gitConfig.url}${path}`, {
      headers: {
        Authorization: gitConfig.auth,
      },
    })

    if (error.value) {
      fireSystemNotification({
        title: 'Error',
        body: 'Connecting to git provider failed',
      })
    }

    return data.value
  }

  return {
    gitProviders,
    getAllGitProviders,
    selectedProjectGit,
    gitUrlBuilder,
    executeGitRequest,
    getRepoFileStructure,
  }
})
