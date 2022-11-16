import { AppHeader, Modifiers } from "../market/market";
import s from "./profile.module.scss";

export default function Profile(props: { data: any; user: any }) {
  const { data, user } = props;
  return (
    <div className={s.profile}>
      <AppHeader />
      <div className={s.top}>
        <div className={s.tile}>
          <div className={s.logo}>{user.imgurl}</div>
          <div className={s.name}>{user.name}</div>
          <div className={s.keystat}>{user.description}</div>
        </div>
        <div className={s.icons}>buttons</div>
      </div>

      <Modifiers />
      <div>collections</div>
    </div>
  );
}
