import { useEffect, useRef } from "react";

import styles from "./home.module.scss";

import { IconButton } from "./button";
import SettingsIcon from "../icons/settings.svg";
import GithubIcon from "../icons/github.svg";
import ChatGptIcon from "../icons/chatgpt.svg";
import AddIcon from "../icons/add.svg";
import CloseIcon from "../icons/close.svg";
import MaskIcon from "../icons/mask.svg";
import PluginIcon from "../icons/plugin.svg";
import DragIcon from "../icons/drag.svg";

import Locale from "../locales";

import { useAppConfig, useChatStore } from "../store";

import {
  MAX_SIDEBAR_WIDTH,
  MIN_SIDEBAR_WIDTH,
  NARROW_SIDEBAR_WIDTH,
  Path,
  REPO_URL,
} from "../constant";

import { Link, useNavigate } from "react-router-dom";
import { useMobileScreen } from "../utils";
import dynamic from "next/dynamic";
import { showConfirm, showToast } from "./ui-lib";

const ChatList = dynamic(async () => (await import("./chat-list")).ChatList, {
  loading: () => null,
});

function useHotKey() {
  const chatStore = useChatStore();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey) {
        if (e.key === "ArrowUp") {
          chatStore.nextSession(-1);
        } else if (e.key === "ArrowDown") {
          chatStore.nextSession(1);
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    返回 ()= >窗口。removeEventListener(“按键”，onKeyDown);
  });
}

功能 使用DragSideBar() {
  常数 限制 = (x:数字)= >数学。部(MAX_SIDEBAR_WIDTH，x);

  常数 配置 = useAppConfig();
  常数 startX = useRef(0);
  常数 startDragWidth = useRef(配置。侧栏宽度 ?? 300);
  常数 lastUpdateTime = useRef(约会。现在());

  常数 handleMouseMove = useRef((e:MouseEvent) => {
    如果 (约会。现在() < lastUpdateTime.目前的 + 50) {
      返回;
    }
lastUpdateTime。目前的=日期。现在();
    常数 d= e。clientXstartX。目前的;
    常数 nextWidth = 限制(startDragWidth。目前的+ d);
配置。更新((配置) => (配置。侧栏宽度= nextWidth));
  });

  常数 handleMouseUp = useRef(() => {
startDragWidth。目前的=配置。侧栏宽度 ?? 300;
窗户。removeEventListener("鼠标移动"，handleMouseMove。目前的);
窗户。removeEventListener("鼠标抬起"，handleMouseUp。目前的);
  });

  常数 翁德拉穆斯敦 = (e:MouseEvent) => {
startX。目前的= e。clientX;

窗户。addEventListener("鼠标移动"，handleMouseMove。目前的);
窗户。addEventListener("鼠标抬起"，handleMouseUp。目前的);
  };
  常数 isMobileScreen = useMobileScreen();
  常数 应该缩小 =
！isMobileScreen && config。侧栏宽度 < MIN_SIDEBAR_WIDTH;

  使用效果(() => {
    常数 酒吧宽度=应该缩小
？窄边栏宽度
      : 限制(配置。侧栏宽度 ?? 300);
    常数 侧栏宽度= isMobileScreen？" 100瓦" : `${酒吧宽度}px ` 1;
文档。documentElement.风格.setProperty("-侧栏宽度"，侧栏宽度);
  }, [配置。侧栏宽度，是移动屏幕，应该缩小]);

  返回 {
    翁德拉穆斯敦,
    应该缩小,
  };
}

出口 功能 补充报道(小道具: { 类名？:字符串}) {
  常数 聊天商店 = 使用聊天商店();

  //拖动侧栏
  常数 { 翁德拉穆斯敦, 应该缩小 } = 使用DragSideBar();
  常数 航行 = 使用导航();
  常数 配置 = useAppConfig();

  使用热键();

  返回 (
    <差异
      类名={`${风格。补充报道} ${道具。类名} ${
应该缩小和样式["窄边栏"]
      }`}
    >
      <差异类名={风格["侧栏标题"]} 数据-Tauri-拖动-区域>
        <差异类名={风格["侧栏标题"]} 数据-Tauri-拖动-区域>
IOS-ChatGPT
        </差异>
        <差异类名={风格["侧栏-副标题"]}>
        <a href=" http://yiqiwan.cc " 目标=" _blank ">个人主页</a>：公益密码-微信公众号:CydiaBi</差异><差异><a href=" https://idc.yiqiwan.cc " 目标=" _blank ">青云</a>：稳定安全的云服务器
        </差异>
        <差异类名={风格["侧栏-徽标"] + “无黑暗”}>
          <ChatGptIcon/>
        </差异>
      </差异>

      <差异类名={风格["侧边栏-标题栏"]}>
        <图标按钮
          图标={<马斯基孔/>}
          文本={应该缩小？未定义:区域设置。面具.名字}
          类名={风格["工具条-工具条-按钮"]}
          onClick={() => 航行(路径。新聊天, { 状态: { 从家里: 真实的 } })}
          阴影
        />
        <图标按钮
          图标={<PluginIcon/>}
          文本={应该缩小？未定义:区域设置。插件.名字}
          className={styles["sidebar-bar-button"]}
          onClick={() => showToast(Locale.WIP)}
          shadow
        />
      </div>

      <div
        className={styles["sidebar-body"]}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            navigate(Path.Home);
          }
        }}
      >
        <ChatList narrow={shouldNarrow} />
      </div>

      <div className={styles["sidebar-tail"]}>
        <div className={styles["sidebar-actions"]}>
          <div className={styles["sidebar-action"] + " " + styles.mobile}>
            <IconButton
              icon={<CloseIcon />}
              onClick={async () => {
                if (await showConfirm(Locale.Home.DeleteChat)) {
                  chatStore.deleteSession(chatStore.currentSessionIndex);
                }
              }}
            />
          </div>
          <div className={styles["sidebar-action"]}>
            <Link to={Path.Settings}>
              <IconButton icon={<SettingsIcon />} shadow />
            </Link>
          </div>
          <div className={styles["sidebar-action"]}>
            <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
              <IconButton icon={<GithubIcon />} shadow />
            </a>
          </div>
        </div>
        <div>
          <IconButton
            icon={<AddIcon />}
            text={shouldNarrow ? undefined : Locale.Home.NewChat}
            onClick={() => {
              if (config.dontShowMaskSplashScreen) {
                chatStore.newSession();
                navigate(Path.Chat);
              } else {
                navigate(Path.NewChat);
              }
            }}
            shadow
          />
        </div>
      </div>

      <div
        className={styles["sidebar-drag"]}
        onMouseDown={(e) => onDragMouseDown(e as any)}
      >
        <DragIcon />
      </div>
    </div>
  );
}
