import { Dispatch, SetStateAction } from "react";

export interface SelectionContextType {
    selectedPreview: string | null;
    setSelectedPreview: Dispatch<SetStateAction<string|null>>;
    selectedMatch: string | null;
    setSelectedMatch: Dispatch<SetStateAction<string|null>>;
    selectedExportMatch: string | null;
    setSelectedExportMatch: Dispatch<SetStateAction<string|null>>;
    selectedDelete: string | null;
    setSelectedDelete: Dispatch<SetStateAction<string|null>>;
    clickedPreviewButton: Record<string, boolean>
    setClickedPreviewButton: Dispatch<SetStateAction<Record<string, boolean>>>;
    clickedMatchButton: Record<string, boolean>
    setClickedMatchButton: Dispatch<SetStateAction<Record<string, boolean>>>;
    clickedExportButton: Record<string, boolean>
    setClickedExportButton: Dispatch<SetStateAction<Record<string, boolean>>>;
    clickedDeleteButton: Record<string, boolean>
    setClickedDeleteButton: Dispatch<SetStateAction<Record<string, boolean>>>;
    file: File|undefined;
    setFile: Dispatch<SetStateAction<File|undefined>>;
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
}