import { cookies } from "next/headers";
import Counter from "./components/counter/counter";
import FadeIn from "./components/fadeIn/fadeIn";
import Logout from "./components/logout/logout";
import Navbar from "./components/navbar/navbar";
import { getUserEmail } from "./lib/auth.server";
import { getUserCounter } from "./lib/counter";
import { authGuard } from "./lib/guards";
import "./page.scss";

export default async function Home() {
  authGuard({ cookies });

  const userEmail = await getUserEmail();
  const initialValue = await getUserCounter();

  return (
    <FadeIn>
      <main className="main">
        <Navbar>
          <div>{userEmail}</div>
          <Logout />
        </Navbar>

        <Counter initialValue={initialValue} />
      </main>
    </FadeIn>
  );
}
