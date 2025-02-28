import { Like } from "../types"
import UserList from "./cards/UserList";

type LikesListListProps = {
    list: Like[];
}
export default function LikesList({ list }: LikesListListProps) {
    return (
        <div>
            <h3 className="text-lg font-bold mb-3">Personas a las que les gusta este post</h3>
            { list.map(registro => (
                <UserList 
                    key={registro.id}
                    user={registro.user}
                />
            ))}

            { list.length === 0 && 
                <div className="border-t-2 border-slate-100 p-2">
                    <p className="text-slate-400">Sé el primero en reaccionar a este post</p>
                </div>
            }
        </div>
    )
}