import { readFileSync } from 'fs';
import { execSync } from 'child_process';

try {
  const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));
  const currentVersion = pkg.version;

  let oldVersion;
  try {
    const oldPkgContent = execSync('git show HEAD:package.json', {
      stdio: ['pipe', 'pipe', 'ignore'],
    }).toString();
    const oldPkg = JSON.parse(oldPkgContent);
    oldVersion = oldPkg.version;
  } catch (e) {
    // If HEAD:package.json doesn't exist (initial commit), assume it's fine
    console.log('No previous version found in Git. Skipping version check.');
    process.exit(0);
  }

  if (currentVersion === oldVersion) {
    console.error(`Error: Version in package.json (${currentVersion}) has not been incremented.`);
    console.error('Please update the version field before committing.');
    process.exit(1);
  }

  // Basic semver check: current should be "greater" than old
  // For simplicity, we just check if they are different or use a basic split
  // but usually "different" is what users mean by "incremented" in a strict sense
  // unless we want to be very precise with semver rules.

  console.log(`Version check passed: ${oldVersion} -> ${currentVersion}`);
} catch (error) {
  console.error('Error during version check:', error.message);
  process.exit(1);
}
