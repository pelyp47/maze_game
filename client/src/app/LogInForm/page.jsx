import { useTranslations } from "next-intl";
import LogInForm from "../../views/LogInForm/LogInForm";

export default function Page() {
  const t = useTranslations('LogInForm');
    return (
      <LogInForm nameInputDescription={t('nameInputDescription')} nameError={t('nameError')} submitButton={t('submitButton')}/>
    )
}