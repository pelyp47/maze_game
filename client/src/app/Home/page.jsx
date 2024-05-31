import { useTranslations } from "next-intl";
import Home from "../../views/Home/Home";

export default function Page() {
  const t = useTranslations('Home');
  const gameListTranslation = {
    submitButton: t('submitButton'),
    joinButton: t('joinButton'),
  }
  const controlPanelTranslation = {
    "upButton": t("upButton"),
    "rightButton": t("rightButton"),
    "downButton": t("downButton"),
    "leftButton": t("leftButton"),
  }
  const chatTranslation = {
    "oponentMoveIndicator": t("oponentMoveIndicator"),
    "yourMoveIndicator": t("yourMoveIndicator"),
    "sendMessageButton": t("sendMessageButton"),
    "you": t("you"),
    "oponent": t("oponent"),
    "youWon": t("youWon"),
    "youLost": t("youLost")
  }
  const mazeTranslation = {
    "giveUpButton": t("giveUpButton"),
    "exitButton": t("exitButton"),
  }
  return (
    <Home 
    greetings={t("greetings")}
    gameListTranslation={gameListTranslation}
    mazeTranslation={mazeTranslation}
    chatTranslation={chatTranslation}
    controlPanelTranslation={controlPanelTranslation}/>
  )
}