import React, { useCallback, useEffect, useRef, useState } from "react";

import { useObsDispatch, useObsState } from "../appContext";
import { Header } from "../components/Header";
import { Setup } from "../components/Setup";
import {
  IObsController,
  IScene,
  SceneStatus,
} from "../interfaces/IObsController";
import { obsService } from "../services/websocketService";

const Main: React.FC = () => {
  const [scenesToRender, setScenes] = useState<IScene[]>();

  const hasObsEvents = useRef(false);
  const dispatch = useObsDispatch();
  const obsState = useObsState();

  const sceneLoad = useCallback(() => {
    obsService.getScenes().then(({ scenes, ...rest }) => {
      const current = rest["current-scene"];
      const scenesList = scenes.map<IScene>((scene) =>
        scene.name === current
          ? {
              name: scene.name,
              thumbnailWidth: obsState.buttonWidth,
              status: SceneStatus.Program,
            }
          : { name: scene.name, thumbnailWidth: obsState.buttonWidth }
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
  }, [dispatch, obsState.buttonWidth]);

  const setupEvents = useCallback(() => {
    if (hasObsEvents.current) return;
    hasObsEvents.current = true;

    obsService.on("SwitchScenes", () => {
      sceneLoad();
    });
  }, [sceneLoad]);
  useEffect(() => setupEvents(), [setupEvents]);

  useEffect(() => {
    obsService
      .connect({ address: obsState.address, password: obsState.password })
      .then(() => {
        console.log("OBS connected!");
        dispatch({ type: "status", payload: "Connected" });
        sceneLoad();
      });
  }, [dispatch, obsState, sceneLoad]);

  const sceneSwitch = (scene?: string) => {
    if (!scene) return;
    obsService.setCurrentScene(scene);
  };

  const [onSetup, setOnSetup] = useState(false);
  const [setupData, setSetupData] = useState<IObsController>({ ...obsState });
  const toogleSetup = () => {
    if (onSetup) {
      dispatch({ type: "setup", payload: setupData });
    }
    setOnSetup(!onSetup);
  };
  const handleSetupChange = (e: any) => {
    const field = e.target.name;
    let value = e.target.value;
    if (field === "buttons") value = parseInt(value);
    if (field === "buttonWidth") value = parseInt(value);
    setSetupData({ ...setupData, [field]: value });
  };
  useEffect(() => console.log(setupData), [setupData]);

  return onSetup ? (
    <Setup
      status={obsState.status}
      setupData={setupData}
      handleSetupChange={handleSetupChange}
      toogleSetup={toogleSetup}
    />
  ) : (
    <div className="container" unselectable="on">
      <Header status={obsState.status} toogleSetup={toogleSetup} />
      <div className="action-line">
        {scenesToRender?.map(
          (scene, index) =>
            index < (obsState.buttons || 8) && (
              <div
                key={index}
                className={`action-btn ${
                  scene.status === SceneStatus.Program
                    ? "program"
                    : scene.status === SceneStatus.Preview
                    ? "preview"
                    : ""
                }`}
                style={{ minWidth: obsState.buttonWidth }}
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
