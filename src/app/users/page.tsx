import { RequireAuth } from "../../components/RequireAuth";
import { UsersPage } from "../../components/UsersPage";

export default function Users() {
    return (
        <RequireAuth>
            <UsersPage />
        </RequireAuth>
    );
}
