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
  thumbnailWidth?: number;
  status?: SceneStatus;
}

export interface IObsConnect {
  address?: string;
  port?: number;
  password?: string;
}

export interface IObsController extends IObsConnect {
  buttons?: number;
  buttonWidth?: number;
  status?: ObsStatus;
  scenes?: IScene[];
}
