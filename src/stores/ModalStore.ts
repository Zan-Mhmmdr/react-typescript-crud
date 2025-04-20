import { create } from "zustand";

type FormData = {
    id: string
    name: string
    job: string
}

type ModalState = {
    showAdd: boolean
    showEdit: boolean
    showDelete: boolean
    animateModal: boolean
    editData: FormData | null
    confirmDeleteId: string | null
    openModal: (type: "add" | "edit" | "delete", payLoad: any) => void
    closeModal: () => void
}

export const useModalStore = create<ModalState>((set) => ({
    showAdd: false,
    showEdit: false,
    showDelete: false,
    animateModal: false,
    editData: null,
    confirmDeleteId: null,

    openModal: (type, payload?) => {
        if (type === "add") set({ showAdd: true })
        if (type === "edit") set({ showEdit: true, editData: payload })
        if (type === "delete") set({ showDelete: true, confirmDeleteId: payload.id })

        setTimeout(() => {
            set({ animateModal: true })
        }, 10)
    },

    closeModal: () => {
        set({ animateModal: false })
        setTimeout(() => {
            set({
                showAdd: false,
                showEdit: false,
                showDelete: false,
                editData: null,
                confirmDeleteId: null
            })
        }, 300);
    }
}))