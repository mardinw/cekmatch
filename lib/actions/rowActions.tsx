import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useSelection } from '../context/selection';
import { FileProps } from '@/dtos/interfaceFilename';
import { HandlerMatchExport } from './handlerMatchExport';
import { HandlerDelete } from './handlerDelete';
import jwt from 'jsonwebtoken';



export default function RowActions({fileName}: FileProps) {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const {
        selectedPreview,
        setSelectedPreview,
        selectedMatch,
        setSelectedMatch,
        clickedPreviewButton,
        setClickedPreviewButton,
        clickedMatchButton,
        setClickedMatchButton,
    } = useSelection();

    const [, setIsActive] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const isAccessToken = typeof window !== "undefined" ? localStorage.getItem('access_token') : null;
    useEffect(() => {
        if (isAccessToken && isAccessToken !== 'undefined') {
            const decoded = jwt.decode(isAccessToken);
            if (decoded && typeof decoded === 'object' && 'role' in decoded) {
                if(decoded.role === 'admin') {
                    setIsAdmin(true);
                } else if (decoded.role === 'user') {
                    setIsAdmin(false);
                }
            }
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [isAccessToken]);
    
    const handlePreviewClick = (file:string) =>{
        if(selectedPreview === file) {
          // jika file yang diklik sama, maka hilangkan preview
            setSelectedPreview(null);
        } else {
          // jika file yang diklik berbeda, maka set preview ke yang baru
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
            <DropdownMenuItem onClick={() => HandlerMatchExport({fileName})}>Export Match</DropdownMenuItem>
            {isAdmin && 
              <DropdownMenuItem onClick={() => HandlerDelete({fileName})}>Delete Data</DropdownMenuItem>
            }
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    )
}
