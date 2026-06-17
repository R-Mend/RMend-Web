import { RequireAuth } from "../components/RequireAuth";
import { ReportsPage } from "../components/ReportsPage";

export default function Home() {
    return (
        <RequireAuth>
            <ReportsPage />
        </RequireAuth>
    );
}
