// Use process.env so that importing here doesn't cause issues like circular dependencies
export const isProduction = process.env.NODE_ENV === 'production'

const KEY_BRANCHES = ['main', 'master', 'staging', 'stage', 'dev', 'develop']

export const vercel =
  process.env.VERCEL &&
  process.env.VERCEL_GIT_COMMIT_REF &&
  process.env.DATABASE_URL
    ? {
        gitCommitRef: process.env.VERCEL_GIT_COMMIT_REF,
        gitBranchUrl: process.env.VERCEL_BRANCH_URL,
        isPreviewDeployment: !KEY_BRANCHES.includes(
          process.env.VERCEL_GIT_COMMIT_REF,
        ),
        // This regex logic must match to any github actions or cleanup
        databaseUrl: process.env.DATABASE_URL.replace(
          /_[^_]*$/,
          `_${process.env.VERCEL_GIT_COMMIT_REF.replace(/[^a-zA-Z0-9]/g, '_')}`,
        ).toLowerCase(),
      }
    : null
export const PASSWORD_ERROR_MESSAGES = {
  length: 'Password must be at least 8 characters long',
  number: 'Password must contain at least one number',
  alpha_numeric: 'Password must contain at least one alphanumeric character',
  upper_case: 'Password must contain at least one uppercase letter',
  lower_case: 'Password must contain at least one lowercase letter',
}
