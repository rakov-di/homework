declare interface GetSettingResponse {
    data: {
        data: {
            id: string;
            repoName: string;
            buildCommand: string;
            mainBranch: string;
            period: number;            
        } | {} 
    }
}

declare interface UpdateSettingsParams {
    repoName: string;
    buildCommand: string;
    mainBranch: string;
    period: number;
}

declare interface AddCommitToQueueParams {
    commitMessage: string;
    commitHash: string;
    branchName: string;
    authorName: string;
}

declare interface AddCommitToQueueResponse {
    data: {
        data: {
            id: string;
            buildNumber: number;
            status: Status;
        }
    }
}

declare interface BuildDetailsResponse {
    data: {
        data: {
            id: string;
            configurationId: string;
            buildNumber: number;
            commitMessage: string;
            commitHash: string;
            branchName: string;
            authorName: string;
            status: Status;
            start: string;
            duration: number;
        }
    }
}

declare enum Status {
    Waiting = "Waiting",
    InProgress = "InProgress",
    Success = "Success",
    Fail = "Fail",
    Canceled = "Canceled"
}

// declare module '*'
  

  

  
