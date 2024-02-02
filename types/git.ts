export interface GitProviders {
  git_provider_id: number
  git_provider_name: 'bitbucket' | 'github'
}

export interface GitSettings {
  name: GitProviders['git_provider_name']
  settings: GithubApi | BitbucketApi
}

export interface GithubApi {
  owner: string
  personal_access_token: string
  repository_name: string
}

export interface BitbucketApi {
  owner: string
  repository_name: string
  app_password: string
}
