import OBSWebSocket from "obs-websocket-js";

import { IObsConnect, IScene } from "../interfaces/IObsController";

let obs = new OBSWebSocket();

const connect = ({
  address = "localhost",
  port = 4444,
  password = "",
}: IObsConnect) => {
  return obs.connect({ address: `${address}:${port}`, password });
};

const getScenes = () => obs.send("GetSceneList");

const getPreview = () => obs.send("GetPreviewScene");

const getThumbs = async (scenes: IScene[]) => {
  const sceneWithThumbs: IScene[] = [];
  for (let i = 0; i < scenes.length; i++) {
    sceneWithThumbs.push(await getThumb(scenes[i]));
  }
  return sceneWithThumbs;
};

const getThumb = async (scene: IScene) => {
  if (!scene.name) return scene;

  return await obs
    .send("TakeSourceScreenshot", {
      embedPictureFormat: "png",
      sourceName: scene.name,
      width: scene.thumbnailWidth && scene.thumbnailWidth * 2,
    })
    .then(
      (data): IScene => ({
        ...scene,
        thumbnail: data.img,
      })
    )
    .catch((err) => {
      console.error(err);
      return scene;
    });
};

type TEventHandler = "SwitchScenes";

const on = (event: TEventHandler, callback: (data: any) => void) => {
  if (!obs) return;

  obs.on("ConnectionOpened", () => {
    console.log("event: ConnectionOpened");
  });
  obs.on("ConnectionClosed", (data) => {
    console.log(data);
    console.log("event: ConnectionClosed");
  });
  obs.on("AuthenticationSuccess", () => {
    console.log("event: AuthenticationSuccess");
  });
  obs.on("AuthenticationFailure", (data) => {
    console.log(data);
    console.log("event: AuthenticationFailure");
  });
  obs.on("SwitchScenes", (data) => {
    console.log("event: SwitchScenes");
    if (event === "SwitchScenes") callback(data);
  });
};

const setCurrentScene = (scene: string) => {
  obs.send("SetCurrentScene", { "scene-name": scene });
};

const obsService = {
  connect,
  getScenes,
  getPreview,
  getThumbs,
  on,
  setCurrentScene,
};

export { obsService };
