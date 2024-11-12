import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import React, {  useState } from 'react'
import { useSelection } from '../context/selection';
import { authClient } from '../auth-client';

interface RowActionsProps {
    fileName: string
}

const baseUrl = authClient.baseURL;

async function handleMatchExport({fileName} : RowActionsProps) {
  const accessToken = typeof window !== "undefined" ? localStorage.getItem('access_token') : null;

  if (!accessToken || accessToken === 'undefined') {
      return null; // Kembali ke null jika token tidak ada atau tidak valid
  }
  try{
    const res = await fetch(`${baseUrl}/v1/data/match/export?file=${fileName}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if(res.ok) {
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();

      window.URL.revokeObjectURL(url);
    } else {
      console.error('Gagal mengekspor data', res.statusText);
    }
  } catch (e) {
    console.error('Error saat mengekspor data:', e);
  }
};

export default function RowActions({fileName}: RowActionsProps) {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const {
        selectedPreview,
        setSelectedPreview,
        selectedMatch,
        setSelectedMatch,
        selectedExportMatch,
        setSelectedExportMatch,
        selectedDelete,
        setSelectedDelete,
        clickedPreviewButton,
        setClickedPreviewButton,
        clickedMatchButton,
        setClickedMatchButton,
        clickedExportButton,
        setClickedExportButton
    } = useSelection();

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
    
    const handleExportMatchClick = async (file:string) =>{
        if(selectedExportMatch === file) {
            setSelectedExportMatch(null);
        } else {
            setSelectedExportMatch(file);
            await handleMatchExport({ fileName: file });
        }
        setSelectedPreview(null);

        setClickedExportButton({[file]: !clickedExportButton[file]});
        setClickedPreviewButton({});
    }


    const handleDeleteClick = (file:string) => {
        setSelectedDelete(file);
    }


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
            <DropdownMenuItem onClick={() => handleMatchClick(fileName)}>Match Data</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExportMatchClick(fileName)}>Export Match</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDeleteClick(fileName)}>Delete Data</DropdownMenuItem>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    )
}
