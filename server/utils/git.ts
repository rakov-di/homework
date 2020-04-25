const helpers = require('./helpers');

const localRepoName = '_localRepo';

const cloneRepo = async (repoName) => {
  const repoUrl = getRepoUrl(repoName);

  // Проверяем, существует ли указанный репозиторий на GitHub
  try {
    await runCommandInLocalRepo(`git ls-remote ${repoUrl}`);
  }
  catch(e) {
    throw new Error(`Can't find repository ${repoUrl}`);
  }

  // Проверяем, есть ли на сервере локальная папка с ранее склонированным туда репозиторием
  // Если есть - удаляем его
  if (await isLocalRepoExist(localRepoName)) {
    await helpers.rimraf(localRepoName);
  }

  // Клонируем указанный репозиторий в локальную папку на сервере
  try {
    return await runCommandInLocalRepo(`git clone ${repoUrl} ${localRepoName}`);
  }
  catch(e) {
    throw new Error(`Can't clone repository ${repoUrl}`);
  }
};

const getRepoUrl = (repository) => {
  // при обращении через https к несуществующему пользователю/репозиторию
  // постоянно спрашивает пароль (как его ни сохраняй).
  // При обращении к ssh не спрашивает
  return `git@github.com:${repository}.git`;
};

const isLocalRepoExist = async (dir) => {
  try {
    const stat = await helpers.stat(dir);
    return stat.isDirectory();
  }
  catch (e) {
    if (e.code === 'ENOENT') {
      return false;
    } else {
      throw e;
    }
  }
};

const runCommandInLocalRepo = async (command, dir = process.cwd()) => {
  // const result = await helpers.spawn(command, { cwd: dir, shell: true });
  const result = await helpers.exec(command, { cwd: dir });
  return result.stdout.trim();
};

const getCommitInfo = async (commitHash) => {
  try {
    return await runCommandInLocalRepo(`cd ${localRepoName} && git show -s --format='%s===%an' ${commitHash}`);
  }
  catch(e) {
    throw new Error(`Can't find commit with hash ${commitHash}`);
  }
};

// TODO Функция для тестовой ручки - пока не работает
// const updateRepoStory = async (repo) => {
//   return new Promise((resolve, reject) => {
//     const updateRepo = spawn(`cd ${localRepoName} && git checkout ${repo.mainBranch} && git pull`,{shell: true});
//
//     updateRepo.stdout.on('data', data => console.log(`stdout: ${data}`));
//
//     updateRepo.stderr.on('data', data => console.error(`stderr: ${data}`));
//
//     updateRepo.on('close', () => resolve(repo));
//   });
// };

export default { cloneRepo, getCommitInfo };
