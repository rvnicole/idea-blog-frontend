import { Followed, Follower } from "../types"
import UserList from "./cards/UserList";

type FollwersAndFollowedListProps = {
    list: Followed[] | Follower [];
    type: "following"|"followers";
}
export default function FollwersAndFollowedList({ list, type }: FollwersAndFollowedListProps) {
    return (
        <div>
            <h3 className="text-lg font-bold mb-3">{type === "following" ? "Siguiendo" : "Seguidores"}</h3>
            { list.map(registro => (
                <UserList 
                    key={registro.id}
                    user={"followed" in registro ? registro.followed : registro.follower }
                />
            ))}

            { list.length === 0 && 
                <div className="border-t-2 border-slate-100 p-2">
                    <p className="text-slate-400">
                        {type === "following" ? "Aún no sigue a otros usuarios" : "Aún no tiene seguidores"}
                    </p>
                </div>
            }
        </div>
    )
}