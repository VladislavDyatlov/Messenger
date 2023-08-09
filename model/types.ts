export interface CreateUsernameData{
    createUsername: {
    success: boolean;
    error: string;
  }
}

export interface CreateUsernameVariables{
  username: string;
}

export interface SearchUsersInput{
  username: string;
}

export interface SearchUsersData{
 searchUsers: Array<SearchUsers>;
}

export interface SearchUsers{
  id: string;
  username: string;
}

export interface CreateConverstationData{
  createConverstation: {
      converstationId: string;
  }
}

export interface CreateConverstationInput{
  particleIds: Array<string>
}

export interface Convert {
  participants: Participants[];
}

interface Participants{
  user: Users;
}

interface Users{
  id: string;
  username: string;
}