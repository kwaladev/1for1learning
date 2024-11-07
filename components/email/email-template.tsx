import Link from 'next/link';
import * as React from 'react';

interface EmailTemplateProps {
    email: string;
    inviteId: number;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    email,
    inviteId,
}) => (
    <div>
        <h1>Welcome, {email}!</h1>
        <p>You've been invited to join a team</p>
        <a href={`/en/sign-up?inviteId=${inviteId}`}>Accept invitation</a>
    </div>
);
