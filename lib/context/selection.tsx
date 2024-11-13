"use client"
import { SelectionContextType } from "@/dtos/interfaceSelection";
import { createContext, FC, ReactNode, useContext, useState } from "react";

const SelectionContext = createContext<SelectionContextType| undefined>(undefined);


export const SelectionProvider: FC<{ children: ReactNode}> = ({children}) => {
    const [selectedPreview, setSelectedPreview] = useState<string | null>(null);
    const [selectedMatch, setSelectedMatch] = useState<string | null>(null);
    const [selectedExportMatch, setSelectedExportMatch] = useState<string | null>(null);
    const [selectedDelete, setSelectedDelete] = useState<string | null>(null);
    const [clickedPreviewButton, setClickedPreviewButton] = useState<Record<string,boolean>>({});
    const [clickedMatchButton, setClickedMatchButton] = useState<Record<string,boolean>>({});
    const [clickedExportButton, setClickedExportButton] = useState<Record<string,boolean>>({});
    const [clickedDeleteButton, setClickedDeleteButton] = useState<Record<string,boolean>>({});
    const [file, setFile] = useState<File>();

    return (
        <SelectionContext.Provider value={{
            selectedPreview, setSelectedPreview,
            selectedMatch, setSelectedMatch,
            selectedExportMatch, setSelectedExportMatch,
            selectedDelete, setSelectedDelete,
            clickedPreviewButton, setClickedPreviewButton,
            clickedMatchButton, setClickedMatchButton,
            clickedExportButton, setClickedExportButton,
            clickedDeleteButton, setClickedDeleteButton,
            file, setFile,
        }}>
            {children}
        </SelectionContext.Provider>
    )
}

export const useSelection = () => {
    const context = useContext(SelectionContext);
    if(!context) {
        throw new Error('useSelection must be used within a SelectioProvider');
    }
    return context;
}