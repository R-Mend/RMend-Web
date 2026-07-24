import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth/server';

// Server components using `auth` methods must be rendered dynamically
export const dynamic = 'force-dynamic';

export default async function HomePage() {
    const { data: session } = await auth.getSession();

    if (session?.user) {
        // Check if user is admin
        if (session.user.role === 'admin') {
            // TODO: create and redirect to admin console for onboarding new organizations
            redirect('/reports');
        } else {
            // Non-admin users should go to main app
            // const mainAppUrl = process.env.MAIN_APP_URL || 'http://localhost:3000';
            // redirect(mainAppUrl);
            redirect('/reports')
        }
    } else {
        redirect('/auth/sign-in');
    }
}
