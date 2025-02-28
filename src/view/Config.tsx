import { useState } from "react";
import { BotonPrimario } from "../components/ui/Botones";
import Modal from "../components/modal/Modal";
import EditPassword from "../components/forms/EditPassword";
import { useAuthStore } from "../store";

export default function Config() {
    const { user } = useAuthStore();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const closeModal = () => setIsOpenModal(false);

    return (
        <div className="flex items-center justify-center h-[70vh]">
            <div className="flex flex-col gap-3 w-80">
                <BotonPrimario attributes={{ onClick: () => setIsOpenModal(true) }}>
                    Actualizar mi contraseña
                </BotonPrimario>
            </div>

            <Modal isOpen={Boolean(isOpenModal)} onClose={closeModal}>
                <EditPassword email={user!.email} afterOperation={closeModal}/>
            </Modal>  
        </div>
    )
}