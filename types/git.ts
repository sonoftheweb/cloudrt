export interface GitProviders {
  git_provider_id: number
  git_provider_name: 'bitbucket' | 'github'
}

export interface GitSettings {
  name: GitProviders['git_provider_name']
  settings: GithubApi | BitbucketApi
}

export interface GithubApi {
  branch: string
  owner: string
  personal_access_token: string
  repository_name: string
}

export interface BitbucketApi {
  branch: string
  owner: string
  username: string
  workspace: string
  repository_name: string
  app_password: string
}
