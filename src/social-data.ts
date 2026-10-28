export interface GitHubCardData { publicRepos: number; followers: number; following: number; bio: string }

export function parseGitHubCard(value: unknown): GitHubCardData {
  if (!value || typeof value !== 'object') throw new Error('Invalid GitHub profile');
  const data = value as Record<string, unknown>;
  for (const key of ['public_repos', 'followers', 'following']) {
    if (!Number.isInteger(data[key]) || (data[key] as number) < 0) throw new Error('Invalid GitHub profile');
  }
  return {
    publicRepos: data.public_repos as number,
    followers: data.followers as number,
    following: data.following as number,
    bio: typeof data.bio === 'string' ? data.bio.trim() : '',
  };
}
