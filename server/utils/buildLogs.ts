// TODO Сделать нормальный кеш, а не вот это вот
class BuildLogs {
  buildLogs: any;

  constructor() {
    this.clear();
  }

  get(buildId: string) {
    return this.buildLogs[buildId];
  }

  set(buildId: string, response: string) {
    this.buildLogs[buildId] = response;
  }

  remove(buildId: string) {
    delete this.buildLogs[buildId];
  }

  clear() {
    this.buildLogs = {};
  }

  isExist(buildId: string) {
    return this.buildLogs[buildId];
  }
}



export default new BuildLogs();
