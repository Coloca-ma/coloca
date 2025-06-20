// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { useInitials } from '@/hooks/use-initials';
// import { type User } from '@/types';

// export function UserInfo({ user, showEmail = false }: { user: User; showEmail?: boolean }) {
//     const getInitials = useInitials();

//     return (
//         <>
//             <Avatar className="h-8 w-8 overflow-hidden rounded-full">
//                 <AvatarImage src={user.avatar} alt={user.name} />
//                 <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
//                     {getInitials(user.name)}
//                 </AvatarFallback>
//             </Avatar>
//             <div className="grid flex-1 text-left text-sm leading-tight">
//                 <span className="truncate font-medium">{user.name}</span>
//                 {showEmail && <span className="text-muted-foreground truncate text-xs">{user.email}</span>}
//             </div>
//         </>
//     );
// }
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { type User } from '@/types';

export function UserInfo({ user, showEmail = false }: { user: User; showEmail?: boolean }) {
    const getInitials = useInitials();
    
    // Safely construct the full name from first_name and last_name
    const fullName = `${user?.first_name || ''} ${user?.last_name || ''}`.trim();
    const initials = getInitials(fullName);

    return (
        <>
            <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                <AvatarImage src={user?.avatar} alt={fullName} />
                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                    {initials}
                </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{fullName}</span>
                {showEmail && (
                    <span className="text-muted-foreground truncate text-xs">
                        {user?.email}
                    </span>
                )}
            </div>
        </>
    );
}