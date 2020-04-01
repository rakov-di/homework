const path = require('path');
const fs = require('fs');
const util = require('util');
const { spawn, exec } = require('child_process');
const rimraf = require("rimraf");
const promisifiedSpawn = util.promisify(spawn);
const promisifiedExec = util.promisify(exec);

const promisifiedFsAcess = util.promisify(fs.access);
const promisifiedRimraf = util.promisify(rimraf);
const promisifiedStat = util.promisify(fs.stat);

const localRepoName = 'local_repo';



async function isDirectoryExist(dir) {
  try {
    const stat = await promisifiedStat(dir);

    return stat.isDirectory();
  }
  catch (e) {
    if (e.code === 'ENOENT') {
      return false;
    } else {
      throw e;
    }
  }
}

async function runCommandInDirectory(command, dir = process.cwd()) {
  const result = await promisifiedExec(command, { cwd: dir });

  return result.stdout.trim();
}

function getRepositoryUrl(repository) {
  return `https://github.com/${repository}.git`;
}

// function checkIfRepoExist(repository) {
//   return `https://github.com/${repository}.git`;
// }

const cloneRepo = async (repoName) => {
  // await checkIfRepoExist(repoName);
  if (await isDirectoryExist(localRepoName)) {
    console.log(`Folder ${localRepoName} already exist!`);
    await promisifiedRimraf(localRepoName);
    console.log(`Folder ${localRepoName} successfully removed`);
  }

  const repoUrl = getRepositoryUrl(repoName);
  const command = `git clone ${repoUrl} ${localRepoName}`;

  try {
    return await runCommandInDirectory(command);
  } catch (err) {
    if (err.stderr.includes('Repository not found.')) {
      throw 'Repository not found';
    }

    throw err;
  }
  // console.log('OK');
  // const err = promisifiedFsAcess(path.resolve(__dirname, localRepoName));
  // TODO Устранить дублирование кода
  // if (err && err.code === 'ENOENT') {
  //
  //   try {
  //     let result = await promisifiedSpawn(`git clone ${repoName} local_repo`, {shell: true});
  //     console.log('OK' + result);
  //     return result.stdout.trim();
  //   }
  //   catch (err) {
  //     console.log('ERROR' + result);
  //     return err;
  //     // if (err.stderr.includes('Repository not found.')) {
  //     //   throw 'Repository not found';
  //     // }
  //     //
  //     // throw err;
  //   }
  //   // const result = await promisifiedSpawn(`git clone ${repoName} local_repo`, {shell: true});
  //   //
  //   // gitClone.stdout.on('data', data => {
  //   //   console.log(`stdout: ${data}`);
  //   //   resolve(repoName);
  //   // });
  //   //
  //   // gitClone.stderr.on('data', data => {
  //   //   console.error(`stderr: ${data}`);
  //   //   resolve(data);
  //   // });
  //
  //   // gitClone.on('close', () => resolve(repoName));
  // }
  // else {
  //
  //   try {
  //     let result = await promisifiedSpawn(`rm -rf ${localRepoName} && git clone ${repoName} local_repo`, {shell: true});
  //     console.log('OK' + result);
  //     return result.stdout.trim();
  //   }
  //   catch (err) {
  //     console.log('ERROR' + result);
  //     return err;
  //     // if (err.stderr.includes('Repository not found.')) {
  //     //   throw 'Repository not found';
  //     // }
  //     //
  //     // throw err;
  //   }
  //
  //   // gitRmClone.stdout.on('data', data => {
  //   //   console.log(`stdout: ${data}`);
  //   //   resolve(repoName);
  //   // });
  //   //
  //   // gitRmClone.stderr.on('data', data => {
  //   //   console.error(`stderr: ${data}`);
  //   //   resolve(data);
  //   // });
  //
  //   // gitRmClone.on('close', () => resolve(repoName));
  // }
};

const updateRepoStory = (repo) => {
  return new Promise((resolve, reject) => {
    const updateRepo = spawn(`cd ${localRepoName} && git checkout ${repo.mainBranch} && git pull`,{shell: true});

    updateRepo.stdout.on('data', data => console.log(`stdout: ${data}`));

    updateRepo.stderr.on('data', data => console.error(`stderr: ${data}`));

    updateRepo.on('close', () => resolve(repo));
  });
};

const getCommitInfo = (commitHash) => {
  return new Promise((resolve, reject) => {
    const log = spawn(`cd local_repo && git show -s --format='%s===%an' ${commitHash}`, {shell: true});

    log.stdout.on('data', data => {
      resolve(data);
      console.log(`stdout: ${data}`);
    });

    log.stderr.on('data', data => console.error(`stderr: ${data}`));

    log.on('close', (data) => resolve(data));

  });
};

module.exports = { cloneRepo, updateRepoStory, getCommitInfo };
