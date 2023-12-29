"use client";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { open } from "@tauri-apps/api/dialog";
import { open as launch } from "@tauri-apps/api/shell";
import { type SetupState, useSetupStore } from "@/store/setupStore";
import { MINECRAFT_NAME, MINECRAFT_PREVIEW_NAME } from "@/lib/constants";
import { Cross2Icon, ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useMinecraftProcess } from "@/hooks/useMinecraftProcess";

function SideloadAction({
  location,
}: {
  location: SetupState["sideloadInstances"][string]["location"];
}) {
  const [isSideloading, setIsSideloading] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const [runningInstance, setRunningInstance] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { getRunningInstance, sideload } = useMinecraftProcess();
  const { t } = useTranslation();

  const handleLaunchMinecraft = async (preview?: boolean) => {
    setErrorMessage(null);
    setIsLaunching(true);
    try {
      // Launch via minecraft: protocol
      await launch(preview ? "minecraft-preview:" : "minecraft:");
    } catch (err) {
      setErrorMessage((err as Error).toString());
    } finally {
      setIsLaunching(false);
    }
  };

  const handleSideloadProcess = async () => {
    setErrorMessage(null);
    setIsSideloading(true);
    try {
      const { result } = await sideload(location);
    } catch (err) {
      setErrorMessage((err as Error).toString());
    } finally {
      setIsSideloading(false);
    }
  };

  useEffect(() => {
    getRunningInstance()
      .then(setRunningInstance)
      .catch((err) => {
        setErrorMessage((err as Error).toString());
      });
  }, [
    getRunningInstance,
    setRunningInstance,
    setErrorMessage,
    runningInstance,
  ]);

  return (
    <div className="flex flex-col">
      {errorMessage && (
        <p className="flex items-center justify-center space-x-2 border border-red-600/50 bg-red-800/50 px-2 py-1 text-center text-xs font-medium leading-relaxed text-red-100 transition-colors duration-200 ease-out hover:bg-red-700">
          <ExclamationTriangleIcon className="inline-block h-4 w-4 translate-y-0.5 select-none opacity-60" />
          <span className="select-all selection:bg-red-700">
            {errorMessage}
          </span>
        </p>
      )}
      <div className="flex flex-col items-start justify-between rounded-b-lg border-t border-gray-600/50 bg-minecraft-slate-700/60 p-4">
        {runningInstance !== null ? (
          <button
            className="btn mx-auto h-12 w-64 bg-minecraft-purple-800/80"
            type="button"
            onClick={handleSideloadProcess}
            disabled={isSideloading}
          >
            {t("setup.sideloading.processButton") + ` ${runningInstance}`}
          </button>
        ) : (
          <>
            <div className="flex w-full flex-col space-y-0.5 pr-4">
              <h5 className="font-medium text-gray-200">
                {t("setup.sideloading.processTitle")}
              </h5>
              <p className="text-sm font-normal text-gray-300">
                {t("setup.sideloading.processDescription")}
              </p>
            </div>
            <div className="flex w-full flex-col">
              {isLaunching && (
                <p className="text-sm font-medium leading-relaxed text-green-600">
                  {t("setup.sideloading.launchingMinecraft")}
                </p>
              )}
              <div className="mt-4 flex flex-col items-center justify-between space-x-2 sm:flex-row">
                <button
                  className="btn h-10 flex-1 bg-minecraft-green-700/90"
                  type="button"
                  onClick={() => handleLaunchMinecraft()}
                >
                  {t("setup.sideloading.startMinecraft")}
                </button>
                <button
                  className="btn h-10 flex-1 bg-yellow-600/80"
                  type="button"
                  onClick={() => handleLaunchMinecraft(true)}
                >
                  {t("setup.sideloading.startMinecraftPreview")}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function SideloadLocation({
  instanceName,
}: {
  instanceName: string;
}) {
  const [isPreview, setIsPreview] = useState<boolean | null>(null);
  const [exePath, setExePath] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    setSideloadInstance,
    sideloadInstances,
    getSideLoadInstance,
    removeSideloadInstance,
  } = useSetupStore();
  const { getExePath, isPreviewInstance } = useMinecraftProcess();

  const { t } = useTranslation();

  const handleSavePath = async () => {
    const result = await open({
      title: "Select sideload directory",
      multiple: false,
      directory: true,
    });
    if (!result) {
      setErrorMessage("No directory selected");
      return;
    }

    const location = Array.isArray(result) ? result[0] : result;
    setSideloadInstance(
      instanceName.length < 1 ? location : instanceName,
      location,
      false,
    );
  };

  const handleDeleteInstance = (name: string) => {
    removeSideloadInstance(name);
  };

  useEffect(() => {
    setErrorMessage(null);

    if (
      sideloadInstances[instanceName] !== undefined &&
      sideloadInstances[instanceName].location.length > 0
    ) {
      Promise.allSettled([
        getExePath(instanceName)
          .then((p) => setExePath(p))
          .catch((err) => {
            setErrorMessage((err as Error).toString());
          }),
        isPreviewInstance(instanceName)
          .then((p) => setIsPreview(p))
          .catch(() => setIsPreview(null)),
      ]);
      return;
    }

    setExePath(null);
  }, [
    sideloadInstances,
    instanceName,
    setSideloadInstance,
    getExePath,
    isPreviewInstance,
  ]);

  const { location } = getSideLoadInstance(instanceName);

  return (
    <div className="flex w-full flex-col rounded-lg border border-gray-500/50 bg-minecraft-slate-800/90 shadow-lg backdrop-blur-xl">
      <div className="group flex w-full items-center justify-start rounded-t-lg border-b border-gray-500/50 bg-minecraft-slate-900 py-1 pl-4 pr-2.5">
        <h4 className="select-none text-lg font-semibold leading-loose text-gray-50">
          {instanceName}
        </h4>
        <div className="flex flex-grow items-center justify-start opacity-0 transition-opacity duration-150 ease-in group-hover:opacity-100">
          <button
            type="button"
            className="cursor-pointer px-2"
            title={t("setup.sideloading.deleteInstance")}
            onClick={() => handleDeleteInstance(instanceName)}
          >
            <Cross2Icon className="h-4 w-4 text-red-500" />
            <span className="sr-only">Remove</span>
          </button>
        </div>
        {exePath !== null && isPreview !== null && (
          <p
            className={clsx(
              "ml-auto select-none rounded-md border px-2 py-0.5 text-xs font-medium uppercase leading-tight shadow",
              isPreview
                ? "border-yellow-600 bg-yellow-600/50 text-yellow-300"
                : "border-green-600 bg-green-600/50 text-green-300",
            )}
          >
            {isPreview ? MINECRAFT_PREVIEW_NAME : MINECRAFT_NAME}
          </p>
        )}
      </div>
      {errorMessage && (
        <p className="flex items-center justify-center space-x-2 border border-red-600/50 bg-red-800/50 px-2 py-1 text-center text-xs font-medium leading-relaxed text-red-100 transition-colors duration-200 ease-out hover:bg-red-700">
          <ExclamationTriangleIcon className="inline-block h-4 w-4 translate-y-0.5 select-none opacity-60" />
          <span className="select-all selection:bg-red-700">
            {errorMessage}
          </span>
        </p>
      )}
      <div
        className={clsx(
          exePath && "rounded-b-lg",
          "flex flex-col space-y-0.5 bg-minecraft-slate-900/50 px-4 py-3",
        )}
      >
        <p className="select-none text-sm font-medium text-gray-100">
          {t("setup.sideloading.sideloaderPathLabel")}
        </p>
        <div className="flex w-full items-center justify-start space-x-2">
          {!location?.length ? (
            <p
              className="input flex-grow select-none leading-loose text-gray-400"
              onClick={handleSavePath}
              role="button"
            >
              {t("setup.sideloading.pathPlaceholder")}
            </p>
          ) : (
            <p
              className={clsx(
                "input flex-grow cursor-default select-all leading-loose transition-colors duration-150 ease-out",
                exePath ? "text-green-500" : "text-gray-50",
              )}
            >
              {exePath ?? location}
            </p>
          )}
          <button className="btn w-32" type="button" onClick={handleSavePath}>
            {t("button.select")}
          </button>
        </div>
        <p
          className={clsx(
            "cursor-default select-none text-xs leading-tight text-gray-400 transition-opacity duration-150 ease-out",
            exePath ? "opacity-0" : "opacity-100",
          )}
        >
          {t("setup.sideloading.pathDescription")}
        </p>
      </div>
      {exePath === null && location && <SideloadAction {...{ location }} />}
    </div>
  );
}
