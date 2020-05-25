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
  const [errors, setErrors] = useState<string[]>([]);

  const hasObsEvents = useRef(false);
  const dispatch = useObsDispatch();
  const obsState = useObsState();
  const { address, port, password } = useObsState();

  /* * * * * * * * * * * * * * * * * * * * * * * *
   * PREVIEW
   * * * * * * * * * * * * * * * * * * * * * * * */

  const getCurrentPreview = useCallback(
    (swp: IScene[]) => {
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
    },
    [dispatch]
  );

  /* * * * * * * * * * * * * * * * * * * * * * * *
   * THUMBNAILS
   * * * * * * * * * * * * * * * * * * * * * * * */

  const loadThumbnails = useCallback(
    (scenesList: IScene[]) => {
      obsService.getThumbs(scenesList).then((swp) => {
        dispatch({
          type: "scenes",
          payload: swp,
        });

        console.log("Thumbs loaded");

        getCurrentPreview(swp);
      });
    },
    [dispatch, getCurrentPreview]
  );

  /* * * * * * * * * * * * * * * * * * * * * * * *
   * SCENES
   * * * * * * * * * * * * * * * * * * * * * * * */

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

      loadThumbnails(scenesList);
    });
  }, [dispatch, loadThumbnails, obsState.buttonWidth]);

  /* * * * * * * * * * * * * * * * * * * * * * * *
   * EVENTS
   * * * * * * * * * * * * * * * * * * * * * * * */

  const setupEvents = useCallback(() => {
    if (hasObsEvents.current) return;
    hasObsEvents.current = true;

    obsService.on("SwitchScenes", () => {
      sceneLoad();
    });
  }, [sceneLoad]);
  useEffect(() => setupEvents(), [setupEvents]);

  /* * * * * * * * * * * * * * * * * * * * * * * *
   * CONNECTION
   * * * * * * * * * * * * * * * * * * * * * * * */

  useEffect(() => {
    obsService
      .connect({ address: address, port: port, password: password })
      .then(() => {
        console.log("OBS connected!");
        dispatch({ type: "status", payload: "Connected" });
        sceneLoad();
      })
      .catch((err) => {
        console.log(err);

        setErrors(
          [...errors, `${err.error} Address: ws://${address}:${port}`].filter(
            (v, i, a) => a.indexOf(v) === i
          )
        );
      });
  }, [address, dispatch, errors, password, port, sceneLoad]);

  const sceneSwitch = (scene?: string) => {
    if (!scene) return;
    obsService.setCurrentScene(scene);
  };

  /* * * * * * * * * * * * * * * * * * * * * * * *
   * SETUP
   * * * * * * * * * * * * * * * * * * * * * * * */

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
    if (field === "port") value = parseInt(value);
    if (field === "buttons") value = parseInt(value);
    if (field === "buttonWidth") value = parseInt(value);
    setSetupData({ ...setupData, [field]: value });
  };

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

      {!!errors.length && (
        <div className="error-message">
          {errors.map((e, index) => (
            <div key={index}>{e}</div>
          ))}
          <button
            className="btn-refresh"
            type="button"
            onClick={() => window.location.reload()}
          >
            Clique aqui para ATUALIZAR
          </button>
        </div>
      )}

      {!errors.length && !scenesToRender?.length && (
        <div className="info-message">
          <div>CARREGANDO...</div>
          <button
            className="btn-refresh"
            type="button"
            onClick={() => window.location.reload()}
          >
            Clique aqui para ATUALIZAR
          </button>
        </div>
      )}

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
