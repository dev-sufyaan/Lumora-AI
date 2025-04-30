import { redirect } from 'next/navigation';

export default function SSOCallback() {
    // Simply redirect to the app page without authentication
    redirect('/app');
}
