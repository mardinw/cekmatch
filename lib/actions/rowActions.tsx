import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import React, {  useState } from 'react'

interface RowActionsProps {
    fileName: string
}

export default function RowActions({fileName}: RowActionsProps) {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [isError, setIsError] = useState("");
    const [files, setFiles] = useState([]);
    const [selectedPreview, setSelectedPreview] = useState<string|null>(null);
    const [selectedMatch, setSelectedMatch] = useState<string|null>(null);
    const [selectedExportMatch, setSelectedExportMatch] = useState<string|null>(null);
    const [selectedDelete, setSelectedDelete] = useState('');

    const [clickedPreviewButton, setClickedPreviewButton] = useState<Record<string,boolean>>({});
    const [clickedMatchButton, setClickedMatchButton] = useState<Record<string,boolean>>({});
    const [clickedExportButton, setClickedExportButton] = useState<Record<string,boolean>>({});
    const [clickedDeleteButton, setClickedDeleteButton] = useState<Record<string,boolean>>({});
    

    const handlePreviewClick = (file:string) =>{
        if(selectedPreview === file) {
            setSelectedPreview(null);
        } else {
            setSelectedPreview(file);
        }
        setSelectedMatch(null);

        setClickedPreviewButton({[file]: !clickedPreviewButton[file]});
        setClickedMatchButton({});
    }
    
    const handleMatchClick = (file:string) =>{
        if(selectedMatch === file) {
            setSelectedMatch(null);
        } else {
            setSelectedMatch(file);
        }
        setSelectedPreview(null);

        setClickedMatchButton({[file]: !clickedMatchButton[file]});
        setClickedPreviewButton({});
    }
    
    const handleExportMatchClick = (file:string) =>{
        if(selectedExportMatch === file) {
            setSelectedExportMatch(null);
        } else {
            setSelectedExportMatch(file);
        }
        setSelectedPreview(null);

        setClickedExportButton({[file]: !clickedExportButton[file]});
        setClickedPreviewButton({});
    }

    const handleDeleteClick = (file:string) => {
        setSelectedDelete(file);
    }

    const isButtonPreviewClicked = (file:string) => clickedPreviewButton[file];
    const isButtonMatchClicked = (file:string) => clickedMatchButton[file];
    const isButtonExportClicked = (file:string) => clickedExportButton[file];

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    }

    return (
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0" onClick={toggleMenu}>
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        {isMenuOpen && (
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handlePreviewClick(fileName)}>Read Data</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Match Data</DropdownMenuItem>
            <DropdownMenuItem>Export Match</DropdownMenuItem>
            <DropdownMenuItem>Delete Data</DropdownMenuItem>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    )
}
