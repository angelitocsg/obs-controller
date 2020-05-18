import React, { useEffect, useState, useCallback, useRef } from "react";

import { useObsDispatch, useObsState } from "../appContext";
import { IScene, SceneStatus } from "../interfaces/IObsController";
import { obsService } from "../services/websocketService";

const Main: React.FC = () => {
  const [scenesToRender, setScenes] = useState<IScene[]>();

  const hasObsEvents = useRef(false);
  const dispatch = useObsDispatch();
  const { status } = useObsState();

  useEffect(() => {
    console.log("oi");
  }, []);

  const sceneLoad = useCallback(() => {
    obsService.getScenes().then(({ scenes, ...rest }) => {
      const current = rest["current-scene"];
      const scenesList = scenes.map<IScene>((scene) =>
        scene.name === current
          ? { name: scene.name, status: SceneStatus.Program }
          : { name: scene.name }
      );

      dispatch({
        type: "scenes",
        payload: scenesList,
      });
      console.log("Scenes loaded");

      obsService.getThumbs(scenesList).then((swp) => {
        dispatch({
          type: "scenes",
          payload: swp,
        });

        console.log("Thumbs loaded");

        obsService.getPreview().then((data) => {
          const scenesWithPreview = swp.map((scene) =>
            scene.name === data.name
              ? { ...scene, status: SceneStatus.Preview }
              : scene
          );
          dispatch({
            type: "scenes",
            payload: scenesWithPreview,
          });
          setScenes(scenesWithPreview);
        });
      });
    });
  }, [dispatch]);

  const setupEvents = useCallback(() => {
    if (hasObsEvents.current) return;
    hasObsEvents.current = true;

    obsService.on("SwitchScenes", () => {
      sceneLoad();
    });
  }, [sceneLoad]);
  useEffect(() => setupEvents(), [setupEvents]);

  useEffect(() => {
    obsService.connect({}).then(() => {
      console.log("OBS connected!");
      dispatch({ type: "status", payload: "Connected" });
      sceneLoad();
    });
  }, [dispatch, sceneLoad]);

  const sceneSwitch = (scene?: string) => {
    if (!scene) return;
    obsService.setCurrentScene(scene);
  };

  return (
    <div className="container">
      <div className="status-line">Status: {status}</div>
      <div className="action-line">
        {scenesToRender?.map(
          (scene, index) =>
            index < 8 && (
              <div
                key={index}
                className={`action-btn ${
                  scene.status === SceneStatus.Program
                    ? "program"
                    : scene.status === SceneStatus.Preview
                    ? "preview"
                    : ""
                }`}
                onClick={() => sceneSwitch(scene?.name)}
              >
                <div className="action-name">{scene.name}</div>
                <img src={scene.thumbnail} width="70" alt="" />
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Main;
