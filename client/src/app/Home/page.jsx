import { useTranslations } from "next-intl";
import Home from "../../views/Home/Home";

export default function Page() {
  const t = useTranslations('Home');
    return (
      <Home greetings={t('greetings')}/>
    )
}