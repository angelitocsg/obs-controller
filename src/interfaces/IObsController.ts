export enum SceneStatus {
  None,
  Preview,
  Program,
}

export enum ObsStatus {
  Connected = "Connected",
  Disconnected = "Disconnected",
}

export interface IScene {
  name?: string;
  thumbnail?: string;
  status?: SceneStatus;
}

export interface IObsConnect {
  address?: string;
  password?: string;
}

export interface IObsController extends IObsConnect {
  status?: ObsStatus;
  scenes?: IScene[];
}
