import { Link } from "react-router-dom";
import { UserDetails } from "../../types"

type UserListProps = {
    user: UserDetails;
}

export default function UserList({ user }: UserListProps) {
    return (
        <div className="border-t-2 border-slate-100 p-2 text-left">
           <Link to={`/profile/${user.id}`} className="font-semibold">{user.name} {user.lastname}</Link>
           <p className="text-sm font-semibold text-slate-400">{user.email}</p> 
        </div>
    )
}